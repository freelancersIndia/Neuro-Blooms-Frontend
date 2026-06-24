import React from 'react';
import { Star } from 'lucide-react';

export const ParentInfo = ({ avatar, name, role, rating = 5 }) => {
  return (
    <div className="flex items-center justify-between w-full mt-3 pt-2.5 border-t border-slate-100/85">
      {/* Profile info */}
      <div className="flex items-center gap-2">
        <img 
          src={avatar} 
          alt={name} 
          className="w-7 h-7 rounded-full object-cover border border-slate-100"
          loading="lazy"
        />
        <div className="text-left">
          <h5 className="text-[11px] font-bold text-slate-800 leading-tight">
            {name}
          </h5>
          <p className="text-[9px] text-slate-400 font-bold leading-none mt-0.5">
            {role}
          </p>
        </div>
      </div>
      
      {/* Rating stars */}
      <div className="flex items-center gap-0.5">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
        ))}
      </div>
    </div>
  );
};

export default ParentInfo;
