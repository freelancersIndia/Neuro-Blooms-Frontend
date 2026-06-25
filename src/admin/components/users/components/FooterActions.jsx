import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

export const FooterActions = ({ onCancel, isSubmitting, mode = 'create' }) => {
  const isEdit = mode === 'edit';
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-5 mt-6 w-full">
      {/* Cancel Button (Left) */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          console.log('Cancel clicked');
          onCancel();
        }}
        className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-black text-slate-500 hover:text-slate-700 rounded-[14px] shadow-sm hover:shadow transition-all cursor-pointer text-center"
      >
        Cancel
      </motion.button>

      {/* Submit Button (Right) */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-admin-blue-600 hover:bg-admin-blue-700 text-xs font-black text-white rounded-[14px] shadow-md hover:shadow-lg shadow-admin-blue-600/10 hover:shadow-admin-blue-600/20 disabled:bg-admin-blue-400 transition-all cursor-pointer select-none text-center"
      >
        {!isEdit && <UserPlus className="w-4.5 h-4.5" />}
        <span>{isEdit ? 'Save Changes' : 'Create User'}</span>
      </motion.button>
    </div>
  );
};

export default FooterActions;
