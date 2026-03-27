// layout.jsx — Admin HRIS Layout: sidebar + top navbar, wraps all protected pages
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Fingerprint, Clock,
  FileText, FileBarChart, Settings, User,
  LogOut, Bell, ShieldCheck, ChevronDown,
  CreditCard, Building2
} from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  // Map paths to readable page titles shown in navbar
  const PAGE_TITLES = {
    '/dashboard':   'Dashboard',
    '/employees':   'Employee Management',
    '/attendance':  'Attendance Management',
    '/overtime':    'Overtime Management',
    '/leave':       'Leave Management',
    '/payroll':     'Payroll',
    '/reports':     'Reports',
    '/departments': 'Departments',
    '/settings':    'Settings',
    '/profile':     'My Profile',
  };
  const headerTitle = PAGE_TITLES[location.pathname] || '';

  // Notification panel open/close state
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // HR Management expandable group — auto-open if on a sub-route
  const mgmtRoutes = ['/employees', '/attendance', '/overtime', '/leave'];
  const [mgmtExpanded, setMgmtExpanded] = useState(
    mgmtRoutes.includes(location.pathname)
  );

  // Keep expanded when navigating inside management sub-routes
  useEffect(() => {
    if (mgmtRoutes.includes(location.pathname)) setMgmtExpanded(true);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">

      {/* ═══════════════════ SIDEBAR ═══════════════════ */}
      <div className="w-64 bg-white flex flex-col h-full shrink-0 border-r border-gray-100">
        <div className="flex-1 overflow-y-auto">

          {/* Brand / Logo area */}
          <div className="flex items-center gap-2 px-4 pt-8 pb-4">
            {/* Yellow shield icon — differentiates admin from employee portal */}
            <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center shrink-0">
              <ShieldCheck size={16} className="text-black" />
            </div>
            <div className="leading-tight">
              {/* System name */}
              <p className="font-bold text-sm tracking-tight leading-none">HRIS SYSTEM</p>
              {/* Admin portal sub-label */}
              <p className="text-[9px] text-yellow-500 font-bold tracking-widest uppercase">Admin Portal</p>
            </div>
          </div>

          <div className="px-4">

            {/* Section label: MAIN */}
            <p className="text-[10px] text-gray-400 font-bold mb-2 ml-2 tracking-wider pt-6">MAIN</p>
            <nav className="space-y-1.5">

              {/* Dashboard nav link */}
              <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />

              {/* Expandable HR Management group */}
              <div>
                <button
                  onClick={() => setMgmtExpanded(v => !v)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-colors cursor-pointer ${
                    mgmtRoutes.includes(location.pathname)
                      ? 'bg-yellow-400 text-black font-bold shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black font-medium'
                  }`}
                >
                  <Users size={20} className="shrink-0" />
                  <span className="flex-1 text-left text-[14px]">HR Management</span>
                  {/* Chevron flips when expanded */}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mgmtExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Sub-links shown when group is expanded */}
                {mgmtExpanded && (
                  <div className="ml-8 mt-1.5 mb-2 space-y-1 border-l-2 border-gray-100 pl-2">
                    <SubNavLink to="/employees"  label="Employees" />
                    <SubNavLink to="/attendance" label="Attendance" />
                    <SubNavLink to="/overtime"   label="Overtime" />
                    <SubNavLink to="/leave"      label="Leave" />
                  </div>
                )}
              </div>

              {/* Payroll nav link */}
              <SidebarLink to="/payroll"     icon={<CreditCard size={20} />}   label="Payroll" />
              {/* Reports nav link */}
              <SidebarLink to="/reports"     icon={<FileBarChart size={20} />} label="Reports" />
              {/* Departments nav link */}
              <SidebarLink to="/departments" icon={<Building2 size={20} />}    label="Departments" />
            </nav>

            {/* Section label: ADMIN */}
            <p className="text-[10px] text-gray-400 font-bold mt-5 mb-2 ml-2 tracking-wider">ADMIN</p>
            <nav className="space-y-1.5">
              {/* Settings nav link */}
              <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" />
            </nav>

          </div>
        </div>

        {/* ── Sidebar Footer — current admin user info ── */}
        <div className="p-2 border-t border-gray-200 bg-white shrink-0">
          <div className="flex items-center gap-3 mb-1 px-2 pt-1">
            {/* Admin avatar with initials */}
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-yellow-400 font-bold text-xs shrink-0">
              AD
            </div>
            <div className="min-w-0">
              {/* Admin name */}
              <p className="font-bold text-xs leading-tight truncate">Admin User</p>
              {/* Admin role — yellow to stand out from employee's gray */}
              <p className="text-[9px] text-yellow-500 font-bold uppercase tracking-wider">System Administrator</p>
            </div>
            {/* Online indicator dot */}
            <div className="w-2 h-2 bg-green-500 rounded-full ml-auto shrink-0"></div>
          </div>
          <nav className="space-y-0.5 px-2 pb-1">
            {/* Profile link */}
            <SidebarLink to="/profile" icon={<User size={20} />}  label="My Profile" />
            {/* Logout — goes back to login */}
            <SidebarLink to="/"        icon={<LogOut size={20} />} label="Log Out" />
          </nav>
        </div>
      </div>

      {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">

        {/* ── Top Navbar ── */}
        <header className="h-16 bg-white flex items-center justify-between px-8 shrink-0 relative z-40 border-b border-gray-100">
          {/* Dynamic page title */}
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">{headerTitle}</h1>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Live clock — hidden on small screens */}
            <LiveClock />

            {/* Administrator role badge — visible sm and up */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
              <ShieldCheck size={13} className="text-yellow-600" />
              <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider">Administrator</span>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="text-gray-600 hover:text-black transition-colors relative cursor-pointer p-1"
              >
                <Bell size={22} />
                {/* Red unread dot */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              {/* Notification dropdown panel */}
              {isNotificationOpen && (
                <>
                  {/* Click-outside backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setIsNotificationOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                    {/* Panel header */}
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-sm text-gray-800 tracking-tight">Notifications</h3>
                      <span className="text-[10px] bg-yellow-400 px-2 py-0.5 rounded-full font-bold">3 NEW</span>
                    </div>
                    {/* Notification items */}
                    <div className="max-h-[350px] overflow-y-auto">
                      <NotificationItem title="New Leave Request — John Doe (Vacation)"  time="10 min ago"  type="Leave" />
                      <NotificationItem title="Overtime Approval Pending — 3 employees"  time="1 hour ago"  type="Overtime" />
                      <NotificationItem title="Payroll Cutoff Reminder — March 31, 2026" time="3 hours ago" type="Payroll" />
                    </div>
                    {/* View all button */}
                    <button className="w-full py-3 text-xs text-gray-500 hover:text-black hover:bg-gray-50 transition-colors font-medium border-t border-gray-100 cursor-pointer">
                      View all notifications
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content — renders matched child route via Outlet */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

// ─── HELPER: Live updating clock ────────────────────────────────────────────
const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000); // update every second
    return () => clearInterval(id); // clear on unmount
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <div className="text-gray-500 text-sm hidden md:block">
      {formattedDate}
      <span className="font-bold text-black ml-2">{formattedTime}</span>
    </div>
  );
};

// ─── HELPER: Primary sidebar NavLink (yellow active state) ───────────────────
const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-colors ${
        isActive
          ? 'bg-yellow-400 text-black font-bold shadow-sm'
          : 'text-gray-600 hover:bg-gray-50 hover:text-black font-medium'
      }`
    }
  >
    {icon}
    <span className="text-[14px]">{label}</span>
  </NavLink>
);

// ─── HELPER: Sub-nav link inside expandable groups ───────────────────────────
const SubNavLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block text-[13px] py-1.5 px-3 rounded-lg transition-colors ${
        isActive
          ? 'text-black font-bold bg-yellow-100'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
      }`
    }
  >
    {label}
  </NavLink>
);

// ─── HELPER: Single row in notification dropdown ─────────────────────────────
const NotificationItem = ({ title, time, type }) => (
  <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors group">
    <div className="flex items-center gap-2 mb-1">
      {/* Colour-coded type badge */}
      <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
        type === 'Leave'    ? 'bg-blue-100 text-blue-600'     :
        type === 'Overtime' ? 'bg-purple-100 text-purple-600' :
                              'bg-green-100 text-green-600'
      }`}>{type}</span>
      <span className="text-[10px] text-gray-400 group-hover:text-gray-500">{time}</span>
    </div>
    <p className="text-sm text-gray-700 leading-snug group-hover:text-black transition-colors">{title}</p>
  </div>
);

export default Layout;
