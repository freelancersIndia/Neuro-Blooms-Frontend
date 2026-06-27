import React from 'react';
import { Building2 } from 'lucide-react';
import ComparisonRow from './ComparisonRow';

export const ComparisonTable = () => {
  // SVG Neuro Blooms Logo for header
  const neuroBloomsLogo = (
    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M48 78 C 48 62, 44 56, 42 46 C 46 49, 54 49, 58 46 C 56 56, 52 62, 52 78 Z" fill="#8D6E63" />
      <path d="M36 78 C 42 76, 58 76, 64 78 C 58 81, 42 81, 36 78 Z" fill="#70574E" />
      <circle cx="36" cy="42" r="15" fill="#3B8A4C" opacity="0.9" />
      <circle cx="64" cy="42" r="15" fill="#F57C00" opacity="0.9" />
      <circle cx="50" cy="30" r="17" fill="#1E88E5" opacity="0.9" />
    </svg>
  );

  const rowData = [
    {
      category: 'Approach',
      traditionalTitle: 'Generic Sessions',
      traditionalDesc: 'Same approach for every child.',
      traditionalIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      centerIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      neuroTitle: 'Personalized Plans',
      neuroDesc: "Individualized programs for your child's unique strengths and needs.",
      neuroIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="7" r="4" />
          <path d="M12 11v10M8 15h8" />
        </svg>
      )
    },
    {
      category: 'Focus',
      traditionalTitle: 'Child Only',
      traditionalDesc: 'Focus is only on the child.',
      traditionalIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21v-3.5a3.5 3.5 0 0 1 7 0V21" />
        </svg>
      ),
      centerIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      neuroTitle: 'Child + Parent',
      neuroDesc: "We empower parents as co-therapists in their child's journey.",
      neuroIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      category: 'Focus Area',
      traditionalTitle: 'Symptom Focus',
      traditionalDesc: 'Treating symptoms in isolation.',
      traditionalIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      centerIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      neuroTitle: 'Development Focus',
      neuroDesc: 'Holistic development across cognitive, emotional, social, & physical areas.',
      neuroIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    },
    {
      category: 'Dependency',
      traditionalTitle: 'Therapist Dependent',
      traditionalDesc: 'Progress depends only on therapist sessions.',
      traditionalIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="8" r="4" />
          <path d="M18 21a6 6 0 0 0-12 0" />
        </svg>
      ),
      centerIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="7" r="4" />
          <path d="M12 11v10" />
        </svg>
      ),
      neuroTitle: 'Family Empowered',
      neuroDesc: 'We build your confidence to support your child every day.',
      neuroIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      category: 'Care Model',
      traditionalTitle: 'Reactive Care',
      traditionalDesc: 'Help after challenges become serious.',
      traditionalIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M5 2h14v2H5V2zM5 22h14v-2H5v2zM19 4l-6 6v4l6 6H5l6-6v-4l-6-6h14z" />
        </svg>
      ),
      centerIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      neuroTitle: 'Goal-Based Growth',
      neuroDesc: 'Early intervention, structured goals, and continuous progress tracking.',
      neuroIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white rounded-[32px] p-6 lg:p-10 shadow-[0_15px_45px_rgba(79,94,84,0.06)] border border-slate-100/60 w-full relative z-10 space-y-4 lg:space-y-0">
      
      {/* --- DESKTOP TABLE HEADER ROW --- */}
      <div className="hidden lg:grid grid-cols-12 gap-6 items-center pb-6 border-b-2 border-slate-100 px-5">
        
        {/* Column 1 Header: Traditional Therapy */}
        <div className="col-span-5">
          <div className="flex items-center gap-2.5 bg-[#FDF2F2] rounded-2xl py-3 px-5 w-fit border border-red-100/30">
            <Building2 className="h-5 w-5 text-red-500" />
            <span className="font-bold font-display text-red-700 text-base">
              Traditional Therapy
            </span>
          </div>
        </div>

        {/* Column 2 Header: VS Badge */}
        <div className="col-span-2 flex justify-center">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FEF9E7] text-[#D4AF37] font-black text-sm shadow-sm border border-amber-100/55">
            VS
          </span>
        </div>

        {/* Column 3 Header: Neuro Blooms Approach */}
        <div className="col-span-5">
          <div className="flex items-center gap-2.5 bg-[#E8F5E9] rounded-2xl py-3 px-5 w-fit border border-[#A5D6A7]/35">
            {neuroBloomsLogo}
            <span className="font-bold font-display text-[#2E7D32] text-base">
              Neuro Blooms Approach
            </span>
          </div>
        </div>

      </div>

      {/* --- RENDER COMPARISON ROWS --- */}
      {rowData.map((row, idx) => (
        <ComparisonRow
          key={row.category}
          category={row.category}
          traditionalTitle={row.traditionalTitle}
          traditionalDesc={row.traditionalDesc}
          traditionalIcon={row.traditionalIcon}
          centerIcon={row.centerIcon}
          neuroTitle={row.neuroTitle}
          neuroDesc={row.neuroDesc}
          neuroIcon={row.neuroIcon}
          rowNumber={idx}
        />
      ))}

    </div>
  );
};

export default ComparisonTable;
