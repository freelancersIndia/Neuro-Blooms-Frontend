import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const QuestionnaireForm = ({ onSubmit, onFormValuesChange, defaultValues }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parentName: defaultValues?.parentName || '',
      phone: defaultValues?.phone || '',
      email: defaultValues?.email || '',
      childName: defaultValues?.childName || '',
      childGender: defaultValues?.childGender || '',
      childAge: defaultValues?.childAge || '',
      childDob: defaultValues?.childDob || '',
      consultationReason: defaultValues?.consultationReason || '',
      concerns: defaultValues?.concerns || [],
      noticePeriod: defaultValues?.noticePeriod || '',
      previousTherapy: defaultValues?.previousTherapy || '',
      schoolingStatus: defaultValues?.schoolingStatus || '',
      notes: defaultValues?.notes || '',
    }
  });

  const watchedValues = watch();

  // Watch form inputs in real-time and bubble values up to the parent modal for the Summary Card
  useEffect(() => {
    if (onFormValuesChange) {
      onFormValuesChange(watchedValues);
    }
  }, [JSON.stringify(watchedValues), onFormValuesChange]);

  const consultationReasons = [
    'Autism Concerns',
    'ADHD Concerns',
    'Speech Delay',
    'Learning Difficulties',
    'Behavioral Concerns',
    'Developmental Delay',
    'High-Risk Follow-up',
    'Other'
  ];

  const developmentConcerns = [
    'Poor Eye Contact',
    'Speech Delay',
    'Hyperactivity',
    'Difficulty Following Instructions',
    'Social Interaction Issues',
    'Academic Concerns',
    'Aggressive Behaviour',
    'Sensory Issues',
    'Other Concerns'
  ];

  const selectedReason = watch('consultationReason');
  const selectedConcerns = watch('concerns') || [];

  const handleToggleConcern = (concern) => {
    if (selectedConcerns.includes(concern)) {
      setValue('concerns', selectedConcerns.filter(c => c !== concern));
    } else {
      setValue('concerns', [...selectedConcerns, concern]);
    }
  };

  return (
    <form id="questionnaire-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT BLOCK: Parent Details & Child Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Parent Details */}
            <div className="space-y-3.5 bg-slate-50/35 border border-slate-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-[#2E7D32] font-extrabold text-xs sm:text-sm font-display">
                <span className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[10px] border border-[#A5D6A7]/20">1</span>
                <span>Parent Details</span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Parent Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={`px-3 py-2 text-xs sm:text-sm border rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] ${errors.parentName ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    {...register('parentName', { required: 'Parent name is required' })}
                  />
                  {errors.parentName && <span className="text-[9px] text-rose-500 font-bold">{errors.parentName.message}</span>}
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className={`px-3 py-2 text-xs sm:text-sm border rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] ${errors.phone ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: { value: /^[+]?[0-9\s\-()]{7,18}$/, message: 'Invalid phone format' }
                    })}
                  />
                  {errors.phone && <span className="text-[9px] text-rose-500 font-bold">{errors.phone.message}</span>}
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Email Address *</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className={`px-3 py-2 text-xs sm:text-sm border rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] ${errors.email ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    {...register('email', { 
                      required: 'Email address is required',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
                    })}
                  />
                  {errors.email && <span className="text-[9px] text-rose-500 font-bold">{errors.email.message}</span>}
                </div>
              </div>
            </div>

            {/* 2. Child Details */}
            <div className="space-y-3.5 bg-slate-50/35 border border-slate-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-[#2E7D32] font-extrabold text-xs sm:text-sm font-display">
                <span className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[10px] border border-[#A5D6A7]/20">2</span>
                <span>Child Details</span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Child Name *</label>
                  <input
                    type="text"
                    placeholder="Enter child's name"
                    className={`px-3 py-2 text-xs sm:text-sm border rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] ${errors.childName ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    {...register('childName', { required: 'Child name is required' })}
                  />
                  {errors.childName && <span className="text-[9px] text-rose-500 font-bold">{errors.childName.message}</span>}
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Gender *</label>
                    <select
                      className={`px-3 py-2 text-xs border rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] ${errors.childGender ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                      {...register('childGender', { required: 'Required' })}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Age *</label>
                    <select
                      className={`px-3 py-2 text-xs border rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] ${errors.childAge ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                      {...register('childAge', { required: 'Required' })}
                    >
                      <option value="">Select age</option>
                      {Array.from({ length: 18 }).map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1} Years</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Date of Birth *</label>
                  <input
                    type="date"
                    className={`px-3 py-2 text-xs sm:text-sm border rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] ${errors.childDob ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    {...register('childDob', { required: 'Date of birth is required' })}
                  />
                  {errors.childDob && <span className="text-[9px] text-rose-500 font-bold">{errors.childDob.message}</span>}
                </div>
              </div>
            </div>

          </div>

          {/* 4. Development Concerns */}
          <div className="space-y-3.5 bg-slate-50/35 border border-slate-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-[#2E7D32] font-extrabold text-xs sm:text-sm font-display">
              <span className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[10px] border border-[#A5D6A7]/20">4</span>
              <span>Development Concerns <span className="text-[10px] text-slate-400 font-semibold">(Select all that apply)</span></span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {developmentConcerns.map((concern) => {
                const isChecked = selectedConcerns.includes(concern);
                return (
                  <div 
                    key={concern}
                    onClick={() => handleToggleConcern(concern)}
                    className={`flex items-center gap-2 px-3 py-2 border rounded-xl cursor-pointer select-none transition-all ${
                      isChecked 
                        ? 'border-[#3B8A4C] bg-emerald-50/10 text-emerald-800' 
                        : 'border-slate-150 bg-white text-slate-600 hover:border-slate-250'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="accent-[#3B8A4C] h-3.5 w-3.5"
                    />
                    <span className="text-[10px] sm:text-xs font-semibold leading-tight">{concern}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT BLOCK: Reason for Consultation & Additional Info */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 3. Reason for Consultation */}
          <div className="space-y-3.5 bg-slate-50/35 border border-slate-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-[#2E7D32] font-extrabold text-xs sm:text-sm font-display">
              <span className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[10px] border border-[#A5D6A7]/20">3</span>
              <span>Reason for Consultation *</span>
            </div>
            {errors.consultationReason && <span className="text-[9px] text-rose-500 font-bold block">{errors.consultationReason.message}</span>}
            <div className="grid grid-cols-2 gap-2">
              {consultationReasons.map((reason) => {
                const isSelected = selectedReason === reason;
                return (
                  <div
                    key={reason}
                    onClick={() => setValue('consultationReason', reason, { shouldValidate: true })}
                    className={`py-2 px-2.5 rounded-xl border flex items-center gap-2 text-left cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#3B8A4C] border-[#3B8A4C] text-white shadow-sm' 
                        : 'bg-white border-slate-150 text-slate-600 hover:border-slate-250'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-white bg-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#3B8A4C]" />}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold leading-tight">{reason}</span>
                  </div>
                );
              })}
            </div>
            {/* Keep registered but hidden element */}
            <input type="hidden" {...register('consultationReason', { required: 'Please select a reason' })} />
          </div>

          {/* 5. Additional Information */}
          <div className="space-y-3.5 bg-slate-50/35 border border-slate-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-[#2E7D32] font-extrabold text-xs sm:text-sm font-display">
              <span className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[10px] border border-[#A5D6A7]/20">5</span>
              <span>Additional Information</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-col space-y-1">
                <label className="text-[11px] font-bold text-slate-500">When did you first notice the concern? *</label>
                <select
                  className={`px-3 py-2 text-xs border rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] ${errors.noticePeriod ? 'border-rose-400' : 'border-slate-200'}`}
                  {...register('noticePeriod', { required: 'Required' })}
                >
                  <option value="">Select an option</option>
                  <option value="Recently (Past few weeks)">Recently (Past few weeks)</option>
                  <option value="Few months ago">Few months ago</option>
                  <option value="Over a year ago">Over a year ago</option>
                  <option value="Since infancy/early toddlerhood">Since infancy/early toddlerhood</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Has your child received therapy before? *</label>
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700">
                    <input 
                      type="radio" 
                      value="Yes" 
                      className="accent-[#3B8A4C]"
                      {...register('previousTherapy', { required: 'Required' })}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700">
                    <input 
                      type="radio" 
                      value="No" 
                      className="accent-[#3B8A4C]"
                      {...register('previousTherapy', { required: 'Required' })}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Current Schooling Status *</label>
                <select
                  className={`px-3 py-2 text-xs border rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] ${errors.schoolingStatus ? 'border-rose-400' : 'border-slate-200'}`}
                  {...register('schoolingStatus', { required: 'Required' })}
                >
                  <option value="">Select an option</option>
                  <option value="Not yet school age">Not yet school age</option>
                  <option value="Play school / Pre-KG">Play school / Pre-KG</option>
                  <option value="Kindergarten (LKG/UKG)">Kindergarten (LKG/UKG)</option>
                  <option value="Primary School">Primary School</option>
                  <option value="Homeschooled">Homeschooled</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[11px] font-bold text-slate-500 font-display">Additional Notes</label>
                <textarea
                  placeholder="Share any additional information..."
                  rows={2}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white w-full outline-none focus:border-[#3B8A4C] resize-none"
                  {...register('notes')}
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </form>
  );
};

export default QuestionnaireForm;
