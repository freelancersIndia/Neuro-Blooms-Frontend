import adminApi from './api';

const isNetworkError = (error) => {
  return !error.response && (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('timeout'));
};

// Seed arrays for programmatic mock generation
const FIRST_NAMES_MALE = ["Aarav", "Vihaan", "Advik", "Reyansh", "Kabir", "Arjun", "Sai", "Aaryan", "Ishaan", "Rohan", "Dev", "Atharv", "Shaurya", "Aditya", "Pranav", "Krishna"];
const FIRST_NAMES_FEMALE = ["Ananya", "Myra", "Diya", "Ishita", "Kiara", "Saanvi", "Anya", "Aarohi", "Riya", "Kavya", "Aditi", "Avani", "Ira", "Meera", "Zara", "Navya"];
const LAST_NAMES = ["Kumar", "Reddy", "Singh", "Patel", "Sharma", "Verma", "Nair", "Gupta", "Joshi", "Mehta", "Iyer", "Rao", "Choudhury", "Bose", "Pillai", "Das"];

// Standard list items from specification
const PRIMARY_PATIENTS = [
  {
    id: "764b8bbd-d34e-4e4f-b67a-115f0ebcd22f",
    patient_id: "NBP-000001",
    photo: null,
    child_name: "Aarav Kumar",
    age: 6,
    gender: "MALE",
    parent_name: "Suresh Kumar",
    relationship: "FATHER",
    phone_number: "9876543210",
    status: "ACTIVE",
    assigned_doctor: {
      id: 15,
      name: "Dr. Sarah Paul",
      email: "sarah.paul@example.com"
    },
    last_visit: "2026-06-20",
    next_appointment: "2026-07-01",
    created_at: "2026-06-25T12:00:00Z"
  },
  {
    id: "764b8bbd-d34e-4e4f-b67a-115f0ebcd22e",
    patient_id: "NBP-000002",
    photo: null,
    child_name: "Daisy Miller",
    age: 7,
    gender: "FEMALE",
    parent_name: "David Miller",
    relationship: "FATHER",
    phone_number: "0987654321",
    status: "ACTIVE",
    assigned_doctor: {
      id: 16,
      name: "Dr. Amit Verma",
      email: "amit.verma@example.com"
    },
    last_visit: "2026-06-18",
    next_appointment: "2026-06-29",
    created_at: "2026-06-25T12:00:00Z"
  },
  {
    id: "764b8bbd-d34e-4e4f-b67a-115f0ebcd22d",
    patient_id: "NBP-000003",
    photo: null,
    child_name: "Vihaan Singh",
    age: 5,
    gender: "MALE",
    parent_name: "Neha Singh",
    relationship: "MOTHER",
    phone_number: "9987654321",
    status: "UNDER_TREATMENT",
    assigned_doctor: {
      id: 15,
      name: "Dr. Sarah Paul",
      email: "sarah.paul@example.com"
    },
    last_visit: "2026-06-15",
    next_appointment: "2026-06-28",
    created_at: "2026-06-24T12:00:00Z"
  }
];

