import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function Toast({ message, isVisible, onClose, duration = 4000 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => setShow(true));
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] pointer-events-none">
      <div
        className={`pointer-events-auto max-w-sm w-full bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 rounded-xl shadow-2xl shadow-amber-900/20 px-5 py-4 flex items-start gap-3 transition-all duration-300 ${
          show
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8'
        }`}
      >
        <span className="text-2xl shrink-0 mt-0.5">☕</span>
        <p className="text-sm text-zinc-100 font-medium leading-relaxed flex-1">
          {message}
        </p>
        <button
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }}
          className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors mt-0.5"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
