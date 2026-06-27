import React from 'react';
import { Link } from 'react-router-dom';
import { useDoctors } from '../../hooks/useDoctors';
import Container from '../../../../components/common/Container';
import SectionTitle from '../../../../components/common/SectionTitle';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../../components/common/ErrorMessage';
import EmptyState from '../../../../components/common/EmptyState';
import Button from '../../../../components/common/Button';
import { Mail, Calendar, GraduationCap, ArrowRight } from 'lucide-react';

export const DoctorsPage = () => {
  const { data: doctors, isLoading, error, refetch } = useDoctors();

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} className="my-20" />;
  }

  if (!doctors || doctors.length === 0) {
    return <EmptyState title="No Doctors Available" description="We could not find any active therapist directories at the moment." className="my-20" />;
  }

  return (
    <div className="py-16">
      <Container>
        <SectionTitle
          subtitle="Clinical Team"
          title="Meet Our Specialized Neurodevelopment Clinicians"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Doctor Header Banner / Photo */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10" />
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40 backdrop-blur-sm">
                    {doctor.role}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mt-2 font-display">{doctor.name}</h3>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <GraduationCap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{doctor.education}</span>
                </div>
                
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {doctor.bio}
                </p>

                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Focus Areas:</h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {doctor.specialties.slice(0, 2).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <Link
                  to={`/doctors/${doctor.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-primary transition-colors"
                >
                  View Profile <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link to="/appointment">
                  <Button size="sm" className="shadow-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1" /> Book
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DoctorsPage;
