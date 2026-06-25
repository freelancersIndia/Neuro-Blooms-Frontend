import React from 'react';
import { Camera, Mail, Phone, Lock, Unlock, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserRoleBadge } from './UserRoleBadge';

export const ProfileHeader = ({ user, onUploadPhotoClick, onLockToggle, onDeleteClick, onEditClick }) => {
  const {
    id,
    fullName,
    email,
    phone,
    avatar,
    status,
    roles = [],
    joinedDate,
    accountLockStatus
  } = user;

  const handlePhotoClick = () => {
    console.log('Upload Photo Clicked');
    if (onUploadPhotoClick) onUploadPhotoClick();
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm flex flex-col xl:flex-row justify-between items-stretch gap-6 text-left">
      
      {/* Left Section: Avatar & Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        
        {/* Large Avatar with camera overlay */}
        <div className="relative cursor-pointer group flex-shrink-0" onClick={handlePhotoClick}>
          <div className="w-24 h-24 rounded-full border border-slate-150 overflow-hidden shadow-sm">
            <img
              src={avatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&h=256&q=80"}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Camera Overlay */}
          <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-md group-hover:text-slate-800 transition-colors">
            <Camera className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Basic Details */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-black text-slate-800 font-display tracking-tight leading-none">
              {fullName}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100/50 leading-none mt-1 sm:mt-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {status}
            </span>
          </div>

          {/* Contact and Metadata */}
          <div className="flex flex-col gap-1.5 mt-3 text-xs font-semibold text-slate-500">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{email}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{phone}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex flex-row items-center xl:justify-end gap-3 self-center xl:self-auto w-full xl:w-auto justify-center">
        {/* Update Details Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEditClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-admin-blue-600 hover:bg-admin-blue-700 text-white text-xs font-black rounded-xl shadow-sm hover:shadow transition-all cursor-pointer select-none w-full sm:w-auto"
        >
          <Edit2 className="w-4 h-4 text-white" />
          <span>Update Details</span>
        </motion.button>

        {/* Lock/Unlock Button */}
        {accountLockStatus === 'Locked' ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLockToggle}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-sm hover:shadow transition-all cursor-pointer select-none w-full sm:w-auto"
          >
            <Unlock className="w-4 h-4 text-white" />
            <span>Unlock User</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLockToggle}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-black rounded-xl shadow-sm hover:shadow transition-all cursor-pointer select-none w-full sm:w-auto"
          >
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Lock User</span>
          </motion.button>
        )}

        {/* Delete User Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDeleteClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-sm hover:shadow transition-all cursor-pointer select-none w-full sm:w-auto"
        >
          <Trash2 className="w-4 h-4 text-white" />
          <span>Delete User</span>
        </motion.button>
      </div>

    </div>
  );
};

export default ProfileHeader;

