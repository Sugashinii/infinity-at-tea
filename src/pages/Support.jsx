import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does Infinity@Tea work?',
    answer:
      'Simply enter your business details — name, type, location, phone number, and a brief description — and our AI (powered by Google Gemini) will instantly generate a complete digital starter kit for you. This includes a catchy tagline, Instagram bio, WhatsApp status, brand color palette, QR code, and a mini landing page preview.',
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes! Infinity@Tea is completely free to use. You can generate as many kits as you like, download them as PDFs, and share them via unique links — all at no cost.',
  },
  {
    question: 'How do I delete my account?',
    answer:
      'To delete your account and all associated data, please send an email to support@infinity-at-tea.vercel.app with the subject line "Account Deletion Request" and include the email address you used to sign up. We will process your request within 48 hours.',
  },
  {
    question: 'What is Google Gemini AI?',
    answer:
      'Google Gemini is a powerful large language model (LLM) developed by Google. We use its API to generate creative and relevant content for your business — such as taglines, descriptions, bios, and color suggestions. Your data is only sent to the API during the generation process and is not stored by Google.',
  },
  {
    question: 'Can I edit my generated kit?',
    answer:
      'You can customize the brand colors using the color picker on the preview page. You can also regenerate individual kits to get fresh AI-generated content. Your kit history is saved so you can revisit previous versions.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Absolutely. We use Supabase for secure data storage with row-level security (RLS) and encrypted authentication. Your data is only accessible to you. Read our Privacy Policy for full details.',
  },
];

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors">
          {faq.question}
        </h3>
        <div className="text-zinc-400 shrink-0">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-zinc-300 leading-relaxed border-t border-white/10 pt-3">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function Support() {
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
              <HelpCircle size={28} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Support</h1>
              <p className="text-zinc-400 text-sm mt-1">We&apos;re here to help</p>
            </div>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            Have a question or need assistance? Check our FAQ below or reach out to us directly.
          </p>
        </div>

        {/* Contact Card */}
        <div className="card mb-8 border-amber-500/20">
          <div className="flex items-start gap-4">
            <div className="bg-amber-600/20 p-2.5 rounded-lg border border-amber-500/20 shrink-0">
              <Mail size={22} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Contact Us</h2>
              <p className="text-zinc-400 text-sm mb-3">
                For any questions, feedback, or account-related requests, email us at:
              </p>
              <a
                href="mailto:support@infinity-at-tea.vercel.app"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                ✉️ support@infinity-at-tea.vercel.app
              </a>
              <p className="text-zinc-500 text-sm mt-2">
                We typically respond within 24–48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-amber-400">?</span> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
