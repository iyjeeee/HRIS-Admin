// leaveCredits.jsx — Admin Leave Credits allocation per employee
import React, { useState } from 'react';

const CREDITS = [
  { name:'Juan Dela Cruz', id:'HS-001', dept:'IT',         vl:15, vlLeft:13, sl:15, slLeft:13, el:5, elLeft:4, totalUsed:7,  remaining:26 },
  { name:'John Doe',       id:'HS-002', dept:'IT',         vl:15, vlLeft:15, sl:15, slLeft:14, el:5, elLeft:5, totalUsed:1,  remaining:34 },
  { name:'Eva Smith',      id:'HS-003', dept:'Finance',    vl:15, vlLeft:9,  sl:15, slLeft:13, el:5, elLeft:2, totalUsed:8,  remaining:27 },
  { name:'Ken Aquino',     id:'HS-004', dept:'Operations', vl:15, vlLeft:13, sl:15, slLeft:15, el:5, elLeft:2, totalUsed:0,  remaining:35 },
  { name:'Michael Saints', id:'HS-005', dept:'IT',         vl:15, vlLeft:15, sl:15, slLeft:15, el:5, elLeft:5, totalUsed:0,  remaining:35 },
];

const CreditCell = ({ total, left }) => (
  <div className="text-xs">
    <span className="font-semibold text-gray-800">{total} total</span>
    {' · '}
    <span className="text-green-600 font-bold">{left} left</span>
  </div>
);

const LeaveCredits = () => {
  const [search, setSearch]   = useState('');
  const [year, setYear]       = useState('2026');
  const [showModal, setModal] = useState(false);

  const filtered = CREDITS.filter(c => `${c.name} ${c.id}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Leave Credits</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage leave credits allocation per employee per year.</p>
        </div>
        <div className="flex gap-2">
          <select value={year} onChange={e=>setYear(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
            <option>2026</option><option>2025</option>
          </select>
          <button onClick={()=>setModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
            + Allocate Credits
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Leave Approval Requests</p>
          <input type="text" placeholder="Search Employee..." value={search} onChange={e=>setSearch(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 w-44" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Employee','Department','Vacation Leave','Sick Leave','Emergency Leave','Total Used','Total Remaining','Actions'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                        {c.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div><p className="text-sm font-semibold text-gray-800">{c.name}</p><p className="text-[10px] text-gray-400">{c.id}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{c.dept}</td>
                  <td className="px-4 py-3"><CreditCell total={c.vl} left={c.vlLeft}/></td>
                  <td className="px-4 py-3"><CreditCell total={c.sl} left={c.slLeft}/></td>
                  <td className="px-4 py-3"><CreditCell total={c.el} left={c.elLeft}/></td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{c.totalUsed}</td>
                  <td className="px-4 py-3 text-sm font-bold text-green-600">{c.remaining}</td>
                  <td className="px-4 py-3"><button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocate Credits Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-base text-gray-900 mb-4">Allocate Leave Credits</h3>
            <div className="space-y-3">
              {['Vacation Leave','Sick Leave','Emergency Leave'].map(t=>(
                <div key={t} className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-gray-700 w-40">{t}</label>
                  <input type="number" defaultValue={15} className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 text-center" />
                  <span className="text-xs text-gray-400">days</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={()=>setModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={()=>setModal(false)} className="px-4 py-2 text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg cursor-pointer">Save Credits</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LeaveCredits;
