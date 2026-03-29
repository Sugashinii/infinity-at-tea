import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetmode, setIsResetMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isResetmode) {
        await resetPassword(email);
        setMessage('Password reset link sent to your email.');
      } else {
        await signIn(email, password);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-2xl font-bold text-zinc-100">
            {isResetmode ? 'Reset Password' : 'Welcome back'}
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            {isResetmode 
              ? 'Enter your email to receive a reset link.' 
              : 'Sign in to access your saved digital kits and history.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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

          {!isResetmode && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(true);
                    setError('');
                    setMessage('');
                  }}
                  className="text-sm text-amber-500 hover:text-amber-400 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg focus:ring-amber-500 focus:border-amber-500 bg-white/5 text-zinc-100 placeholder-zinc-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md shadow-amber-900/40 text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0a05] focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : isResetmode ? (
              'Send Reset Link'
            ) : (
              <>
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          {isResetmode ? (
            <button
              onClick={() => {
                setIsResetMode(false);
                setError('');
                setMessage('');
              }}
              className="text-sm text-amber-500 hover:text-amber-400 font-medium"
            >
              Back to login
            </button>
          ) : (
            <p className="text-sm text-zinc-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-amber-500 hover:text-amber-400 underline">
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
