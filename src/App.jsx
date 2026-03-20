import { generateBusinessKit } from './services/gemini';
import InputForm from './components/InputForm';
import OutputResults from './components/OutputResults';
import { useState } from 'react';
import { Coffee } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'Tea Shop',
    location: '',
    phoneNumber: '',
    description: '',
    language: 'English'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const generatedData = await generateBusinessKit(formData);
      setResults(generatedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tea-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-tea-950">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-tea-600 p-3 rounded-full text-white shadow-md">
              <Coffee size={32} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-tea-900">
              Infinity@Tea
            </h1>
          </div>
          <p className="text-xl text-tea-700 max-w-2xl mx-auto">
            Your instant digital starter kit for local businesses. Generate branding, copy, and links in seconds. ☕
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-4">
            <InputForm 
              formData={formData} 
              setFormData={setFormData} 
              onSubmit={handleSubmit}
              loading={loading}
            />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-sm text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Right Column: Results & Preview */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {loading ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-tea-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tea-600 mb-4"></div>
                <p className="text-tea-700 animate-pulse font-medium">Brewing your digital kit...</p>
              </div>
            ) : results ? (
              <OutputResults results={results} formData={formData} />
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-tea-100 border-dashed text-center">
                <div className="text-tea-300 mb-4">
                  <Coffee size={48} />
                </div>
                <h3 className="text-lg font-medium text-tea-800 mb-2">Ready to brew!</h3>
                <p className="text-tea-600 max-w-sm">Fill out your business details and pour a fresh cup while we generate your digital identity.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
