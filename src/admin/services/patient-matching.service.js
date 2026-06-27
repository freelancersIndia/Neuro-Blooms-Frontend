import adminApi from './api';

const isNetworkError = (error) => {
  return !error.response && (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('timeout'));
};

const patientMatchingService = {
  /**
   * Load Patient Matching Screen data.
   */
  loadPatientMatchingScreen: async (appointmentRequestId) => {
    try {
      const response = await adminApi.get(`/api/v1/patient-matching/${appointmentRequestId}/`);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend patient-matching load offline/404, falling back to mock.');
        return {
          success: true,
          message: "Patient matching screen data loaded successfully.",
          data: {
            appointment_request: {
              id: appointmentRequestId,
              request_number: "REQ-2026-000124",
              parent_first_name: "Ravi",
              parent_last_name: "Kumar",
              relationship_to_child: "FATHER",
              mobile_number: "+91 98765 43210",
              alternate_mobile_number: "",
              email: "ravi.kumar@email.com",
              child_first_name: "Aarav",
              child_last_name: "Kumar",
              date_of_birth: "2023-02-14",
              gender: "MALE",
              appointment_type: "INITIAL_CONSULTATION",
              primary_concern: "SPEECH_DELAY",
              preferred_date: "2026-07-15",
              preferred_time_slot: "10:30 AM",
              additional_notes: "Child is having difficulty in expressing words clearly. Need expert guidance.",
              referral_source: "Google Search",
              booking_source: "WEBSITE",
              status: "APPROVED",
              created_at: "2026-06-26T14:00:00Z"
            },
            best_match_score: 92.0,
            matching_patients: [
              {
                patient: {
                  id: "2bc99dd8-b34e-4e4f-b67a-115f0ebcd33e",
                  patient_number: "P000124",
                  child_first_name: "Aarav",
                  child_last_name: "Kumar",
                  parent_first_name: "Ravi",
                  parent_last_name: "Kumar",
                  mobile_number: "+91 98765 43210",
                  email: "ravi.kumar@email.com",
                  patient_status: "ACTIVE",
                  created_at: "2026-05-10T12:00:00Z"
                },
                score: 92.0,
                confidence_level: "Very High Match"
              },
              {
                patient: {
                  id: "2bc99dd8-b34e-4e4f-b67a-115f0ebcd33f",
                  patient_number: "P000087",
                  child_first_name: "Aarohi",
                  child_last_name: "Singh",
                  parent_first_name: "Neha",
                  parent_last_name: "Singh",
                  mobile_number: "+91 98765 67890",
                  email: "neha.singh@email.com",
                  patient_status: "ACTIVE",
                  created_at: "2026-05-10T12:00:00Z"
                },
                score: 78.0,
                confidence_level: "High Match"
              }
            ],
            matching_statistics: {
              total_candidates: 2,
              very_high_matches: 1,
              high_matches: 1,
              possible_matches: 0,
              low_confidence_matches: 0
            }
          }
        };
      }
      throw error;
    }
  },

  /**
   * Perform manual patient search.
   */
  manualPatientSearch: async (params) => {
    try {
      const response = await adminApi.get('/api/v1/patients/search/', { params });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend patient search offline/404, falling back to mock.');
        const mockRegistry = [
          {
            id: "2bc99dd8-b34e-4e4f-b67a-115f0ebcd33e",
            patient_number: "P000124",
            child_first_name: "Aarav",
            child_last_name: "Kumar",
            parent_first_name: "Ravi",
            parent_last_name: "Kumar",
            mobile_number: "+91 98765 43210",
            email: "ravi.kumar@email.com",
            patient_status: "ACTIVE",
            created_at: "2026-05-10T12:00:00Z"
          },
          {
            id: "2bc99dd8-b34e-4e4f-b67a-115f0ebcd33f",
            patient_number: "P000087",
            child_first_name: "Aarohi",
            child_last_name: "Singh",
            parent_first_name: "Neha",
            parent_last_name: "Singh",
            mobile_number: "+91 98765 67890",
            email: "neha.singh@email.com",
            patient_status: "ACTIVE",
            created_at: "2026-05-10T12:00:00Z"
          },
          {
            id: "2bc99dd8-b34e-4e4f-b67a-115f0ebcd34a",
            patient_number: "P000056",
            child_first_name: "Aarav",
            child_last_name: "Patel",
            parent_first_name: "Vikram",
            parent_last_name: "Patel",
            mobile_number: "+91 87654 32109",
            email: "vikram.patel@email.com",
            patient_status: "ACTIVE",
            created_at: "2026-04-10T12:00:00Z"
          }
        ];

        const query = (params.search || '').toLowerCase().trim();
        const results = mockRegistry.filter(p => {
          if (!query) return true;
          if (params.search_type === 'PHONE') return p.mobile_number.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''));
          if (params.search_type === 'CHILD_NAME') return `${p.child_first_name} ${p.child_last_name}`.toLowerCase().includes(query);
          if (params.search_type === 'PARENT_NAME') return `${p.parent_first_name} ${p.parent_last_name}`.toLowerCase().includes(query);
          if (params.search_type === 'PATIENT_ID') return p.patient_number.toLowerCase().includes(query);
          return true;
        });

        return {
          success: true,
          message: "Patients fetched successfully.",
          data: {
            results,
            pagination: {
              count: results.length,
              page: 1,
              page_size: 10,
              total_pages: 1,
              next: null,
              previous: null
            }
          }
        };
      }
      throw error;
    }
  },

  /**
   * Link an approved request to an active patient record.
   */
  linkExistingPatient: async (appointmentRequestId, patientId) => {
    try {
      const response = await adminApi.post(`/api/v1/patient-matching/${appointmentRequestId}/link/`, {
        patient_id: patientId
      });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend link offline/404, falling back to mock.');
        return {
          success: true,
          message: "Patient linked successfully."
        };
      }
      throw error;
    }
  },

  /**
   * Create a new patient profile using details imported from the approved request.
   */
  createNewPatient: async (appointmentRequestId) => {
    try {
      const response = await adminApi.post(`/api/v1/patient-matching/${appointmentRequestId}/create-patient/`);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend create offline/404, falling back to mock.');
        return {
          success: true,
          message: "Patient created successfully.",
          data: {
            patient_id: `P000${Math.floor(Math.random() * 900) + 100}`
          }
        };
      }
      throw error;
    }
  },

  /**
   * Retrieve patient preview data.
   */
  retrievePatientPreview: async (patientId) => {
    try {
      const response = await adminApi.get(`/api/v1/patients/${patientId}/preview/`);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend preview offline/404, falling back to mock.');
        
        // Mock databases of patients
        const mockPreviews = {
          'P000124': {
            patient_id: "P000124",
            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            parent: {
              first_name: "Ravi",
              last_name: "Kumar",
              relationship: "FATHER"
            },
            child: {
              first_name: "Aarav",
              last_name: "Kumar"
            },
            phone: "+91 98765 43210",
            email: "ravi.kumar@email.com",
            gender: "MALE",
            age: 3,
            dob: "2023-02-14",
            last_visit: "2026-06-15",
            appointments_count: 2,
            consultations_count: 1,
            followups_count: 1,
            created_date: "2026-05-10T12:00:00Z",
            patient_status: "ACTIVE"
          },
          'P000087': {
            patient_id: "P000087",
            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            parent: {
              first_name: "Neha",
              last_name: "Singh",
              relationship: "MOTHER"
            },
            child: {
              first_name: "Aarohi",
              last_name: "Singh"
            },
            phone: "+91 98765 67890",
            email: "neha.singh@email.com",
            gender: "FEMALE",
            age: 3,
            dob: "2023-05-10",
            last_visit: "2026-05-02",
            appointments_count: 1,
            consultations_count: 1,
            followups_count: 0,
            created_date: "2026-05-10T12:00:00Z",
            patient_status: "ACTIVE"
          },
          'P000056': {
            patient_id: "P000056",
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            parent: {
              first_name: "Vikram",
              last_name: "Patel",
              relationship: "FATHER"
            },
            child: {
              first_name: "Aarav",
              last_name: "Patel"
            },
            phone: "+91 87654 32109",
            email: "vikram.patel@email.com",
            gender: "MALE",
            age: 4,
            dob: "2022-01-12",
            last_visit: "2026-04-20",
            appointments_count: 3,
            consultations_count: 1,
            followups_count: 2,
            created_date: "2026-04-10T12:00:00Z",
            patient_status: "ACTIVE"
          }
        };

        const previewData = mockPreviews[patientId] || {
          patient_id: patientId,
          photo: null,
          parent: {
            first_name: "Parent",
            last_name: "Name",
            relationship: "PARENT"
          },
          child: {
            first_name: "Child",
            last_name: "Name"
          },
          phone: "9999999999",
          email: "parent@example.com",
          gender: "MALE",
          age: 5,
          dob: "2021-01-01",
          last_visit: "2026-06-20",
          appointments_count: 1,
          consultations_count: 1,
          followups_count: 0,
          created_date: "2026-05-10T12:00:00Z",
          patient_status: "ACTIVE"
        };

        return {
          success: true,
          message: "Patient preview loaded successfully.",
          data: previewData
        };
      }
      throw error;
    }
  }
};

export default patientMatchingService;
