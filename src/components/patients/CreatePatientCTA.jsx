import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export const CreatePatientCTA = ({ onCreatePatient }) => {
  return (
    <div className="bg-purple-50/20 border border-purple-100/40 rounded-[20px] p-5 flex flex-col sm:flex-row items-center justify-between gap-5 select-none text-left">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-11 h-11 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
          <UserPlus className="w-5.5 h-5.5" />
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className="text-xs font-black text-slate-800 tracking-tight font-display">
            No suitable match found?
          </h4>
          <p className="text-[10.5px] font-semibold text-slate-400 mt-0.5 leading-normal">
            Create a brand-new patient record from this appointment request.
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCreatePatient}
        className="w-full sm:w-auto border border-purple-200 hover:border-purple-300 bg-white text-purple-600 hover:bg-purple-50 px-5 py-2.5 rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer font-display flex items-center justify-center gap-1.5"
      >
        <UserPlus className="w-3.5 h-3.5 stroke-[2.5px]" />
        <span>Create New Patient</span>
      </motion.button>
    </div>
  );
};

export default CreatePatientCTA;
