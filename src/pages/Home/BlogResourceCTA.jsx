import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mail, ArrowRight, Check } from 'lucide-react';

export const BlogResourceCTA = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="w-full relative z-20">
      <div className="bg-white rounded-[40px] p-6 sm:p-8 lg:p-6 shadow-[0_12px_40px_rgba(79,94,84,0.06)] border border-slate-100/60 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          
          {/* LEFT COLUMN: BookOpen Icon & Headline */}
          <div className="lg:col-span-4 flex items-center gap-4">
            {/* Dashed outer border circle with inner green badge */}
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#A5D6A7]/50 flex items-center justify-center p-1 flex-shrink-0 select-none">
              <div className="w-full h-full rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
            
            <h3 className="text-base sm:text-lg font-black text-slate-800 font-display tracking-tight leading-snug">
              Want more tips &amp; resources <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent font-black">
                delivered to you?
              </span>
            </h3>
          </div>

          {/* CENTER COLUMN: Mail Icon & Text */}
          <div className="lg:col-span-4 flex items-center gap-3.5 px-1 sm:px-3">
            {/* Small Mail Icon Circle */}
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center flex-shrink-0 border border-[#A5D6A7]/20 shadow-sm">
              <Mail className="w-4.5 h-4.5 stroke-[2.2]" />
            </div>
            
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
              Subscribe to our newsletter and never miss an update.
            </p>
          </div>

          {/* RIGHT COLUMN: Primary & Secondary Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 items-center justify-start lg:justify-end w-full">
            
            {/* Primary: Subscribe Now */}
            <motion.button
              onClick={handleSubscribe}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-full py-2.5 px-5 text-xs sm:text-sm font-bold inline-flex items-center gap-2 justify-center shadow-md shadow-emerald-950/10 hover:shadow-lg transition-all duration-300 w-full sm:w-auto cursor-pointer ${
                subscribed 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#3B8A4C] hover:bg-[#327540] text-white'
              }`}
            >
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Check className="w-4.5 h-4.5 stroke-[3]" />
                    <span>Subscribed!</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="arrow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <span>Subscribe Now</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Secondary: View All Blogs */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/blogs"
                className="bg-white hover:bg-slate-50 text-[#3B8A4C] border-2 border-[#3B8A4C]/80 rounded-full py-2.5 px-5 text-xs sm:text-sm font-bold inline-flex items-center gap-2 justify-center transition-all duration-300 w-full sm:w-auto shadow-sm hover:shadow-md cursor-pointer"
              >
                <BookOpen className="w-4.5 h-4.5 stroke-[2.5]" />
                <span>View All Blogs</span>
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogResourceCTA;
