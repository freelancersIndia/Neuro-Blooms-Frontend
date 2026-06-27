import { motion } from 'framer-motion';
import { UserCheck, Users, Target, ShieldCheck } from 'lucide-react';

export const TrustBarSection = () => {
  return (
    <section className="relative py-12 bg-[#FFFFFF] overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(79,94,84,0.12)] border border-slate-100"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: Development Experts */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 items-start"
            >
              <div className="bg-[#E8F5E9] text-[#2E7D32] p-3 rounded-2xl flex-shrink-0 shadow-sm border border-[#A5D6A7]/20">
                <UserCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-base font-display">Development Experts</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Experienced professionals specialized in child development.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Parent-Centered Approach */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 items-start"
            >
              <div className="bg-[#E3F2FD] text-[#1565C0] p-3 rounded-2xl flex-shrink-0 shadow-sm border border-[#90CAF9]/20">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-base font-display">Parent-Centered</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  We work hand-in-hand with parents for lasting progress.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Personalized Care */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 items-start"
            >
              <div className="bg-[#FFF3E0] text-[#E65100] p-3 rounded-2xl flex-shrink-0 shadow-sm border border-[#FFE0B2]/20">
                <Target className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-base font-display">Personalized Care</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Individualized plans tailored to your child's unique needs.
                </p>
              </div>
            </motion.div>

            {/* Card 4: Evidence-Based */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 items-start"
            >
              <div className="bg-[#F3E5F5] text-[#6A1B9A] p-3 rounded-2xl flex-shrink-0 shadow-sm border border-[#E1BEE7]/20">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-base font-display">Evidence-Based</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Interventions backed by research and proven methods.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBarSection;
