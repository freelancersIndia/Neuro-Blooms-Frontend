import { useParams, Link } from 'react-router-dom';
import { useDoctor } from '../../hooks/useDoctors';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button from '../../components/common/Button';
import { ROUTES } from '../../utils/routes';
import DoctorHeroSection from './components/DoctorHeroSection';
import DoctorAboutSection from './components/DoctorAboutSection';
import QualificationsTimeline from './components/QualificationsTimeline';
import ExpertiseGrid from './components/ExpertiseGrid';
import ConditionsTreatedSection from './components/ConditionsTreatedSection';
import SpecialInterestsSection from './components/SpecialInterestsSection';
import CareApproachSection from './components/CareApproachSection';
import MembershipSection from './components/MembershipSection';
import AwardsSection from './components/AwardsSection';
import ResearchSection from './components/ResearchSection';
import DoctorCTASection from './components/DoctorCTASection';

export const DoctorDetailsPage = () => {
  const { id } = useParams();
  const doctorId = id || '1';
  const { data: doctor, isLoading, error, refetch } = useDoctor(doctorId);

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} className="my-20" />;
  }

  if (!doctor) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Specialist Not Found</h2>
        <p className="text-gray-600 mb-6">The requested clinician profile could not be located in our registry.</p>
        <Link to={ROUTES.HOME}>
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Doctor Hero Section (100vh) */}
      <DoctorHeroSection doctor={doctor} />

      {/* 2. Doctor About Section */}
      <DoctorAboutSection />

      {/* 3. Academic Qualifications & Timeline Section */}
      <QualificationsTimeline />

      {/* 4. Areas of Expertise Grid */}
      <ExpertiseGrid />

      {/* 5. Conditions Treated Section */}
      <ConditionsTreatedSection />

      {/* 6. Special Interests Section */}
      <SpecialInterestsSection />

      {/* 7. My Care Approach Timeline */}
      <CareApproachSection />

      {/* 8. Professional Memberships Grid */}
      <MembershipSection />

      {/* 9. Awards & Recognitions Horizontal Timeline */}
      <AwardsSection />

      {/* 10. Research & Academic Contributions */}
      <ResearchSection />

      {/* 11. Final Call To Action Card */}
      <DoctorCTASection />
    </div>
  );
};

export default DoctorDetailsPage;
