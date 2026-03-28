// employees.jsx — Employee Management page
import React, { useState } from 'react';

const EMPLOYEES = [
  { id:'HS-001', name:'Juan Dela Cruz', contact:'0945-703-1245', dept:'Project Management', pos:'Project Management Head',     hired:'January 15, 2026',   arr:'On-site', status:'Active' },
  { id:'HS-002', name:'John Doe',       contact:'0927-803-0546', dept:'IT',                 pos:'Project Management Head',     hired:'December 15, 2025',  arr:'On-site', status:'Active' },
  { id:'HS-003', name:'Eva Smith',      contact:'0998-404-7823', dept:'Finance',            pos:'Finance Analyst',              hired:'September 20, 2025', arr:'On-site', status:'Active' },
  { id:'HS-004', name:'Chris Staples',  contact:'0927-862-1534', dept:'Sales',              pos:'Senior Sales Exec',            hired:'September 1, 2025',  arr:'On-site', status:'Active' },
  { id:'HS-005', name:'Ken Aquino',     contact:'0990-764-3272', dept:'Operations',         pos:'Ops Supervisor',               hired:'August 15, 2023',    arr:'On-site', status:'Active' },
];

const StatusBadge = ({ status }) => {
  const map = { Active:'bg-green-500 text-white', Leave:'bg-yellow-400 text-black', Inactive:'bg-gray-200 text-gray-600' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const Stat = ({ label, value, sub, yellow }) => (
  <div className={`rounded-xl p-4 ${yellow?'bg-yellow-400':'bg-white border border-gray-200'}`}>
    <p className={`text-[10px] font-bold uppercase tracking-wider ${yellow?'text-black/60':'text-gray-400'}`}>{label}</p>
    <p className={`text-3xl font-black mt-1 ${yellow?'text-black':'text-gray-900'}`}>{value}</p>
    <p className={`text-[11px] ${yellow?'text-black/70':'text-gray-400'}`}>{sub}</p>
  </div>
);

const Employees = () => {
  const [search, setSearch] = useState('');
  const filtered = EMPLOYEES.filter(e => `${e.name} ${e.id} ${e.dept}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 pb-8">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Employees</h2>
        <p className="text-xs text-gray-400 mt-0.5">All employees across departments — Highly Succeed, Inc.</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Total Employees" value="18" sub="Across all departments" yellow />
        <Stat label="Active"          value="14" sub="Currently working" />
        <Stat label="On Leave"        value="2"  sub="Approved Leave" />
        <Stat label="On Probation"    value="2"  sub="New Hires" />
      </div>

      {/* Employee table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <div className="relative max-w-xs">
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" placeholder="Search ID, name, department..." value={search} onChange={e=>setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Employees','Contact','Department','Position','Date Hired','Arrangement','Status','Action'].map(h=>(
                  <th key={h} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(emp=>(
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[10px] shrink-0">
                        {emp.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div><p className="text-sm font-semibold text-gray-800">{emp.name}</p><p className="text-[10px] text-gray-400">{emp.id}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{emp.contact}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{emp.dept}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{emp.pos}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{emp.hired}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{emp.arr}</td>
                  <td className="px-4 py-3"><StatusBadge status={emp.status}/></td>
                  <td className="px-4 py-3"><button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Employees;
