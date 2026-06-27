import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../../../../components/common/Container';

const TESTIMONIALS = [
  {
    id: 1,
    text: "Neuro Blooms has been a blessing for our family. The guidance and support we received helped our child make progress we once thought was impossible.",
    authorName: "Priya S.",
    authorRole: "Mother of Aarav",
    avatarUrl: "/images/testimonials/priya_sharma.png",
    themeColor: "green",
  },
  {
    id: 2,
    text: "The team is compassionate, patient and truly understands each child's unique needs. We are so grateful for the improvement we have seen in our daughter.",
    authorName: "Rahul & Meha",
    authorRole: "Parents of Ananya",
    avatarUrl: "/images/testimonials/rahul_verma.png",
    themeColor: "blue",
  },
  {
    id: 3,
    text: "Dr. Jagadish and his team provided us with the right support and strategies. Today our son is more confident and independent.",
    authorName: "Suresh K.",
    authorRole: "Father of Vihaan",
    avatarUrl: "/images/testimonials/father_child.png",
    themeColor: "purple",
  },
];

export const SuccessStoriesSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Helper for color styling
  const getColorClasses = (theme) => {
    switch (theme) {
      case 'green':
        return {
          bg: 'bg-emerald-50/70 border-emerald-100',
          text: 'text-emerald-700',
          quote: 'text-emerald-500/20',
          fill: 'fill-emerald-400 text-emerald-400',
        };
      case 'blue':
        return {
          bg: 'bg-blue-50/70 border-blue-100',
          text: 'text-blue-700',
          quote: 'text-blue-500/20',
          fill: 'fill-blue-400 text-blue-400',
        };
      case 'purple':
        default:
        return {
          bg: 'bg-purple-50/70 border-purple-100',
          text: 'text-purple-700',
          quote: 'text-purple-500/20',
          fill: 'fill-purple-400 text-purple-400',
        };
    }
  };

  return (
    <section className="relative py-20 bg-[#FFF8E8] overflow-hidden select-none w-full">
      {/* Background Doodles */}
      <div className="absolute top-[8%] left-[12%] w-20 h-10 opacity-20 hidden lg:block select-none pointer-events-none">
        <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" className="text-orange-400 w-full h-full">
          <path d="M10,30 Q50,10 90,30" />
        </svg>
      </div>

      <Container className="relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs font-bold tracking-wide shadow-sm">
            <Heart className="h-3.5 w-3.5 text-[#3B8A4C] fill-[#3B8A4C]/10" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight font-display">
            Parent Success Stories
          </h2>
          <div className="h-1 w-12 bg-accent mt-2" />
        </div>

        {/* Carousel Content */}
        <div className="w-full flex items-center justify-between gap-4 lg:gap-8 max-w-5xl">
          
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="hidden md:flex w-12 h-12 rounded-full bg-white border border-slate-100 shadow-sm items-center justify-center text-slate-600 hover:text-[#3B8A4C] hover:shadow-md transition-all duration-300 cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Track */}
          <div className="flex-grow overflow-hidden py-4 px-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {TESTIMONIALS.map((testimonial, idx) => {
                const isActive = activeIndex === idx;
                const colors = getColorClasses(testimonial.themeColor);
                
                return (
                  <motion.div
                    key={testimonial.id}
                    whileHover={{ y: -8 }}
                    // On mobile, show only active card. On tablet/desktop, show all cards.
                    className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col justify-between min-h-[260px] relative overflow-hidden group select-none ${
                      isActive ? 'ring-2 ring-emerald-500/20 shadow-md scale-[1.02]' : 'opacity-90 md:opacity-100'
                    } ${idx !== activeIndex ? 'hidden md:flex' : 'flex'}`}
                  >
                    
                    {/* Top rating and Quote styling */}
                    <div className="flex justify-between items-start">
                      <span className={`text-3xl font-serif leading-none ${colors.quote} select-none`}>“</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed my-5 font-normal flex-grow italic text-left">
                      "{testimonial.text}"
                    </p>

                    {/* Author Details */}
                    <div className="border-t border-slate-100 pt-4 flex items-center gap-3 mt-auto">
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                        <img 
                          src={testimonial.avatarUrl} 
                          alt={testimonial.authorName} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="text-left leading-tight">
                        <div className="text-sm font-black text-slate-800 font-display">{testimonial.authorName}</div>
                        <div className="text-xs text-slate-400 font-semibold">{testimonial.authorRole}</div>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="hidden md:flex w-12 h-12 rounded-full bg-white border border-slate-100 shadow-sm items-center justify-center text-slate-600 hover:text-[#3B8A4C] hover:shadow-md transition-all duration-300 cursor-pointer shrink-0"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

        {/* Mobile Carousel Navigation Controls */}
        <div className="flex md:hidden gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center text-slate-600 active:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'bg-[#3B8A4C] w-6' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center text-slate-600 active:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Pagination Indicators */}
        <div className="hidden md:flex items-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'bg-[#3B8A4C] w-6' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>

      </Container>
    </section>
  );
};

export default SuccessStoriesSection;
