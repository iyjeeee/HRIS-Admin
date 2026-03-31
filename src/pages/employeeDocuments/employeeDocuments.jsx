// employeeDocuments.jsx — Admin Employee Documents: file and track submitted requirements
// Modals: Upload Document, View Document, Request Document
import React, { useState } from 'react';
import Modal, { ModalFooter, ModalField, InfoRow, INPUT_CLS, SELECT_CLS } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_DOCUMENTS = [
  { name:'John Doe',    id:'HS-001', title:'Signed employment contract', category:'Legal/Contract',  submitted:'October 15, 2026',  status:'On File'  },
  { name:'Carlo Reyes', id:'HS-002', title:'NBI Clearance',              category:'Pre-Employment',  submitted:'October 31, 2026',  status:'Pending'  },
  { name:'Eva Smith',   id:'HS-003', title:'Birth Certificate PSA',      category:'Personal/Civil',  submitted:'November 15, 2026', status:'On File'  },
  { name:'Ken Aquino',  id:'HS-004', title:'BIR Form 2316',              category:'Tax',             submitted:'November 20, 2026', status:'On File'  },
  { name:'John Larry',  id:'HS-005', title:'SSS',                        category:"Gov't Benefits",  submitted:'November 18, 2026', status:'On File'  },
  { name:'Larry Nanos', id:'HS-006', title:'SSS',                        category:"Gov't Benefits",  submitted:'November 29, 2026', status:'On File'  },
];

const CATEGORIES = ['All Categories','Legal/Contract','Pre-Employment','Personal/Civil','Tax',"Gov't Benefits"];

