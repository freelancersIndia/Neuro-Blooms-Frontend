import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Helper to calculate age dynamically in Years/Months
const calculateAge = (dobString) => {
  if (!dobString) return '';
  const today = new Date();
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return '';
  if (birthDate > today) return '';

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age === 0) {
    let months = (today.getFullYear() - birthDate.getFullYear()) * 12 + today.getMonth() - birthDate.getMonth();
    if (today.getDate() < birthDate.getDate()) {
      months--;
    }
    return months > 0 ? `${months} Month${months > 1 ? 's' : ''}` : 'Less than a month';
  }

  return `${age} Year${age > 1 ? 's' : ''}`;
};

// Form Input Wrapper for accessibility & consistent validation UI
const InputWrapper = ({ label, required, error, children }) => (
  <div className="flex flex-col space-y-1.5 w-full text-left font-body">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-0.5 select-none font-display">
      <span>{label}</span>
      {required && <span className="text-rose-500 font-extrabold">*</span>}
    </label>
    {children}
    {error && (
      <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1 mt-1 transition-all duration-300">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
        {error.message}
      </span>
    )}
  </div>
);

// Custom styled select input
const SelectInput = React.forwardRef(({ options, error, placeholder, ...props }, ref) => (
  <div className="relative w-full">
    <select
      ref={ref}
      className={`px-4 py-2.5 pr-10 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none appearance-none transition-all duration-300 font-semibold cursor-pointer ${
        error
          ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
          : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
      }`}
      {...props}
    >
      <option value="" className="text-slate-400 font-medium">
        {placeholder || 'Select an option'}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-slate-800 font-semibold">
          {opt}
        </option>
      ))}
    </select>
    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
));

SelectInput.displayName = 'SelectInput';

// Custom Checkbox
const CheckboxInput = React.forwardRef(({ error, children, ...props }, ref) => (
  <div className="flex flex-col space-y-1 text-left font-body">
    <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-slate-600 font-semibold leading-relaxed group">
      <input
        type="checkbox"
        ref={ref}
        className={`mt-0.5 h-4.5 w-4.5 rounded border transition-all duration-300 accent-[#3B8A4C] cursor-pointer flex-shrink-0 ${
          error ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300 group-hover:border-slate-400'
        }`}
        {...props}
      />
      <div className="text-slate-600 text-xs font-semibold">{children}</div>
    </label>
    {error && (
      <span className="text-[10px] text-rose-500 font-bold pl-7.5 flex items-center gap-1 mt-1">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
        {error.message}
      </span>
    )}
  </div>
));

CheckboxInput.displayName = 'CheckboxInput';

