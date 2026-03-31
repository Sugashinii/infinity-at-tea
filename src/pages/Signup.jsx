import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee, Mail, Lock, User, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import Toast from '../components/Toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp(email, password, name);
      setToast({ show: true, message: `Welcome to Infinity@Tea, ${name}! ☕` });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'An error occurred during sign up.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#0f0a05] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] animate-float-slow"></div>
        </div>
        <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Check your email</h2>
          <p className="text-zinc-400 mb-8">
            We've sent a verification link to <strong className="text-zinc-200">{email}</strong>. Please confirm your email to activate your account.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-white/10 rounded-lg shadow-sm text-sm font-medium text-zinc-300 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0a05] focus:ring-amber-500 transition-colors"
          >
            Go to Login
          </button>
        </div>

        <Toast
          message={toast.message}
          isVisible={toast.show}
          onClose={() => setToast({ show: false, message: '' })}
        />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f0a05] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] animate-float-slow"></div>
      </div>
      <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-600/20 text-amber-500 mb-4 animate-glow-pulse">
            <Coffee size={24} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">Create an account</h2>
          <p className="text-zinc-400 mt-2 text-sm">
            Join to save and manage your locally generated digital starter kits.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-lg text-sm border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Full Name / Business Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg focus:ring-amber-500 focus:border-amber-500 bg-white/5 text-zinc-100 placeholder-zinc-500"
                placeholder="Local Teashop Owner"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg focus:ring-amber-500 focus:border-amber-500 bg-white/5 text-zinc-100 placeholder-zinc-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="password"
                required
                minLength="6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg focus:ring-amber-500 focus:border-amber-500 bg-white/5 text-zinc-100 placeholder-zinc-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md shadow-amber-900/40 text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0a05] focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-amber-500 hover:text-amber-400 underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <Toast
        message={toast.message}
        isVisible={toast.show}
        onClose={() => setToast({ show: false, message: '' })}
      />
    </div>
  );
}
