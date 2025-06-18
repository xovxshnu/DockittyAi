# Replit.md - DocKitty AI Grammar Correction Platform

## Overview

DocKitty is a full-stack web application that provides AI-powered grammar correction and document enhancement services. The platform allows users to upload documents in various formats (PDF, DOC, DOCX, TXT) and receive corrected versions with improvements tailored to different writing styles (professional, casual, academic, creative).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **File Processing**: Multer for file uploads, mammoth for DOCX, pdf.js-extract for PDFs
- **AI Integration**: OpenAI GPT-4o for grammar correction and style enhancement
- **Database**: PostgreSQL with Drizzle ORM (ready for database integration)
- **Session Management**: In-memory storage (upgradeable to PostgreSQL)

### Development Setup
- **Monorepo Structure**: Single repository with client and server directories
- **Development Server**: Vite dev server with Express API proxy
- **Hot Module Replacement**: Enabled for rapid development
- **TypeScript**: Strict mode enabled across the entire codebase

## Key Components

### Document Processing Pipeline
1. **File Upload**: Secure multipart/form-data handling with file type validation
2. **Text Extraction**: Format-specific text extraction (PDF, DOC, DOCX, TXT)
3. **AI Processing**: OpenAI integration for grammar correction and style adaptation
4. **Response Generation**: Structured correction data with detailed metrics
5. **File Cleanup**: Automatic temporary file removal for security

### User Interface Components
- **FileUpload**: Drag-and-drop file upload with progress indication
- **StyleSelector**: Visual writing style selection interface
- **ProcessingStatus**: Real-time processing progress display
- **ResultsDisplay**: Correction summary with before/after comparison
- **Header**: Navigation and branding component

### Database Schema
- **Documents Table**: Stores document metadata, content, and correction results
- **Corrections Tracking**: JSON-based storage for grammar, style, and clarity metrics
- **Status Management**: Processing states (uploading, processing, completed, failed)

## Data Flow

1. **Document Upload**: User selects file and writing style through the frontend
2. **File Processing**: Backend extracts text content and validates format
3. **AI Correction**: OpenAI processes content with style-specific prompts
4. **Result Storage**: Corrected content and metrics stored in database
5. **User Feedback**: Real-time status updates and final results presentation
6. **Document Download**: Processed document available for download

## External Dependencies

### Core Dependencies
- **OpenAI API**: Grammar correction and style enhancement (GPT-4o model)
- **Neon Database**: PostgreSQL hosting (configured but not yet implemented)
- **Replit Platform**: Development environment and hosting

### File Processing Libraries
- **mammoth**: Microsoft Word document (.docx) text extraction
- **pdf.js-extract**: PDF document text extraction
- **multer**: Multipart form data and file upload handling

### UI Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Modern icon library
- **shadcn/ui**: Pre-built component library

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit's development environment
- **Hot Reloading**: Vite HMR for frontend, nodemon equivalent for backend
- **Environment Variables**: DATABASE_URL and OPENAI_API_KEY configuration
- **Port Configuration**: Frontend (5000), development proxy setup

### Production Deployment
- **Build Process**: Vite build for frontend, esbuild for backend bundling
- **Static Assets**: Frontend builds to dist/public directory
- **Server Bundle**: Backend compiles to dist/index.js
- **Database Migration**: Drizzle migrations ready for PostgreSQL deployment

### Database Configuration
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Migration System**: Structured migrations in ./migrations directory
- **Schema Management**: Centralized schema definitions in shared/schema.ts
- **Connection**: Environment-based DATABASE_URL configuration

## Changelog

```
Changelog:
- June 18, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```