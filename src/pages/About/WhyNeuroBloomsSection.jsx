import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Container from '../../components/common/Container';

export const WhyNeuroBloomsSection = () => {
  const cards = [
    {
      img: '/images/statistics/child_playing.png',
      title: 'Personalized Development Plans',
      desc: 'Every child receives a customized roadmap designed to meet their unique strengths and needs.',
      badgeColor: 'bg-emerald-50 border-emerald-100 text-emerald-700',
      accentBorder: 'border-t-4 border-t-emerald-500',
    },
    {
      img: '/images/statistics/parent_child_learning.png',
      title: 'Parent Coaching Programs',
      desc: "Empowering parents with practical strategies and guidance to support their child's progress.",
      badgeColor: 'bg-blue-50 border-blue-100 text-blue-700',
      accentBorder: 'border-t-4 border-t-blue-500',
    },
    {
      img: '/images/blogs/child_learning.png',
      title: 'Regular Progress Monitoring',
      desc: 'Continuous assessment, tracking and goal setting to ensure measurable and lasting progress.',
      badgeColor: 'bg-purple-50 border-purple-100 text-purple-700',
      accentBorder: 'border-t-4 border-t-purple-500',
    },
    {
      img: '/images/statistics/child_thumbs_up.png',
      title: 'Holistic Child Development',
      desc: 'Supporting social, emotional, cognitive and behavioral growth for overall well-being.',
      badgeColor: 'bg-orange-50 border-orange-100 text-orange-700',
      accentBorder: 'border-t-4 border-t-orange-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-20 bg-[#F5FBFF] overflow-hidden select-none">
      
      {/* Background doodles */}
      {/* Dotted path and Paper plane */}
      <div className="absolute top-[8%] right-[5%] w-36 h-20 opacity-30 hidden md:block select-none pointer-events-none z-0">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#F57C00" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(140, 45) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#F57C00" />
          </g>
        </svg>
      </div>

      <Container className="relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs font-bold tracking-wide shadow-sm">
            <Star className="h-4 w-4 fill-current text-amber-500 stroke-amber-500" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight font-display">
            Why Neuro Blooms?
          </h2>
          <div className="h-1 w-12 bg-accent mt-2" />
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.015)] border border-slate-100 hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col h-full text-left ${card.accentBorder} group`}
            >
              {/* Card Image */}
              <div className="h-44 w-full overflow-hidden bg-slate-50 relative shrink-0">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="space-y-3">
                  {/* Title */}
                  <h4 className="text-base sm:text-lg font-black text-slate-800 font-display leading-tight group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </h4>
                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </Container>
    </section>
  );
};

export default WhyNeuroBloomsSection;
