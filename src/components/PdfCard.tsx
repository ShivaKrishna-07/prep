import React from "react";
import { Download, FileText, Eye } from "lucide-react";

export interface PdfCardProps {
  name: string;
  webViewLink: string; // Pass the complete Google Drive link here
}

const PdfCard: React.FC<PdfCardProps> = ({ name, webViewLink }) => {
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
    <div className="bg-zinc-900 rounded-xl p-6 hover:bg-zinc-800/90 transition-all duration-300 border border-zinc-800 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
            <FileText className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
        <div className="flex gap-2">
          {/* View Button */}
          <a
            href={webViewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200"
            title="View PDF"
          >
            <Eye className="w-5 h-5 text-white" />
          </a>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center justify-center p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200"
            title="Download PDF"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
