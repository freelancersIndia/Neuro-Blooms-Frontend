import React from 'react';
import { User, Pencil } from 'lucide-react';
import { UploadPlaceholder } from './UploadPlaceholder';

export const PersonalInformationCard = ({ register, errors, avatarUrl, onUploadClick }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex flex-col gap-4 text-left">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
        <User className="w-4.5 h-4.5 text-admin-blue-600" />
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Personal Information
        </h3>
      </div>

      {/* Fields: First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black text-slate-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('firstName')}
            placeholder="John"
            className={`w-full bg-slate-50/50 hover:bg-slate-50 border rounded-[14px] px-3.5 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
              errors?.firstName 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                : 'border-slate-205 focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10'
            }`}
          />
          {errors?.firstName && (
            <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.firstName.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black text-slate-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('lastName')}
            placeholder="Doe"
            className={`w-full bg-slate-50/50 hover:bg-slate-50 border rounded-[14px] px-3.5 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
              errors?.lastName 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                : 'border-slate-205 focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10'
            }`}
          />
          {errors?.lastName && (
            <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.lastName.message}</span>
          )}
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="flex flex-col gap-1.5 mt-1">
        <label className="text-xs font-black text-slate-700">
          Profile Image
        </label>
        
        <div className="flex items-center gap-6 mt-1">
          {/* Dotted Upload Box */}
          <UploadPlaceholder onUploadClick={onUploadClick} hasError={!!errors?.avatarFile} />

          {/* Preview Avatar with Edit Pen Icon overlay */}
          <div className="relative flex-shrink-0 cursor-pointer" onClick={onUploadClick}>
            <div className={`w-20 h-20 rounded-full border overflow-hidden shadow-sm transition-all flex items-center justify-center ${
              errors?.avatarFile 
                ? 'border-red-400 ring-2 ring-red-100' 
                : 'border-slate-100'
            } ${!avatarUrl ? 'bg-slate-50' : ''}`}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-slate-400" />
              )}
            </div>
            
            {/* Overlay Edit Button */}
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow hover:text-slate-750 transition-colors">
              <Pencil className="w-3 h-3" />
            </div>
          </div>
        </div>
        {errors?.avatarFile && (
          <span className="text-[10px] font-bold text-red-500 mt-1">{errors.avatarFile.message}</span>
        )}
      </div>
    </div>
  );
};

export default PersonalInformationCard;
