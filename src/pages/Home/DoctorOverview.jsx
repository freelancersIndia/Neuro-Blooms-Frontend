import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Globe, Calendar, ArrowRight } from 'lucide-react';

export const DoctorOverview = () => {
  return (
    <div className="flex flex-col space-y-4 text-left h-full justify-between">
      {/* Location/Info Pills */}
      <div className="flex flex-wrap gap-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F6F4] border border-[#E2E8F0] rounded-full text-xs font-semibold text-slate-700 shadow-sm">
          <MapPin className="h-4 w-4 text-[#3B8A4C]" />
          <span className="leading-tight">Jubilee Hills,<br className="hidden sm:inline md:hidden" /> Hyderabad</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F6F4] border border-[#E2E8F0] rounded-full text-xs font-semibold text-slate-700 shadow-sm">
          <Globe className="h-4 w-4 text-[#3B8A4C]" />
          <span>English, Hindi,<br className="hidden sm:inline md:hidden" /> Telugu</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F6F4] border border-[#E2E8F0] rounded-full text-xs font-semibold text-slate-700 shadow-sm">
          <Calendar className="h-4 w-4 text-[#3B8A4C]" />
          <span>MON - SAT</span>
        </div>
      </div>

      {/* Biography/Overview Texts */}
      <div className="space-y-3 text-slate-600 text-xs sm:text-xs md:text-sm leading-relaxed font-normal">
        <p>
          Dr. A. Jagadish is a renowned Child Development Specialist with 23+ years of experience in Early Intervention and Neuro Developmental Disabilities. He specializes in Autism, ADHD, Learning Disabilities, Cerebral Palsy, Developmental Assessments, and High-Risk Newborn Follow-up. Through evidence-based care, personalized intervention plans, and strong parent collaboration, he helps children achieve their fullest developmental potential.
        </p>
      </div>

      {/* Primary CTA Button */}
      <div className="pt-2 w-full">
        <Link to="/doctor" className="inline-block w-full sm:w-auto">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto group cursor-pointer"
          >
            <span>Know More About Dr. Jagadish</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default DoctorOverview;
