import React from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import DoctorInfoCard from './DoctorInfoCard';
import SlotSelector from './SlotSelector';

export const Step1SlotSelection = ({ selectedDate, onSelectDate, selectedSlot, onSelectSlot }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Left Column: Calendar & Doctor Card */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        <h4 className="text-left text-sm sm:text-base font-extrabold text-slate-800 font-display leading-tight">
          Select Date
        </h4>
        <AppointmentCalendar 
          selectedDate={selectedDate} 
          onSelectDate={onSelectDate} 
        />
        <DoctorInfoCard />
      </div>

      {/* Right Column: Time Slots */}
      <div className="lg:col-span-7 w-full">
        <SlotSelector 
          selectedSlot={selectedSlot} 
          onSelectSlot={onSelectSlot} 
        />
      </div>
    </div>
  );
};

export default Step1SlotSelection;
