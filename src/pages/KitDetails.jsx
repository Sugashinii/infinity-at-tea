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
      <div className="min-h-[calc(100vh-64px)] bg-tea-50 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-tea-600 mb-4" size={40} />
        <p className="text-tea-700 font-medium">Loading kit details...</p>
      </div>
    );
  }

  if (error || !kit) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-tea-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-tea-100 p-8 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coffee size={32} />
          </div>
          <h2 className="text-2xl font-bold text-tea-900 mb-2">Kit Not Found</h2>
          <p className="text-tea-600 mb-8">{error || "We couldn't find the requested digital kit."}</p>
          <Link to="/" className="inline-flex items-center justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-tea-600 hover:bg-tea-700 transition-colors">
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
    <div className="min-h-[calc(100vh-64px)] bg-tea-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/profile" className="p-2 bg-white text-tea-600 hover:text-tea-900 rounded-full shadow-sm border border-tea-100 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-tea-900 flex items-center gap-2">
                {kit.business_name} <span className="text-sm font-medium px-2.5 py-1 bg-tea-100 text-tea-700 rounded-full">{kit.business_type}</span>
              </h2>
              <p className="text-sm text-tea-500">
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
