import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DoctorSelector = ({ doctors = [], selectedDoctor, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  if (!selectedDoctor) return null;

  const filteredDoctors = doctors.filter(doc => 
    doc.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative z-40" ref={dropdownRef}>
      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5 text-right select-none">
        Select Doctor
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-4 bg-white border border-[#E2E8F0] rounded-[16px] p-2.5 pl-3.5 pr-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer min-w-[240px] text-left outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
      >
        <div className="flex items-center gap-3">
          <img
            src={selectedDoctor.image}
            alt={selectedDoctor.name}
            className="w-9 h-9 rounded-xl object-cover border border-slate-100 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#0F172A] leading-tight">
              {selectedDoctor.name}
            </span>
            <span className="text-[10px] font-semibold text-[#64748B] mt-0.5">
              {selectedDoctor.specialty}
            </span>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-[#64748B] transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-1 w-[260px] bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-2 z-50 overflow-hidden flex flex-col gap-2"
          >
            {/* Search Input */}
            <div className="px-1" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Search doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-semibold text-[#0F172A] bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 placeholder-slate-400"
              />
            </div>

            {/* Doctors List */}
            <div className="max-h-[200px] overflow-y-auto space-y-0.5 pr-0.5">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc) => {
                  const isSelected = doc.id === selectedDoctor.id;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => {
                        onSelect(doc);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors text-left cursor-pointer outline-none ${
                        isSelected
                          ? 'bg-[#F3EEFF] text-[#7C3AED]'
                          : 'hover:bg-slate-50 text-[#334155]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-100"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold leading-tight">
                            {doc.name}
                          </span>
                          <span className="text-[9px] font-semibold text-[#64748B] mt-0.5">
                            {doc.specialty}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check size={14} className="text-[#7C3AED] mr-1.5" />}
                    </button>
                  );
                })
              ) : (
                <div className="py-6 px-3 text-center text-slate-400 text-xs font-semibold">
                  No doctors found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorSelector;
