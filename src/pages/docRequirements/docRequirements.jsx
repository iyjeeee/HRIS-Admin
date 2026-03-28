// docRequirements.jsx — Admin Document Requirements: master list of required employee docs
import React, { useState } from 'react';

const REQUIREMENTS = [
  { name:'Signed Employee Contract',          category:'Legal/Contract',  required:'Required', status:'Active' },
  { name:'NBI Clearance',                     category:'Pre-Employment',  required:'Required', status:'Active' },
  { name:'SSS E1/E4 Form',                    category:'Gov\'t Benefit',  required:'Required', status:'Active' },
  { name:'PhilHealth MDR Form',               category:'Gov\'t Benefit',  required:'Required', status:'Active' },
  { name:'Pag-IBIG Membership Form (MDF)',    category:'Gov\'t Benefit',  required:'Required', status:'Active' },
  { name:'BIR Form 2316 (Prior Employer)',    category:'Tax',             required:'Optional', status:'Active' },
  { name:'Birth Certificate (PSA)',           category:'Personal/Civil',  required:'Required', status:'Active' },
];

// Badge for Required/Optional distinction
const RequiredBadge = ({ r }) => (
  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${r === 'Required' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{r}</span>
);

const DocRequirements = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:'', category:'Legal/Contract', required:'Required' });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Document Requirements</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage required documents for all employee 201 files.</p>
        </div>
        <button onClick={()=>setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Add Requirement
        </button>
      </div>

      {/* Requirements table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Document Name','Category','Required','Status','Actions'].map(h=>(
                  <th key={h} className="px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {REQUIREMENTS.map((r,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{r.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{r.category}</td>
                  <td className="px-5 py-3.5"><RequiredBadge r={r.required}/></td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{r.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Requirement Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-base text-gray-900 mb-4">Add Document Requirement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Document Name</label>
                <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Category</label>
                <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 cursor-pointer">
                  {["Legal/Contract","Pre-Employment","Gov't Benefit","Tax","Personal/Civil"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Type</label>
                <select value={form.required} onChange={e=>setForm({...form,required:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 cursor-pointer">
                  <option>Required</option><option>Optional</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg cursor-pointer">Save Requirement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocRequirements;
