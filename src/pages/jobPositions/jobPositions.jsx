// jobPositions.jsx — Job Positions management page
// Modals: Add Position, Edit Position
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_POSITIONS = [
  { title:'Junior Software Developer', dept:'Information Technology', employees:2, status:'Active' },
  { title:'Senior Software Developer', dept:'Information Technology', employees:1, status:'Active' },
  { title:'Project Management Head',   dept:'Information Technology', employees:1, status:'Active' },
  { title:'HR Officer',                dept:'Human Resources',        employees:2, status:'Active' },
  { title:'HR Manager',                dept:'Human Resources',        employees:1, status:'Active' },
  { title:'Finance Analyst',           dept:'Finance',                employees:3, status:'Active' },
  { title:'Operations Manager',        dept:'Operations',             employees:5, status:'Active' },
  { title:'Marketing Specialist',      dept:'Marketing',              employees:3, status:'Active' },
];

const DEPARTMENTS = ['Information Technology','Human Resources','Finance','Operations','Marketing','Sales'];

const JobPositions = () => {
  const [positions, setPositions] = useState(INIT_POSITIONS);
  const [deptFilter, setDeptFilter] = useState('All Departments');

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const emptyForm = { title:'', dept:'Information Technology', status:'Active' };
  const [form, setForm] = useState(emptyForm);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  // Edit modal state
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const ef = k => e => setEditForm(p => ({ ...p, [k]: e.target.value }));

  const filtered = deptFilter === 'All Departments' ? positions : positions.filter(p => p.dept === deptFilter);

  // Add position handler
  const handleAdd = () => {
    setPositions(prev => [...prev, { ...form, employees: 0 }]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  // Open edit — pre-fill form
  const openEdit = idx => {
    // Find real index from filtered list
    const real = positions.indexOf(filtered[idx]);
    setEditIdx(real);
    setEditForm({ title: positions[real].title, dept: positions[real].dept, status: positions[real].status });
  };

  // Save edit
  const handleEdit = () => {
    setPositions(prev => prev.map((p, i) => i === editIdx ? { ...p, ...editForm } : p));
    setEditIdx(null);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Job Positions</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage all job titles and their department assignments.</p>
        </div>
        {/* Add Position — opens modal */}
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Add Position
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Positions</p>
          {/* Department filter dropdown */}
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
            <option>All Departments</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Position Title','Department','Employees','Status','Action'].map(h => <th key={h} className="px-5 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{p.title}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{p.dept}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">{p.employees}</td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{p.status}</span></td>
                  {/* Edit button — opens edit modal */}
                  <td className="px-5 py-3.5">
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

      {/* ══ ADD POSITION MODAL ══ */}
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setForm(emptyForm); }} title="Add Position">
        <div className="space-y-4">
          <ModalField label="Position Title">
            <input type="text" value={form.title} onChange={f('title')} placeholder="e.g. Senior Software Developer" className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Department">
            <select value={form.dept} onChange={f('dept')} className={SELECT_CLS}>
              {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </ModalField>
          <ModalField label="Status">
            <select value={form.status} onChange={f('status')} className={SELECT_CLS}>
              <option>Active</option><option>Inactive</option>
            </select>
          </ModalField>
        </div>
        <ModalFooter onCancel={() => { setAddOpen(false); setForm(emptyForm); }} onConfirm={handleAdd} confirmLabel="Save Position" />
      </Modal>

      {/* ══ EDIT POSITION MODAL ══ */}
      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Position">
        <div className="space-y-4">
          <ModalField label="Position Title">
            <input type="text" value={editForm.title} onChange={ef('title')} className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Department">
            <select value={editForm.dept} onChange={ef('dept')} className={SELECT_CLS}>
              {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </ModalField>
          <ModalField label="Status">
            <select value={editForm.status} onChange={ef('status')} className={SELECT_CLS}>
              <option>Active</option><option>Inactive</option>
            </select>
          </ModalField>
        </div>
        <ModalFooter onCancel={() => setEditIdx(null)} onConfirm={handleEdit} confirmLabel="Save Changes" />
      </Modal>

    </div>
  );
};
export default JobPositions;
