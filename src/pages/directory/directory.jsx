// directory.jsx — Employee Directory page for Admin portal
// Copied from employee app and adapted: consistent stat card style,
// admin color palette (yellow-400 accents), shared badge/button conventions
import React, { useState } from 'react';
import { Search, Download, Plus } from 'lucide-react';

// ─── Static employee data — replace with API call when backend is ready ───────
const EMPLOYEES = [
  {
    id: 'HS-001', name: 'Juan Dela Cruz',
    email: 'juandelacruz@highlysucceed.com', phone: '0945-765-1267',
    dept: 'Developer',           pos: 'Lead Software Developer',
    date: 'Jan 15, 2023',  exp: '3 Years',  arrangement: 'On-site', status: 'Active',
  },
  {
    id: 'HS-002', name: 'John Doe',
    email: 'johndoe@highlysucceed.com',      phone: '0927-678-3546',
    dept: 'Project Management',  pos: 'Project Management Head',
    date: 'Feb 15, 2022',  exp: '4 Years',  arrangement: 'Hybrid',  status: 'Active',
  },
  {
    id: 'HS-003', name: 'Eva Smith',
    email: 'evasmith@highlysucceed.com',     phone: '0995-464-7823',
    dept: 'Finance',             pos: 'Finance Analyst',
    date: 'Sept 20, 2022', exp: '4 Years',  arrangement: 'Hybrid',  status: 'Leave',
  },
  {
    id: 'HS-004', name: 'Chris Staples',
    email: 'chrisstaples@highlysucceed.com', phone: '0927-862-1534',
    dept: 'Sales',               pos: 'Senior Sales Exec',
    date: 'Sept 1, 2025',  exp: '1 Year',   arrangement: 'On-site', status: 'Active',
  },
  {
    id: 'HS-005', name: 'Ken Aquino',
    email: 'kenaquino@highlysucceed.com',    phone: '0990-764-3272',
    dept: 'Operations',          pos: 'Ops Supervisor',
    date: 'Aug 15, 2023',  exp: '3 Years',  arrangement: 'On-site', status: 'Active',
  },
];

// ─── Stat card — inline to keep file self-contained ──────────────────────────
const Stat = ({ label, value, sub, yellow }) => (
  <div className={`rounded-xl p-4 flex flex-col gap-1 ${yellow ? 'bg-yellow-400' : 'bg-white border border-gray-200'}`}>
    <p className={`text-[10px] font-bold uppercase tracking-wider ${yellow ? 'text-black/60' : 'text-gray-400'}`}>{label}</p>
    <p className={`text-3xl font-black leading-none ${yellow ? 'text-black' : 'text-gray-900'}`}>{value}</p>
    {sub && <p className={`text-[11px] font-medium ${yellow ? 'text-black/70' : 'text-gray-400'}`}>{sub}</p>}
  </div>
);

// ─── Status badge — shared style consistent with admin StatusBadge pattern ───
const StatusBadge = ({ status }) => {
  const map = {
    Active:   'bg-green-500 text-white',
    Leave:    'bg-yellow-400 text-black',
    Inactive: 'bg-gray-200 text-gray-600',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status] ?? 'bg-gray-200 text-gray-600'}`}>
      {status}
    </span>
  );
};

// ─── Arrangement badge ────────────────────────────────────────────────────────
const ArrangeBadge = ({ value }) => (
  <span className="px-2.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-600 rounded text-[10px] font-bold uppercase">
    {value}
  </span>
);

// ─── Main Directory component ─────────────────────────────────────────────────
const Directory = () => {
  const [search,      setSearch]      = useState(''); // search input state
  const [deptFilter,  setDeptFilter]  = useState(''); // department filter state
  const [statusFilter, setStatusFilter] = useState(''); // status filter state
  const [arrangeFilter, setArrangeFilter] = useState(''); // arrangement filter state

  // Derive unique department options from data
  const deptOptions = [...new Set(EMPLOYEES.map(e => e.dept))].sort();

  // Filtered list based on search + dropdowns
  const filtered = EMPLOYEES.filter(e => {
    const matchSearch  = `${e.name} ${e.id} ${e.dept} ${e.pos}`.toLowerCase().includes(search.toLowerCase());
    const matchDept    = !deptFilter   || e.dept        === deptFilter;
    const matchStatus  = !statusFilter || e.status      === statusFilter;
    const matchArrange = !arrangeFilter || e.arrangement === arrangeFilter;
    return matchSearch && matchDept && matchStatus && matchArrange;
  });

  return (
    <div className="space-y-5 pb-8">

      {/* Page heading */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">Employee Directory</h2>
        <p className="text-xs text-gray-400 mt-0.5">All employees across departments — Highly Succeed, Inc.</p>
      </div>

      {/* ── Stat row — total / active / on leave / on probation ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Total Employees" value="18" sub="Across all departments" yellow />
        <Stat label="Active"          value="14" sub="Currently working" />
        <Stat label="On Leave"        value="2"  sub="Approved leave" />
        <Stat label="On Probation"    value="2"  sub="New hires" />
      </div>

      {/* ── Filters + action buttons ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3 items-center">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Search ID, name, department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          />
        </div>

        {/* Department filter dropdown */}
        <select
          value={deptFilter}
          onChange={e => setDeptFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer"
        >
          <option value="">All Departments</option>
          {deptOptions.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        {/* Status filter dropdown */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Leave">Leave</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Arrangement filter dropdown */}
        <select
          value={arrangeFilter}
          onChange={e => setArrangeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer"
        >
          <option value="">All Arrangement</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>

        {/* Spacer — pushes action buttons to the right on wider screens */}
        <div className="flex-1 hidden lg:block" />

        {/* Export CSV button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors">
          <Download size={15} />
          Export CSV
        </button>

        {/* Add Employee button — yellow-accent primary action */}
        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg text-sm font-bold cursor-pointer transition-colors">
          <Plus size={15} />
          Add Employee
        </button>
      </div>

      {/* ── Employee table ── */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            {/* Table header */}
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100 bg-gray-50/50">
                {['Employee', 'Contact', 'Department', 'Position', 'Date Hired', 'Arrangement', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                /* Empty state row */
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-400">
                    No employees match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map(emp => (
                  <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">

                    {/* Employee name + ID */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {/* Avatar: initials from full name */}
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[10px] shrink-0">
                          {emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 leading-tight">{emp.name}</p>
                          <p className="text-[10px] text-gray-400">{emp.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact info */}
                    <td className="px-4 py-3">
                      <p className="text-[12px] text-gray-700 leading-tight">{emp.email}</p>
                      <p className="text-[11px] text-gray-400">{emp.phone}</p>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700">{emp.dept}</td>

                    {/* Position */}
                    <td className="px-4 py-3">
                      <p className="text-xs text-gray-600 leading-snug max-w-[160px]">{emp.pos}</p>
                    </td>

                    {/* Date hired + experience */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-gray-700 whitespace-nowrap">{emp.date}</p>
                      <p className="text-[11px] text-gray-400">{emp.exp}</p>
                    </td>

                    {/* Work arrangement badge */}
                    <td className="px-4 py-3">
                      <ArrangeBadge value={emp.arrangement} />
                    </td>

                    {/* Status badge */}
                    <td className="px-4 py-3">
                      <StatusBadge status={emp.status} />
                    </td>

                    {/* View action button */}
                    <td className="px-4 py-3">
                      <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">
                        View
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
  );
};

export default Directory;
