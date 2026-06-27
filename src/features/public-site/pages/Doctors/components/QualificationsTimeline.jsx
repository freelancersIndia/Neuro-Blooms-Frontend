import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, Hospital, Medal } from 'lucide-react';
import TimelineItem from './TimelineItem';
import Container from '../../../../../components/common/Container';

export const QualificationsTimeline = () => {
  const milestones = [
    {
      icon: GraduationCap,
      title: 'MDS (E I)',
      description: 'MDS (E I) – Neonatal & Paediatric Early Intervention (Disabilities)',
      colorClasses: {
        text: 'text-[#2E7D32]',
        border: 'border-[#A5D6A7]/30 hover:border-[#2E7D32]/60',
      },
    },
    {
      icon: Award,
      title: 'Certified Master Trainer in Autism Tools',
      description: 'Pediatric Neurology, AIIMS – New Delhi',
      colorClasses: {
        text: 'text-[#1565C0]',
        border: 'border-[#90CAF9]/30 hover:border-[#1565C0]/60',
      },
    },
    {
      icon: Users,
      title: 'Certified Master Trainer in Early Intervention',
      description: 'Neuro Developmental Disabilities',
      colorClasses: {
        text: 'text-[#6A1B9A]',
        border: 'border-[#E1BEE7]/30 hover:border-[#6A1B9A]/60',
      },
    },
    {
      icon: Hospital,
      title: 'Certified Specialist',
      description: 'Developmentally Supportive Care in the NICU, Bayley-Pearson Academy – USA',
      colorClasses: {
        text: 'text-[#E65100]',
        border: 'border-[#FFE0B2]/30 hover:border-[#E65100]/60',
      },
    },
    {
      icon: Medal,
      title: 'National Faculty',
      description: 'Early Intervention for Neuro Developmental Disabilities',
      colorClasses: {
        text: 'text-[#2E7D32]',
        border: 'border-[#A5D6A7]/30 hover:border-[#2E7D32]/60',
      },
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

  return (
    <section className="py-12 sm:py-16 bg-white w-full overflow-hidden select-none">
      <Container>
        {/* Warm Cream Rounded Container */}
        <div className="relative bg-[#FFF8E8] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(30,41,59,0.04)] border border-amber-100/60">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (Timeline) */}
            <div className="lg:col-span-7 flex flex-col text-left space-y-6 sm:space-y-8">
              
              <div className="space-y-4">
                {/* Academic Excellence pill */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF3E0] border border-[#FFE0B2]/30 text-[#E65100] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm">
                  <GraduationCap className="h-3.5 w-3.5 text-[#E65100] fill-current" />
                  <span>ACADEMIC EXCELLENCE</span>
                </div>

                {/* Heading */}
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 font-display tracking-tight">
                    Qualifications & Certifications
                  </h2>
                  <div className="w-14 h-1.5 bg-[#E65100] rounded-full" />
                </div>

                <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed max-w-xl">
                  Strong academic foundation and advanced training in child development and early intervention.
                </p>
              </div>

              {/* Timeline Items wrapper */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-100px' }}
                className="relative pl-1 sm:pl-2 max-w-2xl"
              >
                {milestones.map((milestone, index) => (
                  <TimelineItem
                    key={index}
                    icon={milestone.icon}
                    title={milestone.title}
                    description={milestone.description}
                    colorClasses={milestone.colorClasses}
                    isLast={index === milestones.length - 1}
                  />
                ))}
              </motion.div>

            </div>

            {/* Right Column (Doctor & Clinic Images) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-center items-center h-full">
              {/* Doctor Main Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative bg-white p-3 rounded-[32px] shadow-[0_20px_50px_rgba(180,160,120,0.15)] border border-amber-100/50 w-full"
              >
                <div className="rounded-[24px] overflow-hidden aspect-[4/3] relative bg-slate-100">
                  <img
                    src="/images/doctor/dr_a_jagadish.png"
                    alt="Dr. A. Jagadish at office desk"
                    className="w-full h-full object-cover object-[60%_center] select-none pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* Grid of 2 Clinic Images */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white p-2 rounded-[24px] shadow-[0_15px_35px_rgba(180,160,120,0.12)] border border-amber-100/40"
                >
                  <div className="rounded-[18px] overflow-hidden aspect-square relative bg-slate-100">
                    <img
                      src="/images/doctor/doctor_office_playroom.png"
                      alt="Sensory playroom"
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white p-2 rounded-[24px] shadow-[0_15px_35px_rgba(180,160,120,0.12)] border border-amber-100/40"
                >
                  <div className="rounded-[18px] overflow-hidden aspect-square relative bg-slate-100">
                    <img
                      src="/images/doctor/early_intervention_toys.png"
                      alt="Developmental learning tools"
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default QualificationsTimeline;
