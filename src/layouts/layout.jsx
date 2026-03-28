// layout.jsx — Admin HRIS Layout: flat sidebar + top navbar, wraps all protected pages
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Building2, Briefcase,
  Fingerprint, FileText, Clock, CreditCard,
  CheckSquare, Megaphone, Calendar, Tag,
  DollarSign, Receipt, FileArchive, FolderCheck,
  BarChart2, ShieldCheck, AlignLeft, Bell,
  User, LogOut, Menu, X
} from 'lucide-react';

// ─── Page title map — path → display title in top navbar ─────────────────────
const PAGE_TITLES = {
  '/dashboard':          'Dashboard',
  '/employees':          'Employees',        // /employees now serves the Directory page
  '/departments':        'Departments',
  '/job-positions':      'Job Positions',
  '/attendance':         'Attendance',
  '/leave-requests':     'Leave Requests',
  '/overtime-requests':  'Overtime Requests',
  '/leave-credits':      'Leave Credits',
  '/tasks':              'Tasks',
  '/announcements':      'Announcements',
  '/calendar':           'Calendar',
  '/event-type':         'Event Types',
  '/payroll-periods':    'Payroll Periods',
  '/payslips':           'Payslips',
  '/employee-documents': 'Employee Documents',
  '/doc-requirements':   'Document Requirements',
  '/reports':            'Reports',
  '/role-permission':    'Roles & Permissions',
  '/audit-logs':         'Audit Logs',
  '/notifications':      'Notifications',
  '/profile':            'Profile',
};

