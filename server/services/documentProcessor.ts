import * as fs from 'fs';
import * as path from 'path';
import mammoth from 'mammoth';
import { PDFExtract } from 'pdf.js-extract';

export interface ExtractedContent {
  text: string;
  wordCount: number;
}

export async function extractTextFromFile(filePath: string, mimeType: string): Promise<ExtractedContent> {
  try {
    let text = '';

    if (mimeType === 'text/plain') {
      text = await fs.promises.readFile(filePath, 'utf-8');
    } 
    else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
             mimeType === 'application/msword') {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    }
    else if (mimeType === 'application/pdf') {
      const pdfExtract = new PDFExtract();
      const data = await new Promise<any>((resolve, reject) => {
        pdfExtract.extract(filePath, {}, (err: Error | null, data: any) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
      text = data.pages.map((page: any) => 
        page.content.map((item: any) => item.str).join(' ')
      ).join('\n');
    }
    else {
      throw new Error(`Unsupported file type: ${mimeType}`);
    }

    const wordCount = text.trim().split(/\s+/).length;
    
    return {
      text: text.trim(),
      wordCount
    };
  } catch (error) {
    console.error("Text extraction error:", error);
    throw new Error("Failed to extract text from document: " + (error as Error).message);
  }
}

export async function createCorrectedDocument(
  originalContent: string, 
  correctedContent: string, 
  originalFileName: string
): Promise<Buffer> {
  // For simplicity, return corrected content as plain text
  // In a production app, you'd recreate the original format
  const content = `ORIGINAL DOCUMENT: ${originalFileName}\n\nCORRECTED VERSION:\n\n${correctedContent}`;
  return Buffer.from(content, 'utf-8');
}

export async function cleanupFile(filePath: string): Promise<void> {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.error("File cleanup error:", error);
  }
}
