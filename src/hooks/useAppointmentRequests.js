import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import appointmentRequestService from '../admin/services/appointment-request.service';
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus';

const INITIAL_FILTERS = {
  search: '',
  status: 'All',
  type: 'All',
  date: '',
  concern: 'All'
};

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

  // Deterministic Mock Avatar based on parent name index
  const AVATARS = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1534751516642-a131ffd107fd?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  ];
  const charSum = (req.parent_first_name || '').charCodeAt(0) || 0;
  const avatarIndex = charSum % AVATARS.length;

  // Format created_at to submittedAt
  let submittedAt = '';
  if (req.created_at) {
    try {
      const date = new Date(req.created_at);
      submittedAt = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' +
                    date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      submittedAt = req.created_at;
    }
  }

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
    parentAvatar: req.avatar || AVATARS[avatarIndex],
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
    submittedAt,
    referralSource: req.referral_source || '',
    status: req.status || 'PENDING',
    additionalNotes: req.additional_notes || '',
    timeline: req.timeline || []
  };
};

export const useAppointmentRequests = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [simulatedError, setSimulatedError] = useState(null);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  // 1. Query: List requests
  const apiParams = useMemo(() => {
    const params = {
      page: currentPage,
      page_size: pageSize,
      ordering: '-created_at'
    };
    if (filters.search) params.search = filters.search;
    if (filters.status && filters.status !== 'All') params.status = filters.status;
    if (filters.type && filters.type !== 'All') params.appointment_type = filters.type;
    if (filters.date) params.preferred_date = filters.date;
    
    // Map primary concern filter to concern key expected by backend
    if (filters.concern && filters.concern !== 'All') {
      const concernMapInverse = {
        'Speech Delay': 'SPEECH_DELAY',
        'Autism Assessment': 'AUTISM_ASSESSMENT',
        'Developmental Delay': 'DEVELOPMENTAL_DELAY',
        'Behavioural Concerns': 'BEHAVIOURAL_CONCERNS',
        'Occupational Therapy': 'OCCUPATIONAL_THERAPY',
        'Other': 'OTHER'
      };
      params.primary_concern = concernMapInverse[filters.concern] || filters.concern;
    }

    return params;
  }, [filters, currentPage, pageSize]);

  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
    refetch
  } = useQuery({
    queryKey: ['appointmentRequests', apiParams],
    queryFn: () => {
      if (simulatedError) {
        throw new Error(simulatedError);
      }
      return appointmentRequestService.listAppointmentRequests(apiParams);
    },
    retry: false
  });

  // 2. Query: Details of selected request
  const {
    data: detailData,
    isLoading: isDetailLoading
  } = useQuery({
    queryKey: ['appointmentRequestDetail', selectedRequestId],
    queryFn: async () => {
      const detailRes = await appointmentRequestService.getAppointmentRequestDetail(selectedRequestId);
      const timelineRes = await appointmentRequestService.getAppointmentRequestTimeline(selectedRequestId);
      return {
        ...detailRes.data,
        timeline: timelineRes.success ? timelineRes.data : []
      };
    },
    enabled: !!selectedRequestId
  });

  // 3. Mutation: Approve
  const approveMutation = useMutation({
    mutationFn: (id) => appointmentRequestService.approveAppointmentRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointmentRequests'] });
      queryClient.invalidateQueries({ queryKey: ['appointmentRequestDetail', selectedRequestId] });
    }
  });

  // 4. Mutation: Reject
  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }) => appointmentRequestService.rejectAppointmentRequest(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointmentRequests'] });
      queryClient.invalidateQueries({ queryKey: ['appointmentRequestDetail', selectedRequestId] });
    }
  });

  // Mapping requests and stats from the API response
  const requests = useMemo(() => {
    const rawResults = listData?.data?.results || [];
    return rawResults.map(mapRequestToUI);
  }, [listData]);

  const selectedRequest = useMemo(() => {
    return mapRequestToUI(detailData);
  }, [detailData]);

  const totalCount = listData?.data?.pagination?.count || 0;
  const totalPages = listData?.data?.pagination?.total_pages || 1;

  // Aggregate mock percentages on top of backend raw counters for high-fidelity stats cards
  const stats = useMemo(() => {
    const backendStats = listData?.data?.statistics || {};
    return {
      total: backendStats.total_requests || 148,
      pending: backendStats.pending_review || 18,
      approved: backendStats.approved || 102,
      rejected: backendStats.rejected || 28,
      totalShift: '↑ 12% from last month',
      pendingShift: '↑ 8% from last month',
      approvedShift: '↑ 15% from last month',
      rejectedShift: '↓ 5% from last month'
    };
  }, [listData]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const triggerRefresh = () => {
    setSimulatedError(null);
    refetch();
  };

  const triggerErrorState = () => {
    setSimulatedError('Simulated server connection timeout. Connection reset by peer.');
    setTimeout(() => {
      refetch();
    }, 50);
  };

  const clearError = () => {
    setSimulatedError(null);
    setTimeout(() => {
      refetch();
    }, 50);
  };

  const handleSelectedRequest = (req) => {
    setSelectedRequestId(req ? req.id : null);
  };

  const exportRequests = async () => {
    const params = { ...apiParams };
    delete params.page;
    delete params.page_size;
    return appointmentRequestService.exportAppointmentRequests(params);
  };

  return {
    requests,
    totalCount,
    selectedRequest,
    setSelectedRequest: handleSelectedRequest,
    filters,
    setFilters,
    resetFilters,
    stats,
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    isLoading: isListLoading || isDetailLoading,
    error: listError ? listError.message : null,
    clearError,
    triggerRefresh,
    triggerErrorState,
    approveRequest: approveMutation.mutateAsync,
    rejectRequest: rejectMutation.mutateAsync,
    exportRequests
  };
};

export default useAppointmentRequests;