// Helper to generate deterministic patient lists to exact statistics
const generateMockDatabase = () => {
  const list = [...PRIMARY_PATIENTS];

  // We need to support total_patients = 450
  // ACTIVE: 320 (primary has 2) -> 318 more
  // UNDER_TREATMENT: 80 (primary has 1) -> 79 more
  // TREATMENT_COMPLETED: 40 -> 40 more
  // INACTIVE: 10 -> 10 more
  // Total = 450

  const countsNeeded = {
    "ACTIVE": 318,
    "UNDER_TREATMENT": 79,
    "TREATMENT_COMPLETED": 40,
    "INACTIVE": 10
  };

  let idCounter = 4;
  let seed = 123;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const choice = (arr) => arr[Math.floor(random() * arr.length)];

  Object.entries(countsNeeded).forEach(([status, count]) => {
    for (let i = 0; i < count; i++) {
      const isMale = random() > 0.5;
      const childFirstName = isMale ? choice(FIRST_NAMES_MALE) : choice(FIRST_NAMES_FEMALE);
      const parentFirstName = isMale ? choice(FIRST_NAMES_MALE) : choice(FIRST_NAMES_FEMALE);
      const lastName = choice(LAST_NAMES);
      
      const idNum = String(idCounter).padStart(6, '0');
      const phoneNum = `98${Math.floor(10000000 + random() * 89999999)}`;

      const age = Math.floor(2 + random() * 10);

      const daysAgo = Math.floor(1 + random() * 90);
      const lastVisitDate = new Date();
      lastVisitDate.setDate(lastVisitDate.getDate() - daysAgo);
      const lastVisitStr = lastVisitDate.toISOString().split('T')[0];

      let nextDate = null;
      if ((status === "ACTIVE" || status === "UNDER_TREATMENT") && random() > 0.6) {
        const daysAhead = Math.floor(1 + random() * 15);
        const apptDate = new Date();
        apptDate.setDate(apptDate.getDate() + daysAhead);
        nextDate = apptDate.toISOString().split('T')[0];
      }

      const regDaysAgo = Math.floor(10 + random() * 300);
      const regDate = new Date();
      regDate.setDate(regDate.getDate() - regDaysAgo);
      const regDateStr = regDate.toISOString();

      list.push({
        id: `uuid-${idCounter}`,
        patient_id: `NBP-${idNum}`,
        photo: null,
        child_name: `${childFirstName} ${lastName}`,
        age: age,
        gender: isMale ? "MALE" : "FEMALE",
        parent_name: `${parentFirstName} ${lastName}`,
        relationship: choice(["FATHER", "MOTHER"]),
        phone_number: phoneNum,
        status: status,
        assigned_doctor: {
          id: idCounter % 2 === 0 ? 15 : 16,
          name: idCounter % 2 === 0 ? "Dr. Sarah Paul" : "Dr. Amit Verma",
          email: idCounter % 2 === 0 ? "sarah.paul@example.com" : "amit.verma@example.com"
        },
        last_visit: lastVisitStr,
        next_appointment: nextDate,
        created_at: regDateStr
      });

      idCounter++;
    }
  });

  return list;
};

let patientDb = generateMockDatabase();

