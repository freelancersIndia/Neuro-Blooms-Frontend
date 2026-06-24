import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import FAQAccordion from './FAQAccordion';
import SupportCard from './SupportCard';

export const FAQSection = () => {
  return (
    <section id="faq" className="relative w-full bg-[#FFFFFF] overflow-hidden py-12 md:py-16 lg:py-6 xl:py-8 lg:h-screen lg:max-h-[920px] lg:min-h-[860px] flex flex-col justify-between select-none">
      
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

      {/* Top Left Orange Heart Outline */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[20%] left-[28%] w-8 h-8 opacity-45 text-[#F57C00] pointer-events-none hidden xl:block select-none"
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

      {/* Top Right Orange Paper Plane Trail */}
      <div className="absolute top-[20%] right-[22%] w-32 h-16 opacity-35 hidden xl:block select-none pointer-events-none z-0">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#F57C00" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(140, 45) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#F57C00" />
          </g>
        </svg>
      </div>

      {/* Mid Left Purple Star Outline */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[28%] left-[2.5%] w-6 h-6 opacity-35 text-[#AB47BC] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2.2" fill="none" />
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
          <HelpCircle className="h-4 w-4 text-[#3B8A4C]" />
          <span>FAQ</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-slate-800 font-display tracking-tight leading-none">
          Frequently Asked{' '}
          <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
            Questions
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-[700px] font-medium px-4">
          Find answers to common questions parents have about our services and approach.
        </p>
      </motion.div>

      {/* --- MAIN 2-COLUMN CONTENT --- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-6 lg:my-3 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* LEFT COLUMN: Organic Image + Support Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            
            {/* Therapist-Child Photo Frame */}
            <div className="relative w-full max-w-[420px] lg:max-w-none mx-auto">
              {/* Soft green organic dashed border frame */}
              <div className="absolute inset-0 border-2 border-dashed border-[#A5D6A7]/50 rounded-[40px_70px_35px_65px] transform rotate-3 scale-103 pointer-events-none z-0" />
              
              {/* Image Container */}
              <div className="w-[96%] aspect-[1.4/1] rounded-[35px_65px_40px_70px] overflow-hidden border-4 border-white shadow-md relative z-10 bg-emerald-50">
                <img
                  src="/images/faq/therapist_child_faq.png"
                  alt="Therapist working with child"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Sprouting leaf vector outline sticking out on bottom right */}
              <div className="absolute bottom-[-10px] right-[10px] z-20 text-[#3B8A4C]/60 w-10 h-10 pointer-events-none select-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M2 22C2 22 10 18 10 12C10 8 6 6 2 10C-2 6 -2 8 -2 12C-2 18 2 22 2 22Z" />
                  <path d="M2 10V22" />
                </svg>
              </div>
            </div>

            {/* Support/Contact Card */}
            <SupportCard />

          </div>

          {/* RIGHT COLUMN: Accordion Questions list */}
          <div className="lg:col-span-7 w-full flex items-center">
            <FAQAccordion />
          </div>

        </div>
      </div>

    </section>
  );
};

export default FAQSection;
