// attendance.jsx — Daily attendance log for all employees
import React, { useState } from 'react';

const LOGS = [
  { name:'Juan Dela Cruz', id:'HS-001', date:'March 2, 2026', status:'Present',  timeIn:'8:05 AM', timeOut:'6:00 PM', late:'-',      remarks:'' },
  { name:'John Doe',       id:'HS-002', date:'March 2, 2026', status:'Present',  timeIn:'8:30 AM', timeOut:'6:00 PM', late:'15 mins', remarks:'Late' },
  { name:'Ken Aquino',     id:'HS-003', date:'March 2, 2026', status:'Leave',    timeIn:'-',       timeOut:'-',       late:'-',      remarks:'Sick Leave' },
  { name:'Eva Smith',      id:'HS-004', date:'March 3, 2026', status:'Rejected', timeIn:'-',       timeOut:'-',       late:'-',      remarks:'No Time In' },
  { name:'Juan Dela Cruz', id:'HS-001', date:'March 3, 2026', status:'Present',  timeIn:'8:09 AM', timeOut:'5:00 PM', late:'-',      remarks:'' },
];

const StatusBadge = ({ status }) => {
  const map = { Present:'bg-green-500 text-white', Leave:'bg-yellow-400 text-black', Rejected:'bg-red-500 text-white', Absent:'bg-gray-300 text-gray-700' };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const Attendance = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filtered = LOGS.filter(l => {
    const matchSearch = `${l.name} ${l.id}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Attendance</h2>
          <p className="text-xs text-gray-400 mt-0.5">Daily attendance record for all employees.</p>
        </div>
        <div className="flex gap-2">
          {/* Month selector */}
          <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
            <option>March 2026</option><option>February 2026</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            ↑ Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Present Today</p><p className="text-3xl font-black text-black mt-1">12</p><p className="text-[11px] text-black/70">Timed In</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Absent Today</p><p className="text-3xl font-black text-gray-900 mt-1">2</p><p className="text-[11px] text-gray-400">No Timed In</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">On Leave</p><p className="text-3xl font-black text-gray-900 mt-1">2</p><p className="text-[11px] text-gray-400">Approved Leave</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Late Arrivals</p><p className="text-3xl font-black text-gray-900 mt-1">3</p><p className="text-[11px] text-gray-400">Today</p></div>
      </div>

      {/* Log table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Attendance Log — March 3, 2026</p>
          <div className="flex gap-2">
            <input type="text" placeholder="Search Employee..." value={search} onChange={e=>setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 w-40" />
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Status','Present','Absent','Leave','Rejected'].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Employee','Date','Status','Time In','Time Out','OT Hours','Late','Remarks'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((l,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                        {l.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div><p className="text-sm font-semibold text-gray-800">{l.name}</p><p className="text-[10px] text-gray-400">{l.id}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{l.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status}/></td>
                  <td className="px-4 py-3 text-xs text-gray-600">{l.timeIn}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{l.timeOut}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">—</td>
                  <td className="px-4 py-3 text-xs text-red-500 font-medium">{l.late}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{l.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Attendance;
