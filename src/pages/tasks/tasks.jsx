// tasks.jsx — Admin Tasks management page
import React, { useState } from 'react';

const TASKS = [
  { title:'Submit Q1 Project Report',       assignedTo:'John Doe',       assignedBy:'Maria Santos',   priority:'High',   status:'To Do',      due:'March 5, 2026' },
  { title:'Review System Architecture',     assignedTo:'Juan Dela Cruz', assignedBy:'Reginald Aquino',priority:'Medium', status:'In Progress', due:'March 10, 2026' },
  { title:'Prepare Q1 Financial Summary',   assignedTo:'Eva Smith',       assignedBy:'Christine Ramos',priority:'Low',    status:'Completed',   due:'February 28, 2026' },
  { title:'Update Operations SOP',          assignedTo:'Ken Aquino',      assignedBy:'Anna Patricia',  priority:'High',   status:'Overdue',     due:'February 20, 2026' },
];

const PriorityBadge = ({ p }) => {
  const map = { High:'bg-red-500 text-white', Medium:'bg-yellow-400 text-black', Low:'bg-green-500 text-white' };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${map[p]??'bg-gray-200 text-gray-600'}`}>{p}</span>;
};

const StatusBadge = ({ s }) => {
  const map = { 'To Do':'bg-blue-500 text-white', 'In Progress':'bg-orange-400 text-white', Completed:'bg-green-500 text-white', Overdue:'bg-red-500 text-white' };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${map[s]??'bg-gray-200 text-gray-600'}`}>{s}</span>;
};

const Tasks = () => {
  const [statusFilter,   setStatusFilter]   = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [empFilter,      setEmpFilter]      = useState('All Employees');

  const filtered = TASKS.filter(t => {
    const ms = statusFilter   === 'All Status'   || t.status   === statusFilter;
    const mp = priorityFilter === 'All Priority' || t.priority === priorityFilter;
    const me = empFilter      === 'All Employees'|| t.assignedTo === empFilter;
    return ms && mp && me;
  });

  const counts = { total: TASKS.length, inProgress: TASKS.filter(t=>t.status==='In Progress').length, completed: TASKS.filter(t=>t.status==='Completed').length, overdue: TASKS.filter(t=>t.status==='Overdue').length };

  return (
    <div className="space-y-5 pb-8">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Tasks</h2>
        <p className="text-xs text-gray-400 mt-0.5">Assign and manage tasks across all employees.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Tasks</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.total}</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">In Progress</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.inProgress}</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Completed</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.completed}</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-red-500">Overdue</p><p className="text-3xl font-black text-red-500 mt-1">{counts.overdue}</p></div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Tasks</p>
          <div className="flex gap-2 flex-wrap">
            {[['All Status','Pending','In Progress','Completed','Overdue',setStatusFilter,statusFilter],
              ['All Priority','High','Medium','Low',setPriorityFilter,priorityFilter],
              ['All Employees','John Doe','Juan Dela Cruz','Eva Smith','Ken Aquino',setEmpFilter,empFilter]
            ].map(([...opts],idx)=>{
              const setter = opts[opts.length-2];
              const val    = opts[opts.length-1];
              const options= opts.slice(0,opts.length-2);
              return (
                <select key={idx} value={val} onChange={e=>setter(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
                  {options.map(o=><option key={o}>{o}</option>)}
                </select>
              );
            })}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Title','Assigned To','Assigned By','Priority','Status','Due Date','Action'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((t,i)=>(
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">{t.title}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{t.assignedTo}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{t.assignedBy}</td>
                  <td className="px-4 py-3"><PriorityBadge p={t.priority}/></td>
                  <td className="px-4 py-3"><StatusBadge s={t.status}/></td>
                  <td className="px-4 py-3 text-xs text-gray-600">{t.due}</td>
                  <td className="px-4 py-3"><button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Tasks;
