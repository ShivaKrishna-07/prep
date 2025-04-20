import React, { useState, useRef } from 'react';
import { Upload, FileX, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFiles = (files: File[]) => {
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      
    }

    if (validFiles.length > 10) {
      
      return validFiles.slice(0, 10);
    }

    if (validFiles.length < 2 && validFiles.length > 0) {
      
      return [];
    }

    return validFiles;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    const validFiles = validateFiles(Array.from(files));
    
    if (validFiles.length >= 2) {
      setSelectedFiles(validFiles);
      onFilesSelected(validFiles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files) {
      const files = e.target.files;
      const validFiles = validateFiles(Array.from(files));
      
      if (validFiles.length >= 2) {
        setSelectedFiles(validFiles);
        onFilesSelected(validFiles);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    
    if (newFiles.length < 2) {
      
      onFilesSelected([]);
    } else {
      onFilesSelected(newFiles);
    }
  };

  return (
    <Card className="w-full">
      <div 
        className='relative p-6 border-2 border-border border-dashed rounded-lg transition-colors'
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <Upload className="w-10 h-10 text-muted" />
          <div className="text-lg font-medium">Drag & drop PDF files here</div>
          <div className="text-sm text-muted">
            or
          </div>
          <Button 
            onClick={handleButtonClick}
            disabled={isProcessing}
            variant="outline"
            className="mt-2"
          >
            Browse Files
          </Button>
          <div className="text-xs text-muted mt-2">
            Upload 2-10 PDF files (Max 10MB each)
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FileUploader;
