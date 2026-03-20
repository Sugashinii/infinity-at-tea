import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, ExternalLink } from 'lucide-react';

const QRCodeDisplay = ({ phoneNumber, message }) => {
  // Format phone number to be WhatsApp ready (remove symbols, spaces)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message || 'Hello!')}`;

  return (
    <div className="card flex-grow flex flex-col items-center justify-center text-center shadow-sm">
      <h3 className="font-medium text-tea-900 flex items-center justify-center gap-2 mb-4 w-full text-left">
        <QrCode size={18} className="text-tea-600" /> WhatsApp Link
      </h3>
      <div className="bg-white p-3 rounded-xl shadow-sm border border-tea-100 mb-4">
        <QRCodeSVG value={waUrl} size={140} level="M" includeMargin={true} />
      </div>
      <p className="text-sm text-tea-600 mb-3">
        Scan to connect with this business instantly.
      </p>
      <a 
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium bg-green-50 px-4 py-2 rounded-full transition-colors"
      >
        Open Chat <ExternalLink size={14} />
      </a>
    </div>
  );
};

export default QRCodeDisplay;
