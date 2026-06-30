import React, { useEffect } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DeleteRoleDialog = ({
  isOpen,
  onClose,
  onConfirm,
  roleName = '',
  isDeleting = false,
}) => {
  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Dialog Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', duration: 0.3 }}
        className="w-full max-w-[440px] bg-white border border-slate-200 rounded-[24px] shadow-2xl overflow-hidden flex flex-col font-body"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
      >
        <div className="p-6 flex flex-col items-center text-center gap-4">
          {/* Warning Icon */}
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
            <AlertCircle className="w-6 h-6" />
          </div>

          {/* Title & Desc */}
          <div className="flex flex-col gap-1">
            <h3 id="dialog-title" className="text-base font-bold text-slate-950">
              Delete Role
            </h3>
            <p id="dialog-desc" className="text-xs font-semibold text-slate-500 leading-normal">
              Are you sure you want to delete the <span className="font-bold text-slate-900">{roleName}</span> role? This action cannot be undone. Users currently mapped to this role will lose their access permissions.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="h-10 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-10 px-5 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin" size={12} />
                Deleting...
              </>
            ) : (
              'Delete Role'
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteRoleDialog;
