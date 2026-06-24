import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitContactForm } from '../../services/contact.service';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import InputField from '../../components/forms/InputField';
import TextAreaField from '../../components/forms/TextAreaField';
import FormWrapper from '../../components/forms/FormWrapper';
import Button from '../../components/common/Button';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { CLINIC_INFO } from '../../utils/constants';

export const ContactPage = () => {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await submitContactForm(data);
      if (response?.success) {
        setIsSent(true);
        setAlertMsg(response.message);
        reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 space-y-16">
      <Container>
        <SectionTitle
          subtitle="Get in Touch"
          title="We Are Here to Assist Your Family"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Clinic Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md space-y-6">
              <h3 className="text-lg font-bold text-gray-900 font-display">Clinical Desk</h3>
              
              <ul className="space-y-4 text-xs md:text-sm">
                <li className="flex gap-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span>{CLINIC_INFO.ADDRESS}</span>
                </li>
                <li className="flex gap-3 text-gray-600">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <a href={`tel:${CLINIC_INFO.PHONE}`} className="hover:text-primary transition-colors">
                    {CLINIC_INFO.PHONE}
                  </a>
                </li>
                <li className="flex gap-3 text-gray-600">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <a href={`mailto:${CLINIC_INFO.EMAIL}`} className="hover:text-primary transition-colors">
                    {CLINIC_INFO.EMAIL}
                  </a>
                </li>
                <li className="flex gap-3 text-gray-600">
                  <Clock className="h-5 w-5 text-primary shrink-0" />
                  <span>{CLINIC_INFO.HOURS}</span>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-100 rounded-3xl h-60 border border-slate-200 overflow-hidden relative shadow-inner flex flex-col items-center justify-center p-6 text-center">
              <MapPin className="h-10 w-10 text-primary mb-2 animate-bounce" />
              <h4 className="font-bold text-gray-800 text-sm font-display">{CLINIC_INFO.NAME} Map Location</h4>
              <p className="text-xs text-gray-500 max-w-xs mt-1">Medical Plaza Complex, Suite 400</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {isSent ? (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center space-y-4 py-16 animate-fade-in-up">
                <div className="bg-teal-50 text-primary p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-display">Message Sent</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">{alertMsg}</p>
                <div className="pt-4">
                  <Button onClick={() => setIsSent(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <FormWrapper onSubmit={handleSubmit(onSubmit)} title="Inquiry Form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField
                    label="Your Name"
                    name="name"
                    placeholder="Full Name"
                    required
                    error={errors.name}
                    {...register('name', { required: 'Name is required' })}
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
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    error={errors.phone}
                    {...register('phone')}
                  />
                  <InputField
                    label="Subject"
                    name="subject"
                    placeholder="Assessment / General inquiry"
                    required
                    error={errors.subject}
                    {...register('subject', { required: 'Subject is required' })}
                  />
                </div>
                <TextAreaField
                  label="Inquiry / Message"
                  name="message"
                  placeholder="How can we assist you?"
                  required
                  error={errors.message}
                  {...register('message', { required: 'Message body is required' })}
                />
                <div className="flex justify-end pt-4">
                  <Button type="submit" isLoading={loading} className="shadow-lg shadow-teal-700/20">
                    Send Message
                  </Button>
                </div>
              </FormWrapper>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
