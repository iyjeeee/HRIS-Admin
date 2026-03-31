// eventType.jsx — Admin Event Types management
// Removed inline Add New Event Type panel — now uses modal via "Add Event Type" button
// Modals: Add Event Type, Edit Event Type
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_TYPES = [
  { color:'bg-yellow-400', type:'Holiday',      desc:'National and Company declared holidays', appliesTo:'All Employees',       total:12, status:'Active' },
  { color:'bg-blue-500',   type:'Company Event', desc:'Team events, Outing',                    appliesTo:'All Employees',       total:4,  status:'Active' },
  { color:'bg-green-500',  type:'Payroll',       desc:'Payroll cut-off',                         appliesTo:'All Employees',       total:34, status:'Active' },
  { color:'bg-purple-500', type:'Training',      desc:'Scheduled training',                       appliesTo:'All Employees',       total:24, status:'Active' },
  { color:'bg-red-500',    type:'Deadline',      desc:'Important submissions & reports',          appliesTo:'Specific departments',total:10, status:'Active' },
  { color:'bg-teal-500',   type:'HR Event',      desc:'Performance reviews',                      appliesTo:'All Employees',       total:4,  status:'Active' },
  { color:'bg-gray-700',   type:'Dept Meetings', desc:'Department discussion',                    appliesTo:'Specific departments',total:4,  status:'Active' },
];

const COLOR_OPTIONS = [
  { cls:'bg-yellow-400', label:'Yellow' },
  { cls:'bg-blue-500',   label:'Blue'   },
  { cls:'bg-green-500',  label:'Green'  },
  { cls:'bg-red-500',    label:'Red'    },
  { cls:'bg-purple-500', label:'Purple' },
  { cls:'bg-teal-500',   label:'Teal'   },
  { cls:'bg-gray-700',   label:'Gray'   },
];

const EventType = () => {
  const [types, setTypes] = useState(INIT_TYPES);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const emptyForm = { type:'', desc:'', appliesTo:'All Employees', color:'bg-yellow-400', status:'Active' };
  const [form, setForm] = useState(emptyForm);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  // Edit modal state
  const [editIdx, setEditIdx]   = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const ef = k => e => setEditForm(p => ({ ...p, [k]: e.target.value }));

  // Add handler
  const handleAdd = () => {
    setTypes(prev => [...prev, { ...form, total: 0 }]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  // Open edit modal
  const openEdit = idx => {
    setEditIdx(idx);
    const t = types[idx];
    setEditForm({ type: t.type, desc: t.desc, appliesTo: t.appliesTo, color: t.color, status: t.status });
  };

  // Save edit
  const handleEdit = () => {
    setTypes(prev => prev.map((t, i) => i === editIdx ? { ...t, ...editForm } : t));
    setEditIdx(null);
  };

  // Shared color picker used in both modals
  const ColorPicker = ({ value, onChange }) => (
    <div className="flex gap-2 flex-wrap mt-1">
      {COLOR_OPTIONS.map(c => (
        <button key={c.cls} type="button"
          onClick={() => onChange(c.cls)}
          className={`w-7 h-7 rounded-full ${c.cls} cursor-pointer transition-transform hover:scale-110 ${value === c.cls ? 'ring-2 ring-offset-2 ring-gray-700' : ''}`}
          title={c.label}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-5 pb-8">

      {/* Page header — Add Event Type button here, no side panel */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Event Types</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage Events Categories used in the company calendar.</p>
        </div>
        {/* Add Event Type — opens modal */}
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Add Event Type
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Event Types</p><p className="text-3xl font-black text-black mt-1">{types.length}</p><p className="text-[11px] text-black/70">Across all categories</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Activity Types</p><p className="text-3xl font-black text-gray-900 mt-1">{types.length}</p><p className="text-[11px] text-gray-400">Currently in use</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Event This Month</p><p className="text-3xl font-black text-gray-900 mt-1">12</p><p className="text-[11px] text-gray-400">Using these types</p></div>
      </div>

      {/* Full-width event types table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Event Types</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Color','Event Type','Description','Applies To','Total Events','Status','Actions'].map(h => <th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {types.map((et, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3"><span className={`inline-block w-5 h-5 rounded-full ${et.color}`}></span></td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">{et.type}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{et.desc}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{et.appliesTo}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-700">{et.total}</td>
                  <td className="px-4 py-3"><span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{et.status}</span></td>
                  {/* Edit button — opens edit modal */}
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

      {/* ══ ADD EVENT TYPE MODAL ══ */}
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setForm(emptyForm); }} title="Add Event Type" maxWidth="max-w-md">
        <div className="space-y-4">
          <ModalField label="Type Name">
            <input type="text" value={form.type} onChange={f('type')} placeholder="e.g. Training, Holiday, Event" className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Description">
            <textarea rows={3} value={form.desc} onChange={f('desc')} placeholder="Brief description of this event."
              className={`${INPUT_CLS} resize-none`} />
          </ModalField>
          <ModalField label="Applies To">
            <select value={form.appliesTo} onChange={f('appliesTo')} className={SELECT_CLS}>
              <option>All Employees</option><option>Specific departments</option>
            </select>
          </ModalField>
          <ModalField label="Status">
            <select value={form.status} onChange={f('status')} className={SELECT_CLS}>
              <option>Active</option><option>Inactive</option>
            </select>
          </ModalField>
          <div>
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Color Tag</p>
            <ColorPicker value={form.color} onChange={v => setForm(p => ({ ...p, color: v }))} />
          </div>
        </div>
        <ModalFooter onCancel={() => { setAddOpen(false); setForm(emptyForm); }} onConfirm={handleAdd} confirmLabel="Add Event Type" />
      </Modal>

      {/* ══ EDIT EVENT TYPE MODAL ══ */}
      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Event Type" maxWidth="max-w-md">
        <div className="space-y-4">
          <ModalField label="Type Name">
            <input type="text" value={editForm.type} onChange={ef('type')} className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Description">
            <textarea rows={3} value={editForm.desc} onChange={ef('desc')} className={`${INPUT_CLS} resize-none`} />
          </ModalField>
          <ModalField label="Applies To">
            <select value={editForm.appliesTo} onChange={ef('appliesTo')} className={SELECT_CLS}>
              <option>All Employees</option><option>Specific departments</option>
            </select>
          </ModalField>
          <ModalField label="Status">
            <select value={editForm.status} onChange={ef('status')} className={SELECT_CLS}>
              <option>Active</option><option>Inactive</option>
            </select>
          </ModalField>
          <div>
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Color Tag</p>
            <ColorPicker value={editForm.color} onChange={v => setEditForm(p => ({ ...p, color: v }))} />
          </div>
        </div>
        <ModalFooter onCancel={() => setEditIdx(null)} onConfirm={handleEdit} confirmLabel="Save Changes" />
      </Modal>

    </div>
  );
};
export default EventType;
