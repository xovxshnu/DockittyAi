import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload, FileText, X } from "lucide-react";

interface FileUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
}

export default function FileUpload({ selectedFile, onFileSelect }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
      <div 
        className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="mb-6">
          <CloudUpload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Upload Your Document</h3>
          <p className="text-slate-600 mb-4">Drag and drop your file here, or click to browse</p>
          <p className="text-sm text-slate-500">Supports PDF, DOC, DOCX, and TXT files (max 10MB)</p>
        </div>
        <Button className="bg-primary text-white hover:bg-blue-600">
          <CloudUpload className="mr-2 h-4 w-4" />
          Choose File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
        />
      </div>
      
      {selectedFile && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-slate-600" />
              <div>
                <p className="font-medium text-slate-900">{selectedFile.name}</p>
                <p className="text-sm text-slate-500">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
