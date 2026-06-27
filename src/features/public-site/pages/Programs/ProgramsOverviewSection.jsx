import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Container from '../../../../components/common/Container';

export const ProgramsOverviewSection = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const programs = [
    {
      id: 'nbdp-section',
      title: 'Neuro Blooms Development Program',
      subtitle: 'Comprehensive Child Development Program',
      description: 'A structured, holistic program designed to address developmental delays, behavioral concerns, learning difficulties and overall child growth.',
      image: '/images/statistics/child_playing.png',
      fallbackImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400',
      color: 'emerald',
      bgClass: 'bg-emerald-50/30 border-emerald-100/50 hover:border-emerald-200',
      buttonBg: 'bg-[#3B8A4C] hover:bg-[#327540] text-white',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      checkColor: 'text-[#3B8A4C]',
      features: [
        'Development Assessment',
        'Therapy Support',
        'Intervention Planning',
        'Parent Guidance',
        'Monthly Monitoring',
        'Progress Reports',
      ],
    },
    {
      id: 'parent-coaching-section',
      title: 'Parent Coaching Program',
      subtitle: 'Online Parent Coaching & Home Guidance',
      description: 'Empowering parents with practical strategies and expert guidance to support their child\'s development at home.',
      image: '/images/blogs/parent_child_reading.png',
      fallbackImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400',
      color: 'purple',
      bgClass: 'bg-purple-50/30 border-purple-100/50 hover:border-purple-200',
      buttonBg: 'bg-[#7B1FA2] hover:bg-[#6A1B9A] text-white',
      badgeClass: 'bg-purple-100 text-purple-800',
      checkColor: 'text-purple-600',
      features: [
        'Online Sessions',
        'Progress Tracking',
        'Parent Training',
        'Remote Support',
        'Daily Routine Strategies',
        'Home-Based Intervention',
      ],
    },
  ];

  return (
    <section id="programs-overview" className="relative py-20 bg-white overflow-hidden w-full">
      {/* Background Soft Yellow Blur Blob */}
      <div className="absolute top-[10%] right-[10%] w-[35%] h-[35%] bg-amber-100/20 rounded-full filter blur-3xl pointer-events-none z-0" />
      {/* Background Soft Teal Blur Blob */}
      <div className="absolute bottom-[10%] left-[5%] w-[35%] h-[35%] bg-emerald-50/30 rounded-full filter blur-3xl pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
            Choose The Right Support <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-clip-text text-transparent">
              For Your Child
            </span>
          </h2>
          <div className="h-1 w-16 bg-amber-400 rounded-full mt-2" />
        </div>

        {/* Grid of Cards */}
        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
          {programs.map((prog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`flex flex-col lg:flex-row items-stretch rounded-3xl border ${prog.bgClass} shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white`}
            >
              {/* Card Image Area (Left) */}
              <div className="lg:w-2/5 min-h-[260px] lg:min-h-auto relative overflow-hidden bg-slate-50 shrink-0">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = prog.fallbackImage;
                  }}
                />
              </div>

              {/* Card Content Area (Right) */}
              <div className="lg:w-3/5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Subtitle Badge */}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${prog.badgeClass}`}>
                    {prog.subtitle}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {prog.description}
                  </p>

                  {/* Features Checkmark Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {prog.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div className={`p-0.5 rounded-full bg-slate-50 border border-slate-100 shrink-0 mt-0.5 ${prog.checkColor}`}>
                          <Check className="h-4 w-4 stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scroll Button */}
                <div className="pt-4 border-t border-slate-100 flex justify-start">
                  <motion.button
                    whileHover={{ scale: 1.04, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleScrollTo(prog.id)}
                    className={`px-6 py-3 rounded-full font-bold text-sm inline-flex items-center gap-2 cursor-pointer shadow-md transition-all duration-300 ${prog.buttonBg}`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProgramsOverviewSection;
