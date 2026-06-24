import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateAppointment } from '../../hooks/useAppointments';
import { useDoctors } from '../../hooks/useDoctors';
import { useServices } from '../../hooks/useServices';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';
import TextAreaField from '../../components/forms/TextAreaField';
import FormWrapper from '../../components/forms/FormWrapper';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { CheckCircle, Calendar, Heart } from 'lucide-react';

export const AppointmentPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  const { data: doctors, isLoading: loadingDoctors } = useDoctors();
  const { data: services, isLoading: loadingServices } = useServices();
  const { mutateAsync: createAppointment, isPending } = useCreateAppointment();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      parentName: '',
      email: '',
      phone: '',
      childName: '',
      childAge: '',
      serviceId: '',
      doctorId: '',
      appointmentDate: '',
      notes: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createAppointment(data);
      if (response?.success) {
        setIsSubmitted(true);
        setSubmissionData(response.data);
        reset();
      }
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  if (loadingDoctors || loadingServices) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  // Map doctors and services to option arrays
  const doctorOptions = doctors?.map((doc) => ({
    value: doc.id,
    label: `${doc.name} (${doc.role})`,
  })) || [];

  const serviceOptions = services?.map((serv) => ({
    value: serv.id,
    label: serv.title,
  })) || [];

  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <SectionTitle
          subtitle="Clinical Scheduler"
          title="Book an Intake Assessment"
        />

        {isSubmitted ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center space-y-6 animate-fade-in-up">
            <div className="bg-teal-50 text-primary p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 font-display">Appointment Scheduled</h3>
              <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <span className="font-bold text-gray-900">{submissionData?.parentName}</span>. 
                Our child support coordinators will contact you at <span className="font-bold text-gray-900">{submissionData?.phone}</span> within 24 hours to confirm your intake date.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-3 max-w-md mx-auto">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Intake Receipt</h4>
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Child Reference:</span>
                  <span className="font-semibold text-gray-900">{submissionData?.childName} (Age: {submissionData?.childAge})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Intake Reference ID:</span>
                  <span className="font-mono text-gray-900">NB-{submissionData?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Target Date:</span>
                  <span className="font-semibold text-gray-900">{submissionData?.appointmentDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Schedule Another Intake
              </Button>
            </div>
          </div>
        ) : (
          <FormWrapper
            onSubmit={handleSubmit(onSubmit)}
            title="Development Intake Questionnaire"
            description="Provide details regarding developmental support objectives. All medical answers are secure under clinical privacy policies."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Parent Details */}
              <InputField
                label="Parent / Guardian Name"
                name="parentName"
                placeholder="Full Name"
                required
                error={errors.parentName}
                {...register('parentName', { required: 'Parent/Guardian name is required' })}
              />

              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="e.g. (555) 000-0000"
                required
                error={errors.phone}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[+]?[0-9\s\-()]{7,18}$/,
                    message: 'Please provide a valid contact phone number',
                  },
                })}
              />

              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="parent@example.com"
                required
                error={errors.email}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address format',
                  },
                })}
              />

              {/* Child Details */}
              <div className="grid grid-cols-3 gap-3">
                <InputField
                  label="Child's First Name"
                  name="childName"
                  placeholder="Name"
                  required
                  className="col-span-2"
                  error={errors.childName}
                  {...register('childName', { required: 'Required' })}
                />
                <InputField
                  label="Age"
                  name="childAge"
                  type="number"
                  placeholder="Age"
                  required
                  error={errors.childAge}
                  {...register('childAge', {
                    required: 'Required',
                    min: { value: 1, message: 'Must be > 0' },
                    max: { value: 18, message: 'Max 18' },
                  })}
                />
              </div>

              {/* Services & Doctors Selects */}
              <SelectField
                label="Primary Care Inquiry"
                name="serviceId"
                options={serviceOptions}
                required
                error={errors.serviceId}
                {...register('serviceId', { required: 'Please select a service' })}
              />

              <SelectField
                label="Preferred Clinician"
                name="doctorId"
                options={doctorOptions}
                placeholder="Select Doctor (Or First Available)"
                error={errors.doctorId}
                {...register('doctorId')}
              />

              <InputField
                label="Preferred Date"
                name="appointmentDate"
                type="date"
                required
                error={errors.appointmentDate}
                {...register('appointmentDate', { required: 'Preferred intake date is required' })}
              />
            </div>

            <TextAreaField
              label="Developmental History / Notes"
              name="notes"
              placeholder="Tell us about your child's communication preferences, sensory concerns, or goals."
              error={errors.notes}
              {...register('notes')}
            />

            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
              <Button type="submit" isLoading={isPending} className="shadow-lg shadow-teal-700/25">
                Submit Intake Request
              </Button>
            </div>
          </FormWrapper>
        )}
      </Container>
    </div>
  );
};

export default AppointmentPage;
