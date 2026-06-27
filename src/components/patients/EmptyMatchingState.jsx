import { UserPlus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmptyMatchingState = ({ onCreatePatient }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-slate-100 rounded-[20px] p-10 shadow-[0_8px_30px_rgba(79,94,84,0.015)] flex flex-col items-center justify-center text-center gap-5 select-none min-h-[300px]"
    >
      {/* Search illustration block */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
          <Search className="w-8 h-8 stroke-[1.5px]" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center border-2 border-white shadow-sm">
          <UserPlus className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 max-w-sm">
        <h3 className="text-sm font-extrabold text-slate-800 tracking-tight font-display">
          No suitable patient match found
        </h3>
        <p className="text-xs font-semibold text-slate-400 leading-relaxed">
          No existing patient appears to match this appointment request. You can create a new record.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCreatePatient}
        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-colors duration-150 font-display"
      >
        <UserPlus className="w-3.5 h-3.5 stroke-[2.5px]" />
        <span>Create New Patient</span>
      </motion.button>
    </motion.div>
  );
};

export default EmptyMatchingState;
