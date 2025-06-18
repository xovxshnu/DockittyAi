import { useState } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import StyleSelector from "@/components/StyleSelector";
import ProcessingStatus from "@/components/ProcessingStatus";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useDocumentProcessor } from "@/hooks/useDocumentProcessor";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { 
    uploadDocument, 
    isUploading, 
    processingStatus, 
    documentResult,
    downloadDocument,
    resetProcessor
  } = useDocumentProcessor();

  const handleProcessDocument = async () => {
    if (!selectedFile || !selectedStyle) {
      setErrorMessage("Please select a file and writing style first.");
      setShowError(true);
      return;
    }

    setShowError(false);
    
    try {
      await uploadDocument(selectedFile, selectedStyle);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to process document");
      setShowError(true);
    }
  };

  const handleProcessAnother = () => {
    setSelectedFile(null);
    setSelectedStyle("");
    setShowError(false);
    resetProcessor();
  };

  const handleRetry = () => {
    setShowError(false);
    if (selectedFile && selectedStyle) {
      handleProcessDocument();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Perfect Your Writing with AI
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your document and let our AI-powered grammar correction enhance your writing across multiple styles - Professional, Casual, Academic, and Creative.
          </p>
        </div>

        {/* File Upload */}
        <FileUpload 
          selectedFile={selectedFile} 
          onFileSelect={setSelectedFile} 
        />

        {/* Style Selector */}
        <StyleSelector 
          selectedStyle={selectedStyle} 
          onStyleSelect={setSelectedStyle} 
        />

        {/* Process Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={handleProcessDocument}
            disabled={isUploading || processingStatus === "processing"}
            className="bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
            size="lg"
          >
            <Wand2 className="mr-2 h-5 w-5" />
            Correct My Document
          </Button>
        </div>

        {/* Processing Status */}
        {processingStatus && (
          <ProcessingStatus status={processingStatus} />
        )}

        {/* Results Display */}
        {documentResult && (
          <ResultsDisplay 
            result={documentResult}
            onDownload={downloadDocument}
            onProcessAnother={handleProcessAnother}
          />
        )}

        {/* Error Display */}
        {showError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <i className="fas fa-exclamation-triangle text-red-500 text-xl mt-1"></i>
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Processing Error</h4>
                <p className="text-red-700 mb-4">{errorMessage}</p>
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleRetry}
                    className="bg-red-600 text-white hover:bg-red-700"
                    size="sm"
                  >
                    Try Again
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowError(false)}
                    className="text-red-600 border-red-300 hover:bg-red-100"
                    size="sm"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <i className="fas fa-cat text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900">DocKitty</h3>
              </div>
              <p className="text-slate-600 mb-6 max-w-md">
                AI-powered grammar correction that enhances your writing across multiple styles while preserving your unique voice.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-slate-600">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-600">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-600">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-600 hover:text-slate-900">Features</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">Pricing</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">API</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-600 hover:text-slate-900">Help Center</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">Contact Us</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 mt-8">
            <p className="text-center text-slate-500">
              © 2024 DocKitty. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
