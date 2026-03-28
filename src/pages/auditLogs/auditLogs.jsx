// auditLogs.jsx — Admin Audit Logs: complete system activity trail for compliance
import React, { useState } from 'react';

const LOGS = [
  { user:'Super Admin',  action:'CREATE', table:'employees',      recordId:'#68', ip:'192.168.1.1', performedAt:'March 2, 2026 5:38 PM'  },
  { user:'HR Officer',   action:'UPDATE', table:'leave_requests',  recordId:'#5',  ip:'192.168.1.7', performedAt:'March 2, 2026 4:15 AM'  },
  { user:'Super Admin',  action:'CREATE', table:'announcements',   recordId:'#3',  ip:'192.168.1.1', performedAt:'March 2, 2026 9:08 AM'  },
  { user:'John Doe',     action:'LOGIN',  table:'users',           recordId:'#2',  ip:'192.168.1.3', performedAt:'March 1, 2026 8:00 AM'  },
  { user:'HR Manager',   action:'DELETE', table:'notifications',   recordId:'#92', ip:'192.168.1.1', performedAt:'March 1, 2026 6:40 PM'  },
  { user:'Super Admin',  action:'UPDATE', table:'employees',       recordId:'#8',  ip:'192.168.1.1', performedAt:'Feb 28, 2026 2:00 PM'   },
];

// Colour-coded action badge
const ActionBadge = ({ action }) => {
  const map = {
    CREATE: 'bg-green-500 text-white',
    UPDATE: 'bg-blue-500 text-white',
    DELETE: 'bg-red-500 text-white',
    LOGIN:  'bg-yellow-400 text-black',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${map[action]??'bg-gray-200 text-gray-600'}`}>{action}</span>
  );
};

const AuditLogs = () => {
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [tableFilter,  setTableFilter]  = useState('All Tables');

  const filtered = LOGS.filter(l => {
    const ma = actionFilter === 'All Actions' || l.action === actionFilter;
    const mt = tableFilter  === 'All Tables'  || l.table  === tableFilter;
    return ma && mt;
  });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Audit Logs</h2>
          <p className="text-xs text-gray-400 mt-0.5">Complete system activity trail for compliance and security.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          ↑ Export PDF
        </button>
      </div>

      {/* Logs table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Recent Activity</p>
          <div className="flex gap-2">
            {/* Action type filter */}
            <select value={actionFilter} onChange={e=>setActionFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Actions','CREATE','UPDATE','DELETE','LOGIN'].map(a=><option key={a}>{a}</option>)}
            </select>
            {/* Table filter */}
            <select value={tableFilter} onChange={e=>setTableFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Tables','employees','leave_requests','announcements','users','notifications'].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['User','Action','Table','Record ID','IP Address','Performed At'].map(h=>(
                  <th key={h} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((log,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{log.user}</td>
                  <td className="px-4 py-3"><ActionBadge action={log.action}/></td>
                  {/* Table name as monospace */}
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">{log.table}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">{log.recordId}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">{log.ip}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{log.performedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
