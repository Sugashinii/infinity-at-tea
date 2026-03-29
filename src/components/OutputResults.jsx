import React, { useState, useRef } from 'react';
import ColorPalette from './ColorPalette';
import QRCodeDisplay from './QRCodeDisplay';
import PreviewPage from './PreviewPage';
import { Copy, CheckCircle2, Instagram, MessageCircle, FileText, Quote, RefreshCw, Share2, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 text-zinc-500 hover:text-amber-400 hover:bg-white/5 rounded-md transition-colors focus:ring-2 focus:ring-amber-500 outline-none"
      title="Copy to clipboard"
    >
      {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
    </button>
  );
};

const ResultSection = ({ title, icon, content }) => (
  <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col h-full backdrop-blur-sm">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-medium text-zinc-100 flex items-center gap-2">
        {icon} {title}
      </h3>
      <CopyButton text={content} />
    </div>
    <p className="text-zinc-300 flex-grow whitespace-pre-wrap">{content}</p>
  </div>
);

const OutputResults = ({ results, formData, onRegenerate, loading, kitId, onColorChange }) => {
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const contentRef = useRef(null);

  if (!results) return null;

  const handleShare = () => {
    if (kitId) {
      navigator.clipboard.writeText(`${window.location.origin}/kit/${kitId}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
      
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      pdf.save(`${formData.businessName.replace(/\s+/g, '_')}_Kit.pdf`);
    } catch (err) {
      console.error("Failed to download PDF", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-end gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/10 mb-4">
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-200 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 disabled:opacity-70"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            {loading ? 'Regenerating...' : 'Regenerate'}
          </button>
        )}
        
        {kitId && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-200 bg-amber-600/20 hover:bg-amber-600/40 rounded-lg transition-colors border border-amber-500/30"
          >
            {copiedLink ? <CheckCircle2 size={16} className="text-green-400" /> : <Share2 size={16} className="text-amber-400" />}
            {copiedLink ? 'Link Copied!' : 'Share Link'}
          </button>
        )}

        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors disabled:opacity-70 shadow-md shadow-amber-900/30"
        >
          {downloading ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          {downloading ? 'Preparing PDF...' : 'Download PDF'}
        </button>
      </div>

      <div ref={contentRef} className="space-y-6 bg-transparent p-1 sm:p-2 rounded-xl">
        {/* Generated Text Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultSection 
          title="Tagline" 
          icon={<Quote size={18} className="text-amber-500" />} 
          content={results.tagline} 
        />
        <ResultSection 
          title="Business Description" 
          icon={<FileText size={18} className="text-amber-500" />} 
          content={results.description} 
        />
        <ResultSection 
          title="Instagram Bio" 
          icon={<Instagram size={18} className="text-pink-600" />} 
          content={results.instagramBio} 
        />
        <ResultSection 
          title="WhatsApp Status" 
          icon={<MessageCircle size={18} className="text-green-600" />} 
          content={results.whatAppStatus || results.whatsappStatus || results.WhatsAppStatus} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colors & QR */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <ColorPalette colors={results.colorPalette} onColorChange={onColorChange} />
          <QRCodeDisplay phoneNumber={formData.phoneNumber} message={results.tagline} />
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2">
          <PreviewPage results={results} formData={formData} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default OutputResults;
