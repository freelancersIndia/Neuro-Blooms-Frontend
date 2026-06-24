import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MessageSquare, Send } from 'lucide-react';
import { submitContactForm } from '../../services/contact.service';

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading('Sending your message...');
    try {
      const response = await submitContactForm(data);
      if (response && response.success) {
        toast.success(response.message || 'Message sent successfully!', { id: toastId });
        reset();
      } else {
        toast.error('Failed to send message. Please try again.', { id: toastId });
      }
    } catch (error) {
      toast.error('An error occurred. Please check your connection and try again.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-6 lg:p-7 shadow-[0_15px_45px_rgba(79,94,84,0.08)] border border-slate-100/60 w-full select-none text-left">
      
      {/* Header Area */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#A5D6A7]/20">
          <MessageSquare className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="flex flex-col leading-snug">
          <h4 className="text-base sm:text-lg font-black text-slate-800 font-display">
            Send Us a Message
          </h4>
          <p className="text-xs text-slate-400 font-semibold">
            We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Row 1: Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full px-4 py-3 bg-[#FAF9F6]/50 hover:bg-[#FAF9F6] border rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B8A4C]/20 transition-all duration-200 ${
                errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-100/80 focus:border-[#3B8A4C]/60'
              }`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <span className="text-red-500 text-[10px] font-bold mt-1 pl-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="tel"
              placeholder="Phone Number"
              className={`w-full px-4 py-3 bg-[#FAF9F6]/50 hover:bg-[#FAF9F6] border rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B8A4C]/20 transition-all duration-200 ${
                errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-100/80 focus:border-[#3B8A4C]/60'
              }`}
              {...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9+\s-]{10,15}$/,
                  message: 'Invalid phone format',
                },
              })}
            />
            {errors.phone && (
              <span className="text-red-500 text-[10px] font-bold mt-1 pl-1">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Email */}
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email Address"
            className={`w-full px-4 py-3 bg-[#FAF9F6]/50 hover:bg-[#FAF9F6] border rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B8A4C]/20 transition-all duration-200 ${
              errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-100/80 focus:border-[#3B8A4C]/60'
            }`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address format',
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-[10px] font-bold mt-1 pl-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Row 3: Message Textarea */}
        <div className="flex flex-col">
          <textarea
            placeholder="How can we help you?"
            rows="4"
            className={`w-full px-4 py-3 bg-[#FAF9F6]/50 hover:bg-[#FAF9F6] border rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B8A4C]/20 transition-all duration-200 resize-none ${
              errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-slate-100/80 focus:border-[#3B8A4C]/60'
            }`}
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && (
            <span className="text-red-500 text-[10px] font-bold mt-1 pl-1">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] hover:from-[#327540] hover:to-[#255C31] text-white font-bold py-3 px-6 rounded-full inline-flex items-center justify-center gap-2.5 shadow-md shadow-emerald-950/10 hover:shadow-lg hover:shadow-emerald-950/20 active:scale-[0.98] hover:scale-[1.01] transition-all duration-300 w-full cursor-pointer mt-4 text-xs sm:text-sm disabled:opacity-75 disabled:pointer-events-none"
        >
          <Send className="w-4 h-4" />
          <span>Send Message</span>
        </button>

      </form>
    </div>
  );
};

export default ContactForm;
