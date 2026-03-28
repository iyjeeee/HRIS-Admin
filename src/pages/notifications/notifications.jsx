// notifications.jsx — Admin Notifications: system and employee notification feed
import React, { useState } from 'react';

const NOTIFICATIONS = [
  { initials:'ES', color:'bg-blue-500',   title:'Eva Smith Filed a Vacation Leave', sub:'LV-2026-001 | March 10-11, 2026 | Awaiting your Approval', time:'2 hrs ago', status:'Pending'  },
  { initials:'JD', color:'bg-green-500',  title:'John Filed a Overtime Request',    sub:'OT-2026-001 | March 1, 2026 | OT HR | Awaiting Approval',   time:'2 hrs ago', status:'Pending'  },
  { initials:'✓',  color:'bg-green-400',  title:'Leave Request LV-2026-001 Approved', sub:'John Doe send leave request approved.',                   time:'1 day ago', status:'Approved' },
  { initials:'$',  color:'bg-gray-700',   title:'New Payroll Created',              sub:'March 1-15, 2026 payroll is now available.',                  time:'2 days ago',status:'System'  },
  { initials:'✗',  color:'bg-red-500',    title:'Task Overdue: Update Operation SOP', sub:'Ken Aquino task overdue on February 20, 2026',             time:'2 days ago',status:'Rejected' },
];

// Status badge colour map
const StatusBadge = ({ status }) => {
  const map = {
    Pending:  'bg-yellow-400 text-black',
    Approved: 'bg-green-500 text-white',
    Rejected: 'bg-red-500 text-white',
    System:   'bg-gray-700 text-white',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>
  );
};

const Notifications = () => {
  const [items, setItems] = useState(NOTIFICATIONS);

  // Mark all as read — clears visual unread indicator (simulated)
  const markAllRead = () => { console.log('Marked all as read'); };

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
          <p className="text-xs text-gray-400 mt-0.5">System and Employee notifications.</p>
        </div>
        <button onClick={markAllRead}
          className="px-4 py-2 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          Mark all as read
        </button>
      </div>

      {/* Notification feed */}
      <div className="space-y-2">
        {items.map((n,i)=>(
          <div key={i}
            className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-start gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
            {/* Avatar circle */}
            <div className={`w-9 h-9 ${n.color} rounded-full flex items-center justify-center text-white font-black text-xs shrink-0`}>
              {n.initials}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 leading-snug">{n.title}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{n.sub}</p>
            </div>
            {/* Time + status */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-[10px] text-gray-400">{n.time}</span>
              <StatusBadge status={n.status}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
