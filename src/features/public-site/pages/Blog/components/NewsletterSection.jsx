import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldAlert, Check } from 'lucide-react';
import Container from '../../../../../components/common/Container';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-16 bg-white w-full overflow-hidden select-none">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#FAF8FF] to-[#F2EDFD] rounded-[40px] border border-purple-100/50 shadow-[0_15px_40px_rgba(123,97,255,0.04)] overflow-hidden p-8 sm:p-10 lg:p-12"
        >
          {/* Decorative shapes */}
          <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-purple-200/20 pointer-events-none" />
          <div className="absolute bottom-[-40px] left-[-10px] w-32 h-32 rounded-full bg-indigo-200/10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column - Mail Illustration */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-[220px] h-[180px] sm:w-[260px] sm:h-[200px]">
                {/* SVG Mailbox / Envelope Graphic */}
                <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
                  {/* Floating Paper Plane */}
                  <motion.g
                    animate={{ y: [0, -6, 0], x: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M210 20 L150 45 L175 60 L180 80 L195 65 L210 20 Z" fill="#9333EA" opacity="0.8" />
                    <path d="M150 45 L175 60 L210 20 Z" fill="#7E22CE" opacity="0.9" />
                  </motion.g>

                  {/* Mail Envelope Base */}
                  <path d="M20 70 L220 70 L220 160 C220 165 215 170 210 170 L30 170 C25 170 20 165 20 160 Z" fill="#FBBF24" />
                  {/* Mail Envelope Pocket */}
                  <path d="M20 170 L120 110 L220 170 Z" fill="#F59E0B" />
                  <path d="M20 70 L120 120 L220 70 Z" fill="#FCD34D" />

                  {/* Letter Sheet coming out */}
                  <motion.g
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <rect x="40" y="20" width="160" height="70" rx="8" fill="white" shadow="sm" />
                    <line x1="55" y1="35" x2="185" y2="35" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
                    <line x1="55" y1="50" x2="155" y2="50" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
                    <line x1="55" y1="65" x2="125" y2="65" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="175" cy="62" r="10" fill="#22C55E" opacity="0.2" />
                    <circle cx="175" cy="62" r="4" fill="#22C55E" />
                  </motion.g>
                </svg>
              </div>
            </div>

            {/* Right Column - Form Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display tracking-tight leading-none">
                  Stay Updated
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  Receive parenting tips, child development insights, and expert guidance directly in your inbox.
                </p>
              </div>

              {/* Form Input Group */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-full p-2 border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-purple-500/20 transition-all duration-300">
                  <div className="flex items-center flex-grow px-3 py-2 sm:py-0">
                    <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-transparent border-0 focus:outline-none pl-3 text-slate-800 placeholder-slate-400 text-sm"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl sm:rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              {/* Toast message */}
              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-emerald-600 font-bold"
                >
                  <Check className="w-4 h-4 shrink-0 stroke-[3]" />
                  <span>Success! You've been subscribed to our newsletter.</span>
                </motion.div>
              )}

              {/* Helper text */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-slate-400 stroke-[2.5]" />
                </div>
                <span>No spam. Unsubscribe anytime.</span>
              </div>

            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default NewsletterSection;
