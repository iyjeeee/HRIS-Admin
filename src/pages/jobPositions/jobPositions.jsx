// jobPositions.jsx — Job Positions management page
import React, { useState } from 'react';

const POSITIONS = [
  { title:'Junior Software Developer',  dept:'Information Technology', employees:2, status:'Active' },
  { title:'Senior Software Developer',  dept:'Information Technology', employees:1, status:'Active' },
  { title:'Project Management Head',    dept:'Information Technology', employees:1, status:'Active' },
  { title:'HR Officer',                 dept:'Human Resources',         employees:2, status:'Active' },
  { title:'HR Manager',                 dept:'Human Resources',         employees:1, status:'Active' },
  { title:'Finance Analyst',            dept:'Finance',                 employees:3, status:'Active' },
  { title:'Operations Manager',         dept:'Operations',              employees:5, status:'Active' },
  { title:'Marketing Specialist',       dept:'Marketing',               employees:3, status:'Active' },
];

const DEPARTMENTS = ['All Departments','Information Technology','Human Resources','Finance','Operations','Marketing'];

const JobPositions = () => {
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [showModal, setShowModal]   = useState(false);
  const [form, setForm]             = useState({ title:'', dept:'Information Technology' });

  const filtered = deptFilter === 'All Departments' ? POSITIONS : POSITIONS.filter(p => p.dept === deptFilter);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Job Position</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage all job titles and their department assignments.</p>
        </div>
        <button onClick={()=>setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Add Position
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Positions</p>
          {/* Department filter dropdown */}
          <select value={deptFilter} onChange={e=>setDeptFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
            {DEPARTMENTS.map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Position Title','Department','Employees','Status','Action'].map(h=><th key={h} className="px-5 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{p.title}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{p.dept}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">{p.employees}</td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{p.status}</span></td>
                  <td className="px-5 py-3.5"><button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Position Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-base text-gray-900 mb-4">Add Position</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Position Title</label>
                <input type="text" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Department</label>
                <select value={form.dept} onChange={e=>setForm({...form,dept:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400">
                  {DEPARTMENTS.slice(1).map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg cursor-pointer">Save Position</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default JobPositions;
