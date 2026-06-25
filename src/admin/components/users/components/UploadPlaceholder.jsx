import React from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export const UploadPlaceholder = ({ onUploadClick, hasError }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={onUploadClick}
      className={`flex-1 border-2 border-dashed rounded-[14px] p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors duration-200 select-none text-center ${
        hasError 
          ? 'border-red-300 hover:border-red-400 bg-red-50/10' 
          : 'border-slate-200 hover:border-admin-blue-400 bg-slate-50/50 hover:bg-slate-50'
      }`}
    >
      <Upload className={`w-5 h-5 ${hasError ? 'text-red-500' : 'text-admin-blue-500'}`} />
      <span className="text-xs font-black text-slate-700">Upload Photo</span>
      <span className="text-[10px] font-bold text-slate-400 leading-none">PNG, JPG</span>
      <span className="text-[9px] font-semibold text-slate-400 leading-none mt-0.5">Max 5MB</span>
    </motion.div>
  );
};

export default UploadPlaceholder;
