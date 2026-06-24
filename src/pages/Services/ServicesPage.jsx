import React from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../../hooks/useServices';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import { Brain, MessageCircle, Activity, ArrowRight } from 'lucide-react';

export const ServicesPage = () => {
  const { data: services, isLoading, error, refetch } = useServices();

  const iconMap = {
    Brain: Brain,
    MessageCircle: MessageCircle,
    Activity: Activity,
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} className="my-20" />;
  }

  if (!services || services.length === 0) {
    return <EmptyState title="No Services Found" description="Our clinical services catalog is temporarily offline." className="my-20" />;
  }

  return (
    <div className="py-16">
      <Container>
        <SectionTitle
          subtitle="Our Catalog"
          title="Clinical Services & Specialized Therapies"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Brain;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="bg-primary/5 text-primary p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-block text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 uppercase tracking-wider">
                    Duration: {service.duration}
                  </span>
                </div>
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-light transition-colors"
                  >
                    View Therapy Protocol <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default ServicesPage;
