import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ProfileHeader } from './components/ProfileHeader';
import { PersonalInformationCard } from './components/PersonalInformationCard';
import { AccountStatusCard } from './components/AccountStatusCard';
import { RolesCard } from './components/RolesCard';
import { UserFormModal } from '../../components/users/UserFormModal';
import userService from '../../services/user.service';
import LoadingScreen from '../../components/common/LoadingScreen';

export const UserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUserDetails(userId);
      if (response && response.success) {
        setUser(response.data);
      } else {
        setError(response?.message || 'Failed to load user details.');
      }
    } catch (err) {
      console.error('Error loading user details:', err);
      setError(err.message || 'An error occurred while fetching user details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleBack = () => {
    navigate('/admin/users');
  };

  const handleLockToggle = async () => {
    if (!user) return;
    const isCurrentlyLocked = user.accountLockStatus === 'Locked';
    try {
      let response;
      if (isCurrentlyLocked) {
        response = await userService.unlockUser(user.id);
      } else {
        response = await userService.lockUser(user.id);
      }
      
      if (response && response.success) {
        toast.success(response.message || `User account successfully ${isCurrentlyLocked ? 'unlocked' : 'locked'}.`);
        fetchUserDetails();
      } else {
        toast.error(response?.message || 'Lock toggle failed.');
      }
    } catch (err) {
      console.error('Lock toggle failed:', err);
      toast.error(err.response?.data?.message || err.message || 'An error occurred.');
    }
  };

  const handleDeleteUser = async () => {
    if (!user) return;
    if (window.confirm(`Are you sure you want to permanently delete the user "${user.fullName}"?`)) {
      try {
        const response = await userService.deleteUser(user.id);
        if (response && response.success) {
          toast.success(response.message || 'User deleted successfully.');
          navigate('/admin/users');
        } else {
          toast.error(response?.message || 'Failed to delete user.');
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        toast.error(err.response?.data?.message || err.message || 'An error occurred.');
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-white border border-red-100 rounded-3xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-base font-black text-slate-800 mb-1">Failed to Load User</h3>
        <p className="text-xs font-semibold text-slate-500 max-w-md mb-6">{error}</p>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-black text-slate-700 rounded-xl transition-all cursor-pointer"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-left pb-8">
      
      {/* 1. Breadcrumb & Back Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col text-left">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
            <span>Users</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
            <span className="text-slate-500">User Details</span>
          </div>
 
          {/* Back to Listing */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-white border border-slate-200 text-xs font-black text-slate-600 hover:text-slate-800 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer w-fit select-none"
          >
            <ArrowLeft className="w-4 h-4 text-slate-450" />
            <span>Back to Users</span>
          </motion.button>
        </div>
      </div>
 
      {/* 2. Horizontal Profile Header Card */}
      <ProfileHeader
        user={user}
        onUploadPhotoClick={() => console.log('Profile photo upload clicked')}
        onLockToggle={handleLockToggle}
        onDeleteClick={handleDeleteUser}
        onEditClick={() => setIsEditModalOpen(true)}
      />
 
      {/* 3. Three-Column Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6 items-start">
        
        {/* Left Column (40% / Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <PersonalInformationCard
            user={user}
            onEditClick={() => setIsEditModalOpen(true)}
          />
        </div>
 
        {/* Middle Column (35% / Span 3) */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
          <AccountStatusCard
            user={user}
            onEditClick={() => setIsEditModalOpen(true)}
          />
        </div>
 
        {/* Right Column (25% / Span 3) */}
        <div className="md:col-span-2 lg:col-span-3 h-full">
          <RolesCard user={user} />
        </div>
 
      </div>
 
      {/* Reusable Form Modal in Edit Mode */}
      <UserFormModal
        mode="edit"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchUserDetails}
        userData={user}
      />
 
    </div>
  );
};
 
export default UserDetailsPage;

