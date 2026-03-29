import React from 'react';
import { Globe, MapPin, Store } from 'lucide-react';

const PreviewPage = ({ results, formData }) => {
  const primaryColor = results.colorPalette?.[0] || '#c87948'; // tea-600 fallback
  const secondaryColor = results.colorPalette?.[1] || '#fcf6f0'; // tea-100 fallback
  const accentColor = results.colorPalette?.[2] || '#3a1f13'; // tea-950 fallback

  // Check brightness for text color on primary
  const getContrastColor = (hexcode) => {
    if (!hexcode) return '#ffffff';
    const r = parseInt(hexcode.slice(1, 3), 16) || 0;
    const g = parseInt(hexcode.slice(3, 5), 16) || 0;
    const b = parseInt(hexcode.slice(5, 7), 16) || 0;
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#1a1a1a' : '#ffffff';
  };

  const primaryTextColor = getContrastColor(primaryColor);

  return (
    <div className="card h-full p-0 overflow-hidden shadow-sm flex flex-col text-sm border-white/10 border-2">
      <div className="bg-zinc-800 p-3 border-b border-zinc-700 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="bg-zinc-900 px-24 py-1 rounded text-xs text-zinc-400 flex items-center gap-2 shadow-inner font-mono flex-grow mx-4 justify-center">
          <Globe size={12} /> {formData.businessName.toLowerCase().replace(/\s+/g, '')}.com
        </div>
      </div>
      
      {/* Mock Landing Page Body */}
      <div 
        className="flex-grow flex flex-col relative"
        style={{ backgroundColor: secondaryColor }}
      >
        {/* Hero Section */}
        <div 
          className="px-6 py-12 text-center rounded-b-3xl shadow-sm relative z-10"
          style={{ backgroundColor: primaryColor, color: primaryTextColor }}
        >
          <div className="inline-flex p-3 rounded-full bg-white/20 backdrop-blur-sm mb-4">
            <Store size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">{formData.businessName || 'Business Name'}</h1>
          <p className="text-lg opacity-90 font-medium max-w-md mx-auto">{results.tagline}</p>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex-grow flex flex-col items-center text-center -mt-6 pt-12 relative z-0">
          <div className="bg-white/80 p-6 rounded-2xl shadow-sm max-w-md w-full backdrop-blur-sm" style={{ color: accentColor }}>
            <h3 className="font-semibold text-lg mb-3">About Us</h3>
            <p className="opacity-80 leading-relaxed text-sm mb-6">{results.description}</p>
            
            <div className="flex items-center justify-center gap-2 text-sm font-medium mb-6 opacity-80 bg-black/5 self-center inline-flex py-1.5 px-4 rounded-full">
              <MapPin size={16} /> {formData.location || 'Location'}
            </div>

            <a 
              href={`https://wa.me/${formData.phoneNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-xl font-medium transition-transform hover:scale-[1.02] shadow-sm text-center"
              style={{ backgroundColor: primaryColor, color: primaryTextColor }}
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PreviewPage;
