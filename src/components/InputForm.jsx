import React, { useState, useRef, useEffect } from 'react';
import { BUSINESS_TYPES, LANGUAGES, COLOR_MOODS } from '../utils/constants';
import { Store, MapPin, Phone, Type, MessageSquare, Globe, Sparkles, Wand2, Palette, ChevronDown, Check } from 'lucide-react';

/* ── Custom styled dropdown component ──────────────────────── */
function StyledSelect({ label, icon: Icon, value, options, onChange, name }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // options can be strings or objects { value, label, description }
  const isObjectOptions = typeof options[0] === 'object';
  const selectedLabel = isObjectOptions
    ? options.find(o => o.value === value)?.label || value
    : value;

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
        <Icon size={16} /> {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-field w-full text-left flex items-center justify-between gap-2 cursor-pointer"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown size={16} className={`text-zinc-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 rounded-xl shadow-2xl shadow-black/40 py-1 max-h-60 overflow-y-auto custom-scrollbar">
          {options.map((opt) => {
            const optValue = isObjectOptions ? opt.value : opt;
            const optLabel = isObjectOptions ? opt.label : opt;
            const optDesc = isObjectOptions ? opt.description : null;
            const isSelected = value === optValue;

            return (
              <button
                key={optValue}
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: optValue } });
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm flex items-start gap-2 transition-colors ${
                  isSelected
                    ? 'bg-amber-600/15 text-amber-300'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <span className="block truncate">{optLabel}</span>
                  {optDesc && <span className="block text-xs text-zinc-500 mt-0.5 truncate">{optDesc}</span>}
                </div>
                {isSelected && <Check size={16} className="text-amber-400 shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── InputForm ──────────────────────────────────────────────── */
const InputForm = ({ formData, setFormData, onSubmit, loading }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInspireMe = () => {
    setFormData({
      businessName: 'Spicy Chai Corner',
      businessType: 'Tea Shop',
      location: 'Hyderabad',
      phoneNumber: '+91 9123456780',
      description: 'The best cutting chai and onion samosas in town. Perfect spot for evening hangouts.',
      language: 'English',
      colorMood: 'earthy-warm'
    });
  };

  return (
    <div className="card border-0 md:border md:border-white/10 mt-6 lg:mt-0 relative z-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-zinc-100">
          <Store className="text-amber-500" size={24} />
          Business Details
        </h2>
        <button
          type="button"
          onClick={handleInspireMe}
          className="text-sm flex items-center gap-1.5 text-zinc-300 hover:text-amber-400 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors border border-white/10"
        >
          <Wand2 size={14} /> Inspire Me
        </button>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
            <Type size={16} /> Business Name
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            placeholder="e.g. Infinity Tea Stall"
            className="input-field"
          />
        </div>

        {/* Business Type & Language — Custom dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StyledSelect
            label="Business Type"
            icon={Store}
            name="businessType"
            value={formData.businessType}
            options={BUSINESS_TYPES}
            onChange={handleChange}
          />
          <StyledSelect
            label="Output Language"
            icon={Globe}
            name="language"
            value={formData.language}
            options={LANGUAGES}
            onChange={handleChange}
          />
        </div>

        {/* Location & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
              <MapPin size={16} /> Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="City or Village"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
              <Phone size={16} /> WhatsApp Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="+91 9876543210"
              className="input-field"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
            <MessageSquare size={16} /> One Line About Business
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="2"
            placeholder="Special famous ginger tea and snacks..."
            className="input-field resize-none"
          />
        </div>

        {/* Color Mood Selector */}
        <StyledSelect
          label="Color Mood"
          icon={Palette}
          name="colorMood"
          value={formData.colorMood || 'earthy-warm'}
          options={COLOR_MOODS}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-6 py-3 flex items-center justify-center gap-2 text-lg"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Sparkles size={20} />
          )}
          {loading ? 'Generating Kit...' : 'Generate Digital Kit'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
