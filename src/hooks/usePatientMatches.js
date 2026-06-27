import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import patientMatchingService from '../admin/services/patient-matching.service';

const mapRequestToUI = (req) => {
  if (!req) return null;
  
  // Calculate child age from date_of_birth
  let childAge = 'Unknown';
  if (req.date_of_birth) {
    try {
      const birthDate = new Date(req.date_of_birth);
      const diffMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(diffMs);
      const years = Math.abs(ageDate.getUTCFullYear() - 1970);
      childAge = `${years} Years`;
    } catch {}
  }
  
  // Map concern key to concern text label
  const concernMap = {
    'SPEECH_DELAY': 'Speech Delay',
    'AUTISM_ASSESSMENT': 'Autism Assessment',
    'DEVELOPMENTAL_DELAY': 'Developmental Delay',
    'BEHAVIOURAL_CONCERNS': 'Behavioural Concerns',
    'OCCUPATIONAL_THERAPY': 'Occupational Therapy',
    'OTHER': 'Other'
  };

  const primaryConcern = concernMap[req.primary_concern] || req.primary_concern || 'Other';

  // Map gender to capitalised label
  const childGender = req.gender === 'FEMALE' ? 'Female' : 'Male';

  // Map relationship to capitalised label
  const relationship = req.relationship_to_child 
    ? req.relationship_to_child.charAt(0).toUpperCase() + req.relationship_to_child.slice(1).toLowerCase() 
    : 'Father';

  // Format preferred_date to UI date
  let preferredDate = req.preferred_date;
  if (req.preferred_date) {
    try {
      const date = new Date(req.preferred_date);
      preferredDate = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {}
  }

  return {
    id: req.id,
    requestNumber: req.request_number,
    parentName: `${req.parent_first_name || ''} ${req.parent_last_name || ''}`.trim(),
    relationship,
    parentPhone: req.mobile_number || '',
    parentEmail: req.email || '',
    childName: `${req.child_first_name || ''} ${req.child_last_name || ''}`.trim(),
    childAge,
    childGender,
    childDob: req.date_of_birth || '',
    appointmentType: req.appointment_type || '',
    primaryConcern,
    preferredDate,
    preferredTime: req.preferred_time_slot || '',
    additionalNotes: req.additional_notes || '',
    status: req.status || 'PENDING',
    referralSource: req.referral_source || ''
  };
};

const mapMatchingPatientToUI = (item) => {
  const p = item.patient;
  let ageStr = 'Unknown';
  if (p.date_of_birth || p.dob) {
    try {
      const birthDate = new Date(p.date_of_birth || p.dob);
      const diffMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(diffMs);
      const years = Math.abs(ageDate.getUTCFullYear() - 1970);
      ageStr = `${years} Years`;
    } catch {}
  } else if (p.age) {
    ageStr = typeof p.age === 'number' ? `${p.age} Years` : p.age;
  }

  const relationship = p.relationship_to_child
    ? p.relationship_to_child.charAt(0).toUpperCase() + p.relationship_to_child.slice(1).toLowerCase()
    : 'Parent';

  return {
    id: p.patient_number || p.id,
    realId: p.id, // backend UUID to use in link/post calls
    name: `${p.child_first_name || ''} ${p.child_last_name || ''}`.trim(),
    gender: p.gender === 'FEMALE' ? 'Female' : 'Male',
    age: ageStr,
    parentName: `${p.parent_first_name || ''} ${p.parent_last_name || ''}`.trim(),
    relationship,
    parentPhone: p.mobile_number || '',
    dob: p.date_of_birth || p.dob || '',
    lastVisit: p.last_visit || 'N/A',
    score: item.score,
    confidenceLabel: item.confidence_level || (item.score >= 90 ? 'Very High Match' : item.score >= 70 ? 'High Match' : 'Medium Match'),
    confidenceText: item.score >= 90 ? 'Best Match' : 'Possible Match',
    avatar: p.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };
};

export const mapPatientPreviewToUI = (data, score = null) => {
  if (!data) return null;
  const childName = `${data.child?.first_name || ''} ${data.child?.last_name || ''}`.trim();
  const parentName = `${data.parent?.first_name || ''} ${data.parent?.last_name || ''}`.trim();
  const relationship = data.parent?.relationship
    ? data.parent.relationship.charAt(0).toUpperCase() + data.parent.relationship.slice(1).toLowerCase()
    : 'Parent';

  return {
    id: data.patient_id,
    avatar: data.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    name: childName,
    gender: data.gender === 'FEMALE' ? 'Female' : 'Male',
    age: `${data.age} Years`,
    score: score,
    dob: data.dob,
    lastVisit: data.last_visit || 'N/A',
    parentName,
    relationship,
    parentPhone: data.phone,
    parentEmail: data.email
  };
};

export const usePatientMatches = (requestId) => {
  return useQuery({
    queryKey: ['patientMatches', requestId],
    queryFn: async () => {
      const response = await patientMatchingService.loadPatientMatchingScreen(requestId);
      if (response && response.success) {
        const req = mapRequestToUI(response.data.appointment_request);
        const matches = (response.data.matching_patients || []).map(mapMatchingPatientToUI);
        return {
          request: req,
          matches: matches
        };
      }
      throw new Error(response?.message || 'Failed to load patient matching screen');
    },
    enabled: !!requestId,
    staleTime: 5 * 60 * 1000
  });
};

export const useSearchPatients = (searchQuery, searchType) => {
  return useQuery({
    queryKey: ['searchPatients', searchQuery, searchType],
    queryFn: async () => {
      if (!searchQuery) return [];
      
      const searchTypeMap = {
        'Mobile Number': 'PHONE',
        'Child Name': 'CHILD_NAME',
        'Parent Name': 'PARENT_NAME',
        'Patient ID': 'PATIENT_ID'
      };
      const apiType = searchTypeMap[searchType] || searchType;

      const response = await patientMatchingService.manualPatientSearch({
        search: searchQuery,
        search_type: apiType
      });

      if (response && response.success) {
        const results = response.data.results || [];
        return results.map(p => mapMatchingPatientToUI({ patient: p, score: null }));
      }
      throw new Error(response?.message || 'Failed to search patients');
    },
    enabled: !!searchQuery,
    staleTime: 0
  });
};

export const useLinkPatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ requestId, patientId }) => {
      return patientMatchingService.linkExistingPatient(requestId, patientId);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['patientMatches', variables.requestId] });
      queryClient.invalidateQueries({ queryKey: ['appointmentRequests'] });
    }
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId) => {
      return patientMatchingService.createNewPatient(requestId);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['patientMatches', variables] });
      queryClient.invalidateQueries({ queryKey: ['appointmentRequests'] });
    }
  });
};

export const usePatientPreview = (patientId) => {
  return useQuery({
    queryKey: ['patientPreview', patientId],
    queryFn: async () => {
      const response = await patientMatchingService.retrievePatientPreview(patientId);
      if (response && response.success) {
        return response.data;
      }
      throw new Error(response?.message || 'Failed to retrieve patient preview');
    },
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000
  });
};
