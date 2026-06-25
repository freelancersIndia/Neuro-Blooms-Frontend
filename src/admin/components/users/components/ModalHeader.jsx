import React from 'react';
import { User, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const ModalHeader = ({ onClose, mode = 'create' }) => {
  const isEdit = mode === 'edit';
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
      <div className="flex items-center gap-4 text-left">
        {/* Rounded Blue Icon Circle */}
        <div className="w-12 h-12 rounded-[16px] bg-admin-blue-50 border border-admin-blue-100 flex items-center justify-center text-admin-blue-600 shadow-sm flex-shrink-0">
          <User className="w-6 h-6" />
        </div>
        
        {/* Title & Description */}
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 font-display tracking-tight leading-none">
            {isEdit ? 'Edit User' : 'Create New User'}
          </h2>
          <p className="text-xs font-semibold text-slate-400 mt-1.5 leading-tight">
            {isEdit ? 'Modify user details and roles in the system.' : 'Create a new system user and assign one or more roles.'}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="p-2 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-400 hover:text-slate-600 transition-all cursor-pointer flex-shrink-0"
        aria-label="Close modal"
      >
        <X className="w-4.5 h-4.5" />
      </motion.button>
    </div>
  );
};

export default ModalHeader;
