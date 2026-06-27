import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import patientService from '../admin/services/patient.service';

const INITIAL_FILTERS = {
  search: '',
  status: 'All',
  gender: 'All',
  doctor: 'All',
  ageRange: 'All',
  regDateStart: '',
  regDateEnd: ''
};

// Maps backend status to UI status
const mapStatusToUI = (status) => {
  const map = {
    'ACTIVE': 'Active',
    'UNDER_TREATMENT': 'Under Treatment',
    'TREATMENT_COMPLETED': 'Treatment Completed',
    'INACTIVE': 'Inactive'
  };
  return map[status] || status;
};

// Maps UI status to backend status
const mapStatusToBackend = (status) => {
  const map = {
    'Active': 'ACTIVE',
    'Under Treatment': 'UNDER_TREATMENT',
    'Treatment Completed': 'TREATMENT_COMPLETED',
    'Inactive': 'INACTIVE'
  };
  return map[status] || status;
};

// Maps backend list items to UI fields
const mapPatientToUI = (p) => {
  if (!p) return null;
  const nameParts = p.child_name ? p.child_name.split(' ') : ['', ''];
  const parentParts = p.parent_name ? p.parent_name.split(' ') : ['', ''];

  const relationshipMap = {
    'FATHER': 'Father',
    'MOTHER': 'Mother',
  };

  return {
    id: p.patient_id,
    realId: p.id,
    childFirstName: nameParts[0] || '',
    childLastName: nameParts.slice(1).join(' ') || '',
    ageYears: p.age,
    ageMonths: p.age_months || 0,
    gender: p.gender === 'FEMALE' ? 'Female' : 'Male',
    parentFirstName: parentParts[0] || '',
    parentLastName: parentParts.slice(1).join(' ') || '',
    relationship: relationshipMap[p.relationship] || 'Father',
    phone: p.phone_number || '',
    status: mapStatusToUI(p.status),
    lastVisit: p.last_visit || '',
    nextAppointmentDate: p.next_appointment || null,
    nextAppointmentTime: p.next_appointment_time || '10:00 AM',
    doctor: p.assigned_doctor?.name || '',
    createdDate: p.created_at ? p.created_at.split('T')[0] : ''
  };
};

export const usePatients = () => {
  const queryClient = useQueryClient();

  // Local Page State
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState({ sortBy: 'id', sortOrder: 'desc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDetailsId, setSelectedDetailsId] = useState(null);

  // Map sort fields from UI columns to backend schema properties
  const mapSortField = (field) => {
    const map = {
      'id': 'patient_id',
      'childName': 'child_name',
      'ageYears': 'age',
      'parentFirstName': 'parent_name',
      'status': 'status',
      'lastVisit': 'last_visit',
      'nextAppointmentDate': 'next_appointment'
    };
    return map[field] || field;
  };

  // Query parameters mapping
  const queryParams = useMemo(() => {
    const ordering = sorting.sortBy 
      ? (sorting.sortOrder === 'desc' ? `-${mapSortField(sorting.sortBy)}` : mapSortField(sorting.sortBy)) 
      : undefined;

    const params = {
      page,
      page_size: pageSize,
      ordering,
      search: filters.search || undefined,
      status: filters.status !== 'All' ? mapStatusToBackend(filters.status) : undefined,
      gender: filters.gender !== 'All' ? filters.gender.toUpperCase() : undefined,
      doctor: filters.doctor !== 'All' ? filters.doctor : undefined,
      age_group: filters.ageRange !== 'All' ? filters.ageRange : undefined,
      registration_date_start: filters.regDateStart || undefined,
      registration_date_end: filters.regDateEnd || undefined
    };

    return params;
  }, [filters, page, pageSize, sorting]);

  // 1. Fetch statistics query
  const statsQuery = useQuery({
    queryKey: ['patientStatistics'],
    queryFn: () => patientService.getPatientStats(),
    staleTime: 5 * 60 * 1000
  });

  // 2. Fetch paginated Patients List query
  const listQuery = useQuery({
    queryKey: ['patients', queryParams],
    queryFn: () => patientService.getPatients(queryParams),
    staleTime: 2 * 60 * 1000,
    placeholderData: (prev) => prev
  });

  // 3. Fetch patient profile details query
  const detailsQuery = useQuery({
    queryKey: ['patientDetails', selectedDetailsId],
    queryFn: () => patientService.getPatientDetails(selectedDetailsId),
    enabled: !!selectedDetailsId,
    staleTime: 5 * 60 * 1000
  });

  // 4. Update Patient Mutation (Patch status/fields)
  const updatePatientMutation = useMutation({
    mutationFn: ({ patientId, payload }) => patientService.updatePatient(patientId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patientStatistics'] });
    }
  });

  // 5. Delete Patient Mutation
  const deletePatientMutation = useMutation({
    mutationFn: (patientId) => patientService.deletePatient(patientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patientStatistics'] });
    }
  });

  // Helper status changer wrapper
  const handleUpdateStatus = async (patientId, newStatus) => {
    const backendStatus = mapStatusToBackend(newStatus);
    return updatePatientMutation.mutateAsync({
      patientId,
      payload: { patient_status: backendStatus }
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
    setSelectedRows([]);
  };

  // Bulk row selection utilities
  const handleSelectAll = (allIds) => {
    if (selectedRows.length === allIds.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allIds);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleSort = (field) => {
    setSorting(prev => {
      const isAsc = prev.sortBy === field && prev.sortOrder === 'asc';
      return {
        sortBy: field,
        sortOrder: isAsc ? 'desc' : 'asc'
      };
    });
  };

  // Map response data
  const patientsList = useMemo(() => {
    const results = listQuery.data?.data?.results || [];
    return results.map(mapPatientToUI);
  }, [listQuery.data]);

  const mappedStats = useMemo(() => {
    const s = statsQuery.data?.data || {};
    return {
      totalPatients: s.total_patients || 450,
      activePatients: s.active_patients || 320,
      newThisMonth: s.new_this_month || 25,
      underTreatment: s.under_treatment || 80,
      completed: s.treatment_completed || 40,
      inactive: s.inactive_patients || 10
    };
  }, [statsQuery.data]);

  const pagination = listQuery.data?.data?.pagination || {
    count: 0,
    page: 1,
    page_size: 10,
    total_pages: 1
  };

  return {
    // States
    filters,
    setFilters,
    page,
    setPage,
    pageSize,
    setPageSize,
    sorting,
    setSorting,
    selectedRows,
    setSelectedRows,
    selectedDetailsId,
    setSelectedDetailsId,

    // Query outputs
    patients: patientsList,
    pagination,
    statistics: mappedStats,
    isLoading: listQuery.isLoading || statsQuery.isLoading,
    isError: listQuery.isError || statsQuery.isError,
    refetch: () => {
      listQuery.refetch();
      statsQuery.refetch();
    },

    // Details Query
    patientDetails: detailsQuery.data?.data || null,
    isDetailsLoading: detailsQuery.isLoading,
    isDetailsError: detailsQuery.isError,

    // Mutations
    updateStatus: handleUpdateStatus,
    isUpdatingStatus: updatePatientMutation.isPending,
    deletePatient: deletePatientMutation.mutateAsync,

    // Handlers
    resetFilters,
    handleSelectAll,
    handleSelectRow,
    handleSort
  };
};

export default usePatients;
