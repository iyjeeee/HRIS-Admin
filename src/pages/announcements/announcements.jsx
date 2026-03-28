// announcements.jsx — Admin Announcements management with quick post panel
import React, { useState } from 'react';

const ANNOUNCEMENTS = [
  { title:'Revised Attendance Policy-Effective March 2026', category:'Policy',  postedBy:'Hr Dept', date:'Mar 1, 2026',  status:'Published' },
  { title:'Company Teambuilding - March 15, 2026',          category:'Event',   postedBy:'Hr Dept', date:'Mar 1, 2026',  status:'Published' },
  { title:'New Payroll Cut-off Schedule for Q2',            category:'Payroll', postedBy:'Finance', date:'Feb 28, 2026', status:'Published' },
  { title:'Q1 HR Performance Review Schedule',              category:'Memo',    postedBy:'Hr Dept', date:'Feb 20, 2026', status:'Published' },
];

const CATEGORIES = ['Select Category','Policy','Event','Payroll','Memo','General'];
const AUDIENCES  = ['All Employees','IT Department','Finance','HR','Operations','Marketing'];

const Announcements = () => {
  const [form, setForm] = useState({ title:'', category:'Select Category', audience:'All Employees', body:'' });

  const handlePublish = () => { console.log('Publish:', form); setForm({ title:'', category:'Select Category', audience:'All Employees', body:'' }); };

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Announcements</h2>
          <p className="text-xs text-gray-400 mt-0.5">Post and manage company-wide or department-specific announcements.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg cursor-pointer transition-colors">
          + New Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Announcements table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">All Announcement</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  {['Title','Category','Posted By','Date','Status','Action'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ANNOUNCEMENTS.map((a,i)=>(
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{a.title}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{a.category}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{a.postedBy}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{a.date}</td>
                    <td className="px-4 py-3"><span className="px-2.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">{a.status}</span></td>
                    <td className="px-4 py-3"><button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Post panel */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quick Post</p>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Title</label>
              <input type="text" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}
                placeholder="Announcement title..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Category</label>
              <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 cursor-pointer">
                {CATEGORIES.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Audience</label>
              <select value={form.audience} onChange={e=>setForm({...form,audience:e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 cursor-pointer">
                {AUDIENCES.map(a=><option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Body</label>
              <textarea rows={4} value={form.body} onChange={e=>setForm({...form,body:e.target.value})}
                placeholder="Write your announcement..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none" />
            </div>
            <button onClick={handlePublish}
              className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg cursor-pointer transition-colors">
              Publish Announcement
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Announcements;
