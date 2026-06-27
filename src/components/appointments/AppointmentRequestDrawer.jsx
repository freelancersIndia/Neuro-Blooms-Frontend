import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Baby, CalendarDays, ExternalLink, ShieldCheck, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import { APPOINTMENT_TYPE_LABELS } from '../../constants/appointmentTypes';

export const AppointmentRequestDrawer = ({ isOpen, request, onClose, onApprove, onReject }) => {
  const navigate = useNavigate();
  if (!request) return null;

  const displayType = APPOINTMENT_TYPE_LABELS[request.appointmentType] || request.appointmentType;

  // Drawer animation config
  // On mobile: slides from bottom. On desktop: slides from right.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const drawerVariants = {
    hidden: isMobile ? { y: '100%' } : { x: '100%' },
    visible: isMobile ? { y: 0 } : { x: 0 },
    exit: isMobile ? { y: '100%' } : { x: '100%' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 z-50 backdrop-blur-xs cursor-pointer"
          />

          {/* Slide-over Drawer panel */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className={`fixed bg-white z-50 flex flex-col shadow-2xl border-slate-100 ${
              isMobile
                ? 'inset-x-0 bottom-0 top-12 rounded-t-[28px]'
                : 'right-0 top-0 bottom-0 w-[420px] rounded-l-[28px] border-l'
            }`}
          >
            {/* 1. HEADER (Fixed at top) */}
            <div className="p-5.5 border-b border-slate-100 flex items-center justify-between flex-shrink-0 select-none">
              <div className="flex flex-col text-left gap-1">
                <span className="text-sm font-black text-slate-800 font-display">
                  Request Details
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-display">
                    {request.requestNumber || request.id}
                  </span>
                  <AppointmentStatusBadge status={request.status} />
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close details panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. BODY CONTENT (Scrollable, Organised sections) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              {/* Section 1: Parent Information */}
              <div className="space-y-3.5">
                <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-display border-b border-slate-50 pb-2">
                  <User className="w-4 h-4 text-[#7C3AED]" />
                  <span>Parent Information</span>
                </h4>
                <div className="grid grid-cols-12 gap-3 text-xs leading-relaxed">
                  <div className="col-span-4 font-extrabold text-slate-400">Name</div>
                  <div className="col-span-8 font-black text-slate-800">{request.parentName}</div>
                  
                  <div className="col-span-4 font-extrabold text-slate-400">Relationship</div>
                  <div className="col-span-8 font-black text-slate-800">{request.relationship}</div>
                  
                  <div className="col-span-4 font-extrabold text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>Mobile</span>
                  </div>
                  <div className="col-span-8 font-black text-slate-700">{request.parentPhone}</div>
                  
                  <div className="col-span-4 font-extrabold text-slate-400 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>Email</span>
                  </div>
                  <div className="col-span-8 font-black text-slate-700 break-all">{request.parentEmail}</div>
                </div>
              </div>

              {/* Section 2: Child Information */}
              <div className="space-y-3.5">
                <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-display border-b border-slate-50 pb-2">
                  <Baby className="w-4 h-4 text-[#7C3AED]" />
                  <span>Child Information</span>
                </h4>
                <div className="grid grid-cols-12 gap-3 text-xs leading-relaxed">
                  <div className="col-span-4 font-extrabold text-slate-400">Name</div>
                  <div className="col-span-8 font-black text-slate-800">{request.childName}</div>
                  
                  <div className="col-span-4 font-extrabold text-slate-400">Age</div>
                  <div className="col-span-8 font-black text-slate-800">{request.childAge}</div>
                  
                  <div className="col-span-4 font-extrabold text-slate-400">Gender</div>
                  <div className="col-span-8 font-black text-slate-800">{request.childGender}</div>
                  
                  <div className="col-span-4 font-extrabold text-slate-400">Date of Birth</div>
                  <div className="col-span-8 font-black text-slate-800">{request.childDob}</div>
                </div>
              </div>

              {/* Section 3: Appointment Information */}
              <div className="space-y-3.5">
                <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest font-display border-b border-slate-50 pb-2">
                  <CalendarDays className="w-4 h-4 text-[#7C3AED]" />
                  <span>Appointment Information</span>
                </h4>
                <div className="grid grid-cols-12 gap-3.5 text-xs leading-relaxed">
                  <div className="col-span-4 font-extrabold text-slate-400">Type</div>
                  <div className="col-span-8 font-black text-slate-800">{displayType}</div>
                  
                  <div className="col-span-4 font-extrabold text-slate-400">Primary Concern</div>
                  <div className="col-span-8 font-black text-slate-800">{request.primaryConcern}</div>
                  
                  <div className="col-span-4 font-extrabold text-slate-400">Preferred Date</div>
                  <div className="col-span-8 font-black text-slate-800">{request.preferredDate}</div>
                  
                  <div className="col-span-4 font-extrabold text-slate-400">Preferred Time</div>
                  <div className="col-span-8 font-black text-slate-800">{request.preferredTime}</div>

                  <div className="col-span-4 font-extrabold text-slate-400">Referral Source</div>
                  <div className="col-span-8 font-black text-slate-800">{request.referralSource}</div>
                  
                  <div className="col-span-12 font-extrabold text-slate-400 pt-1.5 flex items-center gap-1 border-t border-slate-50">
                    <span>Additional Notes</span>
                  </div>
                  <div className="col-span-12 p-3 bg-slate-50 rounded-xl border border-slate-100/60 font-semibold text-slate-600 italic">
                    {request.additionalNotes || 'No notes provided.'}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. STICKY ACTIONS (Fixed at bottom) */}
            <div className="p-4.5 border-t border-slate-100 flex flex-col gap-2.5 bg-white flex-shrink-0 select-none">
              {request.status === 'PENDING' && (
                <div className="flex gap-3">
                  {/* Approve Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onApprove(request);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-colors font-display"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Approve Request</span>
                  </button>

                  {/* Reject Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onReject(request);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-colors font-display"
                  >
                    <X className="w-4 h-4 stroke-[2.5px]" />
                    <span>Reject Request</span>
                  </button>
                </div>
              )}

              {/* Patient Match Making Button (shows only when request is approved) */}
              {request.status === 'APPROVED' && (
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/admin/dashboard/patient-matching/${request.id}`);
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2.5 rounded-xl text-xs font-black shadow-[0_4px_12px_rgba(124,58,237,0.15)] hover:shadow-[0_6px_16px_rgba(124,58,237,0.25)] transition-all duration-200 cursor-pointer font-display"
                >
                  <span>Match Making</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppointmentRequestDrawer;
