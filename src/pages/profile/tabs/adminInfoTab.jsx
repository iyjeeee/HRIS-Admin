// adminInfoTab.jsx — Admin Profile: Access & Permissions info tab
import React from 'react';
import { ShieldCheck, Key } from 'lucide-react';

// Reusable detail field component
const Field = ({ label, value }) => (
  <div>
    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-gray-900">{value}</p>
  </div>
);

// Permission badge component — colour reflects access level
const PermissionBadge = ({ label, level }) => {
  // Colour map: full = green, limited = yellow, read-only = gray
  const colours = {
    full:      'bg-green-100 text-green-700 border-green-200',
    limited:   'bg-yellow-100 text-yellow-700 border-yellow-200',
    readonly:  'bg-gray-100 text-gray-500 border-gray-200',
  };
  return (
    <div className={`flex items-center justify-between px-4 py-2.5 border rounded-lg ${colours[level] ?? colours.readonly}`}>
      <span className="text-xs font-semibold">{label}</span>
      <span className="text-[10px] font-bold uppercase tracking-wide capitalize">{level}</span>
    </div>
  );
};

const AdminInfoTab = () => (
  <div className="p-6 space-y-6">

    {/* ── Admin Role & Access section ── */}
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-gray-50/80 px-5 py-3 border-b border-gray-200 flex items-center gap-2">
        <ShieldCheck size={15} className="text-yellow-500" />
        <h3 className="font-bold text-sm text-gray-700">Admin Role & System Access</h3>
      </div>
      <div className="p-6 grid grid-cols-2 gap-y-8">
        <Field label="Admin Role"        value="System Administrator" />
        <Field label="Access Level"      value="Full Access" />
        <Field label="Assigned Modules"  value="All Modules" />
        <Field label="Account Status"    value="Active" />
        <Field label="Admin Since"       value="January 15, 2024" />
        <Field label="Last Login"        value="March 28, 2026 — 9:42 AM" />
      </div>
    </div>

    {/* ── Module Permissions section ── */}
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-gray-50/80 px-5 py-3 border-b border-gray-200 flex items-center gap-2">
        <Key size={15} className="text-gray-400" />
        <h3 className="font-bold text-sm text-gray-700">Module Permissions</h3>
      </div>
      <div className="p-5 grid grid-cols-2 gap-3">
        {/* Each row: module name + access level */}
        <PermissionBadge label="Employee Management" level="full" />
        <PermissionBadge label="Attendance"          level="full" />
        <PermissionBadge label="Leave Management"    level="full" />
        <PermissionBadge label="Overtime"            level="full" />
        <PermissionBadge label="Payroll"             level="full" />
        <PermissionBadge label="Reports"             level="full" />
        <PermissionBadge label="Departments"         level="full" />
        <PermissionBadge label="System Settings"     level="full" />
      </div>
    </div>

  </div>
);

export default AdminInfoTab;
