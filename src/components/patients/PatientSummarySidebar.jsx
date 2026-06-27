import { User, Baby, CalendarDays, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export const PatientSummarySidebar = ({ request }) => {
  if (!request) return null;

  return (
    <div className="flex flex-col gap-5 w-full select-none text-left">
      {/* 1. Request Summary Card */}
      <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgba(79,94,84,0.015)] flex flex-col gap-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider font-display border-b border-slate-50 pb-3.5">
          Request Summary
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400">Request Number</span>
            <span className="text-xs font-extrabold text-slate-800 tracking-tight mt-0.5 font-display">
              {request.requestNumber || request.id}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 border border-orange-100/50 px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wide font-display">
            <CheckCircle2 className="w-3 h-3 text-orange-500 fill-orange-50 stroke-[2.5px]" />
            <span>Approved</span>
          </span>
        </div>
      </div>

      {/* 2. Parent Information Card */}
      <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgba(79,94,84,0.015)] flex flex-col gap-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider font-display border-b border-slate-50 pb-3.5 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#5C5C9E]" />
          <span>Parent Information</span>
        </h3>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Name</span>
            <span className="font-extrabold text-slate-800">{request.parentName}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Relationship</span>
            <span className="font-extrabold text-slate-800">{request.relationship}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Mobile Number</span>
            <span className="font-extrabold text-slate-800">{request.parentPhone}</span>
          </div>
          <div className="flex flex-col text-xs gap-1 border-t border-slate-50/50 pt-2.5">
            <span className="font-bold text-slate-400">Email</span>
            <span className="font-extrabold text-slate-800 text-left truncate">{request.parentEmail}</span>
          </div>
        </div>
      </div>

      {/* 3. Child Information Card */}
      <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgba(79,94,84,0.015)] flex flex-col gap-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider font-display border-b border-slate-50 pb-3.5 flex items-center gap-1.5">
          <Baby className="w-3.5 h-3.5 text-[#5C5C9E]" />
          <span>Child Information</span>
        </h3>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Name</span>
            <span className="font-extrabold text-slate-800">{request.childName}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Age</span>
            <span className="font-extrabold text-slate-800">{request.childAge}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Gender</span>
            <span className="font-extrabold text-slate-800">{request.childGender}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Date of Birth</span>
            <span className="font-extrabold text-slate-800">{request.childDob}</span>
          </div>
        </div>
      </div>

      {/* 4. Appointment Information Card */}
      <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgba(79,94,84,0.015)] flex flex-col gap-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider font-display border-b border-slate-50 pb-3.5 flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-[#5C5C9E]" />
          <span>Appointment Information</span>
        </h3>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Appointment Type</span>
            <span className="font-extrabold text-slate-800">{request.appointmentType}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Primary Concern</span>
            <span className="font-extrabold text-slate-800">{request.primaryConcern}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Preferred Date</span>
            <span className="font-extrabold text-slate-800">{request.preferredDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Preferred Time</span>
            <span className="font-extrabold text-slate-800">{request.preferredTime}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400">Referral Source</span>
            <span className="font-extrabold text-slate-800">{request.referralSource}</span>
          </div>
          
          <div className="flex flex-col text-xs gap-1 border-t border-slate-50/50 pt-3">
            <span className="font-bold text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-slate-300" />
              <span>Additional Notes</span>
            </span>
            <p className="text-[11px] font-semibold text-slate-600 bg-slate-50/70 border border-slate-100/50 p-3 rounded-xl mt-1.5 leading-relaxed">
              {request.additionalNotes || 'No additional notes provided.'}
            </p>
          </div>
        </div>
      </div>

      {/* 5. What happens next card */}
      <div className="bg-purple-50/40 border border-purple-100/40 rounded-[20px] p-5 flex flex-col gap-2.5">
        <h4 className="text-[11px] font-black text-purple-700 flex items-center gap-1.5 font-display">
          <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
          <span>What happens next?</span>
        </h4>
        <p className="text-[10px] font-semibold text-purple-600/90 leading-relaxed">
          Once you link an existing patient or create a new patient record, the system will continue to Appointment Confirmation where the receptionist assigns the doctor and appointment slot.
        </p>
      </div>
    </div>
  );
};

export default PatientSummarySidebar;
