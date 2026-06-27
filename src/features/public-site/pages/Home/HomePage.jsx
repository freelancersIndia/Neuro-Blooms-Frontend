import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from './HeroSection';
import TrustBarSection from './TrustBarSection';
import ConditionsSection from './ConditionsSection';
import WhyNeuroBloomsSection from './WhyNeuroBloomsSection';
import DevelopmentProgramSection from './DevelopmentProgramSection';
import ParentCoachingSection from './ParentCoachingSection';
import HowItWorksSection from './HowItWorksSection';
import SuccessStoriesSection from './SuccessStoriesSection';
import TestimonialsSection from './TestimonialsSection';
import StatisticsSection from './StatisticsSection';
import FAQSection from './FAQSection';
import BlogPreviewSection from './BlogPreviewSection';
import AppointmentCTASection from './AppointmentCTASection';
import DoctorSection from './DoctorSection';
import ContactSection from './ContactSection';
import { CloudDivider, WaveDivider, OrganicDivider } from '../../../../components/common/SectionDivider';

/*
 * Section Background Color Map (from spec):
 *  1. Hero             — #EAF8FF  (Sky Blue)
 *  2. Trust Bar        — #FFFFFF  (White)
 *  3. Conditions       — #FFFDF7  (Soft Cream)
 *  4. WhyNeuroBlooms   — #FFF8E8  (Warm Beige)
 *  5. DevProgram       — #FFFFFF  (White)
 *  6. ParentCoaching   — #FFF8E8  (Warm Cream) - 6th in JSX flow
 *  7. HowItWorks       — #F5FBFF  (Soft Blue)
 *  8. SuccessStories   — #FFFFFF  (White)
 *  9. Testimonials     — #FFFDF7  (Soft Cream)
 * 10. Statistics       — #F5F9FF  (Soft Blue Tint)
 * 11. FAQ              — #FFFFFF  (White)
 * 12. BlogPreview      — #FFF8E8  (Warm Cream)
 * 13. AppointmentCTA   — #FFFFFF  (White)
 * 14. DoctorSection    — #FFFFFF  (White)
 * 15. Contact          — #F5FBFF  (Soft Sky Blue)
 * 16. Footer           — #F5FBFF  (Blends seamlessly)
 */

const BG = {
  HERO:         '#EAF8FF',
  TRUST:        '#FFFFFF',
  CONDITIONS:   '#FFFDF7',
  WHY:          '#FFF8E8',
  DEV_PROGRAM:  '#FFFFFF',
  PARENT_COACH: '#FFF8E8',
  HOW_IT_WORKS: '#F5FBFF',
  SUCCESS:      '#FFFFFF',
  TESTIMONIALS: '#FFFDF7',
  STATISTICS:   '#F5F9FF',
  FAQ:          '#FFFFFF',
  BLOG:         '#FFF8E8',
  APPT_CTA:     '#FFFFFF',
  DOCTOR:       '#FFFFFF',
  CONTACT:      '#F5FBFF',
};

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path === '/success-stories') {
      const element = document.getElementById('success-stories-section');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname]);

  return (
    <div className="pb-0">
      {/* 1. Hero Section */}
      <HeroSection />
      <CloudDivider fromColor={BG.HERO} toColor={BG.TRUST} height={110} />

      {/* 2. Trust Bar Section */}
      <TrustBarSection />
      <CloudDivider fromColor={BG.TRUST} toColor={BG.CONDITIONS} height={100} />

      {/* 3. Conditions Section */}
      <ConditionsSection />
      <WaveDivider fromColor={BG.CONDITIONS} toColor={BG.WHY} height={100} />

      {/* 4. Why Neuro Blooms */}
      <WhyNeuroBloomsSection />
      <CloudDivider fromColor={BG.WHY} toColor={BG.DEV_PROGRAM} height={100} />

      {/* 5. Development Program */}
      <DevelopmentProgramSection />
      <OrganicDivider fromColor={BG.DEV_PROGRAM} toColor={BG.PARENT_COACH} height={90} />

      {/* 6. Parent Coaching */}
      <ParentCoachingSection />
      <CloudDivider fromColor={BG.PARENT_COACH} toColor={BG.HOW_IT_WORKS} height={100} />

      {/* 7. How It Works */}
      <HowItWorksSection />
      <CloudDivider fromColor={BG.HOW_IT_WORKS} toColor={BG.SUCCESS} height={100} />

      {/* 8. Success Stories */}
      <SuccessStoriesSection />
      <WaveDivider fromColor={BG.SUCCESS} toColor={BG.TESTIMONIALS} height={90} />

      {/* 9. Testimonials */}
      <TestimonialsSection />
      <CloudDivider fromColor={BG.TESTIMONIALS} toColor={BG.STATISTICS} height={100} />

      {/* 10. Statistics */}
      <StatisticsSection />
      <OrganicDivider fromColor={BG.STATISTICS} toColor={BG.FAQ} height={100} />

      {/* 11. FAQ */}
      <FAQSection />
      <CloudDivider fromColor={BG.FAQ} toColor={BG.BLOG} height={100} />

      {/* 12. Blog Preview */}
      <BlogPreviewSection />
      <CloudDivider fromColor={BG.BLOG} toColor={BG.APPT_CTA} height={100} />

      {/* 13. Appointment CTA */}
      <AppointmentCTASection />
      <OrganicDivider fromColor={BG.APPT_CTA} toColor={BG.DOCTOR} height={90} />

      {/* 14. Doctor Section */}
      <DoctorSection />
      <OrganicDivider fromColor={BG.DOCTOR} toColor={BG.CONTACT} height={110} />

      {/* 15. Contact Section */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
