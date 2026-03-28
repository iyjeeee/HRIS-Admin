// App.jsx — Root router for Admin HRIS System
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// PUBLIC PAGES
import Login          from './pages/login/login.jsx';
import ForgotPassword from './pages/login/forgotPassword.jsx';

// LAYOUT WRAPPER
import Layout from './layouts/layout.jsx';

// MAIN
import Dashboard from './pages/dashboard/dashboard.jsx';

// EMPLOYEE MANAGEMENT
// /employees now uses Directory (combined employees + directory view)
import Directory   from './pages/directory/directory.jsx';
import Departments  from './pages/departments/departments.jsx';
import JobPositions from './pages/jobPositions/jobPositions.jsx';

// ATTENDANCE & LEAVE
import Attendance       from './pages/attendance/attendance.jsx';
import LeaveRequests    from './pages/leaveRequests/leaveRequests.jsx';
import OvertimeRequests from './pages/overtimeRequests/overtimeRequests.jsx';
import LeaveCredits     from './pages/leaveCredits/leaveCredits.jsx';

// TASKS & ANNOUNCEMENTS
import Tasks         from './pages/tasks/tasks.jsx';
import Announcements from './pages/announcements/announcements.jsx';

// CALENDAR & EVENTS
import Calendar  from './pages/calendar/calendar.jsx';
import EventType from './pages/eventType/eventType.jsx';

// PAYROLL
import PayrollPeriods from './pages/payrollPeriods/payrollPeriods.jsx';
import Payslips       from './pages/payslips/payslips.jsx';

// DOCUMENTS
import EmployeeDocuments from './pages/employeeDocuments/employeeDocuments.jsx';
import DocRequirements   from './pages/docRequirements/docRequirements.jsx';

// REPORTS
import Reports from './pages/reports/reports.jsx';

// SYSTEM
import RolePermission from './pages/rolePermission/rolePermission.jsx';
import AuditLogs      from './pages/auditLogs/auditLogs.jsx';
import Notifications  from './pages/notifications/notifications.jsx';

// PROFILE
import Profile from './pages/profile/profile.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/"                element={<Login />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes — wrapped in Layout (sidebar + top navbar) */}
        <Route element={<Layout />}>

          {/* Main */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Employee Management */}
          {/* /employees renders Directory — the old employees.jsx is replaced */}
          <Route path="/employees"     element={<Directory />} />
          <Route path="/departments"   element={<Departments />} />
          <Route path="/job-positions" element={<JobPositions />} />

          {/* Attendance & Leave */}
          <Route path="/attendance"        element={<Attendance />} />
          <Route path="/leave-requests"    element={<LeaveRequests />} />
          <Route path="/overtime-requests" element={<OvertimeRequests />} />
          <Route path="/leave-credits"     element={<LeaveCredits />} />

          {/* Tasks & Announcements */}
          <Route path="/tasks"         element={<Tasks />} />
          <Route path="/announcements" element={<Announcements />} />

          {/* Calendar & Events */}
          <Route path="/calendar"   element={<Calendar />} />
          <Route path="/event-type" element={<EventType />} />

          {/* Payroll */}
          <Route path="/payroll-periods" element={<PayrollPeriods />} />
          <Route path="/payslips"        element={<Payslips />} />

          {/* Documents */}
          <Route path="/employee-documents" element={<EmployeeDocuments />} />
          <Route path="/doc-requirements"   element={<DocRequirements />} />

          {/* Reports */}
          <Route path="/reports" element={<Reports />} />

          {/* System */}
          <Route path="/role-permission" element={<RolePermission />} />
          <Route path="/audit-logs"      element={<AuditLogs />} />
          <Route path="/notifications"   element={<Notifications />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

        </Route>

        {/* Fallback — redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
