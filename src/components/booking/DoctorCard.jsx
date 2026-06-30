import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, AlertCircle } from 'lucide-react';

export const DoctorCard = ({ doctor }) => {
  if (!doctor) return null;

  const fallbackImage = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-panel rounded-[24px] overflow-hidden border border-white/50 shadow-lg shadow-slate-100/50 bg-white/70 p-6 flex flex-col items-center text-center space-y-4"
    >
      {/* Profile Image with Ring */}
      <div className="relative">
        <img
          src={doctor.profile_image || fallbackImage}
          alt={doctor.full_name}
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
        />
        {doctor.accepts_appointments ? (
          <span className="absolute bottom-1 right-1 bg-booking-success text-white p-1 rounded-full border-2 border-white shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
          </span>
        ) : (
          <span className="absolute bottom-1 right-1 bg-booking-error text-white p-1 rounded-full border-2 border-white shadow-sm">
            <AlertCircle className="w-4 h-4" />
          </span>
        )}
      </div>

      {/* Doctor Info */}
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-slate-800">{doctor.full_name}</h4>
        <p className="text-xs font-semibold text-booking-secondary">{doctor.qualification}</p>
        <p className="text-xs text-slate-500 max-w-[220px]">{doctor.specialization}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 justify-center pt-2">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-booking-primary bg-booking-primary-soft border border-booking-primary-soft px-3 py-1 rounded-full">
          <Award className="w-3 h-3" />
          {doctor.experience} Years Exp.
        </span>

        {doctor.accepts_appointments ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-booking-success bg-booking-success-soft border border-booking-success-soft px-3 py-1 rounded-full">
            Accepting Intake
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-booking-error bg-booking-error-soft border border-booking-error-soft px-3 py-1 rounded-full">
            No Intake Currently
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default DoctorCard;