export const QuestionnaireForm = ({ onSubmit, onFormValuesChange, defaultValues }) => {
  const primaryConcernOptions = [
    'Speech Delay',
    'Autism Assessment',
    'Behavioural Concerns',
    'Developmental Delay',
    'Learning Difficulty',
    'ADHD Assessment',
    'Occupational Therapy',
    'Physiotherapy',
    'Feeding Issues',
    'Other'
  ];

  // Robust initialization of inputs supporting both redesigned & original models (fallback)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parentFirstName: defaultValues?.parentFirstName || defaultValues?.parentName?.split(' ')[0] || '',
      parentLastName: defaultValues?.parentLastName || defaultValues?.parentName?.split(' ').slice(1).join(' ') || '',
      parentRelationship: defaultValues?.parentRelationship || '',
      phone: defaultValues?.phone || '',
      alternativePhone: defaultValues?.alternativePhone || '',
      email: defaultValues?.email || '',
      childFirstName: defaultValues?.childFirstName || defaultValues?.childName?.split(' ')[0] || '',
      childLastName: defaultValues?.childLastName || defaultValues?.childName?.split(' ').slice(1).join(' ') || '',
      childDob: defaultValues?.childDob || '',
      childAge: defaultValues?.childAge || '',
      childGender: defaultValues?.childGender || '',
      appointmentType: defaultValues?.appointmentType || defaultValues?.consultationReason || '',
      primaryConcern: defaultValues?.primaryConcern || (defaultValues?.concerns?.[0] && !primaryConcernOptions.includes(defaultValues?.concerns?.[0]) ? 'Other' : defaultValues?.concerns?.[0]) || '',
      otherConcernDetails: defaultValues?.otherConcernDetails || (defaultValues?.concerns?.[0] && !primaryConcernOptions.includes(defaultValues?.concerns?.[0]) ? defaultValues?.concerns?.[0] : '') || '',
      referralSource: defaultValues?.referralSource || '',
      consentAccurate: defaultValues?.consentAccurate || false,
      consentPrivacy: defaultValues?.consentPrivacy || false,
      consentTerms: defaultValues?.consentTerms || false,
      notes: defaultValues?.notes || '',
    }
  });

  const watchedValues = watch();
  const watchedDob = watch('childDob');
  const watchedPrimaryConcern = watch('primaryConcern');
  const watchedNotes = watch('notes') || '';

  // Max date string (today) to prevent choosing future birthdates
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Real-time calculation of Age based on Date of Birth changes
  useEffect(() => {
    if (watchedDob) {
      const calculatedAge = calculateAge(watchedDob);
      setValue('childAge', calculatedAge);
    } else {
      setValue('childAge', '');
    }
  }, [watchedDob, setValue]);

  // Bubble up mapped and validated form state values to parent context in real-time
  useEffect(() => {
    if (onFormValuesChange) {
      const parentName = `${watchedValues.parentFirstName || ''} ${watchedValues.parentLastName || ''}`.trim();
      const childName = `${watchedValues.childFirstName || ''} ${watchedValues.childLastName || ''}`.trim();
      const concernText = watchedValues.primaryConcern === 'Other' ? watchedValues.otherConcernDetails : watchedValues.primaryConcern;

      onFormValuesChange({
        ...watchedValues,
        parentName,
        childName,
        consultationReason: watchedValues.appointmentType,
        concerns: concernText ? [concernText] : [],
      });
    }
  }, [JSON.stringify(watchedValues), onFormValuesChange]);

  // Form submission handler
  const handleFormSubmit = (data) => {
    const parentName = `${data.parentFirstName} ${data.parentLastName}`;
    const childName = `${data.childFirstName} ${data.childLastName}`;
    const concernText = data.primaryConcern === 'Other' ? data.otherConcernDetails : data.primaryConcern;

    const enrichedPayload = {
      ...data,
      parentName,
      childName,
      consultationReason: data.appointmentType,
      concerns: concernText ? [concernText] : [],
    };
    onSubmit(enrichedPayload);
  };

  return (
    <form
      id="questionnaire-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className="w-full max-w-[1300px] mx-auto space-y-6 text-left font-body"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Parent Information, Child Information, and Referral Information */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card Section 1: Parent / Guardian Information */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-[0_10px_35px_rgba(79,94,84,0.02)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100/70">
              <span className="text-xl sm:text-2xl" role="img" aria-label="Parent">👨</span>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base font-display">
                Parent / Guardian Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputWrapper label="First Name" required error={errors.parentFirstName}>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className={`px-4 py-2.5 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none font-semibold transition-all duration-300 ${
                    errors.parentFirstName
                      ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
                  }`}
                  {...register('parentFirstName', { required: 'First name is required' })}
                />
              </InputWrapper>

              <InputWrapper label="Last Name" required error={errors.parentLastName}>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className={`px-4 py-2.5 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none font-semibold transition-all duration-300 ${
                    errors.parentLastName
                      ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
                  }`}
                  {...register('parentLastName', { required: 'Last name is required' })}
                />
              </InputWrapper>

              <InputWrapper label="Relationship to Child" required error={errors.parentRelationship}>
                <SelectInput
                  options={['Mother', 'Father', 'Guardian', 'Grandparent', 'Other']}
                  placeholder="Select relationship"
                  error={errors.parentRelationship}
                  {...register('parentRelationship', { required: 'Relationship to child is required' })}
                />
              </InputWrapper>

              <InputWrapper label="Mobile Number" required error={errors.phone}>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  className={`px-4 py-2.5 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none font-semibold transition-all duration-300 ${
                    errors.phone
                      ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
                  }`}
                  {...register('phone', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^(?:\+91|91|0)?[6-9]\d{9}$/,
                      message: 'Enter a valid Indian mobile number.'
                    }
                  })}
                />
              </InputWrapper>

              <InputWrapper label="Alternative Mobile Number" error={errors.alternativePhone}>
                <input
                  type="tel"
                  placeholder="e.g. 9876543211 (Optional)"
                  className={`px-4 py-2.5 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none font-semibold transition-all duration-300 ${
                    errors.alternativePhone
                      ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
                  }`}
                  {...register('alternativePhone', {
                    pattern: {
                      value: /^(?:\+91|91|0)?[6-9]\d{9}$/,
                      message: 'Enter a valid Indian mobile number.'
                    }
                  })}
                />
              </InputWrapper>

              <InputWrapper label="Email Address" required error={errors.email}>
                <input
                  type="email"
                  placeholder="parent@example.com"
                  className={`px-4 py-2.5 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none font-semibold transition-all duration-300 ${
                    errors.email
                      ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
                  }`}
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address format'
                    }
                  })}
                />
              </InputWrapper>
            </div>
          </div>

          {/* Card Section 2: Child Information */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-[0_10px_35px_rgba(79,94,84,0.02)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100/70">
              <span className="text-xl sm:text-2xl" role="img" aria-label="Child">👶</span>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base font-display">
                Child Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputWrapper label="First Name" required error={errors.childFirstName}>
                <input
                  type="text"
                  placeholder="Child's first name"
                  className={`px-4 py-2.5 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none font-semibold transition-all duration-300 ${
                    errors.childFirstName
                      ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
                  }`}
                  {...register('childFirstName', { required: "Child's first name is required" })}
                />
              </InputWrapper>

              <InputWrapper label="Last Name" required error={errors.childLastName}>
                <input
                  type="text"
                  placeholder="Child's last name"
                  className={`px-4 py-2.5 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none font-semibold transition-all duration-300 ${
                    errors.childLastName
                      ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
                  }`}
                  {...register('childLastName', { required: "Child's last name is required" })}
                />
              </InputWrapper>

              <InputWrapper label="Date of Birth" required error={errors.childDob}>
                <input
                  type="date"
                  max={getTodayString()}
                  className={`px-4 py-2.5 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none font-semibold transition-all duration-300 ${
                    errors.childDob
                      ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
                  }`}
                  {...register('childDob', {
                    required: 'Date of birth is required',
                    validate: {
                      notInFuture: (value) => {
                        if (!value) return true;
                        const today = new Date();
                        const dob = new Date(value);
                        return dob <= today || 'Future Date of Birth';
                      }
                    }
                  })}
                />
              </InputWrapper>

              <InputWrapper label="Age (Automatically Calculated)">
                <input
                  type="text"
                  disabled
                  placeholder="Calculated from Date of Birth"
                  className="px-4 py-2.5 text-xs sm:text-sm border border-slate-100 rounded-2xl bg-slate-50 text-slate-400 font-extrabold cursor-not-allowed w-full outline-none"
                  {...register('childAge')}
                />
              </InputWrapper>

              <div className="sm:col-span-2">
                <InputWrapper label="Gender" required error={errors.childGender}>
                  <SelectInput
                    options={['Male', 'Female', 'Other', 'Prefer Not to Say']}
                    placeholder="Select gender"
                    error={errors.childGender}
                    {...register('childGender', { required: 'Gender selection is required' })}
                  />
                </InputWrapper>
              </div>
            </div>
          </div>

          {/* Card Section 4: Referral Information */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-[0_10px_35px_rgba(79,94,84,0.02)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100/70">
              <span className="text-xl sm:text-2xl" role="img" aria-label="Referral">📢</span>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base font-display">
                How Did You Hear About Us?
              </h3>
            </div>

            <InputWrapper label="Referral Source" error={errors.referralSource}>
              <SelectInput
                options={[
                  'Google Search',
                  'Instagram',
                  'Facebook',
                  'WhatsApp',
                  'Doctor Referral',
                  'Friend / Family',
                  'Website',
                  'Other'
                ]}
                placeholder="Select an option (Optional)"
                error={errors.referralSource}
                {...register('referralSource')}
              />
            </InputWrapper>
          </div>

        </div>

        {/* RIGHT COLUMN: Consultation Details and Consent Checkboxes */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card Section 3: Consultation Information */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-[0_10px_35px_rgba(79,94,84,0.02)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100/70">
              <span className="text-xl sm:text-2xl" role="img" aria-label="Consultation">🩺</span>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base font-display">
                Consultation Information
              </h3>
            </div>

            <div className="space-y-4">
              <InputWrapper label="Appointment Type" required error={errors.appointmentType}>
                <SelectInput
                  options={['Initial Consultation', 'Development Assessment']}
                  placeholder="Select appointment type"
                  error={errors.appointmentType}
                  {...register('appointmentType', { required: 'Appointment type is required' })}
                />
              </InputWrapper>

              <InputWrapper label="Primary Development Concern" required error={errors.primaryConcern}>
                <SelectInput
                  options={[
                    'Speech Delay',
                    'Autism Assessment',
                    'Behavioural Concerns',
                    'Developmental Delay',
                    'Learning Difficulty',
                    'ADHD Assessment',
                    'Occupational Therapy',
                    'Physiotherapy',
                    'Feeding Issues',
                    'Other'
                  ]}
                  placeholder="Select primary concern"
                  error={errors.primaryConcern}
                  {...register('primaryConcern', { required: 'Primary concern is required' })}
                />
              </InputWrapper>

              {/* Conditional Specify input if "Other" concern is chosen */}
              {watchedPrimaryConcern === 'Other' && (
                <div className="animate-fade-in-up">
                  <InputWrapper label="Please specify your concern" required error={errors.otherConcernDetails}>
                    <input
                      type="text"
                      placeholder="Specify your child's concern"
                      className={`px-4 py-2.5 text-xs sm:text-sm border rounded-2xl bg-white w-full outline-none font-semibold transition-all duration-300 ${
                        errors.otherConcernDetails
                          ? 'border-rose-200 bg-rose-50/5 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5'
                          : 'border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5'
                      }`}
                      {...register('otherConcernDetails', {
                        required: 'Please describe the specific concern'
                      })}
                    />
                  </InputWrapper>
                </div>
              )}

              <InputWrapper label="Additional Notes" error={errors.notes}>
                <div className="relative">
                  <textarea
                    placeholder="Briefly describe your child's concern..."
                    rows={4}
                    maxLength={1000}
                    className="px-4 py-2.5 text-xs sm:text-sm border border-slate-200 hover:border-slate-300 focus:border-[#3B8A4C] focus:ring-4 focus:ring-[#3B8A4C]/5 rounded-2xl bg-white w-full outline-none resize-none font-semibold transition-all duration-300"
                    {...register('notes')}
                  />
                  <div className="absolute right-3.5 bottom-3.5 text-[9px] font-bold text-slate-400 font-display select-none">
                    {watchedNotes.length} / 1000
                  </div>
                </div>
              </InputWrapper>
            </div>
          </div>

          {/* Card Section 5: Consent & Confirmation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-[0_10px_35px_rgba(79,94,84,0.02)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100/70">
              <span className="text-xl sm:text-2xl" role="img" aria-label="Consent">✅</span>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base font-display">
                Consent & Confirmation
              </h3>
            </div>

            <div className="space-y-4">
              <CheckboxInput
                error={errors.consentAccurate}
                {...register('consentAccurate', {
                  required: 'You must confirm the accuracy of the information provided'
                })}
              >
                I confirm that the information provided is accurate. <span className="text-rose-500 font-bold">*</span>
              </CheckboxInput>

              <CheckboxInput
                error={errors.consentPrivacy}
                {...register('consentPrivacy', {
                  required: 'You must agree to the Privacy Policy'
                })}
              >
                I have read and agree to the{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#3B8A4C] hover:underline font-extrabold cursor-pointer"
                >
                  Privacy Policy
                </a>
                . <span className="text-rose-500 font-bold">*</span>
              </CheckboxInput>

              <CheckboxInput
                error={errors.consentTerms}
                {...register('consentTerms', {
                  required: 'You must agree to the Terms & Conditions'
                })}
              >
                I have read and agree to the{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#3B8A4C] hover:underline font-extrabold cursor-pointer"
                >
                  Terms & Conditions
                </a>
                . <span className="text-rose-500 font-bold">*</span>
              </CheckboxInput>
            </div>
          </div>

        </div>

      </div>
    </form>
  );
};

export default QuestionnaireForm;
