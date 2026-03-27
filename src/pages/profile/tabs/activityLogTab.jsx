// activityLogTab.jsx — Admin Profile: Recent system activity log tab
import React from 'react';
import { Activity } from 'lucide-react';

// Sample activity log data — replace with API data in production
const ACTIVITY_LOG = [
  { action: 'Approved Leave Request',     target: 'John Doe — Vacation Leave',       date: 'March 28, 2026', time: '10:15 AM', type: 'Approval' },
  { action: 'Updated Employee Record',    target: 'Jane Smith — Contact Info',        date: 'March 27, 2026', time: '3:40 PM',  type: 'Edit' },
  { action: 'Rejected Overtime Request',  target: 'Mark Reyes — March 22 Overtime',   date: 'March 26, 2026', time: '11:00 AM', type: 'Rejection' },
  { action: 'Generated Payroll Report',   target: 'March 2026 — 1st Cutoff',          date: 'March 25, 2026', time: '9:00 AM',  type: 'Report' },
  { action: 'Added New Employee',         target: 'Maria Santos — IT Department',     date: 'March 24, 2026', time: '2:20 PM',  type: 'Create' },
  { action: 'Updated Department',         target: 'Marketing — Head changed',         date: 'March 23, 2026', time: '4:05 PM',  type: 'Edit' },
  { action: 'Approved Overtime Request',  target: 'Luis Cruz — March 20 Overtime',    date: 'March 22, 2026', time: '1:30 PM',  type: 'Approval' },
];

// Colour map for action type badges
const TYPE_STYLE = {
  Approval:  'bg-green-100 text-green-700',
  Rejection: 'bg-red-100 text-red-600',
  Edit:      'bg-blue-100 text-blue-600',
  Report:    'bg-purple-100 text-purple-600',
  Create:    'bg-yellow-100 text-yellow-700',
};

const ActivityLogTab = () => (
  <div className="p-6">
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">

      {/* Section header */}
      <div className="bg-gray-50/80 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={15} className="text-gray-400" />
          <h3 className="font-bold text-sm text-gray-700">Recent Activity Log</h3>
        </div>
        {/* Total entries count */}
        <span className="text-[11px] text-gray-400 font-medium">{ACTIVITY_LOG.length} recent actions</span>
      </div>

      {/* Activity table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              <th className="px-5 py-3">Action</th>
              <th className="px-5 py-3">Target / Details</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Time</th>
              <th className="px-5 py-3">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ACTIVITY_LOG.map((entry, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                {/* Action description */}
                <td className="px-5 py-4">
                  <span className="text-sm font-semibold text-gray-800">{entry.action}</span>
                </td>
                {/* Target entity */}
                <td className="px-5 py-4">
                  <span className="text-xs text-gray-500">{entry.target}</span>
                </td>
                {/* Date */}
                <td className="px-5 py-4">
                  <span className="text-xs text-gray-600">{entry.date}</span>
                </td>
                {/* Time */}
                <td className="px-5 py-4">
                  <span className="text-xs text-gray-600">{entry.time}</span>
                </td>
                {/* Type badge */}
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${TYPE_STYLE[entry.type] ?? 'bg-gray-100 text-gray-500'}`}>
                    {entry.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
);

export default ActivityLogTab;
