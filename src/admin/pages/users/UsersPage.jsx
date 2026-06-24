import React from 'react';
import { UserPlus, Search, Edit2, Trash2 } from 'lucide-react';

export const UsersPage = () => {
  const users = [
    { id: 1, name: 'Admin Administrator', email: 'admin@neuroblooms.com', role: 'ADMIN', status: 'Active', joined: 'May 10, 2026' },
    { id: 2, name: 'Dr. Priya Nair', email: 'priya.nair@neuroblooms.com', doctorId: 'DOC-1201', role: 'DOCTOR', status: 'Active', joined: 'May 12, 2026' },
    { id: 3, name: 'Dr. Rajesh Verma', email: 'rajesh.verma@neuroblooms.com', doctorId: 'DOC-1202', role: 'DOCTOR', status: 'Active', joined: 'May 15, 2026' },
    { id: 4, name: 'Sonia Gill', email: 'sonia.gill@neuroblooms.com', role: 'RECEPTIONIST', status: 'Active', joined: 'June 01, 2026' },
    { id: 5, name: 'Rahul Kapoor', email: 'rahul.kapoor@neuroblooms.com', role: 'RECEPTIONIST', status: 'Suspended', joined: 'June 04, 2026' }
  ];

  return (
    <div className="flex flex-col gap-6 text-left select-none">
      
      {/* Table Header Controls */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Search Box */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute left-4 text-slate-400 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-admin-blue-500 focus:ring-4 focus:ring-admin-blue-100 transition-all duration-150"
          />
        </div>

        {/* Right: Actions */}
        <button className="bg-admin-blue-600 hover:bg-admin-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer self-start sm:self-auto">
          <UserPlus className="w-4 h-4" />
          <span>Add New Staff</span>
        </button>
      </div>

      {/* Users Table Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-4">Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Date Joined</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-extrabold text-slate-800">{user.name}</td>
                  <td className="py-4 text-slate-500 font-semibold">{user.email}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wide uppercase ${
                        user.role === 'ADMIN'
                          ? 'bg-admin-blue-50 text-admin-blue-700'
                          : user.role === 'DOCTOR'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500 font-semibold">{user.joined}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-right flex items-center justify-end gap-1.5">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default UsersPage;
