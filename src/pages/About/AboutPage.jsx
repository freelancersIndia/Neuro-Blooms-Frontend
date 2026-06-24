import React, { useEffect } from 'react';

// Subcomponents
import AboutHeroSection from './AboutHeroSection';
import OurStorySection from './OurStorySection';
import VisionMissionSection from './VisionMissionSection';
import CoreValuesSection from './CoreValuesSection';
import WhyNeuroBloomsSection from './WhyNeuroBloomsSection';
import DoctorHighlightSection from './DoctorHighlightSection';
import HowWeHelpSection from './HowWeHelpSection';
import ConditionsSupportSection from './ConditionsSupportSection';
import ImpactStatisticsSection from './ImpactStatisticsSection';
import SuccessStoriesSection from './SuccessStoriesSection';
import AboutCTASection from './AboutCTASection';

// Shared Layout Dividers
import { CloudDivider } from '../../components/common/SectionDivider';

// Background Colors Map
const BG = {
  HERO: '#EAF8FF',
  STORY: '#FFFFFF',
  VISION: '#FFF8E8',
  VALUES: '#FFFFFF',
  WHY: '#F5FBFF',
  DOCTOR: '#FFF8E8',
  HOW: '#FFFFFF',
  CONDITIONS: '#F5FBFF',
  STATS: '#FFFFFF',
  SUCCESS: '#FFF8E8',
  CTA: '#FFFFFF',
};

export const AboutPage = () => {
  // Dynamic SEO Setup on Mount
  useEffect(() => {
    document.title = 'About Our Child Development Center | Neuro Blooms';

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn about Neuro Blooms, our story, mission, and core values. Meet Dr. A. Jagadish and explore our evidence-based early intervention and child development care.'
      );
    }

    // Add JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": "Neuro Blooms",
      "url": window.location.href,
      "description": "Neuro Blooms is a specialized child development and neurodevelopment center offering early intervention, therapies, and parent coaching programs.",
      "medicalSpecialty": "Pediatrics",
      "founder": {
        "@type": "Person",
        "name": "Dr. A. Jagadish",
        "jobTitle": "Child Development Specialist"
      },
      "areaServed": "India",
      "knowsAbout": ["Autism", "ADHD", "Developmental Delay", "Learning Disabilities", "Speech Therapy"]
    };

    const scriptId = 'about-structured-data';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="w-full pb-0 select-none">
      
      {/* 1. About Hero Section */}
      <AboutHeroSection />
      <CloudDivider fromColor={BG.HERO} toColor={BG.STORY} height={110} />

      {/* 2. Our Story Section */}
      <OurStorySection />
      <CloudDivider fromColor={BG.STORY} toColor={BG.VISION} height={100} />

      {/* 3. Vision & Mission Section */}
      <VisionMissionSection />
      <CloudDivider fromColor={BG.VISION} toColor={BG.VALUES} height={100} />

      {/* 4. Core Values Section */}
      <CoreValuesSection />
      <CloudDivider fromColor={BG.VALUES} toColor={BG.WHY} height={100} />

      {/* 5. Why Choose Us Section */}
      <WhyNeuroBloomsSection />
      <CloudDivider fromColor={BG.WHY} toColor={BG.DOCTOR} height={100} />

      {/* 6. Doctor Highlight Section */}
      <DoctorHighlightSection />
      <CloudDivider fromColor={BG.DOCTOR} toColor={BG.HOW} height={100} />

      {/* 7. How We Help Section */}
      <HowWeHelpSection />
      <CloudDivider fromColor={BG.HOW} toColor={BG.CONDITIONS} height={100} />

      {/* 8. Conditions We Support Section */}
      <ConditionsSupportSection />
      <CloudDivider fromColor={BG.CONDITIONS} toColor={BG.STATS} height={100} />

      {/* 9. Impact Statistics Section */}
      <ImpactStatisticsSection />
      <CloudDivider fromColor={BG.STATS} toColor={BG.SUCCESS} height={100} />

      {/* 10. Parent Success Stories Section */}
      <SuccessStoriesSection />
      <CloudDivider fromColor={BG.SUCCESS} toColor={BG.CTA} height={100} />

      {/* 11. About CTA Section */}
      <AboutCTASection />

    </div>
  );
};

export default AboutPage;
