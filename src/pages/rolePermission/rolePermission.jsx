// rolePermission.jsx — Admin Roles & Permissions management
import React, { useState } from 'react';

const ROLES = [
  { name:'Admin',   desc:'Full system access all modules',                          users:1,  status:'Active' },
  { name:'HR',      desc:'HR management employees, leave, OT, announcements',       users:3,  status:'Active' },
  { name:'Manager', desc:'Team management approve leave & OT for team',             users:4,  status:'Active' },
  { name:'Manager', desc:'Standard employee access self-service only',              users:18, status:'Active' },
];

const RolePermission = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:'', desc:'' });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Roles &amp; Permissions</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage system roles and their access levels.</p>
        </div>
        <button onClick={()=>setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Add Role
        </button>
      </div>

      {/* Roles table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Role Name','Description','Users','Status','Actions'].map(h=>(
                  <th key={h} className="px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ROLES.map((r,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{r.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 max-w-xs">{r.desc}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">{r.users}</td>
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

      {/* Add Role Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-base text-gray-900 mb-4">Add Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Role Name</label>
                <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Description</label>
                <textarea rows={3} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg cursor-pointer">Save Role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermission;
