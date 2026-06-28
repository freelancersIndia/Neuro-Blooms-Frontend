import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export const DeleteHolidayDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false
}) => {
  // Escape key to close
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
    <div className="fixed inset-0 bg-[#0F172A]/55 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        className="w-full max-w-[440px] bg-white border border-[#E2E8F0] rounded-[24px] shadow-2xl overflow-hidden flex flex-col font-display animate-scale-in"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EEF2F7] flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5 text-[#DC2626]">
            <AlertTriangle size={18} />
            <h3 id="dialog-title" className="text-sm font-bold">
              Delete Clinic Holiday?
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="w-8 h-8 rounded-lg border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-left">
          <p id="dialog-desc" className="text-xs font-semibold text-[#64748B] leading-relaxed">
            This holiday will no longer block appointment slot generation. This action can be reverted by creating the holiday again.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8FAFC]/50 border-t border-[#EEF2F7] flex items-center justify-end gap-3 select-none">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="h-9 px-4 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B] bg-white hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="h-9 px-4 rounded-xl bg-[#DC2626] text-xs font-bold text-white hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHolidayDialog;
