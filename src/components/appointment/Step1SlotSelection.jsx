import React from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import DoctorInfoCard from './DoctorInfoCard';
import SlotSelector from './SlotSelector';
import LoadingSpinner from '../common/LoadingSpinner';

export const Step1SlotSelection = ({ 
  selectedDate, 
  onSelectDate, 
  selectedSlot, 
  onSelectSlot,
  doctors = [],
  selectedDoctorId,
  onSelectDoctor,
  availableSlots = [],
  loadingSlots,
  loadingDoctors,
  message
}) => {
  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Left Column: Doctor Selector, Calendar & Doctor Card */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        
        {/* Clinician Selector */}
        <div className="flex flex-col space-y-1.5 text-left">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-display">
            Select Clinician
          </label>
          {loadingDoctors ? (
            <div className="h-10 flex items-center justify-center border border-slate-100 rounded-2xl bg-slate-50/50">
              <LoadingSpinner size="sm" />
            </div>
          ) : (
            <select
              value={selectedDoctorId}
              onChange={(e) => onSelectDoctor(e.target.value)}
              className="px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-2xl bg-white w-full outline-none font-semibold cursor-pointer focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5"
            >
              <option value="" className="text-slate-400">Choose a clinician...</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.full_name} ({doc.specialization})
                </option>
              ))}
            </select>
          )}
        </div>

        <h4 className="text-left text-sm sm:text-base font-extrabold text-slate-800 font-display leading-tight">
          Select Date
        </h4>
        <AppointmentCalendar 
          selectedDate={selectedDate} 
          onSelectDate={onSelectDate} 
        />
        
        {selectedDoctor && (
          <DoctorInfoCard doctor={selectedDoctor} />
        )}
      </div>

      {/* Right Column: Time Slots */}
      <div className="lg:col-span-7 w-full">
        <SlotSelector 
          selectedSlot={selectedSlot} 
          onSelectSlot={onSelectSlot} 
          availableSlots={availableSlots}
          loadingSlots={loadingSlots}
          hasSelectedDoctorAndDate={!!selectedDoctorId && !!selectedDate}
          message={message}
        />
      </div>
    </div>
  );
};

export default Step1SlotSelection;
