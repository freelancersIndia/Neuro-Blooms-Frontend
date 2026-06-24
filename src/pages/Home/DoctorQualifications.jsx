import React from 'react';

const RosetteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#3B8A4C] flex-shrink-0 mt-0.5">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DoctorQualifications = () => {
  return (
    <div className="flex flex-col text-left space-y-3.5">
      {/* Header Info */}
      <div className="space-y-1">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
          Dr. A. Jagadish
        </h3>
        <span className="text-base font-bold text-[#3B8A4C] block font-display leading-tight">
          Pediatrician
        </span>
        <div className="text-xs sm:text-sm text-slate-500 font-semibold leading-normal space-y-0.5">
          <p>Child Development Specialist</p>
          <p>Neonatal &amp; Paediatric Early Interventionist</p>
        </div>
      </div>

      {/* Qualifications list */}
      <ul className="text-[11px] sm:text-xs text-slate-600 block font-normal leading-relaxed text-left space-y-2 mt-2">
        <li className="flex items-start gap-2.5">
          <RosetteIcon />
          <span>
            <strong className="text-slate-700">MDS(E I)</strong> (Neonatal &amp; Paediatric Early Intervention - Disabilities)
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <RosetteIcon />
          <span>
            Certified Master Trainer in Autism Tools <br className="hidden sm:inline" />
            <span className="text-slate-500">(Pediatric Neurology, AIIMS - New Delhi)</span>
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <RosetteIcon />
          <span>
            Certified Master Trainer in Early Intervention <br className="hidden sm:inline" />
            <span className="text-slate-500">(Neuro Developmental Disabilities)</span>
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <RosetteIcon />
          <span>
            Certified Specialist in Developmentally Supportive Care in NICU
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <RosetteIcon />
          <span>
            National Faculty on Early Intervention for Neuro Developmental Disabilities
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DoctorQualifications;
