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
        className={`relative p-6 border-2 border-zinc-500 border-dashed rounded-lg transition-colors ${
          dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
        }`}
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
          <Upload className="w-10 h-10 text-gray-400" />
          <div className="text-lg font-medium">Drag & drop PDF files here</div>
          <div className="text-sm text-gray-500">
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
          <div className="text-xs text-gray-500 mt-2">
            Upload 2-10 PDF files (Max 10MB each)
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Selected Files ({selectedFiles.length}):</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-6 w-6 p-0" 
                  onClick={() => removeFile(index)}
                  disabled={isProcessing}
                >
                  <FileX className="w-4 h-4 text-gray-500 hover:text-red-500" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default FileUploader;
