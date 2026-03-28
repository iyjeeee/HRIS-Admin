// eventType.jsx — Admin Event Types management with inline add form
import React, { useState } from 'react';

const EVENT_TYPES = [
  { color:'bg-yellow-400', type:'Holiday',       desc:'National and Company declared holidays',  appliesTo:'All Employees',      total:12, status:'Active' },
  { color:'bg-blue-500',   type:'Company Event',  desc:'Team events, Outing',                     appliesTo:'All Employees',      total:4,  status:'Active' },
  { color:'bg-green-500',  type:'Payroll',         desc:'Payroll cut-off',                         appliesTo:'All Employees',      total:34, status:'Active' },
  { color:'bg-purple-500', type:'Training',        desc:'Scheduled training',                       appliesTo:'All Employees',      total:24, status:'Active' },
  { color:'bg-red-500',    type:'Deadline',        desc:'Important submissions & reports',          appliesTo:'Specific departments',total:10, status:'Active' },
  { color:'bg-teal-500',   type:'HR Event',        desc:'Performance reviews',                      appliesTo:'All Employees',      total:4,  status:'Active' },
  { color:'bg-gray-700',   type:'Dept Meetings',   desc:'Department discussion',                    appliesTo:'Specific departments',total:4,  status:'Active' },
];
const COLORS = ['bg-yellow-400','bg-blue-500','bg-green-500','bg-red-500','bg-purple-500','bg-teal-500','bg-gray-700'];

const EventType = () => {
  const [form, setForm] = useState({ name:'', desc:'', appliesTo:'All Employees', color:'bg-yellow-400' });

  return (
    <div className="space-y-5 pb-8">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Event Types</h2>
        <p className="text-xs text-gray-400 mt-0.5">Manage Events Categories used in the company calendar.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Event Types</p><p className="text-3xl font-black text-black mt-1">7</p><p className="text-[11px] text-black/70">Across all categories</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Activity Types</p><p className="text-3xl font-black text-gray-900 mt-1">7</p><p className="text-[11px] text-gray-400">Currently in use</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Event This Month</p><p className="text-3xl font-black text-gray-900 mt-1">12</p><p className="text-[11px] text-gray-400">Using these types</p></div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Event types table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Event Types</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  {['Color','Event Type','Description','Applies To','Total Events','Status','Actions'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {EVENT_TYPES.map((et,i)=>(
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3"><span className={`inline-block w-5 h-5 rounded-full ${et.color}`}></span></td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{et.type}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{et.desc}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{et.appliesTo}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-700">{et.total}</td>
                    <td className="px-4 py-3"><span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{et.status}</span></td>
                    <td className="px-4 py-3"><button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Event Type panel */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Add New Event Type</p>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Type Name</label>
              <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                placeholder="e.g. Training, Holiday, Event"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Description</label>
              <textarea rows={3} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}
                placeholder="Brief description of this event."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Applies To</label>
              <select value={form.appliesTo} onChange={e=>setForm({...form,appliesTo:e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 cursor-pointer">
                <option>All Employees</option><option>Specific departments</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Color Tag</label>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(c=>(
                  <button key={c} onClick={()=>setForm({...form,color:c})}
                    className={`w-6 h-6 rounded-full ${c} cursor-pointer transition-transform hover:scale-110 ${form.color===c?'ring-2 ring-offset-1 ring-gray-700':''}`} />
                ))}
              </div>
            </div>
            <button onClick={()=>console.log('Add event type:', form)}
              className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg cursor-pointer transition-colors">
              Add New Event Type
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventType;
