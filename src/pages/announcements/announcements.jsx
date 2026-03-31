// announcements.jsx — Admin Announcements management
// Removed inline Quick Post form — now uses modal via "+ New Announcement" button
// Modals: New Announcement, Edit Announcement
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, InfoRow, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_ANNOUNCEMENTS = [
  { title:'Revised Attendance Policy-Effective March 2026', category:'Policy',  postedBy:'Hr Dept', date:'Mar 1, 2026',  status:'Published', audience:'All Employees', body:'' },
  { title:'Company Teambuilding - March 15, 2026',          category:'Event',   postedBy:'Hr Dept', date:'Mar 1, 2026',  status:'Published', audience:'All Employees', body:'' },
  { title:'New Payroll Cut-off Schedule for Q2',            category:'Payroll', postedBy:'Finance', date:'Feb 28, 2026', status:'Published', audience:'All Employees', body:'' },
  { title:'Q1 HR Performance Review Schedule',              category:'Memo',    postedBy:'Hr Dept', date:'Feb 20, 2026', status:'Published', audience:'All Employees', body:'' },
];

const CATEGORIES = ['Policy','Event','Payroll','Memo','General'];
const AUDIENCES  = ['All Employees','IT Department','Finance','HR','Operations','Marketing'];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(INIT_ANNOUNCEMENTS);

  // New Announcement modal state
  const [addOpen, setAddOpen] = useState(false);
  const emptyForm = { title:'', category:'Policy', audience:'All Employees', body:'' };
  const [form, setForm] = useState(emptyForm);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  // Edit Announcement modal state
  const [editIdx, setEditIdx]   = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const ef = k => e => setEditForm(p => ({ ...p, [k]: e.target.value }));

  // View Announcement modal state
  const [viewItem, setViewItem] = useState(null);

  // Publish new announcement
  const handleAdd = () => {
    const now = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
    setAnnouncements(prev => [{ ...form, postedBy:'Admin', date: now, status:'Published' }, ...prev]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  // Open edit modal
  const openEdit = idx => {
    setEditIdx(idx);
    const a = announcements[idx];
    setEditForm({ title: a.title, category: a.category, audience: a.audience, body: a.body });
  };

  // Save edit
  const handleEdit = () => {
    setAnnouncements(prev => prev.map((a, i) => i === editIdx ? { ...a, ...editForm } : a));
    setEditIdx(null);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Announcements</h2>
          <p className="text-xs text-gray-400 mt-0.5">Post and manage company-wide or department-specific announcements.</p>
        </div>
        {/* New Announcement — opens modal */}
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + New Announcement
        </button>
      </div>

      {/* Announcements table — full width now (no side panel) */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Announcements</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Title','Category','Posted By','Date','Status','Action'].map(h => <th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {announcements.map((a, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800 max-w-xs">{a.title}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{a.category}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{a.postedBy}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{a.date}</td>
                  <td className="px-4 py-3"><span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{a.status}</span></td>
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

      {/* ══ NEW ANNOUNCEMENT MODAL ══ */}
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setForm(emptyForm); }} title="New Announcement">
        <div className="space-y-4">
          <ModalField label="Title">
            <input type="text" value={form.title} onChange={f('title')} placeholder="Announcement title..." className={INPUT_CLS} />
          </ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Category">
              <select value={form.category} onChange={f('category')} className={SELECT_CLS}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </ModalField>
            <ModalField label="Audience">
              <select value={form.audience} onChange={f('audience')} className={SELECT_CLS}>
                {AUDIENCES.map(a => <option key={a}>{a}</option>)}
              </select>
            </ModalField>
          </div>
          <ModalField label="Body">
            <textarea rows={5} value={form.body} onChange={f('body')} placeholder="Write your announcement..."
              className={`${INPUT_CLS} resize-none`} />
          </ModalField>
        </div>
        <ModalFooter onCancel={() => { setAddOpen(false); setForm(emptyForm); }} onConfirm={handleAdd} confirmLabel="Publish Announcement" />
      </Modal>

      {/* ══ EDIT ANNOUNCEMENT MODAL ══ */}
      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title="Edit Announcement">
        <div className="space-y-4">
          <ModalField label="Title">
            <input type="text" value={editForm.title} onChange={ef('title')} className={INPUT_CLS} />
          </ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Category">
              <select value={editForm.category} onChange={ef('category')} className={SELECT_CLS}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </ModalField>
            <ModalField label="Audience">
              <select value={editForm.audience} onChange={ef('audience')} className={SELECT_CLS}>
                {AUDIENCES.map(a => <option key={a}>{a}</option>)}
              </select>
            </ModalField>
          </div>
          <ModalField label="Body">
            <textarea rows={5} value={editForm.body} onChange={ef('body')}
              className={`${INPUT_CLS} resize-none`} />
          </ModalField>
        </div>
        <ModalFooter onCancel={() => setEditIdx(null)} onConfirm={handleEdit} confirmLabel="Save Changes" />
      </Modal>

    </div>
  );
};
export default Announcements;