const Layout = () => {
  const location    = useLocation();
  const headerTitle = PAGE_TITLES[location.pathname] || '';

  // Mobile sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Notification dropdown open/close state
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close notification dropdown on outside click
  useEffect(() => {
    if (!isNotificationOpen) return;
    const handler = () => setIsNotificationOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [isNotificationOpen]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">

      {/* ── Mobile overlay — dims content when sidebar is open ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══════════ SIDEBAR ═══════════
          Flat design — no expandable dropdowns.
          Matches admin-ui.pdf exactly:
            • Section labels (tiny caps)
            • Direct NavLink per item
            • Yellow active highlight
          Fixed position on mobile (slides in),
          static/always-visible on desktop (lg+).
      */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-56 bg-white flex flex-col h-full shrink-0 border-r border-gray-100
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Scrollable nav content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {/* ── Brand header ── */}
          <div className="px-4 pt-6 pb-3 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                {/* Yellow accent brand text */}
                <span className="text-yellow-400 font-black text-base tracking-tight">HRIS</span>
                <span className="font-black text-base tracking-tight text-gray-900">HS SYSTEM</span>
              </div>
              {/* Sub-label beneath brand */}
              <p className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase mt-0.5">Admin Portal</p>
            </div>
            {/* Close button — mobile only */}
            <button
              className="lg:hidden text-gray-400 hover:text-gray-700 cursor-pointer mt-0.5"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Nav groups ── */}
          <div className="px-3 pb-4">

            {/* MAIN */}
            <SectionLabel label="MAIN" />
            <nav className="space-y-0.5">
              <SidebarLink to="/dashboard" icon={<LayoutDashboard size={15} />} label="Dashboard" />
            </nav>

            {/* EMPLOYEE MANAGEMENT */}
            <SectionLabel label="EMPLOYEE MANAGEMENT" />
            <nav className="space-y-0.5">
              {/* /employees now renders the Directory (combined) page */}
              <SidebarLink to="/employees"     icon={<Users size={15} />}     label="Employees" />
              <SidebarLink to="/departments"   icon={<Building2 size={15} />} label="Departments" />
              <SidebarLink to="/job-positions" icon={<Briefcase size={15} />} label="Job Positions" />
            </nav>

            {/* ATTENDANCE & LEAVE */}
            <SectionLabel label="ATTENDANCE & LEAVE" />
            <nav className="space-y-0.5">
              <SidebarLink to="/attendance"        icon={<Fingerprint size={15} />} label="Attendance" />
              <SidebarLink to="/leave-requests"    icon={<FileText size={15} />}    label="Leave Requests" />
              <SidebarLink to="/overtime-requests" icon={<Clock size={15} />}       label="Overtime Requests" />
              <SidebarLink to="/leave-credits"     icon={<CreditCard size={15} />}  label="Leave Credits" />
            </nav>

            {/* TASKS & ANNOUNCEMENTS */}
            <SectionLabel label="TASKS & ANNOUNCEMENTS" />
            <nav className="space-y-0.5">
              <SidebarLink to="/tasks"         icon={<CheckSquare size={15} />} label="Tasks" />
              <SidebarLink to="/announcements" icon={<Megaphone size={15} />}   label="Announcements" />
            </nav>

            {/* CALENDAR & EVENTS */}
            <SectionLabel label="CALENDAR & EVENTS" />
            <nav className="space-y-0.5">
              <SidebarLink to="/calendar"   icon={<Calendar size={15} />} label="Calendar" />
              <SidebarLink to="/event-type" icon={<Tag size={15} />}      label="Event Type" />
            </nav>

            {/* PAYROLL */}
            <SectionLabel label="PAYROLL" />
            <nav className="space-y-0.5">
              <SidebarLink to="/payroll-periods" icon={<DollarSign size={15} />} label="Payroll Periods" />
              <SidebarLink to="/payslips"        icon={<Receipt size={15} />}    label="Payslips" />
            </nav>

            {/* DOCUMENTS */}
            <SectionLabel label="DOCUMENTS" />
            <nav className="space-y-0.5">
              <SidebarLink to="/employee-documents" icon={<FileArchive size={15} />} label="Employee Documents" />
              <SidebarLink to="/doc-requirements"   icon={<FolderCheck size={15} />} label="Doc Requirements" />
            </nav>

            {/* REPORTS */}
            <SectionLabel label="REPORTS" />
            <nav className="space-y-0.5">
              <SidebarLink to="/reports" icon={<BarChart2 size={15} />} label="Reports" />
            </nav>

            {/* SYSTEM */}
            <SectionLabel label="SYSTEM" />
            <nav className="space-y-0.5">
              <SidebarLink to="/role-permission" icon={<ShieldCheck size={15} />} label="Role Permission" />
              <SidebarLink to="/audit-logs"      icon={<AlignLeft size={15} />}   label="Audit Logs" />
              <SidebarLink to="/notifications"   icon={<Bell size={15} />}        label="Notifications" />
            </nav>

          </div>
        </div>

        {/* ── Sidebar footer — user info + profile/logout links ── */}
        <div className="border-t border-gray-100 bg-white shrink-0 p-2">
          {/* User identity row */}
          <div className="flex items-center gap-2.5 px-2 py-1.5 mb-1">
            {/* Avatar with initials */}
            <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-[10px] shrink-0">
              GM
            </div>
            <div className="min-w-0">
              <p className="font-bold text-xs leading-tight truncate">John Doe</p>
              <p className="text-[9px] text-gray-400 truncate">Project Management Head</p>
            </div>
            {/* Online presence indicator dot */}
            <div className="w-2 h-2 bg-green-500 rounded-full ml-auto shrink-0"></div>
          </div>

          <nav className="space-y-0.5 px-1">
            <SidebarLink to="/profile" icon={<User size={15} />}   label="Profile" />
            <SidebarLink to="/"        icon={<LogOut size={15} />}  label="Log Out" />
          </nav>
        </div>
      </aside>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">

        {/* ── Top navbar ── */}
        <header className="h-14 bg-white flex items-center justify-between px-4 lg:px-6 shrink-0 border-b border-gray-100 z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger toggle — mobile only */}
            <button
              className="lg:hidden text-gray-500 hover:text-black cursor-pointer p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            {/* Current page title */}
            <h1 className="text-base font-bold text-gray-800 tracking-tight">{headerTitle}</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Live clock — hidden on small screens */}
            <LiveClock />

            {/* Notification bell with dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setIsNotificationOpen(v => !v); }}
                className="text-gray-500 hover:text-black transition-colors relative cursor-pointer p-1"
              >
                <Bell size={20} />
                {/* Unread count indicator dot */}
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
              </button>

              {/* Notification dropdown panel */}
              {isNotificationOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-3.5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-sm text-gray-800">Notifications</h3>
                    <span className="text-[10px] bg-yellow-400 px-2 py-0.5 rounded-full font-bold">3 NEW</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    <NotifItem title="New Leave Request — John Doe (Vacation)"  time="10 min ago"  type="Leave" />
                    <NotifItem title="Overtime Approval Pending — 3 employees"  time="1 hour ago"  type="Overtime" />
                    <NotifItem title="Payroll Cutoff Reminder — March 31, 2026" time="3 hours ago" type="Payroll" />
                  </div>
                  <button className="w-full py-2.5 text-xs text-gray-500 hover:text-black hover:bg-gray-50 transition-colors font-medium border-t border-gray-100 cursor-pointer">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Page outlet — rendered page component fills this area ── */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ─── LiveClock — ticking date/time display ───────────────────────────────────
const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000); // tick every second
    return () => clearInterval(id);
  }, []);
  const date = time.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const t    = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  return (
    <div className="text-gray-500 text-xs hidden md:block">
      {date} <span className="font-bold text-black ml-1">{t}</span>
    </div>
  );
};

// ─── SectionLabel — small-caps group divider in the sidebar ──────────────────
const SectionLabel = ({ label }) => (
  <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase px-2 mt-4 mb-1 select-none">
    {label}
  </p>
);

// ─── SidebarLink — flat direct NavLink item (no expand/dropdown) ─────────────
const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors ${
        isActive
          ? 'bg-yellow-400 text-black font-bold'                            // active: yellow highlight
          : 'text-gray-600 hover:bg-gray-50 hover:text-black font-medium'  // idle: gray hover
      }`
    }
  >
    {icon}               {/* Nav item icon */}
    <span>{label}</span> {/* Nav item label */}
  </NavLink>
);

// ─── NotifItem — single item in the notification dropdown ────────────────────
const NotifItem = ({ title, time, type }) => (
  <div className="p-3.5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors group">
    <div className="flex items-center gap-2 mb-1">
      <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
        type === 'Leave'    ? 'bg-blue-100 text-blue-600'     :
        type === 'Overtime' ? 'bg-purple-100 text-purple-600' :
                              'bg-green-100 text-green-600'
      }`}>{type}</span>
      <span className="text-[10px] text-gray-400">{time}</span>
    </div>
    <p className="text-xs text-gray-700 leading-snug group-hover:text-black">{title}</p>
  </div>
);

export default Layout;
