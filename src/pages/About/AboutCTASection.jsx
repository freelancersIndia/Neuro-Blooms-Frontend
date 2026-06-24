import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppointmentModal } from '../../context/AppointmentModalContext';
import Container from '../../components/common/Container';

export const AboutCTASection = () => {
  const { openModal } = useAppointmentModal();
  const navigate = useNavigate();

  const trustFeatures = [
    'Evidence-Based Care',
    'Parent Partnership',
    'Early Intervention Expertise',
  ];

  return (
    <section className="py-16 bg-white w-full overflow-hidden select-none">
      <Container>
        {/* Main CTA Gradient Card */}
        <div className="relative bg-gradient-to-br from-[#0E7A4B] to-[#20A36B] rounded-[40px] shadow-[0_25px_60px_rgba(14,122,75,0.18)] overflow-hidden p-6 sm:p-10 lg:p-12 text-white text-left">
          
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
            
            {/* Left Side Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 lg:pb-4">
              
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
                  Ready to Support Your Child's Development?
                </h2>
                <p className="text-sm sm:text-base text-teal-50/90 font-medium max-w-[600px] leading-relaxed">
                  Book a consultation with our team and take the first step toward a brighter future.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openModal()}
                  className="bg-white hover:bg-teal-50 text-[#0E7A4B] font-extrabold text-sm sm:text-base px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <Calendar className="w-5 h-5 stroke-[2.2]" />
                  <span>Book Appointment</span>
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-transparent hover:bg-white/10 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 border-2 border-white/50 hover:border-white transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 stroke-[2.2]" />
                  <span>Contact Us</span>
                </button>
              </div>

              {/* Divider line */}
              <div className="w-full h-[1px] bg-white/20" />

              {/* Trust Features Row */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-1">
                {trustFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-teal-50/90 font-bold">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Side Doctor Image (5 Cols) */}
            <div className="lg:col-span-5 h-[280px] sm:h-[320px] lg:h-[380px] relative flex items-end justify-center lg:justify-end">
              
              {/* Subtle Line Art Doodle Behind Doctor */}
              <div className="absolute inset-0 opacity-[0.06] text-white flex items-center justify-center pointer-events-none">
                <svg width="220" height="180" viewBox="0 0 240 200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="175" cy="65" r="18" />
                  <path d="M175 83 v45 m-20 40 20-40 20 40 m-40-25 20-15 18-10" />
                  <circle cx="75" cy="72" r="18" />
                  <path d="M75 90 v38 m-20 42 20-42 18 42 M55 108 l20-15 20 12" />
                  <path d="M95 105 Q115 115 135 98" />
                </svg>
              </div>

              {/* Doctor Image overlapping bottom of card */}
              <motion.img
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                src="/images/doctor/dr_a_jagadish.png"
                alt="Dr. A. Jagadish"
                className="max-h-[310px] sm:max-h-[350px] lg:max-h-[410px] w-auto object-contain z-10 origin-bottom select-none pointer-events-none filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
              />

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutCTASection;
