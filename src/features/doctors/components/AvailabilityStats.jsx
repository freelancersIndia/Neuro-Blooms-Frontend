import React from 'react';
import { Clock, Users, CalendarCheck, Activity, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, title, value, subtitle, iconBg, iconColor, valueColor }) => {
  return (
    <div className="flex-1 min-w-0 h-[110px] bg-white border border-[#E2E8F0] rounded-[20px] shadow-sm p-4 flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className={`w-12 h-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0`}>
        <Icon size={22} />
      </div>
      <div className="flex flex-col text-left min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] select-none truncate">
          {title}
        </span>
        
        {/* Animated value change */}
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-lg md:text-xl font-extrabold tracking-tight mt-0.5 select-none truncate ${valueColor || 'text-[#0F172A]'}`}
        >
          {value}
        </motion.span>
        
        <span className="text-[10px] font-semibold text-[#94A3B8] select-none truncate mt-0.5">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export const AvailabilityStats = ({ duration, capacity, bookings = 6, accepting }) => {
  const remaining = accepting ? Math.max(0, capacity - bookings) : 0;

  return (
    <div className="w-full flex gap-4 select-none">
      <StatCard
        icon={Clock}
        title="Consultation Duration"
        value={`${duration} Minutes`}
        subtitle="Per Appointment"
        iconBg="bg-[#F3EEFF]"
        iconColor="text-[#7C3AED]"
      />

      <StatCard
        icon={Users}
        title="Daily Capacity"
        value={capacity}
        subtitle="Patients / Day"
        iconBg="bg-[#ECFDF5]"
        iconColor="text-[#10B981]"
      />

      <StatCard
        icon={CalendarCheck}
        title="Today's Bookings"
        value={bookings}
        subtitle="Booked"
        iconBg="bg-[#FFF7ED]"
        iconColor="text-[#F59E0B]"
      />

      <StatCard
        icon={Activity}
        title="Remaining Slots"
        value={remaining}
        subtitle="Available Today"
        iconBg="bg-[#EFF6FF]"
        iconColor="text-[#2563EB]"
      />

      <StatCard
        icon={accepting ? CheckCircle2 : XCircle}
        title="Availability"
        value={accepting ? "Accepting" : "Paused"}
        subtitle="Appointments Open"
        iconBg={accepting ? "bg-[#ECFDF5]" : "bg-[#FEF2F2]"}
        iconColor={accepting ? "text-[#10B981]" : "text-[#EF4444]"}
        valueColor={accepting ? "text-[#10B981]" : "text-[#EF4444]"}
      />
    </div>
  );
};

export default AvailabilityStats;
