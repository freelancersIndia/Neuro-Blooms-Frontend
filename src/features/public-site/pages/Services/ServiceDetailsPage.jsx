import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useService as useServiceHook } from '../../hooks/useServices';
import Container from '../../../../components/common/Container';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../../components/common/ErrorMessage';
import Button from '../../../../components/common/Button';
import { Brain, ArrowLeft, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { ROUTES } from '../../../../utils/routes';

export const ServiceDetailsPage = () => {
  const { slug } = useParams();
  const { data: service, isLoading, error, refetch } = useServiceHook(slug);

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} className="my-20" />;
  }

  if (!service) {
    return (
      <Container className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Service Not Found</h2>
        <p className="text-gray-600 mb-6">The requested service could not be located in our clinical registry.</p>
        <Link to={ROUTES.SERVICES}>
          <Button variant="outline">Back to Services</Button>
        </Link>
      </Container>
    );
  }

  return (
    <div className="py-16">
      <Container>
        {/* Back Link */}
        <Link
          to={ROUTES.SERVICES}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div className="bg-primary/5 text-primary p-3 rounded-xl w-14 h-14 flex items-center justify-center">
                <Brain className="h-8 w-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-display tracking-tight">
                {service.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 font-display">Clinical Protocol & Structure</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {service.details}
              </p>
              <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Custom Intake Plan</h4>
                    <p className="text-xs text-gray-500">Every child receives a customized clinical roadmap.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Collaborative Models</h4>
                    <p className="text-xs text-gray-500">We work directly with parents, schools, and neurologists.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info Card */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="text-lg font-bold font-display">Intake Program Summary</h3>
              
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-slate-800 pb-3">
                  <span className="text-slate-400">Standard Cycle:</span>
                  <span className="font-semibold">{service.duration}</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-3">
                  <span className="text-slate-400">Assigned Clinicians:</span>
                  <span className="font-semibold text-right">Multidisciplinary Team</span>
                </li>
                <li className="flex justify-between pb-3">
                  <span className="text-slate-400">Support Material:</span>
                  <span className="font-semibold">Parent Guideline Booklet</span>
                </li>
              </ul>

              <div className="pt-4 flex flex-col gap-3">
                <Link to={ROUTES.APPOINTMENT} className="w-full">
                  <Button variant="accent" className="w-full py-3 shadow-md shadow-amber-500/10">
                    <Calendar className="h-4 w-4 mr-2" /> Book Diagnostic Intake
                  </Button>
                </Link>
                <Link to={ROUTES.APPOINTMENT} className="w-full">
                  <Button variant="outline" className="w-full py-3 border-slate-700 hover:bg-slate-800 text-white bg-transparent">
                    <FileText className="h-4 w-4 mr-2" /> Request Brochure
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceDetailsPage;
