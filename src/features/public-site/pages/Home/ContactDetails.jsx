import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const CONTACT_CHANNELS = [
  {
    icon: MapPin,
    title: 'Visit Our Center',
    content: (
      <span className="block whitespace-pre-line">
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
      <div className="flex flex-col">
        <a href="tel:+919876543210" className="hover:text-[#3B8A4C] transition-colors duration-200">
          +91 98765 43210
        </a>
        <a href="tel:+918765432109" className="hover:text-[#3B8A4C] transition-colors duration-200">
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
      <div className="flex flex-col">
        <a href="mailto:hello@neuroblooms.com" className="hover:text-[#3B8A4C] transition-colors duration-200">
          hello@neuroblooms.com
        </a>
        <a href="mailto:info@neuroblooms.com" className="hover:text-[#3B8A4C] transition-colors duration-200">
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
      <a href="https://www.neuroblooms.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3B8A4C] transition-colors duration-200">
        www.neuroblooms.com
      </a>
    ),
    colorClass: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/20',
  },
];

export const ContactDetails = () => {
  return (
    <div className="flex flex-col space-y-6 lg:space-y-5 xl:space-y-6 w-full max-w-[340px] lg:max-w-none mx-auto select-none">
      {CONTACT_CHANNELS.map((channel, idx) => {
        const IconComponent = channel.icon;
        return (
          <div key={idx} className="flex flex-col w-full">
            <div className="flex items-start gap-4">
              {/* Icon Container */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-sm flex-shrink-0 ${channel.colorClass}`}>
                <IconComponent className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-left leading-normal">
                <h4 className="text-xs sm:text-sm font-black text-slate-800 font-display uppercase tracking-wider">
                  {channel.title}
                </h4>
                <div className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed mt-0.5">
                  {channel.content}
                </div>
              </div>
            </div>

            {/* Divider (except last item) */}
            {idx !== CONTACT_CHANNELS.length - 1 && (
              <div className="border-t border-dashed border-slate-100 my-4 lg:my-3 xl:my-4" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
