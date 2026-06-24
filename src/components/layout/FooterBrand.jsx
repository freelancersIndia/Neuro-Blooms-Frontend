import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Star } from 'lucide-react';
import { ROUTES } from '../../utils/routes';
import { CLINIC_INFO, SOCIAL_LINKS } from '../../utils/constants';

const TRUST_METRICS = [
  { icon: Heart, label: 'Child', label2: 'Focused', colorClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/20' },
  { icon: Shield, label: 'Safe &', label2: 'Trusted', colorClass: 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/20' },
  { icon: Users, label: 'Expert', label2: 'Care', colorClass: 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/20' },
  { icon: Star, label: 'Proven', label2: 'Results', colorClass: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/20' },
];

const SOCIALS = [
  {
    icon: () => (
      <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
      </svg>
    ),
    path: SOCIAL_LINKS.FACEBOOK,
    label: 'Facebook',
    hoverClass: 'hover:bg-blue-600 hover:text-white',
  },
  {
    icon: () => (
      <svg className="h-4.5 w-4.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    path: SOCIAL_LINKS.INSTAGRAM,
    label: 'Instagram',
    hoverClass: 'hover:bg-pink-600 hover:text-white',
  },
  {
    icon: () => (
      <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.04 0 12 0 12s0 3.96.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.96 24 12 24 12s0-3.96-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    path: SOCIAL_LINKS.YOUTUBE || '#',
    label: 'YouTube',
    hoverClass: 'hover:bg-red-600 hover:text-white',
  },
  {
    icon: () => (
      <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    path: SOCIAL_LINKS.LINKEDIN,
    label: 'LinkedIn',
    hoverClass: 'hover:bg-blue-700 hover:text-white',
  },
];

export const FooterBrand = () => {
  return (
    <div className="flex flex-col text-left select-none space-y-6 w-full max-w-[340px] lg:max-w-none mx-auto">
      
      {/* Brand Header */}
      <div>
        <Link to={ROUTES.HOME} className="flex items-center gap-3 mb-4 group">
          <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
              {/* Trunk */}
              <path d="M48 78 C 48 62, 44 56, 42 46 C 46 49, 54 49, 58 46 C 56 56, 52 62, 52 78 Z" fill="#8D6E63" />
              <path d="M36 78 C 42 76, 58 76, 64 78 C 58 81, 42 81, 36 78 Z" fill="#70574E" />
              {/* Foliage Circles */}
              <circle cx="36" cy="42" r="15" fill="#3B8A4C" opacity="0.9" />
              <circle cx="64" cy="42" r="15" fill="#F57C00" opacity="0.9" />
              <circle cx="50" cy="30" r="17" fill="#1E88E5" opacity="0.9" />
              {/* Soft colorful blooms */}
              <circle cx="34" cy="32" r="6" fill="#EC407A" opacity="0.95" />
              <circle cx="66" cy="32" r="6" fill="#FFCA28" opacity="0.95" />
              <circle cx="50" cy="50" r="8" fill="#AB47BC" opacity="0.9" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-bold tracking-tight text-slate-800 font-display leading-tight group-hover:text-[#3B8A4C] transition-colors duration-200">
              {CLINIC_INFO.NAME}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none mt-0.5">
              Child Development Center
            </span>
          </div>
        </Link>
        
        {/* Description */}
        <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed">
          Empowering children. Supporting families. <br />
          Building brighter futures through personalized care, expert guidance, and compassionate support every step of the way.
        </p>
      </div>

      {/* Trust Icons Row */}
      <div className="flex flex-row justify-between items-start gap-1.5 border-t border-slate-100 pt-5">
        {TRUST_METRICS.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="flex flex-col items-center text-center space-y-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-sm ${item.colorClass}`}>
                <IconComponent className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 font-black leading-tight">
                <div>{item.label}</div>
                <div>{item.label2}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Media Row */}
      <div className="border-t border-slate-100 pt-5">
        <h5 className="text-[11px] sm:text-xs font-black text-slate-800 font-display uppercase tracking-wider mb-3">
          Follow Us
        </h5>
        
        <div className="flex items-center gap-3">
          {SOCIALS.map((social, idx) => {
            const IconComponent = social.icon;
            return (
              <a
                key={idx}
                href={social.path}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`w-9 h-9 rounded-full bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 ${social.hoverClass}`}
              >
                <IconComponent className="w-4.5 h-4.5" />
              </a>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default FooterBrand;
