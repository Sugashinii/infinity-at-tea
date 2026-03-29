import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserKits, updateProfile } from '../services/supabase';
import { Store, Calendar, ArrowRight, Loader2, Edit2, Check, X } from 'lucide-react';

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
      // Wait for auth context to reflect changes via listener
    } catch (err) {
      console.error('Failed to update profile', err);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-tea-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-tea-600" size={48} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-tea-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-tea-100 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 shrink-0 bg-tea-100 rounded-full flex items-center justify-center text-tea-700 font-bold text-3xl overflow-hidden border-2 border-tea-200">
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
                  <button type="submit" disabled={updateLoading} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    {updateLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-tea-900 flex items-center gap-3">
                  {user.user_metadata?.display_name || 'Tea Entrepreneur'}
                </h2>
                <p className="text-tea-600">{user.email}</p>
              </div>
            )}
          </div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-sm font-medium text-tea-600 hover:text-tea-800 bg-tea-50 px-3 py-1.5 rounded-lg border border-tea-100 transition-colors"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>

        {/* History Section */}
        <div>
          <h3 className="text-xl font-bold text-tea-900 mb-6 flex items-center gap-2">
            <Store className="text-tea-600" /> My Digital Kits
          </h3>
          
          {loadingKits ? (
            <div className="flex justify-center p-12">
              <Loader2 className="animate-spin text-tea-400" size={32} />
            </div>
          ) : kits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kits.map(kit => (
                <Link 
                  key={kit.id} 
                  to={`/kit/${kit.id}`}
                  className="bg-white p-5 rounded-xl border border-tea-100 shadow-sm hover:shadow-md hover:border-tea-300 transition-all group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold text-tea-900 group-hover:text-tea-600 transition-colors line-clamp-1">
                      {kit.business_name}
                    </h4>
                    <span className="bg-tea-50 text-tea-700 text-xs px-2.5 py-1 rounded-full font-medium border border-tea-100 whitespace-nowrap">
                      {kit.business_type}
                    </span>
                  </div>
                  <p className="text-sm text-tea-600 line-clamp-2 mb-6 flex-grow">
                    {kit.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-tea-500 font-medium pt-4 border-t border-tea-50 mt-auto">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(kit.created_at).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center text-tea-600 group-hover:text-tea-800">
                      View details <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-tea-100 text-center shadow-sm">
              <div className="w-16 h-16 bg-tea-50 rounded-full flex items-center justify-center mx-auto mb-4 text-tea-400">
                <Store size={32} />
              </div>
              <p className="text-tea-800 font-medium mb-2">No kits generated yet</p>
              <p className="text-tea-500 mb-6">Head to the home page to create your first digital starter kit.</p>
              <Link to="/" className="inline-flex items-center justify-center py-2 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-tea-600 hover:bg-tea-700 transition-colors">
                Generate a Kit
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
