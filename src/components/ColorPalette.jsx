import React, { useState } from 'react';
import { Palette, Copy, CheckCircle2 } from 'lucide-react';

const ColorPalette = ({ colors }) => {
  if (!colors || colors.length === 0) return null;

  const [copiedHex, setCopiedHex] = useState(null);

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="card flex-grow shadow-sm">
      <h3 className="font-medium text-tea-900 flex items-center gap-2 mb-4">
        <Palette size={18} className="text-tea-600" /> Brand Colors
      </h3>
      <div className="space-y-3">
        {colors.map((hex, index) => (
          <div 
            key={index}
            className="group flex items-center justify-between p-2 rounded-lg hover:bg-tea-50 cursor-pointer transition-colors border border-transparent hover:border-tea-100"
            onClick={() => handleCopy(hex)}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full shadow-inner border border-black/5"
                style={{ backgroundColor: hex }}
              />
              <span className="font-mono text-sm uppercase text-tea-700">{hex}</span>
            </div>
            <button className="text-tea-400 group-hover:text-tea-600 transition-colors">
              {copiedHex === hex ? (
                <CheckCircle2 size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
