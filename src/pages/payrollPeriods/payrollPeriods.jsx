// payrollPeriods.jsx — Admin Payroll Periods management
// Modals: New Period, View Period, Process Period
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, InfoRow, INPUT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_PERIODS = [
  { label:'March 1 - 15, 2026',    cutoff:'1st Cutoff • March 2026',    start:'March 1, 2026',    end:'March 15, 2026',   released:'March 20, 2026', status:'Released' },
  { label:'March 16 - 31, 2026',   cutoff:'2nd Cutoff • March 2026',    start:'March 16, 2026',   end:'March 31, 2026',   released:'—',              status:'Pending'  },
  { label:'February 1 - 15, 2026', cutoff:'1st Cutoff • February 2026', start:'February 1, 2026', end:'February 15, 2026',released:'Feb 20, 2026',   status:'Released' },
  { label:'February 16 - 28, 2026',cutoff:'2nd Cutoff • February 2026', start:'February 16, 2026',end:'February 28, 2026',released:'Mar 5, 2026',    status:'Released' },
  { label:'January 1 - 15, 2026',  cutoff:'1st Cutoff • January 2026',  start:'January 1, 2026',  end:'January 15, 2026', released:'Jan 20, 2026',   status:'Released' },
  { label:'January 16 - 31, 2026', cutoff:'2nd Cutoff • January 2026',  start:'January 16, 2026', end:'January 31, 2026', released:'Feb 5, 2026',    status:'Released' },
];

const StatusBadge = ({ status }) => {
  const map = { Released:'bg-green-500 text-white', Pending:'bg-yellow-400 text-black' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const PayrollPeriods = () => {
  const [periods, setPeriods] = useState(INIT_PERIODS);

  // New Period modal state
  const [addOpen, setAddOpen] = useState(false);
  const emptyForm = { label:'', start:'', end:'', released:'' };
  const [form, setForm] = useState(emptyForm);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  // View Period modal state
  const [viewItem, setViewItem] = useState(null);

  // Process Period modal state (confirm dialog)
  const [processIdx, setProcessIdx] = useState(null);

  // Add handler
  const handleAdd = () => {
    setPeriods(prev => [{ ...form, cutoff: `Cutoff • ${form.label}`, status:'Pending' }, ...prev]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  // Process period — mark as Released
  const handleProcess = () => {
    setPeriods(prev => prev.map((p, i) => {
      if (i !== processIdx) return p;
      return { ...p, status:'Released', released: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) };
    }));
    setProcessIdx(null);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Payroll Periods</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage payroll cutoff periods and release schedules.</p>
        </div>
        {/* New Period — opens modal */}
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + New Period
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Periods</p><p className="text-3xl font-black text-black mt-1">{periods.length}</p><p className="text-[11px] text-black/70">2026</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Released</p><p className="text-3xl font-black text-gray-900 mt-1">{periods.filter(p=>p.status==='Released').length}</p><p className="text-[11px] text-gray-400">Paydays sent</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending Release</p><p className="text-3xl font-black text-gray-900 mt-1">{periods.filter(p=>p.status==='Pending').length}</p><p className="text-[11px] text-gray-400">Awaiting processing</p></div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Payroll Periods — 2026</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Period Label','Cutoff Label','Period Start','Period End','Date Released','Status','Actions'].map(h => <th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {periods.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">{p.label}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.cutoff}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.start}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.end}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.released}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    {p.status === 'Pending' ? (
                      /* Process button — opens confirm modal */
                      <button onClick={() => setProcessIdx(i)}
                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-black text-[11px] font-bold rounded-lg cursor-pointer transition-colors">
                        Process
                      </button>
                    ) : (
                      /* View button — opens detail modal */
                      <button onClick={() => setViewItem(p)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ NEW PERIOD MODAL ══ */}
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setForm(emptyForm); }} title="New Payroll Period" maxWidth="max-w-md">
        <div className="space-y-4">
          <ModalField label="Period Label">
            <input type="text" value={form.label} onChange={f('label')} placeholder="e.g. April 1 - 15, 2026" className={INPUT_CLS} />
          </ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Period Start">
              <input type="date" value={form.start} onChange={f('start')} className={INPUT_CLS} />
            </ModalField>
            <ModalField label="Period End">
              <input type="date" value={form.end} onChange={f('end')} className={INPUT_CLS} />
            </ModalField>
          </div>
          <ModalField label="Release Date">
            <input type="date" value={form.released} onChange={f('released')} className={INPUT_CLS} />
          </ModalField>
        </div>
        <ModalFooter onCancel={() => { setAddOpen(false); setForm(emptyForm); }} onConfirm={handleAdd} confirmLabel="Save Period" />
      </Modal>

      {/* ══ VIEW PERIOD MODAL ══ */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Payroll Period Details" maxWidth="max-w-md">
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Period Label"  value={viewItem.label} />
              <InfoRow label="Cutoff Label"  value={viewItem.cutoff} />
              <InfoRow label="Period Start"  value={viewItem.start} />
              <InfoRow label="Period End"    value={viewItem.end} />
              <InfoRow label="Date Released" value={viewItem.released} />
              <InfoRow label="Status"        value={viewItem.status} />
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewItem(null)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ══ PROCESS CONFIRM MODAL ══ */}
      <Modal open={processIdx !== null} onClose={() => setProcessIdx(null)} title="Process Payroll Period" maxWidth="max-w-sm">
        {processIdx !== null && (
          <div>
            <p className="text-sm text-gray-700 mb-1">Are you sure you want to process and release:</p>
            <p className="text-sm font-bold text-gray-900 mb-4">{periods[processIdx]?.label}</p>
            <p className="text-xs text-gray-400">This will mark the period as Released and notify employees.</p>
            <ModalFooter
              onCancel={() => setProcessIdx(null)}
              onConfirm={handleProcess}
              confirmLabel="Yes, Process"
              confirmClass="bg-yellow-400 hover:bg-yellow-300 text-black"
            />
          </div>
        )}
      </Modal>

    </div>
  );
};
export default PayrollPeriods;
