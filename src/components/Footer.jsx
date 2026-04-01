import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0f0a05]/80 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 text-zinc-400">
            <Coffee size={18} className="text-amber-500" />
            <span className="text-sm">
              © {currentYear} <span className="text-white font-medium">Infinity@Tea</span>. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-sm text-zinc-400 hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-zinc-700">|</span>
            <Link
              to="/support"
              className="text-sm text-zinc-400 hover:text-amber-400 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
