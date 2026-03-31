// tasks.jsx — Admin Tasks management page
// Modals: Edit Task (view + edit), inline status update
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, InfoRow, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_TASKS = [
  { title:'Submit Q1 Project Report',     assignedTo:'John Doe',       assignedBy:'Maria Santos',    priority:'High',   status:'To Do',       due:'March 5, 2026' },
  { title:'Review System Architecture',   assignedTo:'Juan Dela Cruz', assignedBy:'Reginald Aquino', priority:'Medium', status:'In Progress', due:'March 10, 2026' },
  { title:'Prepare Q1 Financial Summary', assignedTo:'Eva Smith',      assignedBy:'Christine Ramos', priority:'Low',    status:'Completed',   due:'February 28, 2026' },
  { title:'Update Operations SOP',        assignedTo:'Ken Aquino',     assignedBy:'Anna Patricia',   priority:'High',   status:'Overdue',     due:'February 20, 2026' },
];

const EMPLOYEES = ['John Doe','Juan Dela Cruz','Eva Smith','Ken Aquino','Chris Staples'];

// ─── Priority badge ───────────────────────────────────────────────────────────
const PriorityBadge = ({ p }) => {
  const map = { High:'bg-red-500 text-white', Medium:'bg-yellow-400 text-black', Low:'bg-green-500 text-white' };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${map[p]??'bg-gray-200 text-gray-600'}`}>{p}</span>;
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ s }) => {
  const map = { 'To Do':'bg-blue-500 text-white', 'In Progress':'bg-orange-400 text-white', Completed:'bg-green-500 text-white', Overdue:'bg-red-500 text-white' };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${map[s]??'bg-gray-200 text-gray-600'}`}>{s}</span>;
};

const Tasks = () => {
  const [tasks, setTasks] = useState(INIT_TASKS);
  const [statusFilter,   setStatusFilter]   = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [empFilter,      setEmpFilter]      = useState('All Employees');

  // Edit modal state
  const [editIdx, setEditIdx]   = useState(null);
  const [editForm, setEditForm] = useState({});
  const ef = k => e => setEditForm(p => ({ ...p, [k]: e.target.value }));

  const filtered = tasks.filter(t => {
    const ms = statusFilter   === 'All Status'    || t.status     === statusFilter;
    const mp = priorityFilter === 'All Priority'  || t.priority   === priorityFilter;
    const me = empFilter      === 'All Employees' || t.assignedTo === empFilter;
    return ms && mp && me;
  });

  const counts = {
    total:      tasks.length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed:  tasks.filter(t => t.status === 'Completed').length,
    overdue:    tasks.filter(t => t.status === 'Overdue').length,
  };

  // Open edit modal — find real index and pre-fill form
  const openEdit = (filteredIdx) => {
    const task = filtered[filteredIdx];
    const real = tasks.indexOf(task);
    setEditIdx(real);
    setEditForm({ ...task });
  };

  // Save edited task
  const handleEdit = () => {
    setTasks(prev => prev.map((t, i) => i === editIdx ? { ...editForm } : t));
    setEditIdx(null);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page heading */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">Tasks</h2>
        <p className="text-xs text-gray-400 mt-0.5">Assign and manage tasks across all employees.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Tasks</p><p className="text-3xl font-black text-black mt-1">{counts.total}</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">In Progress</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.inProgress}</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Completed</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.completed}</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Overdue</p><p className="text-3xl font-black text-red-500 mt-1">{counts.overdue}</p></div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Tasks</p>
          <div className="flex gap-2 flex-wrap">
            {/* Status filter */}
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Status','To Do','In Progress','Completed','Overdue'].map(o => <option key={o}>{o}</option>)}
            </select>
            {/* Priority filter */}
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Priority','High','Medium','Low'].map(o => <option key={o}>{o}</option>)}
            </select>
            {/* Employee filter */}
            <select value={empFilter} onChange={e => setEmpFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Employees',...EMPLOYEES].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Title','Assigned To','Assigned By','Priority','Status','Due Date','Action'].map(h => (
                  <th key={h} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((t, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">{t.title}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{t.assignedTo}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{t.assignedBy}</td>
                  <td className="px-4 py-3"><PriorityBadge p={t.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge s={t.status} /></td>
                  <td className="px-4 py-3 text-xs text-gray-600">{t.due}</td>
                  {/* Edit button — opens edit/detail modal */}
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(i)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ EDIT TASK MODAL ══ */}
      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Task">
        <div className="space-y-4">
          <ModalField label="Task Title">
            <input type="text" value={editForm.title || ''} onChange={ef('title')} className={INPUT_CLS} />
          </ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Assigned To">
              <select value={editForm.assignedTo || ''} onChange={ef('assignedTo')} className={SELECT_CLS}>
                {EMPLOYEES.map(e => <option key={e}>{e}</option>)}
              </select>
            </ModalField>
            <ModalField label="Assigned By">
              <input type="text" value={editForm.assignedBy || ''} onChange={ef('assignedBy')} className={INPUT_CLS} />
            </ModalField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Priority">
              <select value={editForm.priority || ''} onChange={ef('priority')} className={SELECT_CLS}>
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </ModalField>
            <ModalField label="Status">
              <select value={editForm.status || ''} onChange={ef('status')} className={SELECT_CLS}>
                <option>To Do</option><option>In Progress</option><option>Completed</option><option>Overdue</option>
              </select>
            </ModalField>
          </div>
          <ModalField label="Due Date">
            <input type="date" value={editForm.due || ''} onChange={ef('due')} className={INPUT_CLS} />
          </ModalField>
        </div>
        <ModalFooter onCancel={() => setEditIdx(null)} onConfirm={handleEdit} confirmLabel="Save Changes" />
      </Modal>

    </div>
  );
};
export default Tasks;
