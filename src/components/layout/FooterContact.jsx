import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Visit Our Center',
    content: (
      <span className="block whitespace-pre-line text-slate-500 font-semibold leading-relaxed">
        123 Green Park Road,
        Anna Nagar, Chennai,
        Tamil Nadu 600040
      </span>
    ),
    colorClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/20',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: (
      <div className="flex flex-col text-slate-500 font-semibold leading-relaxed">
        <a href="tel:+919876543210" className="hover:text-[#3B8A4C] transition-colors">
          +91 98765 43210
        </a>
        <a href="tel:+918765432109" className="hover:text-[#3B8A4C] transition-colors">
          +91 87654 32109
        </a>
      </div>
    ),
    colorClass: 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/20',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: (
      <div className="flex flex-col text-slate-500 font-semibold leading-relaxed">
        <a href="mailto:hello@neuroblooms.com" className="hover:text-[#3B8A4C] transition-colors">
          hello@neuroblooms.com
        </a>
        <a href="mailto:info@neuroblooms.com" className="hover:text-[#3B8A4C] transition-colors">
          info@neuroblooms.com
        </a>
      </div>
    ),
    colorClass: 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/20',
  },
  {
    icon: Globe,
    title: 'Website',
    content: (
      <a href="https://www.neuroblooms.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3B8A4C] text-slate-500 font-semibold leading-relaxed transition-colors">
        www.neuroblooms.com
      </a>
    ),
    colorClass: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/20',
  },
];

export const FooterContact = () => {
  return (
    <div className="flex flex-col text-left select-none w-full max-w-[280px] lg:max-w-none mx-auto">
      <h4 className="text-sm font-black text-slate-800 font-display uppercase tracking-wider mb-5 pb-1 border-b-2 border-[#3B8A4C]/25 max-w-[130px]">
        Contact Information
      </h4>
      <div className="space-y-4">
        {CONTACT_INFO.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-[13px]">
              {/* Icon Circle */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-sm flex-shrink-0 ${item.colorClass}`}>
                <IconComponent className="w-4 h-4 stroke-[2.2]" />
              </div>
              
              {/* Text Info */}
              <div className="flex flex-col leading-normal pt-0.5">
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterContact;
