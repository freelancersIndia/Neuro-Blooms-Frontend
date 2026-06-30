import { create } from 'zustand';

const initialPatientInfo = {
  parent_first_name: '',
  parent_last_name: '',
  relationship_to_child: 'MOTHER',
  mobile_number: '',
  alternate_mobile_number: '',
  email: '',
  child_first_name: '',
  child_last_name: '',
  date_of_birth: '',
  gender: 'MALE',
  appointment_type: 'INITIAL_CONSULTATION',
  primary_concern: '',
  additional_notes: '',
  referral_source: '',
};

export const useBookingStore = create((set) => ({
  step: 1,
  doctor: null,
  date: null,
  slot: null,
  patientInfo: initialPatientInfo,

  setStep: (step) => set({ step }),

  setDoctor: (doctor) =>
    set((state) => {
      // If the selected doctor changes, reset date and slot
      if (state.doctor?.id === doctor?.id) return {};
      return {
        doctor,
        date: null,
        slot: null,
      };
    }),

  setDate: (date) =>
    set((state) => {
      // If the selected date changes, reset slot
      if (state.date === date) return {};
      return {
        date,
        slot: null,
      };
    }),

  setSlot: (slot) => set({ slot }),

  setPatientInfo: (info) =>
    set((state) => ({
      patientInfo: { ...state.patientInfo, ...info },
    })),

  resetStore: () =>
    set({
      step: 1,
      doctor: null,
      date: null,
      slot: null,
      patientInfo: initialPatientInfo,
    }),
}));
