// departments.jsx — Departments management page
// Modals: Add Department, Edit Department
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, InfoRow, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static department data ───────────────────────────────────────────────────
const INIT_DEPTS = [
  { name:'Information Technology', desc:'Software development & infrastructure', employees:4, status:'Active' },
  { name:'Human Resources',        desc:'People operations & compliance',         employees:3, status:'Active' },
  { name:'Finance',                desc:'Accounting, payroll & budgeting',        employees:3, status:'Active' },
  { name:'Operations',             desc:'Business operations & logistics',         employees:5, status:'Active' },
  { name:'Marketing',              desc:'Brand, campaigns & sales support',        employees:3, status:'Active' },
];

const Departments = () => {
  const [depts, setDepts] = useState(INIT_DEPTS);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const emptyForm = { name:'', desc:'', status:'Active' };
  const [form, setForm] = useState(emptyForm);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  // Edit modal state
  const [editIdx, setEditIdx] = useState(null); // index of dept being edited
  const [editForm, setEditForm] = useState(emptyForm);
  const ef = k => e => setEditForm(p => ({ ...p, [k]: e.target.value }));

  // Add department handler
  const handleAdd = () => {
    setDepts(prev => [...prev, { ...form, employees: 0 }]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  // Open edit modal and pre-fill form
  const openEdit = (idx) => {
    setEditIdx(idx);
    setEditForm({ name: depts[idx].name, desc: depts[idx].desc, status: depts[idx].status });
  };

  // Save edit handler
  const handleEdit = () => {
    setDepts(prev => prev.map((d, i) => i === editIdx ? { ...d, ...editForm } : d));
    setEditIdx(null);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Departments</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage company departments and their structure.</p>
        </div>
        {/* Add Department — opens modal */}
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Add Department
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Departments</p><p className="text-3xl font-black text-black mt-1">{depts.length}</p><p className="text-[11px] text-black/70">All active</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Positions</p><p className="text-3xl font-black text-gray-900 mt-1">8</p><p className="text-[11px] text-gray-400">Across departments</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Employees</p><p className="text-3xl font-black text-gray-900 mt-1">18</p><p className="text-[11px] text-gray-400">Assigned</p></div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Departments</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Department','Description','Employees','Status','Action'].map(h => <th key={h} className="px-5 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {depts.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{d.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{d.desc}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">{d.employees}</td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{d.status}</span></td>
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

      {/* ══ ADD DEPARTMENT MODAL ══ */}
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setForm(emptyForm); }} title="Add Department">
        <div className="space-y-4">
          <ModalField label="Department Name">
            <input type="text" value={form.name} onChange={f('name')} placeholder="e.g. Information Technology" className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Description">
            <input type="text" value={form.desc} onChange={f('desc')} placeholder="Brief description" className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Status">
            <select value={form.status} onChange={f('status')} className={SELECT_CLS}>
              <option>Active</option><option>Inactive</option>
            </select>
          </ModalField>
        </div>
        <ModalFooter onCancel={() => { setAddOpen(false); setForm(emptyForm); }} onConfirm={handleAdd} confirmLabel="Save Department" />
      </Modal>

      {/* ══ EDIT DEPARTMENT MODAL ══ */}
      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Department">
        <div className="space-y-4">
          <ModalField label="Department Name">
            <input type="text" value={editForm.name} onChange={ef('name')} className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Description">
            <input type="text" value={editForm.desc} onChange={ef('desc')} className={INPUT_CLS} />
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
export default Departments;
