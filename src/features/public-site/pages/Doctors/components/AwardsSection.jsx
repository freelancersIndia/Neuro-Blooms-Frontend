import { motion } from 'framer-motion';
import { Trophy, Award, Star, Users } from 'lucide-react';
import AwardCard from './AwardCard';
import Container from '../../../../../components/common/Container';

export const AwardsSection = () => {
  const awards = [
    {
      icon: Trophy,
      title: 'Governor Appreciation Award',
      description: 'Received Certificate of Appreciation for Outstanding Service in Developmental Disabilities',
      presenter: 'His Excellency Governor Shri Jishnu Dev Varma',
      year: '2011',
    },
    {
      icon: Award,
      title: 'Double Gold Medalist',
      description: 'Outstanding Academic Performance (MDS - E I)',
      presenter: 'Osmania University',
      year: '2013',
    },
    {
      icon: Star,
      title: 'Best Service Provider Award',
      description: 'Medical & Health Department',
      presenter: 'Government of Telangana',
      year: '2016',
    },
    {
      icon: Award,
      title: 'Professional Excellence Award',
      description: 'Child Development & Early Intervention',
      presenter: 'Clinical Healthcare Forum',
      year: '2019',
    },
    {
      icon: Users,
      title: 'Outstanding Contribution to Child Health',
      description: 'Professional Recognition',
      presenter: 'National Child Health Association',
      year: '2022',
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
        {/* Warm Cream Rounded Container */}
        <div className="relative bg-[#FFF8E8] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(30,41,59,0.03)] border border-amber-100/60 overflow-hidden">
          
          {/* --- DECORATIONS --- */}
          {/* Floating Gold Circle (Top Left) */}
          <div className="absolute top-[14%] left-[6%] w-4.5 h-4.5 rounded-full border-4 border-[#FFCA28]/20 pointer-events-none hidden sm:block z-0" />
          
          {/* Floating Gold Ring (Mid Right) */}
          <div className="absolute top-[28%] right-[8%] w-6 h-6 rounded-full border-4 border-[#FFCA28]/20 pointer-events-none hidden sm:block z-0" />

          {/* Column Layout */}
          <div className="space-y-8 sm:space-y-12 relative z-10 text-center flex flex-col items-center">
            
            {/* Header Area */}
            <div className="flex flex-col items-center space-y-4 max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF3E0] border border-[#FFE0B2]/30 text-[#E65100] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm">
                <Trophy className="h-3.5 w-3.5 text-[#E65100] fill-current" />
                <span>AWARDS & RECOGNITION</span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 font-display tracking-tight">
                  Honored for Dedication & Excellence
                </h2>
                <div className="w-14 h-1.5 bg-[#E65100] rounded-full mx-auto" />
              </div>

              <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed">
                Recognitions that reflect my commitment to children and families.
              </p>
            </div>

            {/* Grid / Timeline Wrapper */}
            <div className="relative w-full">
              {/* Horizontal Timeline Axis Line (only visible on desktop) */}
              <div className="absolute left-[8%] right-[8%] bottom-[31px] h-0.5 bg-amber-200/50 pointer-events-none hidden lg:block" />

              <motion.div
                variants={gridVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-6 w-full relative z-10"
              >
                {awards.map((award, index) => (
                  <AwardCard
                    key={index}
                    icon={award.icon}
                    title={award.title}
                    description={award.description}
                    presenter={award.presenter}
                    year={award.year}
                  />
                ))}
              </motion.div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default AwardsSection;
