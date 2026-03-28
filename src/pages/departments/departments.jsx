// departments.jsx — Departments management page
import React, { useState } from 'react';

const DEPTS = [
  { name:'Information Technology', desc:'Software development & infrastructure', employees:4, status:'Active' },
  { name:'Human Resources',        desc:'People operations & compliance',         employees:3, status:'Active' },
  { name:'Finance',                 desc:'Accounting, payroll & budgeting',        employees:3, status:'Active' },
  { name:'Operations',              desc:'Business operations & logistics',         employees:5, status:'Active' },
  { name:'Marketing',               desc:'Brand, campaigns & sales support',        employees:3, status:'Active' },
];

const Departments = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:'', desc:'' });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Departments</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage company departments and their structure.</p>
        </div>
        <button onClick={()=>setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Add Department
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Departments</p><p className="text-3xl font-black text-black mt-1">5</p><p className="text-[11px] text-black/70">All active</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Positions</p><p className="text-3xl font-black text-gray-900 mt-1">8</p><p className="text-[11px] text-gray-400">Across departments</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Employees</p><p className="text-3xl font-black text-gray-900 mt-1">18</p><p className="text-[11px] text-gray-400">Assigned</p></div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Departments</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Department','Description','Employees','Status','Action'].map(h=><th key={h} className="px-5 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DEPTS.map((d,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{d.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{d.desc}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">{d.employees}</td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{d.status}</span></td>
                  <td className="px-5 py-3.5"><button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Department Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-base text-gray-900 mb-4">Add Department</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Department Name</label>
                <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Description</label>
                <input type="text" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg cursor-pointer">Save Department</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Departments;
