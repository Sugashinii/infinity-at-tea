import { Link, useNavigate } from 'react-router-dom';
import { Coffee, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import SignOutModal from './SignOutModal';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      setShowSignOutModal(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <>
      <nav className="bg-[#0f0a05]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-amber-600 p-2 rounded-full text-white shadow-sm shadow-amber-900/40">
                  <Coffee size={24} />
                </div>
                <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                  Infinity@Tea
                </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-zinc-200 font-bold overflow-hidden border border-white/20">
                      {user.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>{user.user_metadata?.display_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <span className="font-medium hidden sm:block">
                      {user.user_metadata?.display_name || user.email.split('@')[0]}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                      <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-xl shadow-lg border border-white/10 py-2 z-20">
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <User size={16} /> Profile & History
                        </Link>
                        <button 
                          onClick={() => {
                            setDropdownOpen(false);
                            setShowSignOutModal(true);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 text-left"
                        >
                          <LogOut size={16} /> Sign out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-zinc-300 hover:text-white font-medium">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-500 transition-colors shadow-sm shadow-amber-900/40">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SignOutModal
        isOpen={showSignOutModal}
        onCancel={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
        loading={signingOut}
      />
    </>
  );
}
