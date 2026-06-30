import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, User, Mail, Phone, Info,
  ArrowLeft, Check, Edit2, ShieldCheck, Heart, FileText, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useBookingStore } from '../../store/bookingStore';
import { useAppointmentRequest } from '../../hooks/useAppointmentRequest';

export const AppointmentSummary = ({ onSubmissionSuccess }) => {
  const { doctor, date, slot, patientInfo, setStep } = useBookingStore();
  const { mutateAsync: submitRequest, isPending: isSubmitting } = useAppointmentRequest();
  
  const [agreed, setAgreed] = useState(false);

  // Constants mapping for readable labels
  const relationshipLabels = {
    MOTHER: 'Mother',
    FATHER: 'Father',
    GUARDIAN: 'Guardian',
    GRANDPARENT: 'Grandparent',
    OTHER: 'Other',
  };

  const genderLabels = {
    MALE: 'Male',
    FEMALE: 'Female',
    OTHER: 'Other',
    PREFER_NOT_TO_SAY: 'Prefer Not To Say',
  };

  const appointmentTypeLabels = {
    INITIAL_CONSULTATION: 'Initial Consultation',
    DEVELOPMENT_ASSESSMENT: 'Development Assessment',
    FOLLOW_UP: 'Follow Up',
    REVIEW: 'Review',
  };

  const handleEditSection = (stepNum) => {
    setStep(stepNum);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      toast.error('Please confirm that the information is correct.');
      return;
    }

    const payload = {
      doctor_id: doctor.id,
      parent_first_name: patientInfo.parent_first_name,
      parent_last_name: patientInfo.parent_last_name,
      relationship_to_child: patientInfo.relationship_to_child,
      mobile_number: patientInfo.mobile_number,
      alternate_mobile_number: patientInfo.alternate_mobile_number || null,
      email: patientInfo.email,
      child_first_name: patientInfo.child_first_name,
      child_last_name: patientInfo.child_last_name,
      date_of_birth: patientInfo.date_of_birth,
      gender: patientInfo.gender,
      appointment_type: patientInfo.appointment_type,
      primary_concern: patientInfo.primary_concern,
      preferred_date: date,
      preferred_time_slot: slot.start_time,
      additional_notes: patientInfo.additional_notes || null,
      referral_source: patientInfo.referral_source || null,
    };

    try {
      const response = await submitRequest(payload);
      if (response?.success) {
        toast.success('Appointment request submitted!');
        onSubmissionSuccess(response.data);
      } else {
        toast.error(response?.message || 'Failed to submit request.');
      }
    } catch (err) {
      // Extract field-level errors or show general error
      const errorData = err?.errors || err?.response?.data?.errors;
      if (errorData) {
        // Show detailed field errors in toast
        Object.keys(errorData).forEach((key) => {
          const fieldMsgs = errorData[key];
          const readableField = key.replace(/_/g, ' ');
          toast.error(`${readableField}: ${Array.isArray(fieldMsgs) ? fieldMsgs.join(', ') : fieldMsgs}`);
        });
      } else {
        toast.error(err.message || 'An error occurred during submission. Please try again.');
      }
    }
  };

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <div className="bg-white border border-slate-100 rounded-[24px] shadow-xl shadow-slate-100/30 p-6 sm:p-8 space-y-6">
        
        {/* Section 1: Doctor & Appointment Details */}
        <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/30 relative">
          <button
            type="button"
            onClick={() => handleEditSection(1)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-booking-primary transition-colors hover:bg-white rounded-lg border border-transparent hover:border-slate-100 shadow-sm cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          
          <h3 className="text-xs font-bold text-booking-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <ShieldCheck className="w-4.5 h-4.5" />
            Selected Clinician & Schedule
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <div className="flex items-center gap-3.5">
              <img
                src={doctor?.profile_image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100&h=100'}
                alt={doctor?.full_name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-800">{doctor?.full_name}</h4>
                <p className="text-xs text-slate-500 font-medium">{doctor?.specialization}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{doctor?.qualification}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-5 min-w-[220px]">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Calendar className="w-4 h-4 text-booking-secondary" />
                <span className="font-bold">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-booking-secondary" />
                <span className="font-bold">{slot?.display || slot?.start_time}</span>
              </div>
              <div className="text-[10px] font-bold text-booking-primary bg-booking-primary-soft border border-booking-primary-soft/50 px-2.5 py-0.5 rounded-md w-fit">
                {appointmentTypeLabels[patientInfo.appointment_type] || patientInfo.appointment_type}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Parent & Child Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Parent Summary Card */}
          <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/30 relative">
            <button
              type="button"
              onClick={() => handleEditSection(2)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-booking-primary transition-colors hover:bg-white rounded-lg border border-transparent hover:border-slate-100 shadow-sm cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>

            <h3 className="text-xs font-bold text-booking-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <User className="w-4.5 h-4.5" />
              Parent / Contact
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Full Name:</span>
                <span className="font-bold text-slate-700">
                  {patientInfo.parent_first_name} {patientInfo.parent_last_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Relationship:</span>
                <span className="font-bold text-slate-700">
                  {relationshipLabels[patientInfo.relationship_to_child] || patientInfo.relationship_to_child}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Email:</span>
                <span className="font-bold text-slate-700 break-all ml-4">
                  {patientInfo.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Phone:</span>
                <span className="font-bold text-slate-700">
                  {patientInfo.mobile_number}
                </span>
              </div>
              {patientInfo.alternate_mobile_number && (
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Alt Phone:</span>
                  <span className="font-bold text-slate-700">
                    {patientInfo.alternate_mobile_number}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Child Summary Card */}
          <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/30 relative">
            <button
              type="button"
              onClick={() => handleEditSection(2)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-booking-primary transition-colors hover:bg-white rounded-lg border border-transparent hover:border-slate-100 shadow-sm cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>

            <h3 className="text-xs font-bold text-booking-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Heart className="w-4.5 h-4.5" />
              Child Details
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Full Name:</span>
                <span className="font-bold text-slate-700">
                  {patientInfo.child_first_name} {patientInfo.child_last_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Date of Birth:</span>
                <span className="font-bold text-slate-700">
                  {patientInfo.date_of_birth}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Gender:</span>
                <span className="font-bold text-slate-700">
                  {genderLabels[patientInfo.gender] || patientInfo.gender}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Concerns and Notes */}
        <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/30 relative">
          <button
            type="button"
            onClick={() => handleEditSection(2)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-booking-primary transition-colors hover:bg-white rounded-lg border border-transparent hover:border-slate-100 shadow-sm cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <h3 className="text-xs font-bold text-booking-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <FileText className="w-4.5 h-4.5" />
            Clinical Concerns & Notes
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <span className="text-slate-400 font-bold uppercase text-[9px]">Primary Support Concerns</span>
              <p className="text-slate-700 font-medium leading-relaxed bg-white border border-slate-100 p-3 rounded-xl whitespace-pre-wrap">
                {patientInfo.primary_concern}
              </p>
            </div>
            
            {patientInfo.additional_notes && (
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-400 font-bold uppercase text-[9px]">Additional Notes</span>
                <p className="text-slate-700 font-medium leading-relaxed bg-white border border-slate-100 p-3 rounded-xl whitespace-pre-wrap">
                  {patientInfo.additional_notes}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center border-t border-slate-100 pt-3">
              <span className="text-slate-400 font-semibold">Referral Source:</span>
              <span className="font-bold text-slate-700">
                {patientInfo.referral_source || 'Not Specified'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Booking Source:</span>
              <span className="font-bold text-booking-primary bg-booking-primary-soft border border-booking-primary-soft px-2 py-0.5 rounded">
                Website
              </span>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 bg-slate-50/50 border border-slate-100 p-4 rounded-xl">
          <input
            type="checkbox"
            id="agreement"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 mt-0.5 accent-booking-primary rounded cursor-pointer"
          />
          <label htmlFor="agreement" className="text-xs font-semibold text-slate-600 cursor-pointer select-none leading-relaxed">
            I confirm all entered information is correct and I wish to submit this appointment intake request.
          </label>
        </div>

        {/* Submission Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => handleEditSection(2)}
            className="h-11 px-5 rounded-xl border-2 border-slate-100 text-xs font-bold text-slate-500 hover:bg-slate-50 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Details
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!agreed || isSubmitting}
            className="h-11 px-7 rounded-xl bg-booking-primary hover:bg-booking-primary-light text-white text-xs font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-booking-primary/15"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Request...
              </>
            ) : (
              <>
                <Check className="w-4.5 h-4.5 stroke-[3]" />
                Confirm & Submit Request
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AppointmentSummary;
