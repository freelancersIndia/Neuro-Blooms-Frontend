import React from 'react';
import { Info } from 'lucide-react';

export const InformationBanner = () => {
  return (
    <div className="flex gap-4 p-4 bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl items-start select-none">
      <div className="p-1 rounded-lg text-[#2563EB] flex-shrink-0 mt-0.5">
        <Info size={18} />
      </div>
      <p className="text-sm font-semibold text-[#1E40AF] leading-normal text-left">
        Changes made here define the clinic's default weekly operating schedule. Individual doctor schedules may override these settings.
      </p>
    </div>
  );
};

export default InformationBanner;
