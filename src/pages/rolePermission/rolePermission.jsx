// rolePermission.jsx — Admin Roles & Permissions management
// Modals: Add Role, Edit Role
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_ROLES = [
  { name:'Admin',   desc:'Full system access all modules',                      users:1,  status:'Active' },
  { name:'HR',      desc:'HR management employees, leave, OT, announcements',   users:3,  status:'Active' },
  { name:'Manager', desc:'Team management approve leave & OT for team',         users:4,  status:'Active' },
  { name:'Employee',desc:'Standard employee access self-service only',           users:18, status:'Active' },
];

const RolePermission = () => {
  const [roles, setRoles] = useState(INIT_ROLES);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const emptyForm = { name:'', desc:'', status:'Active' };
  const [form, setForm] = useState(emptyForm);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  // Edit modal state
  const [editIdx, setEditIdx]   = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const ef = k => e => setEditForm(p => ({ ...p, [k]: e.target.value }));

  // Add handler
  const handleAdd = () => {
    setRoles(prev => [...prev, { ...form, users: 0 }]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  // Open edit modal
  const openEdit = idx => {
    setEditIdx(idx);
    const r = roles[idx];
    setEditForm({ name: r.name, desc: r.desc, status: r.status });
  };

  // Save edit
  const handleEdit = () => {
    setRoles(prev => prev.map((r, i) => i === editIdx ? { ...r, ...editForm } : r));
    setEditIdx(null);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Roles &amp; Permissions</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage system roles and their access levels.</p>
        </div>
        {/* Add Role — opens modal */}
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Add Role
        </button>
      </div>

      {/* Roles table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Role Name','Description','Users','Status','Actions'].map(h => <th key={h} className="px-5 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roles.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{r.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 max-w-xs">{r.desc}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">{r.users}</td>
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

      {/* ══ ADD ROLE MODAL ══ */}
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setForm(emptyForm); }} title="Add Role" maxWidth="max-w-md">
        <div className="space-y-4">
          <ModalField label="Role Name">
            <input type="text" value={form.name} onChange={f('name')} placeholder="e.g. Manager" className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Description">
            <textarea rows={3} value={form.desc} onChange={f('desc')} placeholder="Describe this role's access level..."
              className={`${INPUT_CLS} resize-none`} />
          </ModalField>
          <ModalField label="Status">
            <select value={form.status} onChange={f('status')} className={SELECT_CLS}>
              <option>Active</option><option>Inactive</option>
            </select>
          </ModalField>
        </div>
        <ModalFooter onCancel={() => { setAddOpen(false); setForm(emptyForm); }} onConfirm={handleAdd} confirmLabel="Save Role" />
      </Modal>

      {/* ══ EDIT ROLE MODAL ══ */}
      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Role" maxWidth="max-w-md">
        <div className="space-y-4">
          <ModalField label="Role Name">
            <input type="text" value={editForm.name} onChange={ef('name')} className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Description">
            <textarea rows={3} value={editForm.desc} onChange={ef('desc')} className={`${INPUT_CLS} resize-none`} />
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

export default RolePermission;
