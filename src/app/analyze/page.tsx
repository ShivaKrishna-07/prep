"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import FileUploader from '@/components/FileUpload';
import PDFTextExtractor from '@/components/PDFTextExtractor';

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    setIsProcessing(true);
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">PYQ Analyzer</h1>
              <p className="text-muted-foreground">
                Upload previous year papers and let AI highlight the most important questions and topics
              </p> 
            </div> 
          </header>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Upload Previous Year Papers (PDF)</CardTitle>
              <CardDescription>
                Select 2-10 exam PDFs. Our AI will extract key questions, find patterns, and suggest important areas for smart preparation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedFiles.length < 2 ? (
                <FileUploader 
                  onFilesSelected={handleFilesSelected}
                  isProcessing={isProcessing}
                />
              ) : (
                <PDFTextExtractor 
                  files={selectedFiles} 
                  onReset={handleReset}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
