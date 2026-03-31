import { generateBusinessKit } from '../services/gemini';
import InputForm from '../components/InputForm';
import OutputResults from '../components/OutputResults';
import { useState } from 'react';
import { Coffee, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { saveKit } from '../services/supabase';

function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [savedKitId, setSavedKitId] = useState(null);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'Tea Shop',
    location: '',
    phoneNumber: '',
    description: '',
    language: 'English',
    colorMood: 'earthy-warm'
  });

  const handleSubmit = async (e, isRegenerate = false) => {
    e.preventDefault();
    if (isRegenerate && results) {
      setHistory(prev => [results, ...prev]);
    } else {
      setHistory([]);
    }
    
    setLoading(true);
    setError('');
    
    try {
      const generatedData = await generateBusinessKit(formData);
      setResults(generatedData);
      
      // Save kit if user is logged in
      if (user) {
        try {
          const savedData = await saveKit(user.id, formData, generatedData);
          setSavedKitId(savedData.id);
        } catch (dbError) {
          console.error("Failed to save kit to database:", dbError);
        }
      } else {
        setSavedKitId(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (index, newColor) => {
    setResults(prev => {
      if (!prev) return prev;
      const newPalette = [...prev.colorPalette];
      newPalette[index] = newColor;
      return { ...prev, colorPalette: newPalette };
    });
  };

  const restoreHistory = (index) => {
    // save current to history before switching
    if (results) {
      const restored = history[index];
      const newHistory = history.filter((_, i) => i !== index);
      setHistory([results, ...newHistory]);
      setResults(restored);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f0a05] py-8 px-4 sm:px-6 lg:px-8 font-sans text-zinc-100 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-tea-900/40 rounded-full blur-[100px] animate-float-slow"></div>
        <div className="absolute top-[60%] left-[30%] w-64 h-64 bg-orange-600/5 rounded-full blur-[80px] animate-float-slow"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 mt-4"
        >
          <div className="flex items-center justify-center gap-3 mb-6 relative">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="bg-zinc-900/80 p-4 rounded-2xl text-amber-500 shadow-xl shadow-amber-900/20 relative inline-block border border-white/10 backdrop-blur-sm animate-glow-pulse"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-60">
                <div className="w-1.5 h-3 bg-amber-200/50 rounded-full steam-1"></div>
                <div className="w-1.5 h-4 bg-amber-200/50 rounded-full steam-2"></div>
                <div className="w-1.5 h-3 bg-amber-200/50 rounded-full steam-3"></div>
              </div>
              <Coffee size={40} className="relative z-10" />
            </motion.div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-sm">
            Infinity<span className="text-amber-500">@</span>Tea
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            Your instant digital starter kit for local businesses. Generate branding, copy, and links while you sip your chai. <Sparkles className="inline text-amber-500 mb-1" size={20}/>
          </p>
        </motion.header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
          {/* Left Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 sticky top-24"
          >
            <InputForm 
              formData={formData} 
              setFormData={setFormData} 
              onSubmit={handleSubmit}
              loading={loading}
            />
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-sm text-sm"
              >
                {error}
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Results & Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            {loading && !results ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10"
              >
                <div className="relative mb-6">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2 w-full justify-center">
                    <div className="w-2 h-6 bg-amber-500/50 rounded-full steam-1 blur-[1px]"></div>
                    <div className="w-2 h-8 bg-amber-400/50 rounded-full steam-2 blur-[1px]"></div>
                    <div className="w-2 h-5 bg-amber-500/50 rounded-full steam-3 blur-[1px]"></div>
                  </div>
                  <div className="bg-zinc-800 p-5 rounded-full relative z-10 animate-glow-pulse">
                    <Coffee size={40} className="text-amber-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Brewing your digital kit...</h3>
                <p className="text-zinc-400 font-medium text-center">Our AI is preparing your custom branding, copy, and colors.</p>
              </motion.div>
            ) : results ? (
              <div className="space-y-6">
                {history.length > 0 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="text-sm font-medium text-zinc-400 whitespace-nowrap"><RefreshCw size={14} className="inline mr-1" /> Previous Versions:</span>
                    {history.map((h, idx) => (
                      <button 
                        key={idx}
                        onClick={() => restoreHistory(idx)}
                        className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 text-sm whitespace-nowrap transition-colors"
                      >
                        Version {history.length - idx}
                      </button>
                    ))}
                  </div>
                )}
                <OutputResults 
                  results={results} 
                  formData={formData} 
                  onRegenerate={(e) => handleSubmit(e, true)}
                  onColorChange={handleColorChange}
                  loading={loading}
                  kitId={savedKitId}
                />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 border-dashed text-center"
              >
                <div className="bg-white/5 p-4 rounded-full text-zinc-600 mb-4 border border-white/10">
                  <Coffee size={40} />
                </div>
                <h3 className="text-xl font-bold text-zinc-300 mb-2">Ready to brew!</h3>
                <p className="text-zinc-500 max-w-sm text-center">Fill out your business details on the left and pour a fresh cup while we generate your digital identity.</p>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Home;
