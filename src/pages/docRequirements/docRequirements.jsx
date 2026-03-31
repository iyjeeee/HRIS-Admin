// docRequirements.jsx — Admin Document Requirements: master list of required employee docs
// Modals: Add Requirement, Edit Requirement
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_REQUIREMENTS = [
  { name:'Signed Employee Contract',       category:'Legal/Contract', required:'Required', status:'Active' },
  { name:'NBI Clearance',                  category:'Pre-Employment', required:'Required', status:'Active' },
  { name:'SSS E1/E4 Form',                 category:"Gov't Benefit",  required:'Required', status:'Active' },
  { name:'PhilHealth MDR Form',            category:"Gov't Benefit",  required:'Required', status:'Active' },
  { name:'Pag-IBIG Membership Form (MDF)', category:"Gov't Benefit",  required:'Required', status:'Active' },
  { name:'BIR Form 2316 (Prior Employer)', category:'Tax',            required:'Optional', status:'Active' },
  { name:'Birth Certificate (PSA)',        category:'Personal/Civil', required:'Required', status:'Active' },
];

const CATEGORIES = ['Legal/Contract','Pre-Employment',"Gov't Benefit",'Tax','Personal/Civil'];

const RequiredBadge = ({ r }) => (
  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${r === 'Required' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{r}</span>
);

const DocRequirements = () => {
  const [requirements, setRequirements] = useState(INIT_REQUIREMENTS);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const emptyForm = { name:'', category:'Legal/Contract', required:'Required', status:'Active' };
  const [form, setForm] = useState(emptyForm);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  // Edit modal state
  const [editIdx, setEditIdx]   = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const ef = k => e => setEditForm(p => ({ ...p, [k]: e.target.value }));

  // Add handler
  const handleAdd = () => {
    setRequirements(prev => [...prev, { ...form }]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  // Open edit modal
  const openEdit = idx => {
    setEditIdx(idx);
    const r = requirements[idx];
    setEditForm({ name: r.name, category: r.category, required: r.required, status: r.status });
  };

  // Save edit
  const handleEdit = () => {
    setRequirements(prev => prev.map((r, i) => i === editIdx ? { ...r, ...editForm } : r));
    setEditIdx(null);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Document Requirements</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage required documents for all employee 201 files.</p>
        </div>
        {/* Add Requirement — opens modal */}
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Add Requirement
        </button>
      </div>

      {/* Requirements table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Document Name','Category','Required','Status','Actions'].map(h => <th key={h} className="px-5 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requirements.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{r.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{r.category}</td>
                  <td className="px-5 py-3.5"><RequiredBadge r={r.required} /></td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{r.status}</span></td>
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

      {/* ══ ADD REQUIREMENT MODAL ══ */}
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setForm(emptyForm); }} title="Add Document Requirement" maxWidth="max-w-md">
        <div className="space-y-4">
          <ModalField label="Document Name">
            <input type="text" value={form.name} onChange={f('name')} placeholder="e.g. NBI Clearance" className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Category">
            <select value={form.category} onChange={f('category')} className={SELECT_CLS}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </ModalField>
          <ModalField label="Type">
            <select value={form.required} onChange={f('required')} className={SELECT_CLS}>
              <option>Required</option><option>Optional</option>
            </select>
          </ModalField>
          <ModalField label="Status">
            <select value={form.status} onChange={f('status')} className={SELECT_CLS}>
              <option>Active</option><option>Inactive</option>
            </select>
          </ModalField>
        </div>
        <ModalFooter onCancel={() => { setAddOpen(false); setForm(emptyForm); }} onConfirm={handleAdd} confirmLabel="Save Requirement" />
      </Modal>

      {/* ══ EDIT REQUIREMENT MODAL ══ */}
      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Document Requirement" maxWidth="max-w-md">
        <div className="space-y-4">
          <ModalField label="Document Name">
            <input type="text" value={editForm.name} onChange={ef('name')} className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Category">
            <select value={editForm.category} onChange={ef('category')} className={SELECT_CLS}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </ModalField>
          <ModalField label="Type">
            <select value={editForm.required} onChange={ef('required')} className={SELECT_CLS}>
              <option>Required</option><option>Optional</option>
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

export default DocRequirements;
