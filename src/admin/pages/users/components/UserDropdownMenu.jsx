import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit3, ShieldAlert, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UserDropdownMenu = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (actionName) => {
    console.log(`${actionName} clicked for user: ${userName}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        aria-label="User actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-35 overflow-hidden"
          >
            <button
              onClick={() => handleAction('View')}
              className="w-full px-3.5 py-2 text-xs text-left font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer border-none bg-transparent"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>View</span>
            </button>
            <button
              onClick={() => handleAction('Edit')}
              className="w-full px-3.5 py-2 text-xs text-left font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer border-none bg-transparent"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-400" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleAction('Deactivate')}
              className="w-full px-3.5 py-2 text-xs text-left font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer border-none bg-transparent"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <span>Deactivate</span>
            </button>
            <div className="h-px bg-slate-100 w-full" />
            <button
              onClick={() => handleAction('Delete')}
              className="w-full px-3.5 py-2 text-xs text-left font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-none bg-transparent"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
              <span>Delete</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdownMenu;
