import React, { useState } from 'react';
import { Palette, Copy, CheckCircle2 } from 'lucide-react';

const ColorPalette = ({ colors, onColorChange }) => {
  const [copiedHex, setCopiedHex] = useState(null);

  if (!colors || colors.length === 0) return null;

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="card flex-grow shadow-sm">
      <h3 className="font-medium text-zinc-100 flex items-center gap-2 mb-4">
        <Palette size={18} className="text-amber-500" /> Brand Colors
      </h3>
      <div className="space-y-3">
        {colors.map((hex, index) => (
          <div 
            key={index}
            className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
          >
            <div className="flex items-center gap-3 relative">
              <label 
                className="w-10 h-10 rounded-full shadow-inner border border-white/10 cursor-pointer overflow-hidden relative"
                style={{ backgroundColor: hex }}
                title="Click to pick color"
              >
                <input 
                  type="color" 
                  value={hex}
                  onChange={(e) => onColorChange && onColorChange(index, e.target.value)}
                  className="absolute opacity-0 w-20 h-20 -top-5 -left-5 cursor-pointer"
                />
              </label>
              <span className="font-mono text-sm uppercase text-zinc-300">{hex}</span>
            </div>
            <button 
              className="text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer p-2"
              onClick={() => handleCopy(hex)}
              title="Copy hex code"
            >
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
