import React from "react";
import { Download, FileText, Eye } from "lucide-react";
import { removePdfExtension } from "@/lib/utils";

export interface PdfCardProps {
  name: string;
  webViewLink: string; // Pass the complete Google Drive link here
}

const PdfCard: React.FC<PdfCardProps> = ({ name, webViewLink }) => {
  name = removePdfExtension(name);

  const handleDownload = () => {
    // Extract file ID from the webViewLink
    const fileIdMatch = webViewLink.match(/\/d\/(.*?)\//);
    const fileId = fileIdMatch ? fileIdMatch[1] : null;

    if (fileId) {
      const downloadUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;

      // Triggering file download
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.target = "_blank";
      anchor.download = `${name}.pdf`; // Set the file name dynamically
      anchor.click();
    } else {
      alert("Invalid Google Drive link.");
    }
  };

  return (
    <div className="bg-background dark:bg-bg2 shadow-custom rounded-md p-6 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-bg2 dark:bg-zinc-800 border border-border rounded-lg transition-colors">
            <FileText className="w-7 h-7 text-muted" />
          </div>
          <h3 className="md:text-xl sm:text-2xl font-semibold text-foreground">{name}</h3>
        </div>
        <div className="flex gap-2">
          {/* View Button */}
          <a
            href={webViewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-lg border border-border bg-bg2 dark:bg-bg3 dark:hover:bg-zinc-700 transition-colors duration-200"
            title="View PDF"
          >
            <Eye className="w-5 h-5 text-muted" />
          </a>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center justify-center p-2 border border-border rounded-lg bg-bg2 dark:bg-bg3 dark:hover:bg-zinc-700 transition-colors duration-200"
            title="Download PDF"
          >
            <Download className="w-5 h-5 text-muted" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
