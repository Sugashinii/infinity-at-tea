import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-600/20 p-3 rounded-xl border border-amber-500/20">
              <Shield size={28} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Privacy Policy</h1>
              <p className="text-zinc-400 text-sm mt-1">Last updated: April 2, 2026</p>
            </div>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            At <span className="text-amber-400 font-semibold">Infinity@Tea</span>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">

          {/* Data Collection */}
          <section className="card">
            <h2 className="text-lg font-semibold text-amber-400 mb-3">1. Data We Collect</h2>
            <p className="text-zinc-300 leading-relaxed mb-3">
              When you use Infinity@Tea, we may collect the following information:
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span><strong className="text-white">Email address</strong> — used for account creation, login, and communication.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span><strong className="text-white">Business information</strong> — business name, type, location, phone number, and other details you provide through the kit generator form.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span><strong className="text-white">Generated content</strong> — taglines, bios, descriptions, and color palettes created by the AI for your business.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span><strong className="text-white">Profile data</strong> — display name and avatar uploaded to your account.</span>
              </li>
            </ul>
          </section>

          {/* Data Storage */}
          <section className="card">
            <h2 className="text-lg font-semibold text-amber-400 mb-3">2. Data Storage</h2>
            <p className="text-zinc-300 leading-relaxed mb-3">
              Your data is securely stored using <strong className="text-white">Supabase</strong>, a trusted open-source backend platform. Supabase provides:
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Row-level security (RLS) to ensure only you can access your data.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Encrypted authentication and password hashing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Data hosted on secure cloud infrastructure.</span>
              </li>
            </ul>
          </section>

          {/* AI Processing */}
          <section className="card">
            <h2 className="text-lg font-semibold text-amber-400 mb-3">3. AI Processing</h2>
            <p className="text-zinc-300 leading-relaxed mb-3">
              We use the <strong className="text-white">Google Gemini API</strong> to generate digital kit content for your business. When you submit your business details:
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Your business information is sent to the Gemini API to generate taglines, bios, descriptions, and color suggestions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>We do not store your data on Google's servers beyond the duration of the API request.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>Google's API usage is subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300 transition-colors">Google's Privacy Policy</a>.</span>
              </li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="card">
            <h2 className="text-lg font-semibold text-amber-400 mb-3">4. Your Rights</h2>
            <p className="text-zinc-300 leading-relaxed mb-3">
              You have the following rights regarding your personal data:
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span><strong className="text-white">Access</strong> — You can view all your stored data through your profile page.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span><strong className="text-white">Correction</strong> — You can update your profile and business information at any time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span><strong className="text-white">Deletion</strong> — You can request complete deletion of your account and all associated data by contacting us.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span><strong className="text-white">Portability</strong> — You can download your generated kits as PDFs.</span>
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="card">
            <h2 className="text-lg font-semibold text-amber-400 mb-3">5. Cookies & Local Storage</h2>
            <p className="text-zinc-300 leading-relaxed">
              We use essential cookies and local storage for authentication sessions only. We do not use tracking cookies, analytics cookies, or any third-party advertising cookies.
            </p>
          </section>

          {/* Changes */}
          <section className="card">
            <h2 className="text-lg font-semibold text-amber-400 mb-3">6. Changes to This Policy</h2>
            <p className="text-zinc-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="card border-amber-500/20">
            <h2 className="text-lg font-semibold text-amber-400 mb-3">7. Contact Us</h2>
            <p className="text-zinc-300 leading-relaxed">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            </p>
            <a
              href="mailto:support@infinity-at-tea.vercel.app"
              className="inline-flex items-center gap-2 mt-3 text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              ✉️ support@infinity-at-tea.vercel.app
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}
