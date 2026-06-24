import React from 'react';
import { Award, Calendar, Clock } from 'lucide-react';

export const DoctorInfoCard = () => {
  const doctorPhoto = "/images/doctor/dr_a_jagadish.png";

  return (
    <div className="bg-[#FAF9F6] border border-slate-100/80 rounded-2xl p-4 flex items-center gap-4 w-full text-left shadow-sm">
      {/* Doctor Photo */}
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-slate-100">
        <img 
          src={doctorPhoto} 
          alt="Dr. A. Jagadish" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Info Details */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block leading-none">
          Your Appointment With
        </span>
        <h4 className="text-sm sm:text-base font-extrabold text-[#3B8A4C] font-display leading-tight">
          Dr. A. Jagadish
        </h4>
        <p className="text-[10px] sm:text-xs text-slate-500 font-semibold leading-tight">
          Pediatrician &amp; Child Development Specialist
        </p>

        {/* Small metadata list */}
        <div className="grid grid-cols-1 gap-1 pt-1.5 text-[9px] sm:text-[10px] text-slate-600 font-semibold">
          <div className="flex items-center gap-1.5">
            <Award className="h-3 w-3 text-[#3B8A4C]" />
            <span>23+ Years Experience</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 text-[#3B8A4C]" />
            <span>MON - SAT</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-[#3B8A4C]" />
            <span>09:00 AM - 06:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoCard;
