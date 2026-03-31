// directory.jsx — Employee Directory page (replaces old employees.jsx)
// Includes: Add Employee modal, View modal per row
import React, { useState } from 'react';
import { Search, Download, Plus } from 'lucide-react';
import Modal, { ModalFooter, ModalField, InfoRow, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static employee data ─────────────────────────────────────────────────────
const INIT_EMPLOYEES = [
  { id:'HS-001', name:'Juan Dela Cruz',  email:'juandelacruz@highlysucceed.com', phone:'0945-703-1245', dept:'Project Management', pos:'Project Management Head',  date:'January 15, 2026',   exp:'3 Years', arrangement:'On-site', status:'Active' },
  { id:'HS-002', name:'John Doe',        email:'johndoe@highlysucceed.com',      phone:'0927-803-0546', dept:'IT',                 pos:'Project Management Head',  date:'December 15, 2025',  exp:'4 Years', arrangement:'On-site', status:'Active' },
  { id:'HS-003', name:'Eva Smith',       email:'evasmith@highlysucceed.com',     phone:'0998-404-7823', dept:'Finance',            pos:'Finance Analyst',          date:'September 20, 2025', exp:'4 Years', arrangement:'On-site', status:'Active' },
  { id:'HS-004', name:'Chris Staples',   email:'chris@highlysucceed.com',        phone:'0927-862-1534', dept:'Sales',              pos:'Senior Sales Exec',         date:'September 1, 2025',  exp:'1 Year',  arrangement:'On-site', status:'Active' },
  { id:'HS-005', name:'Ken Aquino',      email:'ken@highlysucceed.com',          phone:'0990-764-3272', dept:'Operations',         pos:'Ops Supervisor',            date:'August 15, 2023',    exp:'3 Years', arrangement:'On-site', status:'Active' },
];

const DEPTS        = ['All Departments','IT','Project Management','Finance','Sales','Operations','Marketing','Human Resources'];
const ARRANGEMENTS = ['All Arrangement','On-site','Hybrid','Remote'];

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = { Active:'bg-green-500 text-white', Leave:'bg-yellow-400 text-black', Inactive:'bg-gray-200 text-gray-600' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

// ─── Stat card (inline — consistent with dashboard pattern) ──────────────────
const Stat = ({ label, value, sub, yellow }) => (
  <div className={`rounded-xl p-4 flex flex-col gap-1 ${yellow?'bg-yellow-400':'bg-white border border-gray-200'}`}>
    <p className={`text-[10px] font-bold uppercase tracking-wider ${yellow?'text-black/60':'text-gray-400'}`}>{label}</p>
    <p className={`text-3xl font-black leading-none ${yellow?'text-black':'text-gray-900'}`}>{value}</p>
    {sub && <p className={`text-[11px] font-medium ${yellow?'text-black/70':'text-gray-400'}`}>{sub}</p>}
  </div>
);

const Directory = () => {
  const [employees, setEmployees] = useState(INIT_EMPLOYEES);

  // Filter state
  const [search,       setSearch]       = useState('');
  const [deptFilter,   setDeptFilter]   = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [arrFilter,    setArrFilter]    = useState('');

  // Add Employee modal state
  const [addOpen, setAddOpen] = useState(false);
  const emptyForm = { name:'', email:'', phone:'', dept:'IT', pos:'', date:'', arrangement:'On-site', status:'Active' };
  const [form, setForm] = useState(emptyForm);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value })); // field updater

  // View Employee modal state
  const [viewEmp, setViewEmp] = useState(null); // holds the employee object being viewed

  // Filtered list
  const filtered = employees.filter(e => {
    const q = `${e.name} ${e.id} ${e.dept} ${e.pos}`.toLowerCase();
    return (
      q.includes(search.toLowerCase()) &&
      (!deptFilter   || e.dept        === deptFilter) &&
      (!statusFilter || e.status      === statusFilter) &&
      (!arrFilter    || e.arrangement === arrFilter)
    );
  });

  // Add employee handler (frontend-only, no API yet)
  const handleAdd = () => {
    const newId = `HS-${String(employees.length + 1).padStart(3, '0')}`;
    setEmployees(prev => [...prev, { ...form, id: newId, exp: '0 Years' }]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page heading */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">Employees</h2>
        <p className="text-xs text-gray-400 mt-0.5">All employees across departments — Highly Succeed, Inc.</p>
      </div>

      {/* ── Stat row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Total Employees" value={employees.length} sub="Across all departments" yellow />
        <Stat label="Active"          value={employees.filter(e=>e.status==='Active').length} sub="Currently working" />
        <Stat label="On Leave"        value={employees.filter(e=>e.status==='Leave').length}  sub="Approved leave" />
        <Stat label="On Probation"    value="2" sub="New hires" />
      </div>

      {/* ── Filters + actions ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3 items-center">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input type="text" placeholder="Search ID, name, department..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
        </div>

        {/* Department filter */}
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer">
          <option value="">All Departments</option>
          {DEPTS.slice(1).map(d => <option key={d}>{d}</option>)}
        </select>

        {/* Status filter */}
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer">
          <option value="">All Status</option>
          <option>Active</option><option>Leave</option><option>Inactive</option>
        </select>

        {/* Arrangement filter */}
        <select value={arrFilter} onChange={e => setArrFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer">
          <option value="">All Arrangement</option>
          {ARRANGEMENTS.slice(1).map(a => <option key={a}>{a}</option>)}
        </select>

        <div className="flex-1 hidden lg:block" /> {/* spacer */}

        {/* Export CSV button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors">
          <Download size={15} /> Export CSV
        </button>

        {/* Add Employee — opens modal */}
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg text-sm font-bold cursor-pointer transition-colors">
          <Plus size={15} /> Add Employee
        </button>
      </div>

      {/* ── Employee table ── */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100 bg-gray-50/50">
                {['Employee','Contact','Department','Position','Date Hired','Arrangement','Status','Action'].map(h => (
                  <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-400">No employees match the current filters.</td></tr>
              ) : filtered.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Employee name + ID */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[10px] shrink-0">
                        {emp.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 leading-tight">{emp.name}</p>
                        <p className="text-[10px] text-gray-400">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[12px] text-gray-700">{emp.email}</p>
                    <p className="text-[11px] text-gray-400">{emp.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-700">{emp.dept}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-[160px]">{emp.pos}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{emp.date}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-600 rounded text-[10px] font-bold uppercase">{emp.arrangement}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={emp.status} /></td>
                  {/* View button — opens detail modal */}
                  <td className="px-4 py-3">
                    <button onClick={() => setViewEmp(emp)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ ADD EMPLOYEE MODAL ══ */}
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setForm(emptyForm); }} title="Add Employee">
        <div className="space-y-4">
          <ModalField label="Full Name">
            <input type="text" value={form.name} onChange={f('name')} placeholder="e.g. Juan Dela Cruz" className={INPUT_CLS} />
          </ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Email">
              <input type="email" value={form.email} onChange={f('email')} placeholder="email@company.com" className={INPUT_CLS} />
            </ModalField>
            <ModalField label="Phone">
              <input type="text" value={form.phone} onChange={f('phone')} placeholder="09XX-XXX-XXXX" className={INPUT_CLS} />
            </ModalField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Department">
              <select value={form.dept} onChange={f('dept')} className={SELECT_CLS}>
                {DEPTS.slice(1).map(d => <option key={d}>{d}</option>)}
              </select>
            </ModalField>
            <ModalField label="Position">
              <input type="text" value={form.pos} onChange={f('pos')} placeholder="Job title" className={INPUT_CLS} />
            </ModalField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Date Hired">
              <input type="date" value={form.date} onChange={f('date')} className={INPUT_CLS} />
            </ModalField>
            <ModalField label="Work Arrangement">
              <select value={form.arrangement} onChange={f('arrangement')} className={SELECT_CLS}>
                {ARRANGEMENTS.slice(1).map(a => <option key={a}>{a}</option>)}
              </select>
            </ModalField>
          </div>
          <ModalField label="Status">
            <select value={form.status} onChange={f('status')} className={SELECT_CLS}>
              <option>Active</option><option>Leave</option><option>Inactive</option>
            </select>
          </ModalField>
        </div>
        <ModalFooter onCancel={() => { setAddOpen(false); setForm(emptyForm); }} onConfirm={handleAdd} confirmLabel="Save Employee" />
      </Modal>

      {/* ══ VIEW EMPLOYEE MODAL ══ */}
      <Modal open={!!viewEmp} onClose={() => setViewEmp(null)} title="Employee Details">
        {viewEmp && (
          <div className="space-y-5">
            {/* Avatar + name header */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-lg shrink-0">
                {viewEmp.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">{viewEmp.name}</p>
                <p className="text-xs text-gray-400">{viewEmp.id}</p>
                <StatusBadge status={viewEmp.status} />
              </div>
            </div>
            {/* Info grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Email"            value={viewEmp.email} />
              <InfoRow label="Phone"            value={viewEmp.phone} />
              <InfoRow label="Department"       value={viewEmp.dept} />
              <InfoRow label="Position"         value={viewEmp.pos} />
              <InfoRow label="Date Hired"       value={viewEmp.date} />
              <InfoRow label="Experience"       value={viewEmp.exp} />
              <InfoRow label="Work Arrangement" value={viewEmp.arrangement} />
              <InfoRow label="Status"           value={viewEmp.status} />
            </div>
            {/* Close footer */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewEmp(null)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Directory;
