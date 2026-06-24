import React, { useState, useEffect } from 'react';
import sessionService from '../../services/session.service';
import securityService from '../../services/security.service';
import {
  Users,
  UserCheck,
  User,
  Monitor,
  Lock,
  ShieldAlert,
  UserPlus,
  Unlock,
  ShieldCheck,
  FileText,
  FilePen,
  Settings,
  MoreVertical,
  Activity,
  Mail,
  Database,
  Globe,
  FolderOpen,
  Cloud,
  CheckCircle2,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';

export const DashboardPage = () => {
  // 6 Statistics cards data
  const stats = [
    { title: 'Total Users', value: '127', status: '↑ 12 this month', icon: Users, color: 'text-blue-600 bg-blue-50/70 border-blue-100', isPositive: true },
    { title: 'Doctors', value: '18', status: 'Active practitioners', icon: UserCheck, color: 'text-emerald-600 bg-emerald-50/70 border-emerald-100', isPositive: null },
    { title: 'Receptionists', value: '8', status: 'Staff accounts', icon: User, color: 'text-purple-600 bg-purple-50/70 border-purple-100', isPositive: null },
    { title: 'Active Sessions', value: '42', status: 'Currently online', icon: Monitor, color: 'text-blue-600 bg-blue-50/70 border-blue-100', isPositive: true },
    { title: 'Locked Accounts', value: '2', status: 'Requires attention', icon: Lock, color: 'text-red-600 bg-red-50/70 border-red-100', isPositive: false },
    { title: 'Security Events', value: '15', status: 'Last 24 hours', icon: ShieldAlert, color: 'text-amber-600 bg-amber-50/70 border-amber-100', isPositive: null }
  ];

  // Quick Actions
  const quickActions = [
    { label: 'Create User', icon: UserPlus, color: 'text-blue-600 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/40' },
    { label: 'Unlock Accounts', icon: Unlock, color: 'text-red-600 bg-red-50/50 hover:bg-red-50 border border-red-100/40' },
    { label: 'Security Logs', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/40' },
    { label: 'Manage Website Content', icon: FileText, color: 'text-purple-600 bg-purple-50/50 hover:bg-purple-50 border border-purple-100/40' },
    { label: 'Create Blog', icon: FilePen, color: 'text-amber-600 bg-amber-50/50 hover:bg-amber-50 border border-amber-100/40' },
    { label: 'System Settings', icon: Settings, color: 'text-blue-600 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/40' }
  ];

  // Active Sessions State
  const [sessions, setSessions] = useState([]);
  const [isSessionsLoading, setIsSessionsLoading] = useState(true);
  const [sessionsError, setSessionsError] = useState(null);

  // Security Logs State
  const [logs, setLogs] = useState([]);
  const [isLogsLoading, setIsLogsLoading] = useState(true);
  const [logsError, setLogsError] = useState(null);

  useEffect(() => {
    fetchSessions();
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLogsLoading(true);
    setLogsError(null);
    try {
      const response = await securityService.getSecurityLogs({ page: 1 });
      if (response.success && response.data) {
        setLogs(response.data.results || []);
      } else {
        setLogsError(response.message || 'Failed to fetch security logs');
      }
    } catch (err) {
      setLogsError(err.message || 'An error occurred while fetching security logs');
    } finally {
      setIsLogsLoading(false);
    }
  };

  const getLogColor = (action) => {
    if (!action) return 'bg-slate-500 ring-slate-100';
    const act = action.toUpperCase();
    if (act.includes('FAILED') || act.includes('LOCKED') || act.includes('BLOCKED') || act.includes('DENIED')) {
      return 'bg-red-500 ring-red-100';
    }
    if (act.includes('REVOKED') || act.includes('LOGOUT') || act.includes('DEACTIVATED')) {
      return 'bg-amber-500 ring-amber-100';
    }
    return 'bg-emerald-500 ring-emerald-100';
  };

  const formatActionName = (action) => {
    if (!action) return '';
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const fetchSessions = async () => {
    setIsSessionsLoading(true);
    setSessionsError(null);
    try {
      const response = await sessionService.getActiveSessions();
      if (response.success && response.data) {
        setSessions(response.data);
      } else {
        setSessionsError(response.message || 'Failed to fetch sessions');
      }
    } catch (err) {
      setSessionsError(err.message || 'An error occurred while fetching sessions');
    } finally {
      setIsSessionsLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to revoke this session?')) return;
    try {
      const response = await sessionService.revokeSession(sessionId);
      if (response.success) {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
      } else {
        alert(response.message || 'Failed to revoke session');
      }
    } catch (err) {
      alert(err.message || 'An error occurred while revoking the session');
    }
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;

      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }) + ' ' + date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Next Appointments (4 items)
  const nextAppointments = [
    { time: '09:30 AM', diff: 'In 45 min', patient: 'Rohan Mehta', age: '6 Years', type: 'Follow-up Consultation', doctor: 'Dr. Priya Sharma', specialty: 'Developmental Pediatrics', status: 'Confirmed', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
    { time: '10:15 AM', diff: 'In 1h 30m', patient: 'Anaya Singh', age: '8 Years', type: 'Behavioral Therapy', doctor: 'Dr. Arjun Verma', specialty: 'Child Psychologist', status: 'Confirmed', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' },
    { time: '11:00 AM', diff: 'In 2h 15m', patient: 'Vivaan Kapoor', age: '5 Years', type: 'Speech Therapy', doctor: 'Dr. Neha Iyer', specialty: 'Speech Therapist', status: 'Upcoming', statusColor: 'bg-blue-50 text-blue-750 border-blue-100', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' },
    { time: '02:30 PM', diff: 'In 5h 45m', patient: 'Myra Joshi', age: '4 Years', type: 'Occupational Therapy', doctor: 'Dr. Karan Malhotra', specialty: 'Occupational Therapist', status: 'Upcoming', statusColor: 'bg-blue-50 text-blue-750 border-blue-100', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80' }
  ];



  // System Health Grid (2 columns, 3 rows)
  const healthItems = [
    { name: 'Authentication Service', icon: Lock, status: 'Healthy', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { name: 'Email Service (SMTP)', icon: Mail, status: 'Healthy', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { name: 'Database', icon: Database, status: 'Healthy', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { name: 'API Gateway', icon: Globe, status: 'Healthy', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { name: 'File Storage', icon: FolderOpen, status: 'Warning', color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { name: 'Backup Service', icon: Cloud, status: 'Healthy', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' }
  ];

  return (
    <div className="flex flex-col gap-[18px] text-slate-800 pb-4">

      {/* 2. STATISTICS CARDS ROW (Height: 100px, Gap: 16px, Single Row of 6 Cards) */}
      <div className="grid grid-cols-6 gap-4 flex-shrink-0">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="h-[100px] bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3.5 text-left"
            >
              {/* Circular Icon Container */}
              <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Title, Value, Status */}
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider leading-none">
                  {stat.title}
                </span>
                <span className="text-xl font-black text-[#0F172A] font-display leading-tight mt-1">
                  {stat.value}
                </span>
                <span
                  className={`text-[9px] font-bold tracking-wide truncate mt-0.5 leading-none ${stat.isPositive === true
                      ? 'text-[#22C55E]'
                      : stat.isPositive === false
                        ? 'text-[#EF4444]'
                        : stat.isPositive === null && stat.title === 'Security Events'
                          ? 'text-[#F59E0B]'
                          : 'text-[#64748B]'
                    }`}
                >
                  {stat.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. CONTENT GRID (Below statistics, Left 70%, Right 30%) */}
      <div className="grid grid-cols-10 gap-6 pb-1">

        {/* LEFT COLUMN: 70% Width (col-span-7, Flex Column) */}
        <div className="col-span-7 flex flex-col gap-[18px]">

          {/* Widget 1: Quick Actions (Height: 160px) */}
          <div className="bg-white border border-[#E2E8F0] rounded-[22px] p-5 shadow-sm flex flex-col gap-4 flex-shrink-0 h-[160px]">
            <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider text-left leading-none">
              Quick Actions
            </h3>

            {/* Action Grid of 6 equal square cards in a single row */}
            <div className="grid grid-cols-6 gap-3.5 flex-1 min-h-0">
              {quickActions.map((action, idx) => {
                const ActionIcon = action.icon;
                return (
                  <button
                    key={idx}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-[16px] shadow-sm transition-all duration-150 active:scale-97 cursor-pointer ${action.color}`}
                  >
                    <ActionIcon className="w-5 h-5" />
                    <span className="text-[10px] font-extrabold text-[#0F172A] tracking-tight leading-none text-center">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Widget 2: Donut Chart & Compact Table (Side-by-side Row, Height: 240px) */}
          <div className="grid grid-cols-10 gap-5 h-[230px] flex-shrink-0">
            {/* Donut Chart (40% width, col-span-4) */}
            <div className="col-span-4 bg-white border border-[#E2E8F0] rounded-[22px] p-5 shadow-sm flex flex-col h-full min-h-0">
              <h3 className="text-[13px] md:text-sm font-black text-[#0F172A] uppercase tracking-wider text-left leading-none">
                User Distribution
              </h3>

              {/* Donut Layout (centered vertically) */}
              <div className="flex items-center justify-between gap-2 flex-1 my-0">
                {/* SVG Donut Chart */}
                <div className="relative w-28 h-28 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    {/* Circle Circumference = 2 * PI * r. For r=15.915, C is exactly 100 */}
                    {/* Admin: 54% (blue) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#2563EB"
                      strokeWidth="3.5"
                      strokeDasharray="54 100"
                      strokeDashoffset="0"
                    />
                    {/* Doctor: 30% (green) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#22C55E"
                      strokeWidth="3.5"
                      strokeDasharray="30 100"
                      strokeDashoffset="-54"
                    />
                    {/* Receptionist: 14% (purple) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#A855F7"
                      strokeWidth="3.5"
                      strokeDasharray="14 100"
                      strokeDashoffset="-84"
                    />
                    {/* Inactive: 2% (orange) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#F59E0B"
                      strokeWidth="3.5"
                      strokeDasharray="2 100"
                      strokeDashoffset="-98"
                    />
                  </svg>
                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                    <span className="text-xl font-black text-[#0F172A] font-display">127</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Total</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="flex flex-col gap-2 min-w-0 flex-1 pl-3 text-left">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                      Admin
                    </span>
                    <span className="font-extrabold text-slate-850 ml-1">69 <span className="text-[9px] text-slate-400 font-bold">(54%)</span></span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0" />
                      Doctor
                    </span>
                    <span className="font-extrabold text-slate-850 ml-1">38 <span className="text-[9px] text-slate-400 font-bold">(30%)</span></span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] flex-shrink-0" />
                      Receptionist
                    </span>
                    <span className="font-extrabold text-slate-850 ml-1">18 <span className="text-[9px] text-slate-400 font-bold">(14%)</span></span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] flex-shrink-0" />
                      Inactive
                    </span>
                    <span className="font-extrabold text-slate-850 ml-1">2 <span className="text-[9px] text-slate-400 font-bold">(2%)</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Sessions Table (60% width, col-span-6) */}
            <div className="col-span-6 bg-white border border-[#E2E8F0] rounded-[22px] p-5 shadow-sm flex flex-col justify-between h-full min-h-0">
              <div className="flex items-center justify-between flex-shrink-0">
                <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider text-left leading-none">
                  Active Sessions
                </h3>
                <button className="text-[10px] font-bold text-admin-blue-600 hover:underline">
                  View All Sessions →
                </button>
              </div>

              {/* Compact Table */}
              <div className="flex-1 min-h-0 overflow-y-auto mt-3 pr-1 select-none">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead>
                    <tr className="text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      <th className="pb-2">Device</th>
                      <th className="pb-2">Browser</th>
                      <th className="pb-2">IP Address</th>
                      <th className="pb-2">Login Time</th>
                      <th className="pb-2">Last Active</th>
                      <th className="pb-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[10px] font-bold text-slate-700">
                    {isSessionsLoading ? (
                      <tr>
                        <td colSpan="6" className="py-4 text-center text-slate-400">
                          <svg className="animate-spin h-4 w-4 text-slate-400 mx-auto inline mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Loading active sessions...
                        </td>
                      </tr>
                    ) : sessionsError ? (
                      <tr>
                        <td colSpan="6" className="py-4 text-center text-red-500 text-[10px] font-semibold">
                          Error: {sessionsError}
                        </td>
                      </tr>
                    ) : sessions.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-4 text-center text-slate-400">
                          No active sessions found.
                        </td>
                      </tr>
                    ) : (
                      sessions.slice(0, 4).map((session) => (
                        <tr key={session.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-2 text-slate-800 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {session.device || 'Unknown'}
                          </td>
                          <td className="py-2 text-slate-500">
                            {session.browser ? (session.browser.length > 10 ? session.browser.substring(0, 10) + '...' : session.browser) : 'Unknown'}
                          </td>
                          <td className="py-2 text-slate-500 font-mono">{session.ip_address}</td>
                          <td className="py-2 text-slate-500">{formatDateTime(session.login_at)}</td>
                          <td className="py-2 text-slate-400 font-mono">{formatTimeAgo(session.last_activity)}</td>
                          <td className="py-2 text-right">
                            <button
                              onClick={() => handleRevokeSession(session.id)}
                              className="text-[9px] font-black text-[#EF4444] hover:underline cursor-pointer"
                            >
                              Revoke
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Widget 3: Next Appointments (Bottom Full Width, remaining height) */}
          <div className="bg-white border border-[#E2E8F0] rounded-[22px] p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider text-left leading-none">
                Next Appointments
              </h3>
              <button className="text-[10px] font-bold text-admin-blue-600 hover:underline">
                View Calendar →
              </button>
            </div>

            {/* List/Table of 4 upcoming items */}
            <div className="mt-4 pr-1 flex flex-col gap-2 bg-slate-50/25 border border-slate-100/50 p-2 rounded-2xl">
              {nextAppointments.map((apt, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 p-2.5 rounded-xl border border-[#F1F5F9] bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
                >
                  {/* Time Badge */}
                  <div className="flex flex-col items-start min-w-[75px] flex-shrink-0">
                    <span className="text-[11px] font-black text-[#0F172A] font-mono leading-none">
                      {apt.time}
                    </span>
                    <span className="text-[9px] font-bold text-[#22C55E] mt-1 leading-none">
                      {apt.diff}
                    </span>
                  </div>

                  {/* Patient Profile */}
                  <div className="flex items-center gap-2.5 min-w-[150px] flex-1">
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                      <img
                        src={apt.avatar}
                        alt={apt.patient}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-xs font-extrabold text-[#0F172A] truncate leading-none">
                        {apt.patient}
                      </span>
                      <span className="text-[9px] font-semibold text-slate-400 mt-1 leading-none">
                        {apt.age} • {apt.type}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Profile */}
                  <div className="flex flex-col text-left min-w-[130px] hidden sm:flex">
                    <span className="text-xs font-bold text-slate-700 leading-none">
                      {apt.doctor}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400 mt-1 leading-none">
                      {apt.specialty}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black border uppercase tracking-wider leading-none ${apt.statusColor}`}>
                      {apt.status}
                    </span>
                    <button className="p-1 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 30% Width (col-span-3, Flex Column) */}
        <div className="col-span-3 flex flex-col gap-[18px]">

          {/* Widget 1: Security Center (Height: 420px) */}
          <div className="bg-white border border-[#E2E8F0] rounded-[22px] p-5 shadow-sm flex flex-col justify-between h-[420px] min-h-0 flex-shrink-0">
            <div className="flex items-center justify-between flex-shrink-0 border-b border-slate-50 pb-3">
              <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider text-left leading-none">
                Security Center
              </h3>
              <button className="text-[10px] font-bold text-admin-blue-600 hover:underline">
                View All Logs →
              </button>
            </div>

            {/* Vertical timeline timeline items */}
            <div className="flex-1 overflow-y-auto mt-4 pr-1 flex flex-col justify-between relative pl-4">
              {/* Vertical dotted line connector */}
              <div className="absolute left-[23px] top-[15px] bottom-[15px] w-0.5 border-l-2 border-dashed border-slate-100 pointer-events-none z-0" />

              {isLogsLoading ? (
                <div className="text-center text-slate-400 py-8 relative z-10 w-full">
                  <svg className="animate-spin h-4 w-4 text-slate-400 mx-auto inline mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading security logs...
                </div>
              ) : logsError ? (
                <div className="text-center text-red-500 py-8 relative z-10 text-[10px] font-semibold w-full">
                  Error: {logsError}
                </div>
              ) : logs.length === 0 ? (
                <div className="text-center text-slate-400 py-8 relative z-10 w-full">
                  No security logs found.
                </div>
              ) : (
                logs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex gap-4 items-start relative z-10 text-left my-1 w-full min-w-0">
                    {/* Timeline point */}
                    <div className={`w-3.5 h-3.5 rounded-full ${getLogColor(log.action)} ring-4 flex-shrink-0 mt-0.5`} />

                    {/* Content details */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-extrabold text-[#0F172A] leading-tight">
                        {formatActionName(log.action)}
                      </span>
                      <span className="text-[9px] font-semibold text-slate-450 mt-0.5 leading-normal">
                        {log.description}
                      </span>
                    </div>

                    {/* Timestamp */}
                    <span className="text-[9px] font-bold text-slate-400 font-mono flex-shrink-0 mt-0.5 ml-1">
                      {formatTimeAgo(log.created_at)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Widget 2: System Health (Height: remaining viewport height) */}
          <div className="bg-white border border-[#E2E8F0] rounded-[22px] p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-wider text-left leading-none">
                System Health
              </h3>
              <button className="text-[10px] font-bold text-admin-blue-600 hover:underline">
                View All Services →
              </button>
            </div>

            {/* Grid of 6 items (2 columns, 3 rows) */}
            <div className="grid grid-cols-2 gap-2.5 my-3 pr-1">
              {healthItems.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/30 hover:border-slate-200 transition-colors flex items-center gap-2 text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-150 flex items-center justify-center text-slate-500 flex-shrink-0">
                      <ItemIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-extrabold text-[#0F172A] leading-tight truncate">
                        {item.name}
                      </span>
                      <span className="flex items-center gap-1 mt-0.5 leading-none">
                        <span className={`w-1 h-1 rounded-full ${item.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className={`text-[8px] font-bold ${item.status === 'Healthy' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {item.status}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom operational banner */}
            <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-2 flex items-center justify-center gap-2 flex-shrink-0 animate-pulse" style={{ animationDuration: '4s' }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#22C55E] fill-none stroke-current stroke-2 flex-shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 11l2 2 4-4" /></svg>
              <span className="text-[9px] font-extrabold text-emerald-700 select-none">
                All systems operational. Last checked 2 minutes ago.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
