import { motion } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';
import { useAppointmentModal } from '../../../../context/AppointmentModalContext';

export const ConditionsSection = () => {
  const { openModal } = useAppointmentModal();

  // Cards configuration
  const conditions = [
    {
      title: 'Autism Spectrum Disorder',
      description: 'Supporting communication, social interaction, and developmental growth.',
      color: '#3B8A4C', // green
      bgLight: '#E8F5E9',
      dotColor: '#3B8A4C',
      shadowColor: 'rgba(59, 138, 76, 0.15)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M11.75 3.5H8a2 2 0 0 0-2 2v3.75a1.5 1.5 0 0 1-1.5 1.5h-.75a1.5 1.5 0 0 0 0 3h.75a1.5 1.5 0 0 1 1.5 1.5V19a2 2 0 0 0 2 2h3.75a1.5 1.5 0 0 1 1.5 1.5v.75a1.5 1.5 0 0 0 3 0v-.75a1.5 1.5 0 0 1 1.5-1.5H19a2 2 0 0 0 2-2v-3.75a1.5 1.5 0 0 1 1.5-1.5h.75a1.5 1.5 0 0 0 0-3h-.75a1.5 1.5 0 0 1-1.5-1.5V5.5a2 2 0 0 0-2-2h-3.75a1.5 1.5 0 0 1-1.5-1.5v-.75a1.5 1.5 0 0 0-3 0v.75a1.5 1.5 0 0 1-1.5 1.5z" />
        </svg>
      )
    },
    {
      title: 'ADHD',
      description: 'Helping improve focus, behavior regulation, and executive functioning skills.',
      color: '#F57C00', // orange
      bgLight: '#FFF3E0',
      dotColor: '#F57C00',
      shadowColor: 'rgba(245, 124, 0, 0.15)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="15" cy="5" r="2" />
          <path d="M12 10l-2 3-3-1M18 10l-3-1-3 2v4M13 18l-3 4M15 15l2 4" />
        </svg>
      )
    },
    {
      title: 'Speech & Language Delay',
      description: 'Enhancing communication, expression, and language development.',
      color: '#1E88E5', // blue
      bgLight: '#E3F2FD',
      dotColor: '#1E88E5',
      shadowColor: 'rgba(30, 136, 229, 0.15)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      title: 'Developmental Delay',
      description: 'Supporting children in achieving important developmental milestones.',
      color: '#00897B', // green-teal
      bgLight: '#E0F2F1',
      dotColor: '#00897B',
      shadowColor: 'rgba(0, 137, 123, 0.15)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    },
    {
      title: 'Learning Difficulties',
      description: 'Improving academic readiness and learning confidence.',
      color: '#8E24AA', // purple
      bgLight: '#F3E5F5',
      dotColor: '#8E24AA',
      shadowColor: 'rgba(142, 36, 170, 0.15)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    },
    {
      title: 'Behavioral Challenges',
      description: 'Helping children develop positive emotional and behavioral responses.',
      color: '#E91E63', // rose-red
      bgLight: '#FCE4EC',
      dotColor: '#E91E63',
      shadowColor: 'rgba(233, 30, 99, 0.15)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )
    },
    {
      title: 'Down Syndrome',
      description: 'Supporting cognitive, social, and physical development.',
      color: '#D48C00', // gold-yellow
      bgLight: '#FFFDE7',
      dotColor: '#D48C00',
      shadowColor: 'rgba(212, 140, 0, 0.15)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: 'Cerebral Palsy',
      description: 'Improving mobility, coordination, and independence.',
      color: '#00ACC1', // blue-teal
      bgLight: '#E0F7FA',
      dotColor: '#00ACC1',
      shadowColor: 'rgba(0, 172, 193, 0.15)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="16" cy="4" r="1" />
          <path d="M12.3 11.5a3.5 3.5 0 0 0 5-5M19 9h-6l-2.24 4.48a3 3 0 0 0-.26 1.34V20" />
          <circle cx="10" cy="16" r="5" />
          <path d="M10 11a5 5 0 0 1 5 5" />
        </svg>
      )
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative py-20 md:py-24 bg-[#FFFDF7] overflow-hidden">
      
      {/* --- BACKGROUND GRAPHICS --- */}
      
      {/* Top Right soft brain network SVG */}
      <div className="absolute top-[4%] right-[-3%] w-[320px] h-[320px] opacity-60 pointer-events-none z-0 hidden lg:block select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Soft color blobs representing brain lobes */}
          <path d="M70,40 Q100,20 130,40 Q160,60 150,90 Q140,110 110,120 Q90,120 70,110 Q50,90 40,70 Q40,40 70,40 Z" fill="#E3F2FD" opacity="0.6" />
          <path d="M110,100 Q140,100 160,115 Q170,130 150,150 Q130,165 100,150 Q80,140 85,120 Q85,100 110,100 Z" fill="#FFF3E0" opacity="0.6" />
          <path d="M120,60 Q150,55 165,75 Q175,95 160,115 Q145,125 120,115 Q105,100 105,80 Q105,65 120,60 Z" fill="#FCE4EC" opacity="0.6" />
          <path d="M70,80 Q90,75 100,90 Q110,110 90,130 Q70,145 55,130 Q45,115 50,95 Q55,80 70,80 Z" fill="#F3E5F5" opacity="0.6" />
          {/* Network Lines */}
          <line x1="80" y1="50" x2="110" y2="70" stroke="#90CAF9" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="110" y1="70" x2="140" y2="65" stroke="#F48FB1" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="110" y1="70" x2="135" y2="105" stroke="#CE93D8" strokeWidth="2" />
          <line x1="135" y1="105" x2="115" y2="135" stroke="#FFE082" strokeWidth="2" />
          <line x1="115" y1="135" x2="80" y2="120" stroke="#A5D6A7" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="80" y1="120" x2="80" y2="85" stroke="#80DEEA" strokeWidth="2" />
          <line x1="80" y1="85" x2="110" y2="70" stroke="#B39DDB" strokeWidth="2" />
          <line x1="80" y1="85" x2="55" y2="65" stroke="#80CBC4" strokeWidth="2" strokeDasharray="4 2" />
          {/* Nodes */}
          <circle cx="80" cy="50" r="5" fill="#1E88E5" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="110" cy="70" r="6" fill="#42A5F5" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="140" cy="65" r="5" fill="#EC407A" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="135" cy="105" r="6" fill="#AB47BC" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="115" cy="135" r="5" fill="#FB8C00" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="80" cy="120" r="5" fill="#4CAF50" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="80" cy="85" r="6" fill="#26C6DA" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="55" cy="65" r="4" fill="#009688" stroke="#FFF" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Floating child-friendly background doodles */}
      {/* Top Left Star */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[8%] left-[8%] w-8 h-8 opacity-45 text-amber-400 fill-amber-200/20 pointer-events-none"
        animate={{ y: [0, -4, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </motion.svg>

      {/* Mid Left Sprout Leaf */}
      <motion.div
        className="absolute top-[40%] left-[3%] w-10 h-10 opacity-30 text-[#3B8A4C] pointer-events-none"
        animate={{ y: [0, 6, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </motion.div>

      {/* Bottom Left Wavy Plant Graphic */}
      <div className="absolute bottom-[8%] -left-4 w-24 h-48 opacity-30 text-[#3B8A4C] pointer-events-none hidden md:block">
        <svg viewBox="0 0 60 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-full h-full">
          <path d="M10 120 Q20 80 15 40 Q10 20 15 5" />
          <path d="M20 120 Q35 70 30 30 Q25 10 32 2" />
          {/* Leaves */}
          <path d="M14 85 C22 80 25 88 23 92 C15 95 14 88 14 85 Z" fill="currentColor" opacity="0.4" />
          <path d="M12 60 C4 55 2 63 6 67 C10 70 12 65 12 60 Z" fill="currentColor" opacity="0.4" />
          <path d="M16 30 C24 25 27 32 25 36 C18 39 16 34 16 30 Z" fill="currentColor" opacity="0.4" />
          <path d="M27 90 C19 85 17 93 21 97 C25 100 27 95 27 90 Z" fill="currentColor" opacity="0.4" />
          <path d="M29 60 C37 55 40 62 38 66 C32 69 29 64 29 60 Z" fill="currentColor" opacity="0.4" />
          <path d="M30 20 C22 15 20 23 24 27 C28 30 30 25 30 20 Z" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      {/* Top Center Pink Star */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[12%] left-[45%] w-6 h-6 opacity-35 text-[#E91E63] fill-rose-200/20 pointer-events-none"
        animate={{ y: [0, 4, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" />
      </motion.svg>

      {/* Top Right Butterfly SVG */}
      <motion.div
        className="absolute top-[10%] right-[32%] w-8 h-8 opacity-40 text-[#00ACC1] pointer-events-none"
        animate={{ 
          y: [0, -5, 0], 
          x: [0, 3, -3, 0],
          rotate: [0, 6, -6, 0] 
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M12 2v20M12 7c-2-2-5-3-7-1v6c2 1 4 1 7-1M12 7c2-2 5-3 7-1v6c-2 1-4 1-7-1M12 13c-2-2-5-2.5-7-.5v5c2 .8 4 .8 7-.5M12 13c2-2 5-2.5 7-.5v5c-2 .8-4 .8-7-.5" />
        </svg>
      </motion.div>

      {/* Bottom Right Heart Doodle */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute bottom-[20%] right-[8%] w-12 h-12 opacity-35 text-[#8E24AA] pointer-events-none"
        animate={{
          y: [0, -6, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
      </motion.svg>

      {/* --- CONTENT CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <Heart className="h-4 w-4 fill-current text-[#3B8A4C]" />
            <span>What We Support</span>
          </div>
          
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
            Every Child's Journey Is Unique
          </h2>
          
          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[700px] font-normal">
            We provide personalized support for a wide range of developmental, behavioral, communication, and learning challenges.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {conditions.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                boxShadow: `0 20px 40px ${item.shadowColor}`
              }}
              className="bg-white rounded-[28px] p-7 border border-slate-100/70 shadow-[0_10px_30px_rgba(79,94,84,0.04)] relative overflow-hidden transition-all duration-300 flex items-start gap-4 cursor-pointer group"
            >
              {/* Colored corner dot */}
              <div 
                className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: item.dotColor }}
              />

              {/* Left Column: Icon circle container */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{ 
                  backgroundColor: `${item.bgLight}`, 
                  color: item.color 
                }}
              >
                {item.icon}
              </div>

              {/* Right Column: Text content */}
              <div className="space-y-1.5 flex-grow pr-2">
                <h3 
                  className="text-base sm:text-lg font-bold font-display leading-tight"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <div className="flex flex-col items-center text-center mt-16 md:mt-20">
          <h4 className="text-slate-600 font-semibold text-lg sm:text-xl font-display mb-4">
            Not sure where to start?
          </h4>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold px-8 py-4 rounded-full inline-flex items-center gap-2.5 shadow-lg shadow-emerald-950/15 hover:shadow-xl hover:shadow-emerald-950/25 transition-all duration-300 cursor-pointer"
          >
            <Calendar className="h-5 w-5" />
            <span>Schedule an Assessment</span>
          </motion.button>
        </div>

      </div>

    </section>
  );
};

export default ConditionsSection;
