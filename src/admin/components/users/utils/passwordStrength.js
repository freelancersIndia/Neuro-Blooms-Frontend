export const checkPasswordStrength = (password) => {
  if (!password) return { label: 'Empty', color: 'text-slate-400', bg: 'bg-slate-200', width: 'w-0' };
  
  const length = password.length;
  let score = 0;
  
  if (length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score <= 2) {
    return { label: 'Weak', color: 'text-red-500', bg: 'bg-red-500', width: 'w-1/3' };
  } else if (score <= 4) {
    return { label: 'Medium', color: 'text-amber-500', bg: 'bg-amber-500', width: 'w-2/3' };
  } else {
    return { label: 'Strong', color: 'text-emerald-500', bg: 'bg-emerald-500', width: 'w-full' };
  }
};

export default checkPasswordStrength;
