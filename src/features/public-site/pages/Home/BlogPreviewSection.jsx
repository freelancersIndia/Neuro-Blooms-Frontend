import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Brain, Heart, Star } from 'lucide-react';
import BlogPreviewCard from './BlogPreviewCard';
import BlogResourceCTA from './BlogResourceCTA';

const FEATURED_BLOGS = [
  {
    id: 1,
    title: "5 Simple Activities to Boost Your Child's Communication Skills",
    excerpt: "Easy and fun activities you can do at home to encourage better communication every day.",
    date: "May 20, 2024",
    category: "Parenting Tips",
    imageUrl: "/images/faq/therapist_child_faq.png",
    icon: Users,
    themeColor: "green"
  },
  {
    id: 2,
    title: "Understanding Sensory Processing and How We Support It",
    excerpt: "Learn what sensory processing is and how the right support can make a big difference.",
    date: "May 15, 2024",
    category: "Child Development",
    imageUrl: "/images/blogs/child_learning.png",
    icon: Brain,
    themeColor: "orange"
  },
  {
    id: 3,
    title: "Building a Strong Parent-Child Bond Through Everyday Moments",
    excerpt: "Small moments, strong connections. Tips to build trust, love, and understanding with your child.",
    date: "May 10, 2024",
    category: "Family Wellbeing",
    imageUrl: "/images/blogs/parent_child_reading.png",
    icon: Heart,
    themeColor: "blue"
  }
];

export const BlogPreviewSection = () => {
  // Container stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="relative w-full bg-[#FFF8E8] overflow-hidden py-12 md:py-16 lg:py-6 xl:py-8 lg:h-screen lg:max-h-[920px] lg:min-h-[860px] flex flex-col justify-between select-none">
      
      {/* --- FLOATING DECORATIONS & LEAVES --- */}
      
      {/* Top Left Leaf Illustration */}
      <div className="absolute top-[8%] left-[2%] opacity-25 w-12 h-12 text-[#3B8A4C] pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Top Right Leaf Illustration */}
      <div className="absolute top-[8%] right-[2%] opacity-25 w-12 h-12 text-[#3B8A4C] pointer-events-none hidden lg:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Bottom Left Leaf Illustration */}
      <div className="absolute bottom-[2%] left-[1.5%] opacity-20 w-16 h-16 text-[#3B8A4C] pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Bottom Right Leaf Illustration */}
      <div className="absolute bottom-[2%] right-[1.5%] opacity-20 w-16 h-16 text-[#3B8A4C] pointer-events-none hidden lg:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Top Left Orange Paper Plane Trail */}
      <div className="absolute top-[20%] left-[22%] w-32 h-16 opacity-35 hidden xl:block select-none pointer-events-none z-0">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#F57C00" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(140, 45) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#F57C00" />
          </g>
        </svg>
      </div>

      {/* Top Right Orange Heart Outline */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[20%] right-[28%] w-8 h-8 opacity-45 text-[#F57C00] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, -5, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="5 3"
        />
      </motion.svg>

      {/* Mid Left Purple Star Outline */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[28%] left-[2.5%] w-6 h-6 opacity-35 text-[#AB47BC] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2.2" fill="none" />
      </motion.svg>

      {/* Mid Right Blue Heart Outline */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[32%] right-[2.5%] w-7 h-7 opacity-35 text-[#1E88E5] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, 4, 0], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* --- HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center space-y-3 lg:space-y-2.5 mt-2 lg:mt-0"
      >
        {/* Badge Rounded Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm backdrop-blur-sm">
          <BookOpen className="h-4 w-4 text-[#3B8A4C]" />
          <span>From Our Blog</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-slate-800 font-display tracking-tight leading-none">
          Helpful Insights{' '}
          <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
            for Parents
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-[700px] font-medium px-4">
          Expert tips, guidance, and resources to support your child's development journey.
        </p>
      </motion.div>

      {/* --- FEATURED BLOGS GRID --- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-6 lg:my-3">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURED_BLOGS.map((blog, idx) => {
            // Apply 2+1 layout centering on tablet (md viewport)
            const isThirdCard = idx === 2;
            return (
              <motion.div
                key={blog.id}
                variants={itemVariants}
                className={`w-full ${
                  isThirdCard 
                    ? 'col-span-1 md:col-span-2 md:w-1/2 md:mx-auto lg:col-span-1 lg:w-full lg:mx-0' 
                    : 'col-span-1'
                }`}
              >
                <BlogPreviewCard blog={blog} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* --- BOTTOM RESOURCE CTA --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-4 mt-2 lg:mt-0"
      >
        <BlogResourceCTA />
      </motion.div>

    </section>
  );
};

export default BlogPreviewSection;
