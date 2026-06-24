import React from 'react';
import * as Icons from 'lucide-react';

export const CategoryCard = ({ title, iconName, onClick }) => {
  // Grab the icon dynamically from Lucide
  const IconComponent = Icons[iconName] || Icons.BookOpen;

  return (
    <button
      onClick={onClick}
      className="bg-white border border-slate-100 hover:border-[#0E7A4B]/20 rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(79,94,84,0.02)] hover:shadow-[0_15px_40px_rgba(79,94,84,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4 group cursor-pointer w-full"
    >
      {/* Icon Circle Wrapper */}
      <div className="w-14 h-14 rounded-full bg-teal-50/60 border border-teal-100/50 flex items-center justify-center group-hover:bg-[#0E7A4B] group-hover:border-[#0E7A4B] transition-colors duration-300">
        <IconComponent className="w-6 h-6 text-[#0F766E] group-hover:text-white transition-colors duration-300 stroke-[2.2]" />
      </div>

      {/* Label */}
      <span className="font-extrabold text-slate-700 text-sm sm:text-base font-display tracking-tight leading-snug group-hover:text-[#0E7A4B] transition-colors duration-200">
        {title}
      </span>

    </button>
  );
};

export default CategoryCard;
