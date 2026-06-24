import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Container from '../../components/common/Container';

export const ProgramsSuccessStoriesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const stories = [
    {
      name: "Aaradhy's Mom",
      role: 'Mother of Aaradhy',
      avatar: '/images/testimonials/priya_sharma.png',
      fallbackAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
      quote: 'When my child turned two, we noticed a change after just six weeks. The dedicated sessions and regular home support made all the difference. My child now listens better and interacts with more confidence.',
      highlight: 'Improved communication and social interaction.',
      color: 'border-emerald-100 bg-emerald-50/20 text-[#3B8A4C]',
    },
    {
      name: "Soham's Dad",
      role: 'Father of Soham',
      avatar: '/images/testimonials/rahul_verma.png',
      fallbackAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      quote: 'Our little one, once slow to walk and interact, began taking steps and showing smiles within months. The structured program and constant support helped him reach milestones with confidence.',
      highlight: 'Achieved developmental milestones with confidence.',
      color: 'border-blue-100 bg-blue-50/20 text-blue-600',
    },
    {
      name: "Kaivalya's Mom",
      role: 'Mother of Kaivalya',
      avatar: '/images/testimonials/neha_kapoor.png',
      fallbackAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      quote: 'At 2 years and 3 months, my son only focused on objects and was hard to engage with. After enrolling in the program, his awareness and responsiveness improved steadily, making everyday interactions joyful.',
      highlight: 'Improved responsiveness and engagement.',
      color: 'border-purple-100 bg-purple-50/20 text-purple-600',
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden w-full">
      {/* Background Soft Blob */}
      <div className="absolute top-[20%] left-0 w-[30%] h-[30%] bg-purple-50/30 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-0 w-[30%] h-[30%] bg-emerald-50/20 rounded-full filter blur-3xl pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-[#3B8A4C] rounded-full text-xs font-bold uppercase tracking-wider">
            <Heart className="h-3.5 w-3.5 fill-current text-rose-500" />
            <span>Success Stories</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
            Success Stories From Our Families
          </h2>
          <div className="h-1 w-16 bg-amber-400 rounded-full mt-2" />
        </div>

        {/* Desktop View: Grid of all 3 Cards */}
        <div className="hidden lg:grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <Quote className="h-10 w-10 text-slate-200" />
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic">
                  "{story.quote}"
                </p>
                <div className={`p-3.5 rounded-2xl border text-xs font-bold ${story.color}`}>
                  {story.highlight}
                </div>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                  onError={(e) => {
                    e.target.src = story.fallbackAvatar;
                  }}
                />
                <div className="text-left">
                  <h4 className="text-sm font-extrabold text-slate-800 font-display">{story.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet View: Carousel */}
        <div className="lg:hidden max-w-lg mx-auto relative px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl flex flex-col justify-between min-h-[380px]"
            >
              <div className="space-y-6">
                <Quote className="h-8 w-8 text-slate-200" />
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  "{stories[activeIndex].quote}"
                </p>
                <div className={`p-3 rounded-xl border text-xs font-bold ${stories[activeIndex].color}`}>
                  {stories[activeIndex].highlight}
                </div>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                <img
                  src={stories[activeIndex].avatar}
                  alt={stories[activeIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                  onError={(e) => {
                    e.target.src = stories[activeIndex].fallbackAvatar;
                  }}
                />
                <div className="text-left">
                  <h4 className="text-sm font-extrabold text-slate-800 font-display">{stories[activeIndex].name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{stories[activeIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60 shadow-xs cursor-pointer transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                    idx === activeIndex ? 'bg-[#3B8A4C] w-6' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60 shadow-xs cursor-pointer transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel indicators for desktop */}
        <div className="hidden lg:flex justify-center gap-2 mt-8">
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                idx === activeIndex ? 'bg-[#3B8A4C] w-6' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProgramsSuccessStoriesSection;
