import React from 'react';
import { motion } from 'framer-motion';
import { Headset, ChevronRight } from 'lucide-react';
import { CLINIC_INFO } from '../../../../utils/constants';

// Detailed SVG WhatsApp Icon
const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.734-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.366 9.864-9.736.002-2.599-1.01-5.048-2.846-6.886C16.4 2.146 13.96 1.15 11.4 1.15 5.962 1.15 1.54 5.518 1.537 10.887c-.001 1.502.404 2.97 1.17 4.259L1.69 20.613l5.577-1.459zm11.556-7.01c-.27-.135-1.602-.79-1.85-.882-.25-.092-.43-.137-.61.137-.18.27-.7.882-.857 1.06-.16.18-.32.2-.59.065-1.9-1.01-3.13-1.63-4.385-3.77-.33-.565.33-.525.943-1.745.105-.215.053-.405-.027-.54-.08-.135-.61-1.485-.837-2.025-.22-.53-.445-.46-.61-.468-.158-.008-.34-.01-.52-.01-.18 0-.475.067-.723.34-.248.272-.947.927-.947 2.262 0 1.335.972 2.625 1.107 2.805.135.18 1.913 2.92 4.633 4.095.647.28 1.153.447 1.546.572.65.207 1.243.178 1.71.108.52-.078 1.602-.655 1.83-1.285.226-.63.226-1.17.157-1.285-.068-.113-.248-.18-.518-.315z"/>
  </svg>
);

export const SupportCard = () => {
  return (
    <div className="bg-white rounded-[32px] p-6 shadow-[0_12px_40px_rgba(79,94,84,0.05)] border border-slate-100/60 w-full flex items-center gap-5 sm:gap-6">
      
      {/* Circle Icon Badge */}
      <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#A5D6A7]/20">
        <Headset className="w-6 h-6 stroke-[2.2]" />
      </div>

      {/* Main Text & WhatsApp CTA */}
      <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-tight font-display">
            Still have questions? <br className="hidden sm:inline md:hidden" />
            <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent font-black">
              We're here to help!
            </span>
          </h4>
          <p className="text-slate-500 text-xs font-normal">
            Our team is happy to guide you.
          </p>
        </div>

        <motion.a
          href={CLINIC_INFO.WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#3B8A4C] hover:bg-[#327540] text-white rounded-full py-2.5 px-5 text-xs sm:text-sm font-bold inline-flex items-center gap-2 justify-center shadow-md shadow-emerald-950/10 hover:shadow-lg transition-all duration-300 w-fit self-start md:self-auto cursor-pointer"
        >
          <WhatsAppIcon className="w-4.5 h-4.5 text-white" />
          <span>Chat with Us on WhatsApp</span>
          <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
        </motion.a>

      </div>

    </div>
  );
};

export default SupportCard;
