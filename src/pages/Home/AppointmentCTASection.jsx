import AppointmentHeroContent from './AppointmentHeroContent';
import TrustFeatures from './TrustFeatures';
import CTAButtons from './CTAButtons';
import JourneyCard from './JourneyCard';

export const AppointmentCTASection = () => {
  return (
    <section className="relative w-full bg-[#FFFFFF] overflow-hidden py-12 md:py-16 lg:py-6 xl:py-10 lg:h-screen lg:max-h-[850px] lg:min-h-[790px] flex flex-col justify-center select-none">
      
      {/* --- BACKGROUND FLOATING DECORATIONS (SECTION LEVEL) --- */}
      
      {/* Left Leaf Sprout */}
      <div className="absolute top-[10%] left-[2%] opacity-20 w-12 h-12 text-[#3B8A4C] pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Right Leaf Sprout */}
      <div className="absolute bottom-[10%] right-[2%] opacity-20 w-16 h-16 text-[#3B8A4C] pointer-events-none hidden lg:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* --- MAIN FLOATING CARD --- */}
      <div className="w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white rounded-[40px] shadow-[0_20px_60px_rgba(79,94,84,0.08)] border border-slate-100/60 overflow-hidden relative w-full flex flex-col lg:flex-row lg:h-[630px] xl:h-[670px]">
          
          {/* --- LEFT CONTENT COLUMN (55%) --- */}
          <div className="w-full lg:w-[55%] p-6 sm:p-10 lg:p-8 xl:p-10 flex flex-col justify-center items-center relative z-20 order-2 lg:order-1 bg-white space-y-6 lg:space-y-4 xl:space-y-6 min-h-[500px] lg:min-h-0">
            
            {/* Left background doodles */}
            {/* Top Left Paper Plane */}
            <div className="absolute top-[6%] left-[6%] w-24 h-12 opacity-35 hidden xl:block select-none pointer-events-none z-0">
              <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M10,65 Q80,15 140,45" stroke="#F57C00" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 4" />
                <g transform="translate(140, 45) rotate(20) scale(0.6)">
                  <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#F57C00" />
                </g>
              </svg>
            </div>

            {/* Top Right Orange Heart */}
            <svg
              viewBox="0 0 100 100"
              className="absolute top-[8%] left-[80%] w-6 h-6 opacity-40 text-[#F57C00] pointer-events-none hidden xl:block select-none z-0 animate-[pulse_3s_infinite]"
            >
              <path
                d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray="4 2"
              />
            </svg>

            {/* Bottom Left Curved Dotted Path */}
            <div className="absolute bottom-[25%] left-[6%] w-20 h-8 opacity-30 hidden xl:block select-none pointer-events-none z-0">
              <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M10,30 Q50,10 90,30" stroke="#3B8A4C" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Mid Left Green Heart */}
            <svg
              viewBox="0 0 100 100"
              className="absolute bottom-[35%] left-[8%] w-6 h-6 opacity-45 text-[#3B8A4C] pointer-events-none hidden xl:block select-none z-0 animate-[pulse_4s_infinite]"
            >
              <path
                d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Subcomponents Content */}
            <AppointmentHeroContent />
            <div className="my-6 lg:my-4 w-full">
              <TrustFeatures />
            </div>
            <CTAButtons />

          </div>

          {/* --- RIGHT COLUMN (45%) --- */}
          <div className="w-full lg:w-[45%] order-1 lg:order-2 bg-[#E8F5E9]/15 p-6 flex flex-col justify-between h-full lg:h-auto border-t lg:border-t-0 lg:border-l border-slate-100">
            {/* Right side photo on top */}
            <div className="w-full h-[240px] sm:h-[320px] lg:h-[260px] xl:h-[280px] rounded-[32px] overflow-hidden shadow-md border-4 border-white relative flex-shrink-0">
              <img
                src="/images/faq/therapist_child_faq.png"
                alt="Therapist and child working on goals"
                className="w-full h-full object-cover relative z-0"
              />
            </div>

            {/* Bottom side JourneyCard (Desktop only) */}
            <div className="hidden lg:block w-full mt-4 xl:mt-5">
              <JourneyCard />
            </div>
          </div>

        </div>

        {/* Stacked JourneyCard below for Tablet and Mobile viewports */}
        <div className="block lg:hidden mt-6 w-full">
          <JourneyCard />
        </div>

      </div>

    </section>
  );
};

export default AppointmentCTASection;
