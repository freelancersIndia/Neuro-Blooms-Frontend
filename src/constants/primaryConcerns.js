export const PRIMARY_CONCERNS = {
  SPEECH_DELAY: 'Speech Delay',
  AUTISM_ASSESSMENT: 'Autism Assessment',
  DEVELOPMENTAL_DELAY: 'Developmental Delay',
  BEHAVIOURAL_CONCERNS: 'Behavioural Concerns',
  OCCUPATIONAL_THERAPY: 'Occupational Therapy',
  OTHER: 'Other'
};

export const CONCERN_STYLES = {
  [PRIMARY_CONCERNS.SPEECH_DELAY]: {
    bg: 'bg-blue-50/80 border-blue-100/60',
    text: 'text-blue-600',
    border: 'border-blue-200'
  },
  [PRIMARY_CONCERNS.AUTISM_ASSESSMENT]: {
    bg: 'bg-purple-50/80 border-purple-100/60',
    text: 'text-[#7C3AED]',
    border: 'border-purple-200'
  },
  [PRIMARY_CONCERNS.DEVELOPMENTAL_DELAY]: {
    bg: 'bg-rose-50/80 border-rose-100/60',
    text: 'text-rose-600',
    border: 'border-rose-200'
  },
  [PRIMARY_CONCERNS.BEHAVIOURAL_CONCERNS]: {
    bg: 'bg-amber-50/80 border-amber-100/60',
    text: 'text-amber-600',
    border: 'border-amber-200'
  },
  [PRIMARY_CONCERNS.OCCUPATIONAL_THERAPY]: {
    bg: 'bg-teal-50/80 border-teal-100/60',
    text: 'text-teal-600',
    border: 'border-teal-200'
  },
  [PRIMARY_CONCERNS.OTHER]: {
    bg: 'bg-slate-50 border-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200'
  }
};

export default PRIMARY_CONCERNS;
