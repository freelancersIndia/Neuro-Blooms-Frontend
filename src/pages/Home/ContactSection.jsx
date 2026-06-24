import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import ClinicInfoCard from './ClinicInfoCard';
import ContactDetails from './ContactDetails';
import LocationMap from './LocationMap';
import TrustSupportStrip from './TrustSupportStrip';

export const ContactSection = () => {
  return (
    <section className="relative w-full bg-[#F5FBFF] overflow-hidden py-12 md:py-16 lg:py-6 xl:py-8 lg:h-screen lg:max-h-[920px] lg:min-h-[860px] flex flex-col justify-between select-none">
      
      {/* Toast Notification Container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* --- BACKGROUND FLOATING DOODLES & DECORATIONS --- */}
      
      {/* Top Left Sprouting Leaf Vector */}
      <div className="absolute top-[8%] left-[2%] opacity-25 w-12 h-12 text-[#3B8A4C] pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Top Right Sprouting Leaf Vector */}
      <div className="absolute top-[8%] right-[2%] opacity-25 w-12 h-12 text-[#3B8A4C] pointer-events-none hidden lg:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Bottom Left Leaf Sprout */}
      <div className="absolute bottom-[12%] left-[1.5%] opacity-20 w-16 h-16 text-[#3B8A4C] pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Bottom Right Leaf Sprout */}
      <div className="absolute bottom-[12%] right-[1.5%] opacity-20 w-16 h-16 text-[#3B8A4C] pointer-events-none hidden lg:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Top Left Orange Heart Doodle */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[18%] left-[18%] w-8 h-8 opacity-45 text-[#F57C00] pointer-events-none hidden xl:block select-none"
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

      {/* Top Right Purple Paper Plane Doodle with Curved Dashed Path */}
      <div className="absolute top-[18%] right-[16%] w-32 h-16 opacity-35 hidden xl:block select-none pointer-events-none z-0">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#9C27B0" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(140, 45) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#9C27B0" />
          </g>
        </svg>
      </div>

      {/* Top Right Dotted Pattern Grids */}
      <div className="absolute top-[15%] right-[2%] opacity-15 hidden xl:block pointer-events-none select-none text-slate-400">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
          <circle cx="10" cy="10" r="2" /><circle cx="30" cy="10" r="2" /><circle cx="50" cy="10" r="2" />
          <circle cx="10" cy="30" r="2" /><circle cx="30" cy="30" r="2" /><circle cx="50" cy="30" r="2" />
          <circle cx="10" cy="50" r="2" /><circle cx="30" cy="50" r="2" /><circle cx="50" cy="50" r="2" />
        </svg>
      </div>

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
          <MapPin className="h-4 w-4 text-[#3B8A4C]" />
          <span>Get In Touch</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-slate-800 font-display tracking-tight leading-none">
          We're Here to{' '}
          <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
            Support You
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-[700px] font-medium px-4">
          Have questions or ready to start your journey? Our team is just a message away.
        </p>
      </motion.div>

      {/* --- MAIN 3-COLUMN CONTENT --- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-6 lg:my-3 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* Column 1: Organic Clinic Image & Overlapping Hours (4/12) */}
          <div className="lg:col-span-4 w-full">
            <ClinicInfoCard />
          </div>

          {/* Column 2: Detailed Info Sidebar (3/12) */}
          <div className="lg:col-span-3 w-full">
            <ContactDetails />
          </div>

          {/* Column 3: Map Location & Appointment CTA (5/12) */}
          <div className="lg:col-span-5 w-full">
            <LocationMap />
          </div>

        </div>
      </div>

      {/* --- BOTTOM FLOATING TRUST SUPPORT STRIP --- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-4 lg:mb-2">
        <TrustSupportStrip />
      </div>

    </section>
  );
};

export default ContactSection;
