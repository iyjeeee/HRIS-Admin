// calendar.jsx — Company Calendar: events, holidays, upcoming dates
import React, { useState } from 'react';

// Build a simple month calendar grid
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const EVENTS = [
  { day:8,  type:'holiday',  label:"International Women's Day" },
  { day:15, type:'company',  label:'Company Teambuilding' },
  { day:20, type:'payroll',  label:'Payroll Cutoff' },
  { day:28, type:'event',    label:'Work Day' },
];

const TYPE_COLOR = { holiday:'bg-yellow-400', company:'bg-green-400', payroll:'bg-blue-400', event:'bg-gray-300' };

const Calendar = () => {
  const [year]  = useState(2026);
  const [month] = useState(2); // 0-indexed: 2 = March

  const daysInMonth   = getDaysInMonth(year, month);
  const firstDay      = getFirstDayOfMonth(year, month);
  const monthName     = new Date(year, month).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const days          = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks        = Array.from({ length: firstDay });

  const eventMap = {};
  EVENTS.forEach(e => { eventMap[e.day] = e; });

  return (
    <div className="space-y-5 pb-8">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Calendar</h2>
        <p className="text-xs text-gray-400 mt-0.5">Company events, holidays, and important dates — visible to all employees.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Calendar grid */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Month header with legend */}
          <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <button className="text-gray-500 hover:text-black text-sm cursor-pointer">◀</button>
              <p className="font-bold text-sm text-gray-800">{monthName}</p>
              <button className="text-gray-500 hover:text-black text-sm cursor-pointer">▶</button>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-semibold text-gray-500">
              {[['Holiday','bg-yellow-400'],['Company Events','bg-green-400'],['Payroll','bg-blue-400']].map(([l,c])=>(
                <span key={l} className="flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-sm ${c}`}></span>{l}</span>
              ))}
            </div>
          </div>

          <div className="p-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d=>(
                <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
              ))}
            </div>
            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {blanks.map((_,i)=><div key={`b${i}`}/>)}
              {days.map(d=>{
                const ev = eventMap[d];
                return (
                  <div key={d} className={`relative min-h-[40px] rounded-lg p-1.5 text-center cursor-default ${ev ? TYPE_COLOR[ev.type]+'/20 border border-current/20' : 'hover:bg-gray-50'}`}>
                    <p className={`text-xs font-bold ${ev ? 'text-gray-900' : 'text-gray-600'}`}>{d}</p>
                    {ev && <div className={`mt-0.5 w-full h-0.5 rounded ${TYPE_COLOR[ev.type]}`}/>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming events */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="font-bold text-sm text-gray-800">Upcoming Events</p>
          </div>
          <div className="p-4 space-y-3">
            {EVENTS.map((ev,i)=>(
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border-l-4 ${ev.type==='holiday'?'border-yellow-400 bg-yellow-50':ev.type==='company'?'border-green-400 bg-green-50':ev.type==='payroll'?'border-blue-400 bg-blue-50':'border-gray-300 bg-gray-50'}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${TYPE_COLOR[ev.type]} text-white`}>{ev.day}</div>
                <div>
                  <p className="text-xs font-bold text-gray-800">{ev.label}</p>
                  <p className="text-[10px] text-gray-400 capitalize">{ev.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calendar;
