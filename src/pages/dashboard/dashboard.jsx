// dashboard.jsx — Admin Dashboard: overview stats, recent employees, pending requests, announcements
import React, { useState } from 'react';
import { Users, CheckCircle2, XCircle, Plus } from 'lucide-react';

// ─── Stat card used across the top row ───────────────────────────────────────
const StatCard = ({ label, value, sub, yellow }) => (
  <div className={`rounded-xl p-4 flex flex-col gap-1 ${yellow ? 'bg-yellow-400' : 'bg-white border border-gray-200'}`}>
    <p className={`text-[10px] font-bold uppercase tracking-wider ${yellow ? 'text-black/60' : 'text-gray-400'}`}>{label}</p>
    <p className={`text-3xl font-black leading-none ${yellow ? 'text-black' : 'text-gray-900'}`}>{value}</p>
    {sub && <p className={`text-[11px] font-medium ${yellow ? 'text-black/70' : 'text-gray-400'}`}>{sub}</p>}
  </div>
);

// ─── Status badge used in tables ─────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Active:   'bg-green-500 text-white',
    Leave:    'bg-yellow-400 text-black',
    Pending:  'bg-yellow-400 text-black',
    Approved: 'bg-green-500 text-white',
    Rejected: 'bg-red-500 text-white',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${map[status] ?? 'bg-gray-200 text-gray-600'}`}>
      {status}
    </span>
  );
};

// ─── Pending request row ──────────────────────────────────────────────────────
const RequestRow = ({ refNo, employee, type, date, status, approver }) => (
  <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
    <td className="px-4 py-3 text-xs text-gray-500 font-mono">{refNo}</td>
    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{employee}</td>
    <td className="px-4 py-3">
      {/* Leave/OT type coloured link-style */}
      <span className={`text-xs font-semibold ${type.includes('Leave') ? 'text-blue-500' : 'text-orange-500'}`}>{type}</span>
    </td>
    <td className="px-4 py-3 text-xs text-gray-500">{date}</td>
    <td className="px-4 py-3">
      {status ? <StatusBadge status={status} /> : <span className="text-xs text-gray-300">—</span>}
    </td>
    <td className="px-4 py-3 text-xs text-gray-500">{approver || '—'}</td>
  </tr>
);

const Dashboard = () => {
  // Active tab for pending requests (Leave / OT)
  const [reqTab, setReqTab] = useState('Leave');

  return (
    <div className="space-y-5 pb-8">

      {/* Page heading */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
        <p className="text-xs text-gray-400 mt-0.5">Welcome Super Admin. Here's what's happening with your HR system today.</p>
      </div>

      {/* ── Top stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Employees"  value="18" sub="Across All Departments" yellow />
        <StatCard label="Active Employees" value="14" sub="Currently Working" />
        <StatCard label="On Leave Today"   value="2"  sub="Approved Leave" />
        <StatCard label="On Probation"     value="2"  sub="New Hires" />
      </div>

      {/* ── Second stat row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Pending Leave Requests" value="3"  sub="Awaiting Approval" />
        <StatCard label="Pending OT Requests"    value="2"  sub="Awaiting Approval" />
        <StatCard label="Departments"            value="5"  sub="Active Departments" />
        <StatCard label="Today's Attendance"     value="12" sub="Timed In Today" />
      </div>

      {/* ── Recent Employees + Department Breakdown ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Recent Employees table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-800">Recent Employees</h3>
            <button className="text-xs text-yellow-600 font-bold hover:text-yellow-700 cursor-pointer">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  <th className="px-4 py-2.5">Employee</th>
                  <th className="px-4 py-2.5">Department</th>
                  <th className="px-4 py-2.5">Position</th>
                  <th className="px-4 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Juan Dela Cruz', id: 'HS-001', dept: 'Project Management', pos: 'Project Management Head', status: 'Active' },
                  { name: 'John Doe',       id: 'HS-002', dept: 'Project Management', pos: 'Project Management Assistant', status: 'Active' },
                  { name: 'Ken Aquino',     id: 'HS-003', dept: 'Finance',            pos: 'Finance Analyst', status: 'Leave' },
                  { name: 'Eva Smith',      id: 'HS-004', dept: 'Sales',              pos: 'Senior Sales Dev.', status: 'Leave' },
                ].map((emp, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/40 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">{emp.name}</p>
                      <p className="text-[10px] text-gray-400">{emp.id}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{emp.dept}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{emp.pos}</td>
                    <td className="px-4 py-3"><StatusBadge status={emp.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h3 className="font-bold text-sm text-gray-800">Department Breakdown</h3>
          </div>
          <div className="p-4 space-y-3">
            {[
              { name: 'Information Technology', count: 4, color: 'bg-red-400' },
              { name: 'Human Resources',        count: 3, color: 'bg-green-400' },
              { name: 'Finance',                count: 3, color: 'bg-yellow-400' },
              { name: 'Operations',             count: 5, color: 'bg-blue-400' },
              { name: 'Marketing',              count: 3, color: 'bg-gray-700' },
            ].map((dept, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-medium text-gray-700 truncate">{dept.name}</p>
                    <p className="text-xs font-bold text-gray-900 ml-2">{dept.count}</p>
                  </div>
                  {/* Proportional bar — max 5 employees = 100% */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${dept.color}`} style={{ width: `${(dept.count / 5) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Pending Requests + Announcements ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Pending Requests table with Leave/OT tabs */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-800">Pending Requests</h3>
            <div className="flex gap-1">
              {['Leave', 'OT'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setReqTab(tab)}
                  className={`px-3 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                    reqTab === tab ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  <th className="px-4 py-2.5">Ref No.</th>
                  <th className="px-4 py-2.5">Employee</th>
                  <th className="px-4 py-2.5">Type</th>
                  <th className="px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Approver</th>
                </tr>
              </thead>
              <tbody>
                {reqTab === 'Leave' ? (
                  <>
                    <RequestRow refNo="LV-2026-001" employee="Ken Aquino"     type="Vacant Leave"  date="Mar 10 - 11" status="Pending"  />
                    <RequestRow refNo="LV-2026-022" employee="Bindi Ardhan"   type="Sick Leave"    date="Mar 20 - 22" status={null}     />
                    <RequestRow refNo="LV-2026-07"  employee="Ken Recto"      type="Overtime"      date="Mar 14"      status={null}     />
                    <RequestRow refNo="LV-2026-031" employee="Robert Salcedo" type="Overtime"      date="Mar 14"      status={null}     />
                  </>
                ) : (
                  <>
                    <RequestRow refNo="OT-2026-001" employee="John Doe"       type="Overtime"      date="Mar 1"       status="Approved" />
                    <RequestRow refNo="OT-2026-002" employee="Juan Dela Cruz" type="Overtime"      date="Mar 5"       status="Pending"  />
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcements quick panel */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-800">Announcements</h3>
            <button className="flex items-center gap-1 text-xs font-bold text-white bg-yellow-400 hover:bg-yellow-500 px-2.5 py-1 rounded-lg cursor-pointer transition-colors">
              <Plus size={12} /> New
            </button>
          </div>
          <div className="p-3 space-y-2.5">
            {[
              { title: 'Revised Attendance Policy - Effective March 2026', sub: 'March 1, 2026 · HR Department Policy', color: 'border-yellow-400 bg-yellow-50' },
              { title: 'Company Team Building - March 15, 2026',           sub: 'March 1, 2026 · All Employees · Event', color: 'border-yellow-400 bg-yellow-50' },
              { title: 'New Payroll Cut-off Schedule for Q2',              sub: 'February 28, 2026 · All Employees · Payroll', color: 'border-gray-300 bg-gray-50' },
            ].map((ann, i) => (
              <div key={i} className={`border-l-4 ${ann.color} rounded-r-lg p-3`}>
                <p className="text-xs font-bold text-gray-800 leading-snug">{ann.title}</p>
                <p className="text-[10px] text-gray-400 mt-1">{ann.sub}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
