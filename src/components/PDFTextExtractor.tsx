"use client";

import React, { useState, useEffect, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { createWorker } from "tesseract.js";
import { analyzePyqs } from "@/app/api/gemini";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface PDFTextExtractorProps {
  files: File[];
  onReset: () => void;
}

interface ExtractedDocument {
  name: string;
  text: string;
}

interface QuestionWithCount {
  text: string;
  count: number;
}

interface AnalyzedQuestions {
  one_mark_questions: QuestionWithCount[];
  ten_mark_topics: QuestionWithCount[];
}

const PDFTextExtractor: React.FC<PDFTextExtractorProps> = ({ files, onReset }) => {
  const [extractedDocuments, setExtractedDocuments] = useState<ExtractedDocument[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState<"idle" | "extracting" | "analyzing" | "complete">("idle");
  const [text, setText] = useState("");
  const [analyzedQuestions, setAnalyzedQuestions] = useState<AnalyzedQuestions | null>(null);

  // Initialize the PDF.js worker
  useEffect(() => {
    // Fixed version for use in Next.js / React
    const workerSrc = require("pdfjs-dist/build/pdf.worker.min.js");
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  }, []);

  const extractTextFromImage = async (imageDataUrl: string): Promise<string> => {
    try {
      const worker = await createWorker("eng");
      const result = await worker.recognize(imageDataUrl);
      await worker.terminate();
      return result.data.text;
    } catch (error) {
      console.error("Tesseract OCR error:", error);
      return "";
    }
  };

  const extractText = useCallback(async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      let text = "";

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        let pageText = content.items.map((item: any) => item.str).join(" ");

        if (pageText.trim().length < 20) {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (context) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            const imageDataUrl = canvas.toDataURL("image/png");
            const ocrText = await extractTextFromImage(imageDataUrl);
            pageText = ocrText || pageText;
          }
        }

        text += pageText + "\n\n";
      }

      return text;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw error;
    }
  }, []);

  const processFiles = useCallback(async () => {
    if (files.length < 2) {
      toast.error("Please upload at least 2 PDF files.");
      return;
    }

    if (files.length > 10) {
      toast.error("You can upload a maximum of 10 PDF files.");
      return;
    }

    setIsProcessing(true);
    setProcessingStage("extracting");
    setExtractedDocuments([]);
    setAnalyzedQuestions(null);
    setProgress(0);

    const documents: ExtractedDocument[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const text = await extractText(file);
        documents.push({ name: file.name, text });
        setProgress(Math.round(((i + 1) / files.length) * 50));
      }

      setExtractedDocuments(documents);
      const combinedText = documents.map((doc) => doc.text).join("\n-----------------------------------------------\n");
      setText(combinedText);

      setProcessingStage("analyzing");
      setProgress(60);

      const result = await analyzePyqs(combinedText);
      setAnalyzedQuestions(result);

      setProgress(100);
      setProcessingStage("complete");

      toast.success(`Successfully analyzed ${files.length} PDF files.`);
    } catch (error) {
      toast.error("Failed to process the PDF files.");
      console.error("Error processing files:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [files, extractText]);

  useEffect(() => {
    if (files.length >= 2 && files.length <= 10) {
      processFiles();
    }
  }, [files, processFiles]);

  if (isProcessing) {
    return (
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium">
              {processingStage === "extracting"
                ? "Extracting text from PDFs..."
                : processingStage === "analyzing"
                ? "Analyzing question patterns..."
                : "Processing complete"}
            </p>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 text-foreground bg-background" />
        </div>

        {processingStage === "analyzing" && (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Analyzing Question Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Finding Frequent 1-Mark Questions</h3>
                  <div className="space-y-3">{Array(5).fill(0).map((_, idx) => <Skeleton key={idx} className="h-10 w-full" />)}</div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Finding Frequent 10-Mark Topics</h3>
                  <div className="space-y-3">{Array(5).fill(0).map((_, idx) => <Skeleton key={idx} className="h-10 w-full" />)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {analyzedQuestions ? (
        <div className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Question Analysis Results</h2>
            <Button variant="outline" className="text-muted" onClick={onReset}>
              Upload New Files
            </Button>
          </div>

          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle>Most Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg text-muted font-medium mb-2">Frequent 1-Mark Questions</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {analyzedQuestions.one_mark_questions.map((question, idx) => (
                      <li key={idx} className="p-2 border border-border rounded-md flex items-start">
                        <span className="flex-grow">{question.text}</span>
                        <span className="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none text-background bg-foreground rounded-full">
                          {question.count}×
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="text-lg text-muted font-medium mb-2">Frequent 10-Mark Topics</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {analyzedQuestions.ten_mark_topics.map((topic, idx) => (
                      <li key={idx} className="p-2 border border-border rounded-md flex items-start">
                        <span className="flex-grow">{topic.text}</span>
                        <span className="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none text-background bg-foreground rounded-full">
                          {topic.count}×
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <Button onClick={processFiles}>Start Processing</Button>
        </div>
      )}
    </div>
  );
};

export default PDFTextExtractor;
