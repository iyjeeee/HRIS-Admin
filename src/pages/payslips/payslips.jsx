// payslips.jsx — Admin Payslips: upload and manage employee payslips per period
import React, { useState } from 'react';

const PAYSLIPS = [
  { name:'John Doe',       id:'HS-001', period:'Mar 1-15, 2026', file:'Payslip_JD_March2026_1st.pdf',  gross:'₱40,000', net:'₱38,200', released:'March 20, 2026', status:'Available' },
  { name:'Juan Dela Cruz', id:'HS-002', period:'Mar 1-15, 2026', file:'Payslip_JDC_March2026_1st.pdf', gross:'₱60,500', net:'₱25,208', released:'March 20, 2026', status:'Available' },
  { name:'Eva Smith',      id:'HS-003', period:'Mar 1-15, 2026', file:null,                            gross:'—',        net:'—',       released:'March 20, 2026', status:'Pending'   },
  { name:'Ken Aquino',     id:'HS-004', period:'Mar 1-15, 2026', file:'Payslip_KA_March2026_1st.pdf',  gross:'₱40,000', net:'₱53,500', released:'March 20, 2026', status:'Available' },
];

const StatusBadge = ({ status }) => {
  const map = { Available:'bg-green-500 text-white', Pending:'bg-yellow-400 text-black' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const PERIODS = ['March 1 - 15, 2026','March 16 - 31, 2026','February 1 - 15, 2026'];

const Payslips = () => {
  const [period, setPeriod] = useState(PERIODS[0]);
  const [search, setSearch] = useState('');

  const filtered = PAYSLIPS.filter(p => `${p.name} ${p.id}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 pb-8">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Payslips</h2>
        <p className="text-xs text-gray-400 mt-0.5">Upload and manage employee payslips per payroll period.</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold text-gray-800">Payslips — {period}</p>
          <div className="flex gap-2">
            <select value={period} onChange={e=>setPeriod(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {PERIODS.map(p=><option key={p}>{p}</option>)}
            </select>
            <input type="text" placeholder="Search Employee..." value={search} onChange={e=>setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 w-40" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Employee','Period','Payslip File','Gross Pay','Net Pay','Date Released','Status','Actions'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                        {p.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div><p className="text-sm font-semibold text-gray-800">{p.name}</p><p className="text-[10px] text-gray-400">{p.id}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.period}</td>
                  <td className="px-4 py-3">
                    {p.file
                      ? <span className="text-xs text-blue-500 font-medium underline cursor-pointer">{p.file}</span>
                      : <span className="text-xs text-gray-400 italic">Not uploaded</span>}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-700">{p.gross}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-700">{p.net}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.released}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status}/></td>
                  <td className="px-4 py-3">
                    {p.status === 'Available'
                      ? <div className="flex gap-1">
                          <button className="px-2.5 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold rounded cursor-pointer transition-colors">View</button>
                          <button className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold rounded cursor-pointer transition-colors">Replace</button>
                        </div>
                      : <button className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black text-[10px] font-bold rounded-lg cursor-pointer transition-colors">Upload</button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Payslips;
