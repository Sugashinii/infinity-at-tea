import React, { useState } from 'react';
import ColorPalette from './ColorPalette';
import QRCodeDisplay from './QRCodeDisplay';
import PreviewPage from './PreviewPage';
import { Copy, CheckCircle2, Instagram, MessageCircle, FileText, Quote } from 'lucide-react';

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
      className="p-2 text-tea-500 hover:text-tea-700 hover:bg-tea-50 rounded-md transition-colors focus:ring-2 focus:ring-tea-500 outline-none"
      title="Copy to clipboard"
    >
      {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
    </button>
  );
};

const ResultSection = ({ title, icon, content }) => (
  <div className="bg-tea-50/50 p-4 rounded-xl border border-tea-100 flex flex-col h-full">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-medium text-tea-900 flex items-center gap-2">
        {icon} {title}
      </h3>
      <CopyButton text={content} />
    </div>
    <p className="text-tea-800 flex-grow whitespace-pre-wrap">{content}</p>
  </div>
);

const OutputResults = ({ results, formData }) => {
  if (!results) return null;

  return (
    <div className="space-y-6">
      {/* Generated Text Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultSection 
          title="Tagline" 
          icon={<Quote size={18} className="text-tea-600" />} 
          content={results.tagline} 
        />
        <ResultSection 
          title="Business Description" 
          icon={<FileText size={18} className="text-tea-600" />} 
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
          <ColorPalette colors={results.colorPalette} />
          <QRCodeDisplay phoneNumber={formData.phoneNumber} message={results.tagline} />
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2">
          <PreviewPage results={results} formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default OutputResults;
