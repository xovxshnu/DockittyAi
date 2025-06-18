import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { upload } from "./middleware/fileUpload";
import { extractTextFromFile, createCorrectedDocument, cleanupFile } from "./services/documentProcessor";
import { correctGrammar } from "./services/openai";
import { uploadRequestSchema, writingStyles } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload and process document
  app.post("/api/upload", upload.single('document'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { writingStyle } = uploadRequestSchema.parse(req.body);
      
      // Extract text from uploaded file
      const { text: originalContent, wordCount } = await extractTextFromFile(req.file.path, req.file.mimetype);
      
      if (wordCount === 0) {
        await cleanupFile(req.file.path);
        return res.status(400).json({ message: "Document appears to be empty" });
      }

      // Create document record
      const document = await storage.createDocument({
        originalName: req.file.originalname,
        originalContent,
        writingStyle,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        status: "processing"
      });

      // Clean up uploaded file
      await cleanupFile(req.file.path);

      // Start processing in background
      processDocumentAsync(document.id, originalContent, writingStyle);

      res.json({ 
        id: document.id,
        status: "processing",
        message: "Document uploaded successfully and processing started"
      });

    } catch (error) {
      console.error("Upload error:", error);
      if (req.file) {
        await cleanupFile(req.file.path);
      }
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid writing style" });
      }
      
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to upload document" 
      });
    }
  });

  // Get document status and results
  app.get("/api/document/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      res.json({
        id: document.id,
        originalContent: document.originalContent,
        correctedContent: document.correctedContent,
        corrections: document.corrections,
        status: document.status,
        writingStyle: document.writingStyle
      });

    } catch (error) {
      console.error("Get document error:", error);
      res.status(500).json({ message: "Failed to fetch document" });
    }
  });

  // Download corrected document
  app.get("/api/document/:id/download", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      if (document.status !== "completed" || !document.correctedContent) {
        return res.status(400).json({ message: "Document processing not completed" });
      }

      const correctedBuffer = await createCorrectedDocument(
        document.originalContent,
        document.correctedContent,
        document.originalName
      );

      const filename = `corrected_${document.originalName.replace(/\.[^/.]+$/, "")}.txt`;
      
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(correctedBuffer);

    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({ message: "Failed to download document" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Background processing function
async function processDocumentAsync(documentId: number, originalContent: string, writingStyle: string) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
    
    const correctionResult = await correctGrammar(originalContent, writingStyle as keyof typeof writingStyles);
    
    await storage.updateDocument(documentId, {
      correctedContent: correctionResult.correctedContent,
      corrections: correctionResult.corrections,
      status: "completed"
    });

  } catch (error) {
    console.error("Processing error for document", documentId, error);
    await storage.updateDocument(documentId, {
      status: "failed"
    });
  }
}
