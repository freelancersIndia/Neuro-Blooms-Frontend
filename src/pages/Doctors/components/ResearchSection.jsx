import { motion } from 'framer-motion';
import { GraduationCap, Mic, Users, Presentation, BookOpen, Calendar } from 'lucide-react';
import ResearchCard from './ResearchCard';
import Container from '../../../components/common/Container';

export const ResearchSection = () => {
  const contributions = [
    {
      icon: Mic,
      title: 'International Conferences',
      description: 'Presented research papers and clinical findings globally.',
      colorClasses: {
        text: 'text-[#6A1B9A]',
        bg: 'bg-[#F3E5F5]',
        border: 'border-[#E1BEE7]/20',
      },
    },
    {
      icon: Users,
      title: 'National Conferences',
      description: 'Speaker and panelist at leading national forums.',
      colorClasses: {
        text: 'text-[#1565C0]',
        bg: 'bg-[#E3F2FD]',
        border: 'border-[#90CAF9]/20',
      },
    },
    {
      icon: GraduationCap,
      title: 'Workshops on ASD, ADHD & SLD',
      description: 'Hands-on training for therapists, educators and parents.',
      colorClasses: {
        text: 'text-[#2E7D32]',
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#A5D6A7]/20',
      },
    },
    {
      icon: Presentation,
      title: 'Faculty Sessions',
      description: 'Invited faculty for academic and clinical training programs.',
      colorClasses: {
        text: 'text-[#E65100]',
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#FFE0B2]/20',
      },
    },
    {
      icon: BookOpen,
      title: 'Research Presentations',
      description: 'Contributing to evidence-based practices in child development.',
      colorClasses: {
        text: 'text-[#00796B]',
        bg: 'bg-[#E0F2F1]',
        border: 'border-[#B2DFDB]/20',
      },
    },
    {
      icon: Calendar,
      title: 'Conference Coordination',
      description: 'Moderated and coordinated national and international conferences.',
      colorClasses: {
        text: 'text-[#C2185B]',
        bg: 'bg-[#FCE4EC]',
        border: 'border-[#F8BBD0]/20',
      },
    },
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 bg-white w-full overflow-hidden select-none">
      <Container>
        {/* Rounded Light Lavender Tint Container */}
        <div className="relative bg-[#F8F6FA] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(30,41,59,0.03)] border border-slate-100/60 overflow-hidden">
          
          {/* --- DECORATIONS --- */}
          {/* Floating Gold Circle (Top Left) */}
          <div className="absolute top-[14%] left-[12%] w-4.5 h-4.5 rounded-full border-4 border-[#FFCA28]/20 pointer-events-none hidden sm:block z-0" />
          
          {/* Floating Light Blue Star/Symbol (Top Right) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[16%] right-[8%] opacity-[0.25] text-[#1E88E5] pointer-events-none hidden sm:block z-0 select-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
            </svg>
          </motion.div>

          {/* Column Layout */}
          <div className="space-y-8 sm:space-y-12 relative z-10 text-center flex flex-col items-center">
            
            {/* Header Area */}
            <div className="flex flex-col items-center space-y-4 max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F3E5F5] border border-[#E1BEE7]/30 text-[#6A1B9A] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm">
                <GraduationCap className="h-3.5 w-3.5 text-[#6A1B9A] fill-current" />
                <span>RESEARCH & ACADEMIC CONTRIBUTIONS</span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 font-display tracking-tight">
                  Sharing Knowledge. Advancing Care.
                </h2>
                <div className="w-14 h-1.5 bg-[#6A1B9A] rounded-full mx-auto" />
              </div>

              <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed">
                Active involvement in research, training and academic programs to shape the future of child development.
              </p>
            </div>

            {/* Grid of Contributions */}
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-6 w-full"
            >
              {contributions.map((contribution, index) => (
                <ResearchCard
                  key={index}
                  icon={contribution.icon}
                  title={contribution.title}
                  description={contribution.description}
                  colorClasses={contribution.colorClasses}
                />
              ))}
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default ResearchSection;