const StatusBadge = ({ status }) => {
  const map = { 'On File':'bg-green-500 text-white', Pending:'bg-yellow-400 text-black', Rejected:'bg-red-500 text-white' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const EmployeeDocuments = () => {
  const [documents, setDocuments] = useState(INIT_DOCUMENTS);
  const [catFilter,    setCatFilter]    = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [search,       setSearch]       = useState('');

  // Upload Document modal state
  const [uploadOpen, setUploadOpen] = useState(false);
  const emptyUpload = { employeeName:'', employeeId:'', title:'', category:'Legal/Contract', notes:'' };
  const [uploadForm, setUploadForm] = useState(emptyUpload);
  const uf = k => e => setUploadForm(p => ({ ...p, [k]: e.target.value }));

  // View Document modal state
  const [viewDoc, setViewDoc] = useState(null);

  // Request Document modal state (for Pending docs)
  const [requestDoc, setRequestDoc] = useState(null);
  const [requestNote, setRequestNote] = useState('');

  const filtered = documents.filter(d => {
    const matchCat    = catFilter    === 'All Categories' || d.category === catFilter;
    const matchStatus = statusFilter === 'All Status'     || d.status   === statusFilter;
    const matchSearch = `${d.name} ${d.id}`.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  // Upload document handler
  const handleUpload = () => {
    const now = new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
    setDocuments(prev => [...prev, {
      name: uploadForm.employeeName, id: uploadForm.employeeId,
      title: uploadForm.title, category: uploadForm.category,
      submitted: now, status:'On File',
    }]);
    setUploadForm(emptyUpload);
    setUploadOpen(false);
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Employee Documents</h2>
          <p className="text-xs text-gray-400 mt-0.5">File and submitted requirements per employee.</p>
        </div>
        {/* Upload Document — opens modal */}
        <button onClick={() => setUploadOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Documents</p><p className="text-3xl font-black text-black mt-1">84</p><p className="text-[11px] text-black/70">All Employees</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">On File</p><p className="text-3xl font-black text-gray-900 mt-1">72</p><p className="text-[11px] text-gray-400">Submitted</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</p><p className="text-3xl font-black text-gray-900 mt-1">12</p><p className="text-[11px] text-gray-400">Not yet submitted</p></div>
      </div>

      {/* Documents table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Employees Documents</p>
          <div className="flex gap-2 flex-wrap">
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Status','On File','Pending','Rejected'].map(s => <option key={s}>{s}</option>)}
            </select>
            <input type="text" placeholder="Search Employee..." value={search} onChange={e => setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 w-40" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Employee','Document Title','Category','Date Submitted','Status','Actions'].map(h => <th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((doc, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[9px] shrink-0">
                        {doc.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div><p className="text-sm font-semibold text-gray-800">{doc.name}</p><p className="text-[10px] text-gray-400">{doc.id}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{doc.title}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{doc.category}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{doc.submitted}</td>
                  <td className="px-4 py-3"><StatusBadge status={doc.status} /></td>
                  <td className="px-4 py-3">
                    {doc.status === 'On File' ? (
                      /* View button */
                      <button onClick={() => setViewDoc(doc)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">
                        View
                      </button>
                    ) : (
                      /* Request button — for pending docs */
                      <button onClick={() => { setRequestDoc(doc); setRequestNote(''); }}
                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-black text-[11px] font-bold rounded-lg cursor-pointer transition-colors">
                        Request
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ UPLOAD DOCUMENT MODAL ══ */}
      <Modal open={uploadOpen} onClose={() => { setUploadOpen(false); setUploadForm(emptyUpload); }} title="Upload Document">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Employee Name">
              <input type="text" value={uploadForm.employeeName} onChange={uf('employeeName')} placeholder="Full name" className={INPUT_CLS} />
            </ModalField>
            <ModalField label="Employee ID">
              <input type="text" value={uploadForm.employeeId} onChange={uf('employeeId')} placeholder="HS-XXX" className={INPUT_CLS} />
            </ModalField>
          </div>
          <ModalField label="Document Title">
            <input type="text" value={uploadForm.title} onChange={uf('title')} placeholder="e.g. NBI Clearance" className={INPUT_CLS} />
          </ModalField>
          <ModalField label="Category">
            <select value={uploadForm.category} onChange={uf('category')} className={SELECT_CLS}>
              {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
            </select>
          </ModalField>
          <ModalField label="Notes (optional)">
            <textarea rows={3} value={uploadForm.notes} onChange={uf('notes')} placeholder="Any additional notes..."
              className={`${INPUT_CLS} resize-none`} />
          </ModalField>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-400">📎 File upload will be available after database integration</p>
            <p className="text-xs text-gray-300 mt-1">Accepts PDF, JPG, PNG</p>
          </div>
        </div>
        <ModalFooter onCancel={() => { setUploadOpen(false); setUploadForm(emptyUpload); }} onConfirm={handleUpload} confirmLabel="Upload Document" />
      </Modal>

      {/* ══ VIEW DOCUMENT MODAL ══ */}
      <Modal open={!!viewDoc} onClose={() => setViewDoc(null)} title="Document Details" maxWidth="max-w-md">
        {viewDoc && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Employee"        value={viewDoc.name} />
              <InfoRow label="Employee ID"     value={viewDoc.id} />
              <InfoRow label="Document Title"  value={viewDoc.title} />
              <InfoRow label="Category"        value={viewDoc.category} />
              <InfoRow label="Date Submitted"  value={viewDoc.submitted} />
              <InfoRow label="Status"          value={viewDoc.status} />
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-5 text-center">
              <p className="text-sm text-gray-400">📄 Document preview will be available after database integration</p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewDoc(null)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ══ REQUEST DOCUMENT MODAL ══ */}
      <Modal open={!!requestDoc} onClose={() => setRequestDoc(null)} title="Request Document" maxWidth="max-w-md">
        {requestDoc && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-800">{requestDoc.title}</p>
              <p className="text-xs text-gray-500 mt-1">From: <strong>{requestDoc.name}</strong> ({requestDoc.id})</p>
            </div>
            <ModalField label="Request Note">
              <textarea rows={4} value={requestNote} onChange={e => setRequestNote(e.target.value)}
                placeholder="Add a message to the employee..."
                className={`${INPUT_CLS} resize-none`} />
            </ModalField>
            <ModalFooter
              onCancel={() => setRequestDoc(null)}
              onConfirm={() => setRequestDoc(null)}
              confirmLabel="Send Request"
            />
          </div>
        )}
      </Modal>

    </div>
  );
};

export default EmployeeDocuments;
