// payrollPeriods.jsx — Admin Payroll Periods management
import React, { useState } from 'react';

const PERIODS = [
  { label:'March 1 - 15, 2026',  cutoff:'1st Cutoff • March 2026',    start:'March 1, 2026',    end:'March 15, 2026',   released:'March 20, 2026', status:'Released' },
  { label:'March 16 - 31, 2026', cutoff:'2nd Cutoff • March 2026',    start:'March 16, 2026',   end:'March 31, 2026',   released:'—',              status:'Pending'  },
  { label:'February 1 - 15, 2026',cutoff:'1st Cutoff • February 2026',start:'February 1, 2026', end:'February 15, 2026',released:'Feb 20, 2026',   status:'Released' },
  { label:'February 16 - 28, 2026',cutoff:'2nd Cutoff • February 2026',start:'February 16, 2026',end:'February 28, 2026',released:'Mar 5, 2026',   status:'Released' },
  { label:'January 1 - 15, 2026', cutoff:'1st Cutoff • January 2026', start:'January 1, 2026',  end:'January 15, 2026', released:'Jan 20, 2026',   status:'Released' },
  { label:'January 16 - 31, 2026',cutoff:'2nd Cutoff • January 2026', start:'January 16, 2026', end:'January 31, 2026', released:'Feb 5, 2026',    status:'Released' },
];

const StatusBadge = ({ status }) => {
  const map = { Released:'bg-green-500 text-white', Pending:'bg-yellow-400 text-black' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const PayrollPeriods = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Payroll Periods</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage payroll cutoff periods and release schedules.</p>
        </div>
        <button onClick={()=>setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + New Period
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Periods</p><p className="text-3xl font-black text-black mt-1">6</p><p className="text-[11px] text-black/70">2026</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Released</p><p className="text-3xl font-black text-gray-900 mt-1">4</p><p className="text-[11px] text-gray-400">Paydays sent</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending Release</p><p className="text-3xl font-black text-gray-900 mt-1">2</p><p className="text-[11px] text-gray-400">Awaiting processing</p></div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Payroll Periods — 2026</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Period Label','Cutoff Label','Period Start','Period End','Date Released','Status','Actions'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PERIODS.map((p,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">{p.label}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.cutoff}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.start}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.end}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.released}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status}/></td>
                  <td className="px-4 py-3">
                    {p.status === 'Pending'
                      ? <button className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black text-[11px] font-bold rounded-lg cursor-pointer transition-colors">Process</button>
                      : <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">View</button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Period Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-base text-gray-900 mb-4">New Payroll Period</h3>
            <div className="space-y-3">
              {[['Period Label','text'],['Period Start','date'],['Period End','date'],['Release Date','date']].map(([l,t])=>(
                <div key={l}>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">{l}</label>
                  <input type={t} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg cursor-pointer">Save Period</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PayrollPeriods;
