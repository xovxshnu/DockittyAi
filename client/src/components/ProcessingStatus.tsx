import { Loader2, Check, Upload, Download } from "lucide-react";

interface ProcessingStatusProps {
  status: "uploading" | "processing" | "completed" | "failed";
}

export default function ProcessingStatus({ status }: ProcessingStatusProps) {
  const getProgress = () => {
    switch (status) {
      case "uploading": return 25;
      case "processing": return 65;
      case "completed": return 100;
      default: return 0;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "uploading": return "Uploading file...";
      case "processing": return "Processing with AI...";
      case "completed": return "Processing complete!";
      case "failed": return "Processing failed";
      default: return "Starting...";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          {status === "completed" ? (
            <Check className="h-8 w-8 text-secondary" />
          ) : (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Processing Your Document</h3>
        <p className="text-slate-600 mb-6">{getStatusText()}</p>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              status === "uploading" || status === "processing" || status === "completed" 
                ? "bg-secondary" : "bg-slate-300"
            }`}>
              <Upload className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-slate-600">Upload</span>
          </div>
          <div className="w-8 h-px bg-slate-300"></div>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              status === "processing" || status === "completed" 
                ? "bg-primary" : "bg-slate-300"
            }`}>
              {status === "processing" ? (
                <Loader2 className="h-4 w-4 text-white animate-spin" />
              ) : (
                <Check className="h-4 w-4 text-white" />
              )}
            </div>
            <span className="text-sm text-slate-600">Processing</span>
          </div>
          <div className="w-8 h-px bg-slate-300"></div>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              status === "completed" ? "bg-secondary" : "bg-slate-300"
            }`}>
              <Download className="h-4 w-4 text-white" />
            </div>
            <span className={`text-sm ${status === "completed" ? "text-slate-600" : "text-slate-500"}`}>
              Download
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-slate-500">This may take a few moments...</p>
      </div>
    </div>
  );
}
