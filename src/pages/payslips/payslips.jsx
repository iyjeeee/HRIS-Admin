// payslips.jsx — Admin Payslips: upload and manage employee payslips per period
// Modals: View Payslip, Replace Payslip, Upload Payslip
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, InfoRow, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_PAYSLIPS = [
  { name:'John Doe',       id:'HS-001', period:'Mar 1-15, 2026', file:'Payslip_JD_March2026_1st.pdf',  gross:'₱40,000', net:'₱38,200', released:'March 20, 2026', status:'Available' },
  { name:'Juan Dela Cruz', id:'HS-002', period:'Mar 1-15, 2026', file:'Payslip_JDC_March2026_1st.pdf', gross:'₱60,500', net:'₱25,208', released:'March 20, 2026', status:'Available' },
  { name:'Eva Smith',      id:'HS-003', period:'Mar 1-15, 2026', file: null,                           gross:'—',       net:'—',       released:'March 20, 2026', status:'Pending'   },
  { name:'Ken Aquino',     id:'HS-004', period:'Mar 1-15, 2026', file:'Payslip_KA_March2026_1st.pdf',  gross:'₱40,000', net:'₱53,500', released:'March 20, 2026', status:'Available' },
];

const PERIODS = ['March 1 - 15, 2026', 'March 16 - 31, 2026', 'February 1 - 15, 2026'];

const StatusBadge = ({ status }) => {
  const map = { Available:'bg-green-500 text-white', Pending:'bg-yellow-400 text-black' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const Payslips = () => {
  const [payslips, setPayslips] = useState(INIT_PAYSLIPS);
  const [period, setPeriod] = useState(PERIODS[0]);
  const [search, setSearch] = useState('');

  // View modal state
  const [viewItem, setViewItem] = useState(null);

  // Replace modal state
  const [replaceItem, setReplaceItem] = useState(null);
  const [replaceNote, setReplaceNote] = useState('');

  // Upload modal state
  const [uploadItem, setUploadItem] = useState(null);
  const [uploadFilename, setUploadFilename] = useState('');

  const filtered = payslips.filter(p =>
    `${p.name} ${p.id}`.toLowerCase().includes(search.toLowerCase())
  );

  // Handle upload — mark item as Available
  const handleUpload = () => {
    setPayslips(prev => prev.map(p =>
      p.id === uploadItem?.id
        ? { ...p, status: 'Available', file: uploadFilename || `Payslip_${p.id}.pdf` }
        : p
    ));
    setUploadItem(null);
    setUploadFilename('');
  };

  // Handle replace — update file note
  const handleReplace = () => {
    setReplaceItem(null);
    setReplaceNote('');
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page heading */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">Payslips</h2>
        <p className="text-xs text-gray-400 mt-0.5">Upload and manage employee payslips per payroll period.</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold text-gray-800">Payslips — {period}</p>
          <div className="flex gap-2">
            {/* Period selector */}
            <select value={period} onChange={e => setPeriod(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {PERIODS.map(p => <option key={p}>{p}</option>)}
            </select>
            {/* Employee search */}
            <input type="text" placeholder="Search Employee..." value={search} onChange={e => setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 w-40" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Employee','Period','Payslip File','Gross Pay','Net Pay','Date Released','Status','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                        {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                        <p className="text-[10px] text-gray-400">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.period}</td>
                  <td className="px-4 py-3">
                    {p.file
                      ? <span className="text-xs text-blue-500 font-medium">{p.file}</span>
                      : <span className="text-xs text-gray-400 italic">Not uploaded</span>}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-700">{p.gross}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-700">{p.net}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.released}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    {p.status === 'Available' ? (
                      <div className="flex gap-1">
                        {/* View — opens view modal */}
                        <button onClick={() => setViewItem(p)}
                          className="px-2.5 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold rounded cursor-pointer transition-colors">
                          View
                        </button>
                        {/* Replace — opens replace modal */}
                        <button onClick={() => { setReplaceItem(p); setReplaceNote(''); }}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold rounded cursor-pointer transition-colors">
                          Replace
                        </button>
                      </div>
                    ) : (
                      /* Upload — opens upload modal */
                      <button onClick={() => { setUploadItem(p); setUploadFilename(''); }}
                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-black text-[10px] font-bold rounded-lg cursor-pointer transition-colors">
                        Upload
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ VIEW PAYSLIP MODAL ══ */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Payslip Details" maxWidth="max-w-md">
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Employee"      value={viewItem.name} />
              <InfoRow label="Employee ID"   value={viewItem.id} />
              <InfoRow label="Period"        value={viewItem.period} />
              <InfoRow label="Date Released" value={viewItem.released} />
              <InfoRow label="Gross Pay"     value={viewItem.gross} />
              <InfoRow label="Net Pay"       value={viewItem.net} />
              <InfoRow label="Status"        value={viewItem.status} />
              <InfoRow label="File"          value={viewItem.file || '—'} />
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-5 text-center">
              <p className="text-sm text-gray-400">📄 File preview will be available after database integration</p>
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

      {/* ══ REPLACE PAYSLIP MODAL ══ */}
      <Modal open={!!replaceItem} onClose={() => setReplaceItem(null)} title="Replace Payslip" maxWidth="max-w-md">
        {replaceItem && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Replacing payslip for <strong>{replaceItem.name}</strong></p>
              <p className="text-xs text-gray-400 mt-0.5">Current file: {replaceItem.file}</p>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-400">📎 File upload will be available after database integration</p>
              <p className="text-xs text-gray-300 mt-1">Accepts PDF files only</p>
            </div>
            <ModalField label="Notes (optional)">
              <textarea rows={3} value={replaceNote} onChange={e => setReplaceNote(e.target.value)}
                placeholder="Reason for replacement..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 resize-none" />
            </ModalField>
            <ModalFooter onCancel={() => setReplaceItem(null)} onConfirm={handleReplace} confirmLabel="Replace Payslip" />
          </div>
        )}
      </Modal>

      {/* ══ UPLOAD PAYSLIP MODAL ══ */}
      <Modal open={!!uploadItem} onClose={() => setUploadItem(null)} title="Upload Payslip" maxWidth="max-w-md">
        {uploadItem && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-gray-700">Uploading payslip for <strong>{uploadItem.name}</strong></p>
              <p className="text-xs text-gray-500 mt-0.5">Period: {uploadItem.period}</p>
            </div>
            <ModalField label="Filename">
              <input type="text" value={uploadFilename} onChange={e => setUploadFilename(e.target.value)}
                placeholder={`Payslip_${uploadItem.id}_${uploadItem.period}.pdf`}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
            </ModalField>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-400">📎 File upload will be available after database integration</p>
              <p className="text-xs text-gray-300 mt-1">Accepts PDF files only</p>
            </div>
            <ModalFooter onCancel={() => setUploadItem(null)} onConfirm={handleUpload} confirmLabel="Upload Payslip" />
          </div>
        )}
      </Modal>

    </div>
  );
};
export default Payslips;
