import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  originalName: text("original_name").notNull(),
  originalContent: text("original_content").notNull(),
  correctedContent: text("corrected_content"),
  writingStyle: text("writing_style").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  corrections: jsonb("corrections"),
  status: text("status").notNull().default("processing"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export const writingStyles = ["professional", "casual", "academic", "creative"] as const;
export const supportedFileTypes = [".pdf", ".doc", ".docx", ".txt"] as const;

export const uploadRequestSchema = z.object({
  writingStyle: z.enum(writingStyles),
});

export const correctionResponseSchema = z.object({
  id: z.number(),
  originalContent: z.string(),
  correctedContent: z.string(),
  corrections: z.object({
    grammar: z.number(),
    style: z.number(),
    clarity: z.number(),
  }),
  status: z.string(),
});

export type UploadRequest = z.infer<typeof uploadRequestSchema>;
export type CorrectionResponse = z.infer<typeof correctionResponseSchema>;