const patientService = {
  /**
   * 1. Get Patient Statistics
   */
  getPatientStats: async () => {
    try {
      const response = await adminApi.get('/api/v1/patients/statistics/');
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend stats offline/404, falling back to mock.');
        return {
          success: true,
          message: "Patient statistics loaded successfully.",
          data: {
            total_patients: 450,
            active_patients: 320,
            under_treatment: 80,
            treatment_completed: 40,
            inactive_patients: 10,
            new_this_month: 25,
            male: 230,
            female: 220,
            average_age: 7.5,
            upcoming_appointments: 15
          }
        };
      }
      throw error;
    }
  },

  /**
   * 2. Get Patients List (paginated & filtered)
   */
  getPatients: async (params) => {
    try {
      const response = await adminApi.get('/api/v1/patients/', { params });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend patient list offline/404, falling back to mock.');
        let filtered = [...patientDb];

        const search = (params.search || '').toLowerCase().trim();
        const status = params.status || 'All';
        const gender = params.gender || 'All';
        const doctor = params.doctor || 'All';
        const age_group = params.age_group || 'All';
        const start_date = params.registration_date_start || null;
        const end_date = params.registration_date_end || null;

        // Apply filters
        if (search) {
          filtered = filtered.filter(p => 
            p.patient_id.toLowerCase().includes(search) ||
            p.child_name.toLowerCase().includes(search) ||
            p.parent_name.toLowerCase().includes(search) ||
            p.phone_number.includes(search)
          );
        }

        if (status !== 'All') {
          filtered = filtered.filter(p => p.status === status);
        }
        if (gender !== 'All') {
          filtered = filtered.filter(p => p.gender === gender);
        }
        if (doctor !== 'All') {
          filtered = filtered.filter(p => p.assigned_doctor.name === doctor);
        }
        if (age_group !== 'All') {
          filtered = filtered.filter(p => {
            const ageVal = p.age;
            if (age_group === '0-3') return ageVal >= 0 && ageVal <= 3;
            if (age_group === '4-6') return ageVal >= 4 && ageVal <= 6;
            if (age_group === '7-12') return ageVal >= 7 && ageVal <= 12;
            if (age_group === '12+') return ageVal > 12;
            return true;
          });
        }
        if (start_date && end_date) {
          const start = new Date(start_date);
          const end = new Date(end_date);
          filtered = filtered.filter(p => {
            const d = new Date(p.created_at);
            return d >= start && d <= end;
          });
        }

        // Ordering
        const ordering = params.ordering || '-patient_id';
        const desc = ordering.startsWith('-');
        const field = desc ? ordering.substring(1) : ordering;

        filtered.sort((a, b) => {
          let valA = a[field];
          let valB = b[field];

          if (field === 'assigned_doctor') {
            valA = a.assigned_doctor.name;
            valB = b.assigned_doctor.name;
          }

          if (typeof valA === 'string') {
            return desc ? valB.localeCompare(valA) : valA.localeCompare(valB);
          }
          return desc ? (valB || 0) - (valA || 0) : (valA || 0) - (valB || 0);
        });

        // Paginate
        const page = parseInt(params.page || 1, 10);
        const pageSize = parseInt(params.page_size || 10, 10);
        const start = (page - 1) * pageSize;
        const total = filtered.length;
        const totalPages = Math.ceil(total / pageSize);
        const results = filtered.slice(start, start + pageSize);

        return {
          success: true,
          message: "Patients fetched successfully.",
          data: {
            results,
            pagination: {
              count: total,
              page,
              page_size: pageSize,
              total_pages: totalPages,
              next: page < totalPages ? page + 1 : null,
              previous: page > 1 ? page - 1 : null
            }
          }
        };
      }
      throw error;
    }
  },

  /**
   * 3. Get Complete Patient Details
   */
  getPatientDetails: async (patientId) => {
    try {
      const response = await adminApi.get(`/api/v1/patients/${patientId}/`);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend patient details offline/404, falling back to mock.');
        const found = patientDb.find(p => p.id === patientId || p.patient_id === patientId);
        
        return {
          success: true,
          message: "Patient details retrieved successfully.",
          data: {
            id: found?.id || "764b8bbd-d34e-4e4f-b67a-115f0ebcd22f",
            patient_id: found?.patient_id || "NBP-000001",
            photo: null,
            age: found?.age || 6,
            gender: found?.gender || "MALE",
            date_of_birth: "2020-04-12",
            child_first_name: found?.child_name?.split(' ')[0] || "Aarav",
            child_last_name: found?.child_name?.split(' ')[1] || "Kumar",
            parent_first_name: found?.parent_name?.split(' ')[0] || "Suresh",
            parent_last_name: found?.parent_name?.split(' ')[1] || "Kumar",
            relationship_to_child: found?.relationship || "FATHER",
            mobile_number: found?.phone_number || "9876543210",
            alternate_mobile_number: "",
            email: "suresh.kumar@example.com",
            address: "123 Park Lane",
            preferred_language: "English",
            referral_source: "Google Search",
            primary_diagnosis: "Mild Speech Delay",
            notes: "Needs gentle coaching.",
            emergency_contact_name: "Alice Kumar",
            emergency_contact_phone: "9876543219",
            assigned_doctor: found?.assigned_doctor || {
              id: 15,
              name: "Dr. Sarah Paul",
              email: "sarah.paul@example.com"
            },
            latest_appointment: {
              id: "abc-123",
              appointment_number: "APT-00001",
              appointment_date: found?.last_visit || "2026-06-20",
              start_time: "10:00:00",
              status: "COMPLETED",
              appointment_type: "INITIAL"
            },
            current_status: found?.status || "ACTIVE",
            registration_date: found?.created_at || "2026-06-25T12:00:00Z"
          }
        };
      }
      throw error;
    }
  },

  /**
   * 4. Manual Patient Registration
   */
  createPatient: async (payload) => {
    try {
      const response = await adminApi.post('/api/v1/patients/', payload);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend register offline/404, falling back to mock.');
        
        const newPatient = {
          id: `uuid-${Date.now()}`,
          patient_id: `NBP-00000${patientDb.length + 1}`,
          photo: null,
          child_name: `${payload.child_first_name} ${payload.child_last_name}`,
          age: 5,
          gender: payload.gender || "MALE",
          parent_name: `${payload.parent_first_name} ${payload.parent_last_name}`,
          relationship: payload.relationship_to_child || "FATHER",
          phone_number: payload.mobile_number || "9999999999",
          status: payload.patient_status || "ACTIVE",
          assigned_doctor: {
            id: 15,
            name: "Dr. Sarah Paul",
            email: "sarah.paul@example.com"
          },
          last_visit: new Date().toISOString().split('T')[0],
          next_appointment: null,
          created_at: new Date().toISOString()
        };

        patientDb.push(newPatient);

        return {
          success: true,
          message: "Patient registered successfully.",
          data: {
            patient_id: newPatient.patient_id
          }
        };
      }
      throw error;
    }
  },

  /**
   * 5. Update Patient Profile
   */
  updatePatient: async (patientId, payload) => {
    try {
      const response = await adminApi.patch(`/api/v1/patients/${patientId}/`, payload);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend update offline/404, falling back to mock.');
        
        const index = patientDb.findIndex(p => p.id === patientId || p.patient_id === patientId);
        if (index !== -1) {
          if (payload.patient_status) patientDb[index].status = payload.patient_status;
          if (payload.mobile_number) patientDb[index].phone_number = payload.mobile_number;
          return {
            success: true,
            message: "Patient profile updated successfully.",
            data: {
              current_status: patientDb[index].status
            }
          };
        }
        throw new Error("Patient not found.");
      }
      throw error;
    }
  },

  /**
   * 6. Soft Delete / Archive Patient
   */
  deletePatient: async (patientId) => {
    try {
      const response = await adminApi.delete(`/api/v1/patients/${patientId}/`);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.warn('Backend delete offline/404, falling back to mock.');
        patientDb = patientDb.filter(p => p.id !== patientId && p.patient_id !== patientId);
        return {
          success: true,
          message: "Patient archived successfully."
        };
      }
      throw error;
    }
  },

  /**
   * 7. Filter Options Metadata
   */
  getFilterOptions: async () => {
    try {
      const response = await adminApi.get('/api/v1/patients/filter-options/');
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        return {
          success: true,
          data: {
            statuses: [
              {"key": "ACTIVE", "label": "Active"},
              {"key": "UNDER_TREATMENT", "label": "Under Treatment"},
              {"key": "TREATMENT_COMPLETED", "label": "Completed"},
              {"key": "INACTIVE", "label": "Inactive"}
            ],
            genders: [
              {"key": "MALE", "label": "Male"},
              {"key": "FEMALE", "label": "Female"}
            ],
            doctors: [
              {"id": 15, "name": "Dr. Sarah Paul"},
              {"id": 16, "name": "Dr. Amit Verma"}
            ],
            age_groups: [
              {"key": "0-3", "label": "0-3 Years"},
              {"key": "4-6", "label": "4-6 Years"},
              {"key": "7-12", "label": "7-12 Years"},
              {"key": "12+", "label": "12+ Years"}
            ],
            languages: ["English", "Hindi"],
            referral_sources: ["Google Search"]
          }
        };
      }
      throw error;
    }
  },

  /**
   * 8. Quick Search Autocomplete
   */
  quickSearch: async (query) => {
    try {
      const response = await adminApi.get('/api/v1/patients/search/', { params: { search: query } });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        const q = query.toLowerCase().trim();
        const matches = patientDb.filter(p => 
          p.patient_id.toLowerCase().includes(q) ||
          p.child_name.toLowerCase().includes(q) ||
          p.parent_name.toLowerCase().includes(q)
        ).slice(0, 10);
        
        return {
          success: true,
          data: matches
        };
      }
      throw error;
    }
  },

  /**
   * 9. Stream / Download Export CSV
   */
  exportPatients: async (filters) => {
    try {
      const response = await adminApi.get('/api/v1/patients/export/', { params: filters, responseType: 'blob' });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        return new Blob([JSON.stringify(patientDb, null, 2)], { type: 'application/json' });
      }
      throw error;
    }
  },

  /**
   * 10. Summary Chart Status Counts
   */
  getSummaryChart: async () => {
    try {
      const response = await adminApi.get('/api/v1/patients/summary/');
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        return {
          success: true,
          data: {
            "Under Treatment": 80,
            "Completed": 40,
            "Inactive": 10,
            "Active": 320
          }
        };
      }
      throw error;
    }
  },

  /**
   * 11. Bulk Actions (assign_doctor, etc)
   */
  bulkActions: async (payload) => {
    try {
      const response = await adminApi.post('/api/v1/patients/bulk-actions/', payload);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        return {
          success: true,
          message: `Successfully executed bulk action: ${payload.action} on ${payload.patient_ids.length} patients.`
        };
      }
      throw error;
    }
  },

  /**
   * 12. Recent Registered Patients
   */
  getRecentPatients: async () => {
    try {
      const response = await adminApi.get('/api/v1/patients/recent/');
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        return {
          success: true,
          data: patientDb.slice(0, 10)
        };
      }
      throw error;
    }
  }
};

export default patientService;
