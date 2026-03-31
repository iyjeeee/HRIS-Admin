// leaveRequests.jsx — Admin Leave Requests approval page
// Approve/Reject buttons work (update status in state)
// View modal for each row
import React, { useState } from 'react';
import Modal, { InfoRow } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_REQUESTS = [
  { ref:'LV-2026-001', name:'Eva Smith',       type:'Vacation Leave', from:'March 10',    to:'March 11',    days:2, reason:'Family Vacation', filed:'March 1', status:'Pending',  approver:'' },
  { ref:'LV-2026-002', name:'Jordan Iraola',   type:'Sick Leave',     from:'February 24', to:'February 25', days:2, reason:'Fever Flu',       filed:'Feb 24',  status:'Approved', approver:'Juan Dela Cruz' },
  { ref:'LV-2026-003', name:'John Doe',        type:'Sick Leave',     from:'February 20', to:'February 21', days:2, reason:'Fever Flu',       filed:'Feb 20',  status:'Approved', approver:'Juan Dela Cruz' },
  { ref:'LV-2026-004', name:'Marshall Aquino', type:'Vacation Leave', from:'February 12', to:'February 14', days:3, reason:'Family Vacation', filed:'Feb 8',   status:'Approved', approver:'Juan Dela Cruz' },
  { ref:'LV-2026-005', name:'Ken Matris',      type:'Vacation Leave', from:'January 22',  to:'January 24',  days:2, reason:'Family Vacation', filed:'Feb 8',   status:'Rejected', approver:'Anna Patricia'  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = { Pending:'bg-yellow-400 text-black', Approved:'bg-green-500 text-white', Rejected:'bg-red-500 text-white' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const LeaveRequests = () => {
  const [requests, setRequests] = useState(INIT_REQUESTS);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter,   setTypeFilter]   = useState('All Type');
  const [monthFilter,  setMonthFilter]  = useState('March 2026');

  // View modal state
  const [viewItem, setViewItem] = useState(null);

  // Reject reason modal state
  const [rejectIdx, setRejectIdx] = useState(null);
  const [rejectNote, setRejectNote] = useState('');

  const filtered = requests.filter(r => {
    const matchStatus = statusFilter === 'All Status' || r.status === statusFilter;
    const matchType   = typeFilter   === 'All Type'   || r.type === typeFilter;
    return matchStatus && matchType;
  });

  // Approve handler — update status in state
  const handleApprove = (ref) => {
    setRequests(prev => prev.map(r =>
      r.ref === ref ? { ...r, status:'Approved', approver:'Super Admin' } : r
    ));
  };

  // Reject handler — update status in state
  const handleReject = () => {
    const ref = requests[rejectIdx]?.ref;
    setRequests(prev => prev.map(r =>
      r.ref === ref ? { ...r, status:'Rejected', approver:'Super Admin' } : r
    ));
    setRejectIdx(null);
    setRejectNote('');
  };

  const counts = {
    total:    requests.length,
    approved: requests.filter(r => r.status === 'Approved').length,
    pending:  requests.filter(r => r.status === 'Pending').length,
    rejected: requests.filter(r => r.status === 'Rejected').length,
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Leave Requests</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage and Approve employees leave requests.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">↑ Export</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Filed</p><p className="text-3xl font-black text-black mt-1">{counts.total}</p><p className="text-[11px] text-black/70">All requests</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Approved</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.approved}</p><p className="text-[11px] text-gray-400">Approved requests</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.pending}</p><p className="text-[11px] text-gray-400">Awaiting decision</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rejected</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.rejected}</p><p className="text-[11px] text-gray-400">All time</p></div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Leave Approval Requests</p>
          <div className="flex gap-2 flex-wrap">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Status','Pending','Approved','Rejected'].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Type','Vacation Leave','Sick Leave','Emergency Leave'].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={monthFilter} onChange={e => setMonthFilter(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              <option>March 2026</option><option>February 2026</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Ref No.','Employee','Leave Type','Date From','Date To','Days','Reason','Filed On','Status','Action'].map(h => <th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r, i) => (
                <tr key={r.ref} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">{r.ref}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{r.name}</td>
                  <td className="px-4 py-3"><span className="text-xs font-semibold text-blue-500">{r.type}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-600">{r.from}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{r.to}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{r.days}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{r.reason}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{r.filed}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    {r.status === 'Pending' ? (
                      /* Approve + Reject action buttons — fully functional */
                      <div className="flex gap-1">
                        <button onClick={() => handleApprove(r.ref)}
                          className="px-2.5 py-1 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold rounded cursor-pointer transition-colors">
                          Approve
                        </button>
                        <button onClick={() => { setRejectIdx(requests.findIndex(x => x.ref === r.ref)); setRejectNote(''); }}
                          className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded cursor-pointer transition-colors">
                          Reject
                        </button>
                      </div>
                    ) : (
                      /* View button for already-decided requests */
                      <button onClick={() => setViewItem(r)}
                        className="px-2.5 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold rounded cursor-pointer transition-colors">
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

      {/* ══ VIEW LEAVE REQUEST MODAL ══ */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Leave Request Details" maxWidth="max-w-md">
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Ref No."    value={viewItem.ref} />
              <InfoRow label="Employee"   value={viewItem.name} />
              <InfoRow label="Leave Type" value={viewItem.type} />
              <InfoRow label="Days"       value={String(viewItem.days)} />
              <InfoRow label="Date From"  value={viewItem.from} />
              <InfoRow label="Date To"    value={viewItem.to} />
              <InfoRow label="Reason"     value={viewItem.reason} />
              <InfoRow label="Filed On"   value={viewItem.filed} />
              <InfoRow label="Status"     value={viewItem.status} />
              <InfoRow label="Approver"   value={viewItem.approver || '—'} />
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

      {/* ══ REJECT REASON MODAL ══ */}
      <Modal open={rejectIdx !== null} onClose={() => setRejectIdx(null)} title="Reject Leave Request" maxWidth="max-w-sm">
        {rejectIdx !== null && (
          <div>
            <p className="text-sm text-gray-700 mb-1">Rejecting leave request for:</p>
            <p className="text-sm font-bold text-gray-900 mb-4">{requests[rejectIdx]?.name} — {requests[rejectIdx]?.ref}</p>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Reason for Rejection (optional)</label>
            <textarea rows={3} value={rejectNote} onChange={e => setRejectNote(e.target.value)}
              placeholder="Add a note for the employee..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none" />
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
              <button onClick={() => setRejectIdx(null)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                Cancel
              </button>
              <button onClick={handleReject}
                className="px-4 py-2 text-sm font-bold bg-red-500 hover:bg-red-600 text-white rounded-lg cursor-pointer transition-colors">
                Confirm Reject
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
export default LeaveRequests;
