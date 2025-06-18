import { Button } from "@/components/ui/button";
import { Check, Download, Columns, Plus } from "lucide-react";

interface ResultsDisplayProps {
  result: {
    id: number;
    correctedContent: string;
    corrections: {
      grammar: number;
      style: number;
      clarity: number;
    };
  };
  onDownload: (documentId: number) => void;
  onProcessAnother: () => void;
}

export default function ResultsDisplay({ result, onDownload, onProcessAnother }: ResultsDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="h-8 w-8 text-secondary" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Grammar Correction Complete!</h3>
        <p className="text-slate-600">Your document has been processed and improved.</p>
      </div>
      
      {/* Correction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-900">{result.corrections.grammar}</div>
          <div className="text-sm text-slate-600">Grammar Fixes</div>
        </div>
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-900">{result.corrections.style}</div>
          <div className="text-sm text-slate-600">Style Improvements</div>
        </div>
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-900">{result.corrections.clarity}</div>
          <div className="text-sm text-slate-600">Clarity Enhancements</div>
        </div>
      </div>
      
      {/* Document Preview */}
      <div className="border border-slate-200 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-slate-900 mb-4">Document Preview</h4>
        <div className="prose max-w-none">
          <div className="text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
            {result.correctedContent.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index} className="mb-3">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      
      {/* Download Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={() => onDownload(result.id)}
          className="bg-secondary text-white hover:bg-green-600"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Corrected Document
        </Button>
        <Button 
          variant="outline"
          className="border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          <Columns className="mr-2 h-4 w-4" />
          Download Comparison
        </Button>
        <Button 
          variant="ghost"
          onClick={onProcessAnother}
          className="text-slate-600 hover:bg-slate-100"
        >
          <Plus className="mr-2 h-4 w-4" />
          Process Another Document
        </Button>
      </div>
    </div>
  );
}
