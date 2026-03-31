// overtimeRequests.jsx — Admin Overtime Requests approval page
// Approve/Reject buttons work (update status in state)
// View modal for each row
import React, { useState } from 'react';
import Modal, { InfoRow } from '../../components/modal.jsx';

// ─── Static data ──────────────────────────────────────────────────────────────
const INIT_REQUESTS = [
  { ref:'OT-2026-001', name:'John Doe',       date:'Mar 1',  start:'5:00 PM', end:'7:00 PM',  hours:'2h 0m',  reason:'Urgent Deployment',              filed:'Mar 1',  status:'Approved', approver:'Juan Dela Cruz' },
  { ref:'OT-2026-002', name:'Juan Dela Cruz', date:'Feb 26', start:'5:00 PM', end:'8:30 PM',  hours:'3h 0m',  reason:'Sprint Deadline',                filed:'Feb 26', status:'Approved', approver:'Juan Dela Cruz' },
  { ref:'OT-2026-003', name:'Ken Aquino',     date:'Feb 25', start:'5:00 PM', end:'10:00 PM', hours:'5h 0m',  reason:'Sprint Deadline',                filed:'Feb 25', status:'Pending',  approver:'' },
  { ref:'OT-2026-004', name:'Eva Smith',      date:'Feb 24', start:'5:00 PM', end:'6:30 PM',  hours:'1h 30m', reason:'Development Bug Fixing',         filed:'Feb 24', status:'Pending',  approver:'' },
  { ref:'OT-2026-005', name:'Chris Staples',  date:'Feb 20', start:'5:00 PM', end:'7:30 PM',  hours:'2h 30m', reason:'Deploying System Updates',       filed:'Feb 20', status:'Approved', approver:'Anna Patricia'  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = { Pending:'bg-yellow-400 text-black', Approved:'bg-green-500 text-white', Rejected:'bg-red-500 text-white' };
  return <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${map[status]??'bg-gray-200 text-gray-600'}`}>{status}</span>;
};

const OvertimeRequests = () => {
  const [requests, setRequests] = useState(INIT_REQUESTS);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [monthFilter,  setMonthFilter]  = useState('March 2026');

  // View modal state
  const [viewItem, setViewItem] = useState(null);

  // Reject reason modal state
  const [rejectIdx, setRejectIdx] = useState(null);
  const [rejectNote, setRejectNote] = useState('');

  const filtered = requests.filter(r => statusFilter === 'All Status' || r.status === statusFilter);

  // Approve handler — update status in state
  const handleApprove = (ref) => {
    setRequests(prev => prev.map(r =>
      r.ref === ref ? { ...r, status: 'Approved', approver: 'Super Admin' } : r
    ));
  };

  // Reject handler — update status in state
  const handleReject = () => {
    const ref = requests[rejectIdx]?.ref;
    setRequests(prev => prev.map(r =>
      r.ref === ref ? { ...r, status: 'Rejected', approver: 'Super Admin' } : r
    ));
    setRejectIdx(null);
    setRejectNote('');
  };

  // Derived counts for stat cards
  const counts = {
    total:         requests.length,
    approvedHours: requests.filter(r => r.status === 'Approved').reduce((acc, r) => {
                     const [h] = r.hours.split('h'); return acc + parseInt(h, 10);
                   }, 0),
    pending:  requests.filter(r => r.status === 'Pending').length,
    rejected: requests.filter(r => r.status === 'Rejected').length,
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Overtime Requests</h2>
          <p className="text-xs text-gray-400 mt-0.5">Review and Approve employee overtime filings.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          ↑ Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-yellow-400 rounded-xl p-4"><p className="text-[10px] font-bold text-black/60 uppercase tracking-wider">Total Filed</p><p className="text-3xl font-black text-black mt-1">{counts.total}</p><p className="text-[11px] text-black/70">All Time</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Approved Hours</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.approvedHours}h</p><p className="text-[11px] text-gray-400">All Approved OT</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.pending}</p><p className="text-[11px] text-gray-400">Awaiting Approval</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rejected</p><p className="text-3xl font-black text-gray-900 mt-1">{counts.rejected}</p><p className="text-[11px] text-gray-400">All Time</p></div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Overtime Requests Log</p>
          <div className="flex gap-2">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              {['All Status','Pending','Approved','Rejected'].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={monthFilter} onChange={e => setMonthFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer">
              <option>March 2026</option><option>February 2026</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                {['Ref No.','Employee','Date','OT Start','OT End','Total Hours','Reason','Filed On','Status','Action'].map(h => (
                  <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr key={r.ref} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-orange-500 font-mono font-semibold">{r.ref}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{r.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{r.date}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{r.start}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{r.end}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-700">{r.hours}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[160px]">{r.reason}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{r.filed}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    {r.status === 'Pending' ? (
                      /* Approve + Reject — fully functional */
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
                      /* View button for decided requests */
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

      {/* ══ VIEW OT REQUEST MODAL ══ */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Overtime Request Details" maxWidth="max-w-md">
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Ref No."      value={viewItem.ref} />
              <InfoRow label="Employee"     value={viewItem.name} />
              <InfoRow label="Date"         value={viewItem.date} />
              <InfoRow label="Total Hours"  value={viewItem.hours} />
              <InfoRow label="OT Start"     value={viewItem.start} />
              <InfoRow label="OT End"       value={viewItem.end} />
              <InfoRow label="Reason"       value={viewItem.reason} />
              <InfoRow label="Filed On"     value={viewItem.filed} />
              <InfoRow label="Status"       value={viewItem.status} />
              <InfoRow label="Approver"     value={viewItem.approver || '—'} />
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
      <Modal open={rejectIdx !== null} onClose={() => setRejectIdx(null)} title="Reject Overtime Request" maxWidth="max-w-sm">
        {rejectIdx !== null && (
          <div>
            <p className="text-sm text-gray-700 mb-1">Rejecting overtime request for:</p>
            <p className="text-sm font-bold text-gray-900 mb-4">
              {requests[rejectIdx]?.name} — {requests[rejectIdx]?.ref}
            </p>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              Reason for Rejection (optional)
            </label>
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
export default OvertimeRequests;
