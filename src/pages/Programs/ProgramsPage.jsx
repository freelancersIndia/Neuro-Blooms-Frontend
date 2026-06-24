import React, { useEffect } from 'react';
import Container from '../../components/common/Container';
import { CloudDivider, WaveDivider, OrganicDivider } from '../../components/common/SectionDivider';

// Subcomponents
import ProgramsHeroSection from './ProgramsHeroSection';
import ProgramsOverviewSection from './ProgramsOverviewSection';
import DevelopmentProgramSection from './DevelopmentProgramSection';
import DevelopmentProgramTimeline from './DevelopmentProgramTimeline';
import ConditionsSupportedSection from './ConditionsSupportedSection';
import ProgramComparisonSection from './ProgramComparisonSection';
import ParentCoachingSection from './ParentCoachingSection';
import ProgramsSuccessStoriesSection from './ProgramsSuccessStoriesSection';
import ProgramsFAQSection from './ProgramsFAQSection';
import ProgramsStatisticsSection from './ProgramsStatisticsSection';
import ProgramsCTASection from './ProgramsCTASection';

// Background Colors Map for Organic Dividers
const BG = {
  HERO: '#EAF8FF',
  OVERVIEW: '#FFFFFF',
  NBDP_FLAGSHIP: '#F8FBFF',
  CONDITIONS: '#F5FBFF',
  COMPARISON: '#FFFFFF',
  PARENT_COACH: '#FFF8F0',
  SUCCESS: '#FFFFFF',
  FAQ: '#F8FBFF',
  STATS: '#FFFFFF',
  CTA: '#FFFFFF',
};

export const ProgramsPage = () => {
  // Dynamic SEO Setup on Mount
  useEffect(() => {
    document.title = 'Child Development Programs & Services | Neuro Blooms';

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore Neuro Blooms developmental programs, including our Flagship Development Program and online Parent Coaching. Get expert support for Autism, ADHD, speech delays, and learning disabilities.'
      );
    }

    // Add JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Neuro Blooms Child Development Center",
      "url": window.location.origin + '/programs',
      "description": "Evidence-based developmental programs, early intervention, and parent coaching designed to help children reach milestones and succeed.",
      "medicalSpecialty": "Pediatric",
      "offers": [
        {
          "@type": "Offer",
          "name": "Neuro Blooms Development Program (NBDP)",
          "description": "Comprehensive child development program addressing developmental delays, behavioral concerns, learning difficulties, and overall growth."
        },
        {
          "@type": "Offer",
          "name": "Parent Coaching Program",
          "description": "Online parent coaching and training to implement developmental strategies and routine support at home."
        }
      ]
    };

    const scriptId = 'programs-structured-data';
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
    <div className="w-full pb-0 select-none overflow-x-hidden">
      
      {/* 1. ProgramsHeroSection */}
      <ProgramsHeroSection />
      <CloudDivider fromColor={BG.HERO} toColor={BG.OVERVIEW} height={110} />

      {/* 2. ProgramsOverviewSection */}
      <ProgramsOverviewSection />
      <CloudDivider fromColor={BG.OVERVIEW} toColor={BG.NBDP_FLAGSHIP} height={100} />

      {/* 3 & 4. Flagship Development Program Section (Section + Timeline in Grid) */}
      <section id="nbdp-section" className="bg-[#F8FBFF] py-20 relative overflow-hidden w-full">
        {/* Soft yellow glow */}
        <div className="absolute top-[20%] left-0 w-[40%] h-[40%] bg-amber-100/10 rounded-full filter blur-3xl pointer-events-none z-0" />
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left Column: Flagship Section Description & Illustration */}
            <div className="lg:col-span-4">
              <DevelopmentProgramSection />
            </div>
            
            {/* Right Column: How NBDP Works Timeline */}
            <div className="lg:col-span-8 w-full">
              <DevelopmentProgramTimeline />
            </div>
          </div>
        </Container>
      </section>
      <WaveDivider fromColor={BG.NBDP_FLAGSHIP} toColor={BG.CONDITIONS} height={95} />

      {/* 5. ConditionsSupportedSection */}
      <ConditionsSupportedSection />
      <CloudDivider fromColor={BG.CONDITIONS} toColor={BG.COMPARISON} height={100} />

      {/* 6. ProgramComparisonSection */}
      <ProgramComparisonSection />
      <OrganicDivider fromColor={BG.COMPARISON} toColor={BG.PARENT_COACH} height={95} />

      {/* 7, 8 & 9. Parent Coaching Section (Coaching Section, Timeline & Benefits integrated) */}
      <ParentCoachingSection />
      <CloudDivider fromColor={BG.PARENT_COACH} toColor={BG.SUCCESS} height={100} />

      {/* 10. ProgramsSuccessStoriesSection */}
      <ProgramsSuccessStoriesSection />
      <WaveDivider fromColor={BG.SUCCESS} toColor={BG.FAQ} height={90} />

      {/* 11. ProgramsFAQSection */}
      <ProgramsFAQSection />
      <OrganicDivider fromColor={BG.FAQ} toColor={BG.STATS} height={100} />

      {/* 12. ProgramsStatisticsSection */}
      <ProgramsStatisticsSection />
      <CloudDivider fromColor={BG.STATS} toColor={BG.CTA} height={100} />

      {/* 13. ProgramsCTASection */}
      <ProgramsCTASection />

    </div>
  );
};

export default ProgramsPage;
