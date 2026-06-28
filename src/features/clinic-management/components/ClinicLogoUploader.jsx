import React, { useState, useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';

export const ClinicLogoUploader = ({
  logo,
  onChange,
  error,
  disabled = false,
  isUploading = false,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const validateAndProcessFile = (file) => {
    if (!file) return;

    // Check size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      onChange(null, 'File size exceeds 2 MB.');
      return;
    }

    // Check format
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      onChange(null, 'Invalid logo format. Allowed: PNG, JPG, SVG.');
      return;
    }

    onChange(file, null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (disabled || isUploading) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (disabled || isUploading) return;

    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null, null); // Clear logo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (disabled || isUploading) return;
    fileInputRef.current.click();
  };

  // Helper to format file size
  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes) return '0 Bytes';
    if (typeof bytes === 'string') return bytes;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Determine logo preview properties
  let logoPreviewUrl = null;
  let logoName = 'No logo uploaded';
  let logoDetails = 'Recommended: 300x300px';

  if (logo) {
    if (logo instanceof File) {
      logoPreviewUrl = URL.createObjectURL(logo);
      logoName = logo.name;
      logoDetails = `${logo.type.split('/')[1]?.toUpperCase() || 'IMAGE'} • ${formatBytes(logo.size)}`;
    } else if (typeof logo === 'string') {
      logoPreviewUrl = logo;
      logoName = logo.substring(logo.lastIndexOf('/') + 1) || 'clinic-logo.png';
      logoDetails = 'Current Clinic Logo';
    }
  }

  return (
    <div className="flex flex-col gap-1.5 w-full text-left font-display">
      <span className="text-sm font-semibold text-[#0F172A]">Clinic Logo</span>
      <span className="text-xs text-[#64748B] -mt-1 leading-normal">
        Upload your clinic logo. Recommended size: 300x300px
      </span>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`w-full min-h-[100px] rounded-2xl border-2 border-dashed flex items-center p-4 transition-all duration-200 bg-white cursor-pointer relative
          ${isDragActive ? 'border-[#7C3AED] bg-purple-50/20' : 'border-[#CBD5E1] hover:border-slate-400'}
          ${disabled || isUploading ? 'bg-slate-50 cursor-not-allowed opacity-75' : ''}
          ${error ? 'border-red-500 hover:border-red-500' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.svg"
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 py-4">
            <Loader2 className="animate-spin text-[#7C3AED]" size={24} />
            <span className="text-xs font-semibold text-[#7C3AED]">Uploading logo...</span>
          </div>
        ) : logoPreviewUrl ? (
          <div className="flex-1 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 overflow-hidden min-w-0">
              <div className="w-14 h-14 rounded-xl border border-slate-100 bg-[#F8FAFC] flex items-center justify-center p-1.5 flex-shrink-0">
                <img
                  src={logoPreviewUrl}
                  alt="Clinic Logo Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col overflow-hidden text-left">
                <span className="text-sm font-bold text-[#0F172A] truncate pr-2">
                  {logoName}
                </span>
                <span className="text-xs font-semibold text-[#94A3B8] mt-0.5">
                  {logoDetails}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 hover:bg-[#FEF2F2] hover:border-red-100 hover:text-[#DC2626] transition-colors focus:outline-none flex-shrink-0"
              title="Remove Logo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 py-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#94A3B8]">
              <Upload size={18} />
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-[#7C3AED] hover:underline">
                Click to upload
              </span>
              <span className="text-xs font-medium text-[#64748B]"> or drag and drop</span>
            </div>
          </div>
        )}
      </div>

      {/* Upload button wrapper below as requested */}
      <div className="mt-1 flex flex-col gap-2">
        <button
          type="button"
          disabled={disabled || isUploading}
          onClick={triggerFileInput}
          className="w-full sm:w-auto h-10 inline-flex items-center justify-center gap-2 px-6 rounded-xl border border-[#7C3AED] text-sm font-bold text-[#7C3AED] bg-white hover:bg-purple-50/50 transition-colors focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload size={16} />
          Upload New Logo
        </button>

        <span className="text-[11px] font-semibold text-[#94A3B8]">
          Allowed formats: PNG, JPG, SVG. Max size: 2MB
        </span>
      </div>

      {error && (
        <span className="text-xs font-semibold text-red-500 flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
          {error}
        </span>
      )}
    </div>
  );
};

export default ClinicLogoUploader;
