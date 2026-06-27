import React, { useState, useRef, useEffect } from 'react';
import { Eye, MoreVertical, Edit2, ShieldAlert, Trash2, CheckCircle2, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PatientActions = ({ patient, onView, onStatusChange, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const statuses = [
    { label: 'Under Treatment', icon: ShieldAlert, color: 'text-purple-600' },
    { label: 'Active', icon: UserCheck, color: 'text-emerald-600' },
    { label: 'Treatment Completed', icon: CheckCircle2, color: 'text-blue-600' },
    { label: 'Inactive', icon: Trash2, color: 'text-slate-400' }
  ];

  return (
    <div className="flex items-center gap-1.5 justify-end relative" ref={dropdownRef}>
      {/* Eye Button: View Profile */}
      <button
        type="button"
        onClick={() => onView(patient)}
        className="w-8 h-8 rounded-lg hover:bg-slate-50 border border-slate-100 hover:border-slate-200 flex items-center justify-center text-slate-450 hover:text-slate-700 transition-colors shadow-sm cursor-pointer"
        aria-label="View Patient Profile"
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Three-dot Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
          isOpen ? 'bg-slate-100 border border-slate-200 text-slate-700' : 'hover:bg-slate-50 border border-transparent text-slate-400 hover:text-slate-600'
        }`}
        aria-label="Patient Actions Menu"
        aria-expanded={isOpen}
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-9.5 z-40 w-52 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 text-left"
          >
            <div className="px-3.5 py-1.5 text-[9.5px] font-black text-slate-400 uppercase tracking-wider font-display">
              Change Status
            </div>

            {statuses.map((statusObj) => {
              const Icon = statusObj.icon;
              return (
                <button
                  key={statusObj.label}
                  type="button"
                  onClick={() => {
                    onStatusChange(patient.id, statusObj.label);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-xs font-bold hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer ${
                    patient.status === statusObj.label ? 'text-slate-800 bg-slate-50/50' : 'text-slate-650 hover:text-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${statusObj.color}`} />
                  <span>{statusObj.label}</span>
                </button>
              );
            })}

            <div className="border-t border-slate-50 my-1" />

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                toast.success('Patient record edit modal opened (Demo only)', {
                  style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '12px'
                  }
                });
              }}
              className="w-full px-4 py-2 text-xs font-bold text-slate-650 hover:text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Edit Details</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onDelete(patient.id);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50/50 flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Delete Patient</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientActions;
