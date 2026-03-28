// reports.jsx — Admin Reports: tabbed view (Attendance Summary, Leave Summary, Overtime Summary, Headcount)
import React, { useState } from 'react';

// ─── Shared stat card ────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, yellow }) => (
  <div className={`rounded-xl p-4 ${yellow ? 'bg-yellow-400' : 'bg-white border border-gray-200'}`}>
    <p className={`text-[10px] font-bold uppercase tracking-wider ${yellow ? 'text-black/60' : 'text-gray-400'}`}>{label}</p>
    <p className={`text-3xl font-black mt-1 ${yellow ? 'text-black' : 'text-gray-900'}`}>{value}</p>
    {sub && <p className={`text-[11px] ${yellow ? 'text-black/70' : 'text-gray-400'}`}>{sub}</p>}
  </div>
);

// ─── ATTENDANCE SUMMARY TAB ──────────────────────────────────────────────────
const AttendanceSummary = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-3">
      <StatCard label="Working Days"    value="20"  sub="March 2026" yellow />
      <StatCard label="Present (All)"   value="210" sub="Total Attendance Summary" />
      <StatCard label="Late Arrivals"   value="12"  sub="Late Arrivals This Month" />
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Daily Attendance Summary — March 2026</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
              {['Employee','Dept','Days Present','Days Absent','Total Hours','OT Hours','On Leave Days'].map(h=>(
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name:'John Doe',       dept:'IT',      present:19, absent:0, hours:'162h', ot:'4h', leave:2 },
              { name:'Juan Dela Cruz', dept:'IT',      present:20, absent:0, hours:'160h', ot:'6h', leave:0 },
              { name:'Eva Smith',      dept:'Finance', present:18, absent:2, hours:'144h', ot:'3h', leave:4 },
              { name:'Kim Aquino',     dept:'Ops',     present:20, absent:0, hours:'160h', ot:'3h', leave:0 },
            ].map((r,i)=>(
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                      {r.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{r.dept}</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{r.present}</td>
                <td className="px-4 py-3 text-sm font-bold text-red-500">{r.absent}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{r.hours}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{r.ot}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{r.leave}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── LEAVE SUMMARY TAB ───────────────────────────────────────────────────────
const LeaveSummary = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-4 gap-3">
      <StatCard label="Total Leave Filed" value="12" sub="All requests"      yellow />
      <StatCard label="Approved"          value="8"  sub="Approved requests" />
      <StatCard label="Pending"           value="3"  sub="Awaiting decision" />
      <StatCard label="Rejected"          value="1"  sub="All time" />
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Leave Usage Summary</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
              {['Employee','VL Used','VL Remaining','SL Used','SL Remaining','EL Used','EL Remaining'].map(h=>(
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name:'John Doe',       vlu:4, vlr:11, slu:2, slr:13, elu:1, elr:2 },
              { name:'Juan Dela Cruz', vlu:0, vlr:15, slu:1, slr:14, elu:0, elr:5 },
              { name:'Eva Smith',      vlu:6, vlr:9,  slu:2, slr:13, elu:0, elr:3 },
              { name:'Kim Aquino',     vlu:1, vlr:14, slu:0, slr:15, elu:3, elr:0 },
            ].map((r,i)=>(
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                      {r.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-700">{r.vlu}</td>
                <td className="px-4 py-3 text-xs font-bold text-green-600">{r.vlr}</td>
                <td className="px-4 py-3 text-xs text-gray-700">{r.slu}</td>
                <td className="px-4 py-3 text-xs font-bold text-green-600">{r.slr}</td>
                <td className="px-4 py-3 text-xs text-gray-700">{r.elu}</td>
                <td className="px-4 py-3 text-xs font-bold text-green-600">{r.elr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── OVERTIME SUMMARY TAB ────────────────────────────────────────────────────
const OvertimeSummary = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-4 gap-3">
      <StatCard label="Total OT Filed"    value="10"  sub="All Time"         yellow />
      <StatCard label="Total Approved Hrs" value="28h" sub="All Approved OT" />
      <StatCard label="Pending"           value="2"   sub="Awaiting Approval" />
      <StatCard label="Rejected"          value="0"   sub="All Time" />
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">OT Hours per Employee — March 2026</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
              {['Employee','Total Filed','Approved','Pending','Approved Hours'].map(h=>(
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name:'John Doe',       filed:2, approved:1, pending:1, hours:'2h'  },
              { name:'Juan Dela Cruz', filed:3, approved:2, pending:1, hours:'6h'  },
              { name:'Eva Smith',      filed:2, approved:2, pending:0, hours:'7h'  },
              { name:'Kim Aquino',     filed:3, approved:3, pending:0, hours:'10h' },
            ].map((r,i)=>(
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                      {r.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-800">{r.filed}</td>
                <td className="px-4 py-3 text-sm font-bold text-green-600">{r.approved}</td>
                <td className="px-4 py-3 text-sm font-bold text-yellow-600">{r.pending}</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-700">{r.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── HEADCOUNT TAB ───────────────────────────────────────────────────────────
const Headcount = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-4 gap-3">
      <StatCard label="Total Employees" value="18" sub="All departments" yellow />
      <StatCard label="Active"          value="14" sub="Currently working" />
      <StatCard label="Probationary"    value="2"  sub="New hires" />
      <StatCard label="On Leave"        value="2"  sub="Approved leave" />
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Headcount per Department</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
              {['Department','Total','Active','On Leave','Probation','Inactive'].map(h=>(
                <th key={h} className="px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { dept:'Information Technology', total:4, active:3, leave:0, prob:1, inactive:0 },
              { dept:'Human Resources',         total:3, active:3, leave:0, prob:0, inactive:0 },
              { dept:'Finance',                 total:3, active:2, leave:1, prob:0, inactive:0 },
              { dept:'Operations',              total:5, active:4, leave:1, prob:1, inactive:0 },
              { dept:'Marketing',               total:3, active:2, leave:0, prob:0, inactive:1 },
            ].map((r,i)=>(
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3 text-sm font-semibold text-gray-800">{r.dept}</td>
                <td className="px-5 py-3 text-sm font-bold text-gray-900">{r.total}</td>
                <td className="px-5 py-3 text-sm text-green-600 font-semibold">{r.active}</td>
                <td className="px-5 py-3 text-sm text-yellow-600 font-semibold">{r.leave}</td>
                <td className="px-5 py-3 text-sm text-blue-600 font-semibold">{r.prob}</td>
                <td className="px-5 py-3 text-sm text-gray-400 font-semibold">{r.inactive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── TABS CONFIG ─────────────────────────────────────────────────────────────
const TABS = [
  { id:'attendance', label:'Attendance Summary' },
  { id:'leave',      label:'Leave Summary'      },
  { id:'overtime',   label:'Overtime Summary'   },
  { id:'headcount',  label:'Headcount'          },
];

// ─── MAIN REPORTS PAGE ───────────────────────────────────────────────────────
const Reports = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [month, setMonth] = useState('March 2026');

  const renderTab = () => {
    switch(activeTab) {
      case 'attendance': return <AttendanceSummary />;
      case 'leave':      return <LeaveSummary />;
      case 'overtime':   return <OvertimeSummary />;
      case 'headcount':  return <Headcount />;
      default:           return null;
    }
  };

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Reports</h2>
          <p className="text-xs text-gray-400 mt-0.5">File and submitted requirements per employee.</p>
        </div>
        <div className="flex gap-2">
          {/* Month filter */}
          <select value={month} onChange={e=>setMonth(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
            <option>March 2026</option><option>February 2026</option>
          </select>
          {/* Export button */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            ↑ Export PDF
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs font-bold whitespace-nowrap transition-all cursor-pointer border-b-2 ${
                activeTab === tab.id
                  ? 'text-black border-yellow-400 bg-white'
                  : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Tab content */}
        <div className="p-5">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default Reports;
