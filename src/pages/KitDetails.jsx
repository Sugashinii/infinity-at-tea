import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getKitById } from '../services/supabase';
import OutputResults from '../components/OutputResults';
import { Coffee, ArrowLeft, Loader2 } from 'lucide-react';

export default function KitDetails() {
  const { id } = useParams();
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getKitById(id)
      .then(data => {
        setKit(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load this digital kit. It might not exist or you might not have permission.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#0f0a05] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-amber-500 mb-4" size={40} />
        <p className="text-zinc-400 font-medium">Loading kit details...</p>
      </div>
    );
  }

  if (error || !kit) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#0f0a05] py-12 px-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] animate-float-slow"></div>
        </div>
        <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-8 text-center relative z-10">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <Coffee size={32} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Kit Not Found</h2>
          <p className="text-zinc-400 mb-8">{error || "We couldn't find the requested digital kit."}</p>
          <Link to="/" className="inline-flex items-center justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-md shadow-amber-900/30 text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 transition-colors">
            Generate a New Kit
          </Link>
        </div>
      </div>
    );
  }

  const formData = {
    businessName: kit.business_name,
    businessType: kit.business_type,
    location: kit.location || '',
    phoneNumber: kit.phone_number || '',
    description: kit.description || '',
    language: kit.language || 'English'
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f0a05] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-amber-600/8 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-orange-600/8 rounded-full blur-[100px] animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back to Dashboard */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors group mb-6"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/profile" className="p-2 bg-white/5 text-zinc-400 hover:text-amber-400 rounded-full shadow-sm border border-white/10 transition-colors hover:border-amber-500/30">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                {kit.business_name} <span className="text-sm font-medium px-2.5 py-1 bg-amber-600/15 text-amber-400 rounded-full border border-amber-500/20">{kit.business_type}</span>
              </h2>
              <p className="text-sm text-zinc-500">
                Generated securely on {new Date(kit.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <OutputResults 
          results={kit.result_data} 
          formData={formData} 
          kitId={kit.id}
        />
      </div>
    </div>
  );
}
