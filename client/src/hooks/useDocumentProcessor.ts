import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface DocumentResult {
  id: number;
  correctedContent: string;
  corrections: {
    grammar: number;
    style: number;
    clarity: number;
  };
  status: string;
}

export function useDocumentProcessor() {
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [processingStatus, setProcessingStatus] = useState<"uploading" | "processing" | "completed" | "failed" | null>(null);
  const queryClient = useQueryClient();

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ file, writingStyle }: { file: File; writingStyle: string }) => {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('writingStyle', writingStyle);

      setProcessingStatus("uploading");
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
      }

      return response.json();
    },
    onSuccess: (data) => {
      setDocumentId(data.id);
      setProcessingStatus("processing");
    },
    onError: () => {
      setProcessingStatus("failed");
    }
  });

  // Poll for document status
  const { data: documentResult } = useQuery({
    queryKey: ['/api/document', documentId],
    enabled: !!documentId && processingStatus === "processing",
    refetchInterval: 2000, // Poll every 2 seconds
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/document/${documentId}`);
      return response.json();
    },
    onSuccess: (data: DocumentResult) => {
      if (data.status === "completed") {
        setProcessingStatus("completed");
        queryClient.invalidateQueries({ queryKey: ['/api/document', documentId] });
      } else if (data.status === "failed") {
        setProcessingStatus("failed");
      }
    }
  });

  // Download function
  const downloadDocument = async (docId: number) => {
    try {
      const response = await fetch(`/api/document/${docId}/download`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `corrected-document.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  };

  const resetProcessor = () => {
    setDocumentId(null);
    setProcessingStatus(null);
    queryClient.clear();
  };

  return {
    uploadDocument: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    processingStatus,
    documentResult: processingStatus === "completed" ? documentResult : null,
    downloadDocument,
    resetProcessor
  };
}
