import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Mail, Phone, Calendar } from 'lucide-react';

export const UserDetailsPlaceholder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] w-full mx-auto px-8 py-8 flex flex-col gap-6 select-none font-body text-left">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/users')}
          className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
            User Profile Console
          </h1>
          <p className="text-xs font-semibold text-slate-450">
            Internal administrative details for User ID: <span className="font-mono text-indigo-600 font-bold">{id}</span>
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm flex flex-col items-center justify-center text-center max-w-xl mx-auto mt-12 gap-5">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <User className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-black text-slate-900 font-display">
            User Profile Under Construction
          </h3>
          <p className="text-xs font-semibold text-slate-450 leading-relaxed max-w-sm">
            This is a placeholder for the detailed user profile console. The "All Users" list provides full administrative control (create, update, lock, unlock, and delete).
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/users')}
          className="h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm shadow-indigo-600/10"
        >
          Back to Users Directory
        </button>
      </div>
    </div>
  );
};

export default UserDetailsPlaceholder;
