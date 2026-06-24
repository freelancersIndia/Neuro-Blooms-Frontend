import React from 'react';

export const Logo = ({ className = '', size = 'md', align = 'left', showText = true }) => {
  const dimensions = {
    sm: { width: 36, height: 36, textClass: 'text-lg', subClass: 'text-[9px]' },
    md: { width: 48, height: 48, textClass: 'text-xl', subClass: 'text-[10px]' },
    lg: { width: 64, height: 64, textClass: 'text-2xl', subClass: 'text-[11px]' }
  }[size] || { width: 48, height: 48, textClass: 'text-xl', subClass: 'text-[10px]' };

  const alignmentClass = {
    left: 'flex-row items-center gap-3',
    center: 'flex-col items-center text-center gap-2',
    right: 'flex-row-reverse items-center gap-3'
  }[align] || 'flex-row items-center gap-3';

  return (
    <div className={`flex ${alignmentClass} ${className}`}>
      {/* SVG Brain-Tree Logo */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        {/* Brain Canopy Left Hemisphere (Blue) */}
        <path
          d="M60 25 C45 25, 38 32, 38 42 C30 42, 26 48, 28 56 C22 58, 22 68, 28 72 C28 75, 32 80, 38 80 C40 80, 42 78, 44 76 C48 80, 56 80, 60 76"
          fill="#3B82F6"
          fillOpacity="0.15"
          stroke="#2563EB"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Brain Canopy Right Hemisphere (Blue) */}
        <path
          d="M60 25 C75 25, 82 32, 82 42 C90 42, 94 48, 92 56 C98 58, 98 68, 92 72 C92 75, 88 80, 82 80 C80 80, 78 78, 76 76 C72 80, 64 80, 60 76"
          fill="#3B82F6"
          fillOpacity="0.15"
          stroke="#2563EB"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner Brain Details (Hemispheres split & folds) */}
        <path
          d="M60 27 V73"
          stroke="#2563EB"
          strokeWidth="3"
          strokeDasharray="2 2"
          strokeLinecap="round"
        />
        <path
          d="M48 40 C44 42, 44 48, 48 50"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M72 40 C76 42, 76 48, 72 50"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Center Human Figure / Trunk (Blue) */}
        {/* Head */}
        <circle cx="60" cy="56" r="6" fill="#1E40AF" />
        {/* Body & Outstretched Arms */}
        <path
          d="M60 66 V92 M42 70 C48 72, 54 66, 60 66 C66 66, 72 72, 78 70"
          stroke="#1E40AF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Green Leaf Left (Green) */}
        <path
          d="M40 85 C30 85, 28 95, 42 98 C46 92, 44 86, 40 85 Z"
          fill="#10B981"
          fillOpacity="0.2"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Green Leaf Right (Green) */}
        <path
          d="M80 85 C90 85, 92 95, 78 98 C74 92, 76 86, 80 85 Z"
          fill="#10B981"
          fillOpacity="0.2"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showText && (
        <div className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-start'}`}>
          <div className="flex items-center font-display tracking-tight font-extrabold leading-none">
            <span className="text-admin-blue-800 text-slate-800">NEURO</span>
            <span className="text-admin-green-600 ml-1.5">BLOOMS</span>
          </div>
          <span className={`font-body font-bold uppercase tracking-widest text-slate-500 mt-1 ${dimensions.subClass}`}>
            Admin Console
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
