// profile.jsx — Admin Profile Page
import React, { useState } from 'react';
import { Edit3, User, ShieldCheck, Activity } from 'lucide-react';
import StatCard        from '../../components/statCard.jsx';
import BasicInfoTab    from './tabs/basicInfoTab.jsx';
import AdminInfoTab    from './tabs/adminInfoTab.jsx';
import ActivityLogTab  from './tabs/activityLogTab.jsx';

// Tab configuration — icon + label pairs for the tab bar
const TABS = [
  { id: 'basic',    label: 'Profile Info',   icon: <User size={15} /> },
  { id: 'admin',    label: 'Admin & Access', icon: <ShieldCheck size={15} /> },
  { id: 'activity', label: 'Activity Log',   icon: <Activity size={15} /> },
];

const Profile = () => {
  // Active tab state — default to profile info tab
  const [activeTab, setActiveTab] = useState('basic');

  // Render the correct tab component based on selection
  const renderTab = () => {
    switch (activeTab) {
      case 'basic':    return <BasicInfoTab />;
      case 'admin':    return <AdminInfoTab />;
      case 'activity': return <ActivityLogTab />;
      default:         return null;
    }
  };

  return (
    <div className="space-y-6 pb-10">

      {/* ── Profile Hero Card ── */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex gap-5 items-center">
            {/* Avatar with yellow ring — admin identity visual */}
            <div className="w-20 h-20 bg-yellow-50 rounded-full border-4 border-yellow-100 flex items-center justify-center text-yellow-400 shrink-0">
              <User size={40} />
            </div>
            <div className="space-y-2.5">
              <div>
                {/* Admin ID label */}
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Admin ID · HS-ADM-001</p>
                {/* Admin display name */}
                <h2 className="text-3xl font-bold text-gray-900">Admin User</h2>
                {/* Role */}
                <p className="text-sm text-gray-500 font-medium">System Administrator</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Active status badge */}
                <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-bold rounded-md flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Active
                </span>
                {/* Full access badge */}
                <span className="px-2.5 py-1 bg-yellow-400 text-black text-[10px] font-bold rounded-md flex items-center gap-1.5">
                  <ShieldCheck size={10} /> Full Access
                </span>
                {/* Admin since date */}
                <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold rounded-md">Since Jan 15, 2024</span>
                {/* Admin email */}
                <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold rounded-md lowercase">admin@highlysucceed.com</span>
              </div>
            </div>
          </div>

          {/* Right side — edit button + tenure */}
          <div className="text-right space-y-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg text-xs font-bold hover:bg-yellow-50 transition-colors cursor-pointer ml-auto">
              <Edit3 size={14} /> Edit Profile
            </button>
            <div>
              {/* Tenure display */}
              <p className="text-xl font-bold text-yellow-500 leading-none">2 Years 2 Months</p>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mt-1">Admin Tenure</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Total employees managed */}
        <StatCard value="48"  label="Total Employees"    description="Active Records" />
        {/* Pending approvals count */}
        <StatCard value="5"   label="Pending Approvals"  description="Requires Action" />
        {/* Actions this month */}
        <StatCard value="127" label="Actions This Month" description="System Activity" />
        {/* System uptime */}
        <StatCard value="99%" label="System Uptime"      description="This Month" />
      </div>

      {/* ── Tab Panel ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Tab bar */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-xs font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-black border-yellow-400 bg-white'
                  : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50/50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        {renderTab()}
      </div>

    </div>
  );
};

export default Profile;
