import React from 'react';
import { BUSINESS_TYPES, LANGUAGES } from '../utils/constants';
import { Store, MapPin, Phone, Type, MessageSquare, Globe, Sparkles, Wand2 } from 'lucide-react';

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
      language: 'English'
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

        {/* Business Type & Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
              <Store size={16} /> Business Type
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="input-field [&>option]:text-zinc-900"
            >
              {BUSINESS_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
              <Globe size={16} /> Output Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="input-field [&>option]:text-zinc-900"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
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
