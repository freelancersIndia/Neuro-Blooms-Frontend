import { motion } from 'framer-motion';
import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import FooterPrograms from './FooterPrograms';
import FooterResources from './FooterResources';
import NewsletterCard from './NewsletterCard';
import FooterBottomWave from './FooterBottomWave';

export const Footer = () => {
  return (
    <footer className="relative w-full bg-[#F5FBFF] pt-12 md:pt-16 lg:pt-8 overflow-hidden select-none">
      
      {/* --- SECTION A: UPPER FLOATING WHITE CARD --- */}
      <div className="w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[40px] sm:rounded-[50px] shadow-[0_20px_60px_rgba(79,94,84,0.06)] border border-slate-100/60 p-6 sm:p-10 lg:p-12 w-full relative z-10 mb-[-140px]"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Brand Info & Socials (3/12) */}
            <div className="lg:col-span-3 w-full">
              <FooterBrand />
            </div>

            {/* Column 2: Quick Links Navigation (2/12) */}
            <div className="lg:col-span-2 w-full pl-0 md:pl-4 lg:pl-6">
              <FooterLinks />
            </div>

            {/* Column 3: Core Programs & Services (2/12) */}
            <div className="lg:col-span-2 w-full pl-0 md:pl-2 lg:pl-4">
              <FooterPrograms />
            </div>

            {/* Column 4: Resources Links (2/12) */}
            <div className="lg:col-span-2 w-full">
              <FooterResources />
            </div>

            {/* Column 5: Stay Connected Newsletter Card (3/12) - spans full width on Tablet */}
            <div className="md:col-span-2 lg:col-span-3 w-full">
              <NewsletterCard />
            </div>

          </div>

        </motion.div>
      </div>

      {/* --- SECTION B: BOTTOM CURVED DARK GREEN WAVE & COPYRIGHT BAR --- */}
      <FooterBottomWave />

    </footer>
  );
};

export default Footer;
