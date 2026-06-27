import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Check, Users, ClipboardList, GraduationCap, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppointmentModal } from '../../../../context/AppointmentModalContext';
import Container from '../../../../components/common/Container';

export const DoctorHighlightSection = () => {
  const { openModal } = useAppointmentModal();
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      value: '5000+',
      label: 'Children Supported',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: ClipboardList,
      value: '1000+',
      label: 'Early Intervention Cases',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: GraduationCap,
      value: '50+',
      label: 'Training Programs Conducted',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Parent Satisfaction',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <section className="relative py-20 bg-[#FFF8E8] overflow-hidden select-none">
      
      {/* Background soft glow blobs */}
      <div className="absolute top-[10%] left-0 w-[30%] h-[30%] bg-emerald-100/20 rounded-full filter blur-3xl pointer-events-none z-0" />
      
      <Container className="relative z-10">
        
        {/* Main Card */}
        <div className="bg-white rounded-[40px] shadow-[0_15px_50px_rgba(79,94,84,0.06)] border border-slate-100 p-6 sm:p-10 lg:p-12 w-full max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Doctor Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 relative flex justify-center"
            >
              {/* Decorative dashed outer boundary */}
              <div className="absolute inset-0 border-2 border-dashed border-[#A5D6A7]/45 rounded-3xl transform -rotate-3 scale-105 pointer-events-none z-0" />
              
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-lg z-10 bg-[#E8F5E9]/30">
                <img 
                  src="/images/doctor/dr_a_jagadish.png" 
                  alt="Dr. A. Jagadish" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Center/Right Columns: Bio Content & Stats */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
              
              {/* Bio Content (Spans 7 cols on md) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-7 space-y-6"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-50 border border-amber-200/50 text-[#D97706] rounded-full text-xs font-bold tracking-wide shadow-xs">
                  <span>MEET OUR SPECIALIST</span>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display">
                    Dr. A. Jagadish
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-slate-500 font-bold text-sm sm:text-base">
                      Child Development Specialist
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 text-[#2E7D32] text-[10px] sm:text-xs font-black rounded-md uppercase tracking-wider shrink-0">
                      23+ Years Experience
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  A nationally recognized specialist in Early Intervention and Neuro Developmental Disabilities, dedicated to helping children achieve their full developmental potential.
                </p>

                {/* Ticks List */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-semibold">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>National Faculty on Early Intervention for NDD</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-semibold">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Affiliated with Apollo Hospitals, Apollo Cradle & Apathya</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/doctor')}
                    className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 shadow-md transition-all duration-300 cursor-pointer text-sm"
                  >
                    <User className="h-4.5 w-4.5" />
                    <span>View Full Profile</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal()}
                    className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-emerald-500/20 hover:text-[#3B8A4C] font-bold px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-xs cursor-pointer text-sm"
                  >
                    <Calendar className="h-4.5 w-4.5 text-[#3B8A4C]" />
                    <span>Book Appointment</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Stats Stack (Spans 5 cols on md) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-5 flex flex-col gap-4 w-full"
              >
                {stats.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, x: 4 }}
                      className="flex items-center gap-4 p-4 bg-white border border-slate-100/80 rounded-2xl shadow-xs transition-all duration-300 w-full"
                    >
                      <div className={`p-3 rounded-2xl ${item.bgColor} ${item.color} shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <div className="text-lg sm:text-xl font-black text-slate-800 tracking-tight leading-none">
                          {item.value}
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-500 font-semibold leading-tight">
                          {item.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default DoctorHighlightSection;
