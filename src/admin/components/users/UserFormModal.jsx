import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { ModalHeader } from './components/ModalHeader';
import { PersonalInformationCard } from './components/PersonalInformationCard';
import { ContactInformationCard } from './components/ContactInformationCard';
import { AccountStatusCard } from './components/AccountStatusCard';
import { AccountInformationCard } from './components/AccountInformationCard';
import { RolesCard } from './components/RolesCard';
import { AccountSummaryCard } from './components/AccountSummaryCard';
import { FooterActions } from './components/FooterActions';
import { createUserDummy } from './data/createUserDummy';
import { userDetails } from '../../pages/users/data/userDetails';
import userService from '../../services/user.service';

// Validation Schema using Zod
const userFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().optional(),
  countryCode: z.string().default('+91'),
  username: z.string().optional(),
  status: z.enum(['Active', 'Disabled']).default('Active'),
  roles: z.array(z.string()).min(1, 'At least one role must be selected'),
  emailVerified: z.boolean().default(false),
  forcePasswordChange: z.boolean().default(true),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  avatar: z.string().optional(),
  avatarFile: z.any().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword']
});

// Manual resolver for React Hook Form + Zod
const zodResolver = (schema) => async (values) => {
  try {
    const validatedData = schema.parse(values);
    return {
      values: validatedData,
      errors: {}
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors = {};
      err.errors.forEach((zodError) => {
        const field = zodError.path[0];
        errors[field] = {
          type: 'validation',
          message: zodError.message
        };
      });
      return {
        values: {},
        errors
      };
    }
    return {
      values: {},
      errors: { form: { message: 'Unexpected validation error' } }
    };
  }
};

