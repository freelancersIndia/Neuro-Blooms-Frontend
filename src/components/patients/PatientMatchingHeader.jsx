import { Link } from 'react-router-dom';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const PatientMatchingHeader = ({ onRefresh, isRefreshing }) => {
  return (
    <div className="flex flex-col gap-4.5 md:flex-row md:items-center md:justify-between select-none">
      {/* Left side: Back link and Title */}
      <div className="flex flex-col">
        <Link
          to="/admin/appointments/requests"
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#5C5C9E] hover:text-[#4A4A80] transition-colors font-display mb-2 cursor-pointer w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Appointment Requests</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight font-display">
          Patient Matching
        </h1>
        <p className="text-xs font-medium text-slate-500 mt-1 max-w-xl leading-relaxed">
          Find and link an existing patient or create a new patient record.
        </p>
      </div>

      {/* Right side: Refresh Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRefresh}
        disabled={isRefreshing}
        className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 disabled:bg-slate-100 text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer disabled:cursor-not-allowed font-display w-full sm:w-auto self-start md:self-auto"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        <span>Refresh Search</span>
      </motion.button>
    </div>
  );
};

export default PatientMatchingHeader;
