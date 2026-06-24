import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import { CarouselArrowButton, CarouselIndicatorDots } from './CarouselControls';

const TESTIMONIALS = [
  {
    id: 1,
    text: "Neuro Blooms has been a blessing for our family. The team is compassionate, patient, and truly understands our child's needs. We've seen incredible progress in communication and confidence.",
    authorName: "Priya Sharma",
    authorRole: "Mother of Aarav",
    avatarUrl: "/images/testimonials/priya_sharma.png",
    themeColor: "green"
  },
  {
    id: 2,
    text: "The personalized approach and parent coaching have made a huge difference. Ishita is more independent, happy, and excited to learn every day. Thank you, Neuro Blooms!",
    authorName: "Rahul Verma",
    authorRole: "Father of Ishita",
    avatarUrl: "/images/testimonials/rahul_verma.png",
    themeColor: "blue"
  },
  {
    id: 3,
    text: "The therapists are amazing! Vihaan has improved so much in his focus and social skills. We feel supported in every step of our journey.",
    authorName: "Neha Kapoor",
    authorRole: "Mother of Vihaan",
    avatarUrl: "/images/testimonials/neha_kapoor.png",
    themeColor: "purple"
  }
];

export const TestimonialCarousel = () => {
  // Start with the middle card (index 1) active on load to match the design reference image
  const [activeIndex, setActiveIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isMobile = windowWidth < 768;

  // Determine max index for controls
  const getMaxIndex = () => {
    if (isDesktop) return 2; // All cards are visible, activeIndex highlights cards (0, 1, 2)
    if (isTablet) return 1;  // Slides 0 (cards 1,2) and 1 (cards 2,3)
    return 2;                // Slides 0, 1, 2
  };

  const handlePrev = () => {
    setActiveIndex((prev) => {
      const max = getMaxIndex();
      if (prev === 0) return max;
      return prev - 1;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const max = getMaxIndex();
      if (prev >= max) return 0;
      return prev + 1;
    });
  };

  const handleDotChange = (index) => {
    const max = getMaxIndex();
    if (index <= max) {
      setActiveIndex(index);
    } else {
      // If user clicked dot 2 on tablet, map it to index 1 (the maximum)
      setActiveIndex(max);
    }
  };

  // Get translation value for the slider track
  const getXTranslation = () => {
    if (isDesktop) return '0px';
    
    const gap = 24; // gap-6 is 24px
    if (isTablet) {
      const cappedIndex = Math.min(activeIndex, 1);
      return `calc(-${cappedIndex * 50}% - ${cappedIndex * (gap / 2)}px)`;
    }
    
    // Mobile
    return `calc(-${activeIndex * 100}% - ${activeIndex * gap}px)`;
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      
      {/* Carousel Wrapper containing Left Arrow, Slider Track, and Right Arrow */}
      <div className="w-full flex items-center justify-between gap-4 lg:gap-8 px-4 max-w-7xl">
        
        {/* Left Arrow Button */}
        <div className="z-20 hidden md:block">
          <CarouselArrowButton direction="left" onClick={handlePrev} />
        </div>

        {/* Carousel Window */}
        <div className="flex-grow overflow-hidden py-4 px-1">
          <motion.div
            drag={isDesktop ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            animate={{ x: getXTranslation() }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="flex gap-6 w-full cursor-grab active:cursor-grabbing lg:cursor-default"
          >
            {TESTIMONIALS.map((testimonial, idx) => {
              const isActive = activeIndex === idx;
              
              // On desktop, slightly scale and highlight the active (middle by default) card
              return (
                <div
                  key={testimonial.id}
                  className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 transition-transform duration-300 ${
                    isDesktop && isActive ? 'scale-[1.03] z-10' : isDesktop ? 'scale-[0.98] opacity-90' : ''
                  }`}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Arrow Button */}
        <div className="z-20 hidden md:block">
          <CarouselArrowButton direction="right" onClick={handleNext} />
        </div>

      </div>

      {/* Pagination Indicators Container */}
      <div className="mt-6">
        <CarouselIndicatorDots 
          total={3} 
          activeIndex={isTablet && activeIndex > 1 ? 1 : activeIndex} 
          onChange={handleDotChange} 
        />
      </div>

    </div>
  );
};

export default TestimonialCarousel;
