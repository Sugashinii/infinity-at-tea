import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserKits, updateProfile } from '../services/supabase';
import { Store, Calendar, ArrowRight, ArrowLeft, Loader2, Edit2, Check, X } from 'lucide-react';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [kits, setKits] = useState([]);
  const [loadingKits, setLoadingKits] = useState(true);
  
  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.user_metadata?.display_name || '');
      getUserKits(user.id)
        .then(data => {
          setKits(data || []);
          setLoadingKits(false);
        })
        .catch(err => {
          console.error("Error fetching kits", err);
          setLoadingKits(false);
        });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await updateProfile({ display_name: editName });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile', err);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#0f0a05] flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500" size={48} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f0a05] py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-amber-600/8 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-orange-600/8 rounded-full blur-[100px] animate-float-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">

        {/* Back to Dashboard */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        
        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 shrink-0 bg-amber-600/20 rounded-full flex items-center justify-center text-amber-400 font-bold text-3xl overflow-hidden border-2 border-amber-500/30">
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span>{user.user_metadata?.display_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}</span>
              )}
            </div>
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="input-field py-1.5"
                  placeholder="Display Name"
                  required
                />
                <div className="flex items-center gap-2">
                  <button type="submit" disabled={updateLoading} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors border border-green-500/30">
                    {updateLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="p-2 bg-white/5 text-zinc-400 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                    <X size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
                  {user.user_metadata?.display_name || 'Tea Entrepreneur'}
                </h2>
                <p className="text-zinc-400">{user.email}</p>
              </div>
            )}
          </div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-amber-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-colors hover:border-amber-500/30"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>

        {/* History Section */}
        <div>
          <h3 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <Store className="text-amber-500" /> My Digital Kits
          </h3>
          
          {loadingKits ? (
            <div className="flex justify-center p-12">
              <Loader2 className="animate-spin text-amber-500" size={32} />
            </div>
          ) : kits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kits.map(kit => (
                <Link 
                  key={kit.id} 
                  to={`/kit/${kit.id}`}
                  className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 shadow-lg hover:shadow-xl hover:border-amber-500/30 transition-all group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {kit.business_name}
                    </h4>
                    <span className="bg-amber-600/15 text-amber-400 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-500/20 whitespace-nowrap">
                      {kit.business_type}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-6 flex-grow">
                    {kit.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-medium pt-4 border-t border-white/5 mt-auto">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(kit.created_at).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center text-zinc-400 group-hover:text-amber-400">
                      View details <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-md p-12 rounded-2xl border border-white/10 text-center shadow-lg">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600 border border-white/10">
                <Store size={32} />
              </div>
              <p className="text-zinc-200 font-medium mb-2">No kits generated yet</p>
              <p className="text-zinc-500 mb-6">Head to the home page to create your first digital starter kit.</p>
              <Link to="/" className="inline-flex items-center justify-center py-2 px-6 border border-transparent rounded-lg shadow-md shadow-amber-900/30 text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 transition-colors">
                Generate a Kit
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
