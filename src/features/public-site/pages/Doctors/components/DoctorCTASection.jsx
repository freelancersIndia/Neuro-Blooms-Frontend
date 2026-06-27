import { motion } from 'framer-motion';
import { Calendar, Phone, Check } from 'lucide-react';
import { useAppointmentModal } from '../../../../../context/AppointmentModalContext';
import { CLINIC_INFO } from '../../../../../utils/constants';
import Container from '../../../../../components/common/Container';

export const DoctorCTASection = () => {
  const { openModal } = useAppointmentModal();

  const trustFeatures = [
    'Personalized Care for Every Child',
    'Evidence-Based Intervention',
    'Family-Centered Approach',
  ];

  return (
    <section className="py-12 sm:py-16 bg-white w-full overflow-hidden select-none">
      <Container>
        {/* Main CTA Gradient Card */}
        <div className="relative bg-gradient-to-br from-[#0E7A4B] to-[#20A36B] rounded-[40px] shadow-[0_25px_60px_rgba(14,122,75,0.18)] overflow-hidden p-6 sm:p-10 lg:p-12 text-white">
          
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
            
            {/* Left Side Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left lg:pb-4">
              
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
                  Ready to Take the First Step Towards Your Child's Bright Future?
                </h2>
                <p className="text-sm sm:text-base text-teal-50/90 font-bold font-display mt-3">
                  Book an appointment with <span className="underline decoration-teal-200">Dr. A. Jagadish</span> | Child Development Specialist
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Book Appointment (Opens modal) */}
                <button
                  onClick={() => openModal()}
                  className="bg-white hover:bg-teal-50 text-[#0E7A4B] font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <Calendar className="h-4.5 w-4.5" />
                  <span>Book Appointment</span>
                </button>

                {/* Call Now */}
                <a
                  href={`tel:${CLINIC_INFO.PHONE}`}
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white/90 font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <Phone className="h-4.5 w-4.5" />
                  <span>Call Now</span>
                </a>
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

export default DoctorCTASection;