export const UserFormModal = ({ isOpen, onClose, onSuccess, mode = 'create', userData = null }) => {
  const isEdit = mode === 'edit';
  const targetUser = userData || userDetails;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: isEdit ? targetUser.firstName : '',
      lastName: isEdit ? targetUser.lastName : '',
      email: isEdit ? targetUser.email : '',
      phone: isEdit ? targetUser.phone : '',
      countryCode: isEdit ? targetUser.countryCode : '+91',
      username: isEdit ? targetUser.username : '',
      status: isEdit ? targetUser.status : 'Active',
      roles: isEdit ? targetUser.roles : [],
      emailVerified: isEdit ? targetUser.emailVerified : false,
      forcePasswordChange: isEdit ? targetUser.forcePasswordChange : true,
      password: isEdit ? 'Dr@783#Kd2' : '',
      confirmPassword: isEdit ? 'Dr@783#Kd2' : '',
      avatar: isEdit ? targetUser.avatar : '',
      avatarFile: null
    }
  });

  // Watch entire form value set for live summary card preview
  const formValues = watch();

  // Watch password fields for password verification badge
  const watchedPassword = watch('password');
  const watchedConfirmPassword = watch('confirmPassword');
  const watchedEmail = watch('email');

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        console.log('Escape Pressed');
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form when modal opens/closes or when mode changes
  useEffect(() => {
    if (isOpen) {
      reset({
        firstName: isEdit ? targetUser.firstName : '',
        lastName: isEdit ? targetUser.lastName : '',
        email: isEdit ? targetUser.email : '',
        phone: isEdit ? targetUser.phone : '',
        countryCode: isEdit ? targetUser.countryCode : '+91',
        username: isEdit ? targetUser.username : '',
        status: isEdit ? targetUser.status : 'Active',
        roles: isEdit ? targetUser.roles : [],
        emailVerified: isEdit ? targetUser.emailVerified : false,
        forcePasswordChange: isEdit ? targetUser.forcePasswordChange : true,
        password: isEdit ? 'Dr@783#Kd2' : '',
        confirmPassword: isEdit ? 'Dr@783#Kd2' : '',
        avatar: isEdit ? targetUser.avatar : '',
        avatarFile: null
      });
    }
  }, [isOpen, isEdit, reset, targetUser]);

  const onSubmit = async (data) => {
    if (isEdit) {
      try {
        const hasImage = data.avatarFile instanceof File;
        const payload = {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: data.phone ? `${data.countryCode}${data.phone}` : null,
          roles: data.roles,
          is_active: data.status === 'Active',
          is_verified: data.emailVerified,
        };
        if (hasImage) {
          payload.profile_image = data.avatarFile;
        }

        const response = await userService.updateUser(targetUser.id, payload);
        if (response && response.success) {
          toast.success(response.message || 'User updated successfully.');
          if (onSuccess) {
            onSuccess();
          }
          onClose();
        } else {
          toast.error(response?.message || 'Failed to update user.');
        }
      } catch (err) {
        console.error('Error updating user:', err);
        const apiErrors = err.response?.data?.errors;
        if (apiErrors) {
          Object.entries(apiErrors).forEach(([field, messages]) => {
            const msg = Array.isArray(messages) ? messages[0] : messages;
            const fieldMap = {
              first_name: 'firstName',
              last_name: 'lastName',
              email: 'email',
              phone_number: 'phone',
              roles: 'roles',
              is_active: 'status',
              is_verified: 'emailVerified',
            };
            const formField = fieldMap[field] || field;
            setError(formField, {
              type: 'server',
              message: msg
            });
          });
          toast.error('Validation failed. Please check the form.');
        } else {
          toast.error(err.message || 'An error occurred while updating the user.');
        }
      }
    } else {
      try {
        const payload = {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: data.phone ? `${data.countryCode}${data.phone}` : null,
          password: data.password,
          roles: data.roles,
          is_active: data.status === 'Active',
          is_verified: data.emailVerified,
          profile_image: data.avatarFile,
        };

        const response = await userService.createUser(payload);
        if (response && response.success) {
          toast.success(response.message || 'User created successfully.');
          if (onSuccess) {
            onSuccess();
          }
          onClose();
        } else {
          toast.error(response?.message || 'Failed to create user.');
        }
      } catch (err) {
        console.error('Error creating user:', err);
        const apiErrors = err.response?.data?.errors;
        if (apiErrors) {
          // Display specific field errors from the API
          Object.entries(apiErrors).forEach(([field, messages]) => {
            const msg = Array.isArray(messages) ? messages[0] : messages;
            const fieldMap = {
              first_name: 'firstName',
              last_name: 'lastName',
              email: 'email',
              phone_number: 'phone',
              password: 'password',
              roles: 'roles',
              is_active: 'status',
              is_verified: 'emailVerified',
            };
            const formField = fieldMap[field] || field;
            setError(formField, {
              type: 'server',
              message: msg
            });
          });
          toast.error('Validation failed. Please check the form.');
        } else {
          toast.error(err.message || 'An error occurred while creating the user.');
        }
      }
    }
  };

  const onInvalid = (formErrors) => {
    console.log('Form Validation Errors:', formErrors);
    toast.error('Please enter all mandatory fields and correct any errors.');
  };

  const fileInputRef = React.useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('avatarFile', {
          type: 'manual',
          message: 'Image size must be less than 5MB'
        });
        setValue('avatarFile', null);
        setValue('avatar', ''); // Reset preview
        return;
      }
      clearErrors('avatarFile');
      setValue('avatarFile', file);
      const previewUrl = URL.createObjectURL(file);
      setValue('avatar', previewUrl);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F172A]/35 backdrop-blur-md cursor-default"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[1120px] max-w-[95vw] max-h-[92vh] bg-white rounded-[28px] shadow-2xl p-6 md:p-8 flex flex-col z-50 overflow-hidden relative"
          >
            {/* Header */}
            <ModalHeader onClose={onClose} mode={mode} />

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch pb-2">
                  
                  {/* Left Column (40% / Span 5) */}
                  <div className="lg:col-span-5 flex flex-col gap-5">
                    <PersonalInformationCard
                      register={register}
                      errors={errors}
                      avatarUrl={formValues.avatar}
                      onUploadClick={handleUploadClick}
                    />

                    <ContactInformationCard
                      register={register}
                      errors={errors}
                      watchedEmail={watchedEmail}
                    />

                    <AccountStatusCard
                      status={formValues.status}
                      setStatus={(val) => setValue('status', val)}
                      emailVerified={formValues.emailVerified}
                      setEmailVerified={(val) => setValue('emailVerified', val)}
                      forcePasswordChange={formValues.forcePasswordChange}
                      setForcePasswordChange={(val) => setValue('forcePasswordChange', val)}
                      isEdit={isEdit}
                    />
                  </div>

                  {/* Middle Column (35% / Span 4) */}
                  <div className="lg:col-span-4 flex flex-col gap-5 h-full">
                    <AccountInformationCard
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      watchedPassword={watchedPassword}
                      watchedConfirmPassword={watchedConfirmPassword}
                      isEdit={isEdit}
                    />

                    <RolesCard
                      selectedRoles={formValues.roles || []}
                      onChange={(newRoles) => setValue('roles', newRoles, { shouldValidate: true })}
                      error={errors.roles}
                      className="flex-1"
                    />
                  </div>

                  {/* Right Summary Column (25% / Span 3) */}
                  <div className="md:col-span-2 lg:col-span-3 h-full">
                    <AccountSummaryCard formValues={formValues} />
                  </div>

                </div>
              </div>

              {/* Footer */}
              <FooterActions onCancel={onClose} isSubmitting={isSubmitting} mode={mode} />

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserFormModal;
