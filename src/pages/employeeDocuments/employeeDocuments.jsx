// employeeDocuments.jsx — Admin Employee Documents: file and track submitted requirements
import React, { useState } from 'react';

const DOCUMENTS = [
  { name:'John Doe',       id:'HS-001', title:'Signed employment contract', category:'Legal/Contract',   submitted:'October 15, 2026',  status:'On File'  },
  { name:'Carlo Reyes',    id:'HS-002', title:'NBI Clearance',              category:'Pre-Employment',   submitted:'October 31, 2026',  status:'Pending'  },
  { name:'Eva Smith',      id:'HS-003', title:'Birth Certificate PSA',      category:'Personal/Civil',   submitted:'November 15, 2026', status:'On File'  },
  { name:'Ken Aquino',     id:'HS-004', title:'BIR Form 2316',              category:'Tax',              submitted:'November 20, 2026', status:'On File'  },
  { name:'John Larry',     id:'HS-005', title:'SSS',                        category:'Gov\'t Benefits',  submitted:'November 18, 2026', status:'On File'  },
  { name:'Larry Nanos',    id:'HS-006', title:'SSS',                        category:'Gov\'t Benefits',  submitted:'November 29, 2026', status:'On File'  },
];

const CATEGORIES = ['All Categories','Legal/Contract','Pre-Employment','Personal/Civil','Tax','Gov\'t Benefits'];

const StatusBadge = ({ status }) => {
  const map = { 'On File':'bg-green-500 text-white', Pending:'bg-yellow-400 text-black', Rejected:'bg-red-500 text-white' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const EmployeeDocuments = () => {
  const [catFilter,    setCatFilter]    = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [search,       setSearch]       = useState('');

  const filtered = DOCUMENTS.filter(d => {
    const matchCat    = catFilter    === 'All Categories' || d.category === catFilter;
    const matchStatus = statusFilter === 'All Status'     || d.status   === statusFilter;
    const matchSearch = `${d.name} ${d.id}`.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  const counts = { total: DOCUMENTS.length, onFile: DOCUMENTS.filter(d=>d.status==='On File').length, pending: DOCUMENTS.filter(d=>d.status==='Pending').length };

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Employee Documents</h2>
          <p className="text-xs text-gray-400 mt-0.5">File and submitted requirements per employee.</p>
        </div>
        {/* Upload document CTA */}
        <button className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4">
          <p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Documents</p>
          <p className="text-3xl font-black text-black mt-1">{counts.total * 14}</p>
          <p className="text-[11px] text-black/70">All Employees</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">On File</p>
          <p className="text-3xl font-black text-gray-900 mt-1">72</p>
          <p className="text-[11px] text-gray-400">Submitted</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</p>
          <p className="text-3xl font-black text-gray-900 mt-1">12</p>
          <p className="text-[11px] text-gray-400">Not yet submitted</p>
        </div>
      </div>

      {/* Documents table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Employees Documents</p>
          <div className="flex gap-2 flex-wrap">
            {/* Category filter */}
            <select value={catFilter} onChange={e=>setCatFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
            {/* Status filter */}
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Status','On File','Pending','Rejected'].map(s=><option key={s}>{s}</option>)}
            </select>
            {/* Employee search */}
            <input type="text" placeholder="Search Employee..." value={search} onChange={e=>setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 w-40" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Employee','Document Title','Category','Date Submitted','Status','Actions'].map(h=>(
                  <th key={h} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((doc,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    {/* Employee avatar + name */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                        {doc.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                        <p className="text-[10px] text-gray-400">{doc.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{doc.title}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{doc.category}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{doc.submitted}</td>
                  <td className="px-4 py-3"><StatusBadge status={doc.status}/></td>
                  <td className="px-4 py-3">
                    {doc.status === 'On File'
                      ? <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">View</button>
                      : <button className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black text-[11px] font-bold rounded-lg cursor-pointer transition-colors">Request</button>
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

export default EmployeeDocuments;
