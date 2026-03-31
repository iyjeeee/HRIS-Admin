// leaveCredits.jsx — Admin Leave Credits allocation per employee
// Modals: Allocate Credits, Edit Credits
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, InfoRow, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_CREDITS = [
  { name:'Juan Dela Cruz', id:'HS-001', dept:'IT',         vl:15, vlLeft:13, sl:15, slLeft:13, el:5, elLeft:4, totalUsed:7,  remaining:26 },
  { name:'John Doe',       id:'HS-002', dept:'IT',         vl:15, vlLeft:15, sl:15, slLeft:14, el:5, elLeft:5, totalUsed:1,  remaining:34 },
  { name:'Eva Smith',      id:'HS-003', dept:'Finance',    vl:15, vlLeft:9,  sl:15, slLeft:13, el:5, elLeft:2, totalUsed:8,  remaining:27 },
  { name:'Ken Aquino',     id:'HS-004', dept:'Operations', vl:15, vlLeft:13, sl:15, slLeft:15, el:5, elLeft:2, totalUsed:0,  remaining:35 },
  { name:'Michael Saints', id:'HS-005', dept:'IT',         vl:15, vlLeft:15, sl:15, slLeft:15, el:5, elLeft:5, totalUsed:0,  remaining:35 },
];

// ─── Credit cell — shows total and remaining ──────────────────────────────────
const CreditCell = ({ total, left }) => (
  <div className="text-xs">
    <span className="font-semibold text-gray-800">{total} total</span>
    {' · '}
    <span className="text-green-600 font-bold">{left} left</span>
  </div>
);

const LeaveCredits = () => {
  const [credits, setCredits] = useState(INIT_CREDITS);
  const [search, setSearch]   = useState('');
  const [year, setYear]       = useState('2026');

  // Allocate Credits modal state
  const [allocOpen, setAllocOpen] = useState(false);
  const [allocForm, setAllocForm] = useState({ vl:15, sl:15, el:5 });
  const af = k => e => setAllocForm(p => ({ ...p, [k]: Number(e.target.value) }));

  // Edit Credits modal state
  const [editIdx, setEditIdx]   = useState(null);
  const [editForm, setEditForm] = useState({ vl:15, vlLeft:15, sl:15, slLeft:15, el:5, elLeft:5 });
  const ef = k => e => setEditForm(p => ({ ...p, [k]: Number(e.target.value) }));

  const filtered = credits.filter(c => `${c.name} ${c.id}`.toLowerCase().includes(search.toLowerCase()));

  // Open edit modal — pre-fill from selected row
  const openEdit = idx => {
    const real = credits.indexOf(filtered[idx]);
    setEditIdx(real);
    const c = credits[real];
    setEditForm({ vl:c.vl, vlLeft:c.vlLeft, sl:c.sl, slLeft:c.slLeft, el:c.el, elLeft:c.elLeft });
  };

  // Save edit
  const handleEdit = () => {
    setCredits(prev => prev.map((c, i) => {
      if (i !== editIdx) return c;
      const used = (editForm.vl - editForm.vlLeft) + (editForm.sl - editForm.slLeft) + (editForm.el - editForm.elLeft);
      return { ...c, ...editForm, totalUsed: used, remaining: editForm.vlLeft + editForm.slLeft + editForm.elLeft };
    }));
    setEditIdx(null);
  };

  // Allocate credits to all employees
  const handleAllocate = () => {
    setCredits(prev => prev.map(c => ({
      ...c,
      vl: allocForm.vl, vlLeft: allocForm.vl,
      sl: allocForm.sl, slLeft: allocForm.sl,
      el: allocForm.el, elLeft: allocForm.el,
      totalUsed: 0, remaining: allocForm.vl + allocForm.sl + allocForm.el,
    })));
    setAllocOpen(false);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Leave Credits</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage leave credits allocation per employee per year.</p>
        </div>
        <div className="flex gap-2">
          {/* Year selector */}
          <select value={year} onChange={e => setYear(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
            <option>2026</option><option>2025</option>
          </select>
          {/* Allocate Credits — opens modal */}
          <button onClick={() => setAllocOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
            + Allocate Credits
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Leave Approval Requests</p>
          <input type="text" placeholder="Search Employee..." value={search} onChange={e => setSearch(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 w-44" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Employee','Department','Vacation Leave','Sick Leave','Emergency Leave','Total Used','Total Remaining','Actions'].map(h => <th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                        {c.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div><p className="text-sm font-semibold text-gray-800">{c.name}</p><p className="text-[10px] text-gray-400">{c.id}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{c.dept}</td>
                  <td className="px-4 py-3"><CreditCell total={c.vl} left={c.vlLeft} /></td>
                  <td className="px-4 py-3"><CreditCell total={c.sl} left={c.slLeft} /></td>
                  <td className="px-4 py-3"><CreditCell total={c.el} left={c.elLeft} /></td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{c.totalUsed}</td>
                  <td className="px-4 py-3 text-sm font-bold text-green-600">{c.remaining}</td>
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

      {/* ══ ALLOCATE CREDITS MODAL ══ */}
      <Modal open={allocOpen} onClose={() => setAllocOpen(false)} title="Allocate Leave Credits" maxWidth="max-w-md">
        <p className="text-xs text-gray-500 mb-4">Set the annual leave credits for all employees. This will reset existing allocations.</p>
        <div className="space-y-3">
          {[['Vacation Leave','vl'],['Sick Leave','sl'],['Emergency Leave','el']].map(([label, key]) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-gray-700 w-40">{label}</span>
              <input type="number" min={0} value={allocForm[key]} onChange={af(key)}
                className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 text-center" />
              <span className="text-xs text-gray-400">days</span>
            </div>
          ))}
        </div>
        <ModalFooter onCancel={() => setAllocOpen(false)} onConfirm={handleAllocate} confirmLabel="Allocate Credits" />
      </Modal>

      {/* ══ EDIT CREDITS MODAL ══ */}
      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Leave Credits" maxWidth="max-w-md">
        {editIdx !== null && (
          <>
            <p className="text-xs text-gray-500 mb-4">Editing credits for <strong>{credits[editIdx]?.name}</strong></p>
            <div className="space-y-3">
              {[
                ['Vacation Leave — Total', 'vl'], ['Vacation Leave — Remaining', 'vlLeft'],
                ['Sick Leave — Total', 'sl'],      ['Sick Leave — Remaining', 'slLeft'],
                ['Emergency Leave — Total', 'el'], ['Emergency Leave — Remaining', 'elLeft'],
              ].map(([label, key]) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-700 w-52">{label}</span>
                  <input type="number" min={0} value={editForm[key]} onChange={ef(key)}
                    className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 text-center" />
                  <span className="text-xs text-gray-400">days</span>
                </div>
              ))}
            </div>
            <ModalFooter onCancel={() => setEditIdx(null)} onConfirm={handleEdit} confirmLabel="Save Credits" />
          </>
        )}
      </Modal>

    </div>
  );
};
export default LeaveCredits;
