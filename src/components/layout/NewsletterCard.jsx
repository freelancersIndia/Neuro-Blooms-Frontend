import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export const NewsletterCard = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
    setLoading(false);
  };

  return (
    <div className="bg-[#F7F8F2] rounded-[32px] p-5 shadow-sm border border-[#E2E6D5]/50 flex flex-col justify-between h-full select-none text-left relative overflow-hidden">
      
      {/* Upper Content */}
      <div>
        {/* Icon Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center border border-[#A5D6A7]/20 shadow-sm flex-shrink-0">
            <Mail className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <h4 className="text-sm sm:text-base font-black text-slate-800 font-display">
            Stay Connected
          </h4>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-5">
          Subscribe to our newsletter for expert tips, resources, and updates.
        </p>
      </div>

      {/* Input Form & Buttons Container */}
      <div className="space-y-2.5 relative z-10">
        <form onSubmit={handleSubscribe} className="space-y-2.5">
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2E6D5] rounded-2xl text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B8A4C]/20 focus:border-[#3B8A4C]/60 transition-all duration-200"
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md shadow-emerald-950/5 hover:shadow-lg active:scale-[0.98] transition-all duration-300 w-full cursor-pointer text-xs disabled:opacity-75"
          >
            <span>Subscribe Now</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <Link to="/doctor" className="block w-full">
          <button
            type="button"
            className="w-full bg-[#FAF9F6] hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all duration-300 cursor-pointer text-xs"
          >
            <span>Know Our Doctor</span>
          </button>
        </Link>
      </div>

      {/* Custom SVG Envelope & Leaves Illustration */}
      <div className="w-full h-16 mt-3 relative z-0 flex items-end justify-center">
        <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[180px] pointer-events-none opacity-85 select-none">
          {/* Dotted curved path */}
          <path d="M 10 55 Q 80 15 145 60 Q 165 70 190 55" stroke="#3B8A4C" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 4" />
          
          {/* Sprouted leaf outlines on right */}
          <path d="M140 60 C140 60 148 45 155 42" stroke="#3B8A4C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <path d="M150 51 C150 51 160 48 163 41" stroke="#3B8A4C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />

          {/* Letter Envelope group */}
          <g transform="translate(65, 12)">
            {/* Letter page sticking out */}
            <rect x="18" y="22" width="28" height="18" rx="3" fill="#FFFFFF" stroke="#3B8A4C" strokeWidth="1.5" />
            {/* Writing lines on page */}
            <line x1="23" y1="28" x2="35" y2="28" stroke="#3B8A4C" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
            <line x1="23" y1="33" x2="41" y2="33" stroke="#3B8A4C" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
            
            {/* Small Orange Heart on letter */}
            <path
              d="M32 23 C32 23 29.5 20.5 29.5 19 C29.5 17.5 31 16.5 32 18 C33 16.5 34.5 17.5 34.5 19 C34.5 20.5 32 23 32 23 Z"
              fill="#F57C00"
            />

            {/* Envelope pocket body */}
            <path d="M10 32 L40 54 L70 32 L70 60 C70 62.2 68.2 64 66 64 L14 64 C11.8 64 10 62.2 10 60 Z" fill="#E8F5E9" stroke="#3B8A4C" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Envelope flap folds */}
            <path d="M 10 32 L 35 48 L 70 32" stroke="#3B8A4C" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </g>

          {/* Sprouted leaf outline on bottom left */}
          <path d="M 55 68 C 45 66 40 55 45 50" stroke="#3B8A4C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <path d="M 50 63 C 43 60 41 53 48 48" stroke="#3B8A4C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>

    </div>
  );
};

export default NewsletterCard;
