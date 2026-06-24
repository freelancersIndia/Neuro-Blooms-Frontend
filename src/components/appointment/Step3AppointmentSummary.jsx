import React from 'react';
import { 
  Calendar, 
  Clock, 
  UserRound, 
  Phone, 
  Mail, 
  FileText,
  UserCheck,
  ShieldAlert,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import AppointmentSummaryCard, { SummaryRow } from './AppointmentSummaryCard';

export const Step3AppointmentSummary = ({ selectedDate, selectedSlot, formValues, doctorName = "Dr. A. Jagadish" }) => {
  
  // Helpers to format date and get day name
  const formatDate = (dateObj) => {
    if (!dateObj) return '—';
    return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getDayName = (dateObj) => {
    if (!dateObj) return '—';
    return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatDateDob = (dobString) => {
    if (!dobString) return '—';
    try {
      const parts = dobString.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
      }
      return dobString;
    } catch {
      return dobString;
    }
  };

  return (
    <div className="space-y-6 w-full text-left">
      
      {/* 4 Cards Grid (2x2 on desktop, 1 column on mobile/tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Card 1: Appointment Details */}
        <AppointmentSummaryCard 
          title="Appointment Details"
          icon={<Calendar className="w-4.5 h-4.5" />}
        >
          <SummaryRow 
            label="Doctor"
            value={doctorName}
            icon={<UserRound className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Date"
            value={formatDate(selectedDate)}
            icon={<Calendar className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Time"
            value={selectedSlot}
            icon={<Clock className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Day"
            value={getDayName(selectedDate)}
            icon={<Calendar className="w-3.5 h-3.5" />}
          />
        </AppointmentSummaryCard>

        {/* Card 2: Parent Details */}
        <AppointmentSummaryCard 
          title="Parent Details"
          icon={<UserRound className="w-4.5 h-4.5" />}
        >
          <SummaryRow 
            label="Parent Name"
            value={formValues.parentName}
            icon={<UserRound className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Phone"
            value={formValues.phone}
            icon={<Phone className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Email"
            value={formValues.email}
            icon={<Mail className="w-3.5 h-3.5" />}
          />
        </AppointmentSummaryCard>

        {/* Card 3: Child Details */}
        <AppointmentSummaryCard 
          title="Child Details"
          icon={<UserCheck className="w-4.5 h-4.5" />}
        >
          <SummaryRow 
            label="Child Name"
            value={formValues.childName}
            icon={<UserRound className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Gender"
            value={formValues.childGender}
            icon={<UserCheck className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Age"
            value={formValues.childAge ? `${formValues.childAge} Years` : '—'}
            icon={<UserRound className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Date of Birth"
            value={formatDateDob(formValues.childDob)}
            icon={<Calendar className="w-3.5 h-3.5" />}
          />
        </AppointmentSummaryCard>

        {/* Card 4: Consultation Details */}
        <AppointmentSummaryCard 
          title="Consultation Details"
          icon={<ShieldAlert className="w-4.5 h-4.5" />}
        >
          <SummaryRow 
            label="Reason for Consultation"
            value={formValues.consultationReason}
            icon={<HelpCircle className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Development Concerns"
            value={formValues.concerns?.length > 0 ? formValues.concerns.join(', ') : 'None selected'}
            icon={<ShieldAlert className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Therapy Before"
            value={formValues.previousTherapy || '—'}
            icon={<FileText className="w-3.5 h-3.5" />}
          />
          <SummaryRow 
            label="Schooling Status"
            value={formValues.schoolingStatus}
            icon={<GraduationCap className="w-3.5 h-3.5" />}
          />
        </AppointmentSummaryCard>

      </div>

      {/* Additional Notes Card (Large display at bottom) */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_10px_30px_rgba(79,94,84,0.02)] flex flex-col space-y-2">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <FileText className="w-4.5 h-4.5 text-[#3B8A4C]" />
          <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm font-display tracking-tight uppercase">
            Additional Notes
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed py-1 font-normal min-h-[44px]">
          {formValues.notes || 'No additional notes entered.'}
        </p>
      </div>

    </div>
  );
};

export default Step3AppointmentSummary;
