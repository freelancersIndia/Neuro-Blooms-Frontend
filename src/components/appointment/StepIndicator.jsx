import React from 'react';
import { Check } from 'lucide-react';

export const StepIndicator = ({ currentStep }) => {
  const steps = [
    { label: 'Select Date & Time', stepNum: 1 },
    { label: 'Questionnaire', stepNum: 2 },
    { label: 'Summary', stepNum: 3 }
  ];

  return (
    <div className="flex items-center justify-center w-full max-w-xl mx-auto py-2">
      <div className="flex items-center w-full justify-between relative">
        
        {/* Connector Line 1-2 */}
        <div className="absolute left-[15%] right-[50%] top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-0">
          <div 
            className="h-full bg-[#3B8A4C] transition-all duration-500" 
            style={{ width: currentStep > 1 ? '100%' : '0%' }}
          />
        </div>

        {/* Connector Line 2-3 */}
        <div className="absolute left-[50%] right-[15%] top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-0">
          <div 
            className="h-full bg-[#3B8A4C] transition-all duration-500" 
            style={{ width: currentStep > 2 ? '100%' : '0%' }}
          />
        </div>

        {steps.map((s, idx) => {
          const isCompleted = currentStep > s.stepNum;
          const isActive = currentStep === s.stepNum;

          return (
            <div key={s.stepNum} className="flex items-center gap-2 z-10 bg-white px-3 relative">
              {/* Circle Icon */}
              {isCompleted ? (
                <div className="w-6.5 h-6.5 rounded-full bg-[#3B8A4C] text-white flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : (
                <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center font-bold font-display text-xs border shadow-sm transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#3B8A4C] border-[#3B8A4C] text-white' 
                    : 'bg-white border-slate-200 text-slate-400'
                }`}>
                  {s.stepNum}
                </div>
              )}
              
              {/* Step Label */}
              <span className={`text-[11px] sm:text-xs font-bold font-display transition-colors duration-300 ${
                isActive || isCompleted ? 'text-[#3B8A4C]' : 'text-slate-400'
              }`}>
                {s.label}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default StepIndicator;
