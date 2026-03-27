// App.jsx — Root router for Admin HRIS System
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// PUBLIC PAGES
import Login          from './pages/login/login.jsx';
import ForgotPassword from './pages/login/forgotPassword.jsx';

// LAYOUT WRAPPER
import Layout from './layouts/layout.jsx';

// ADMIN PAGES
import Dashboard from './pages/dashboard/dashboard.jsx';
import Profile   from './pages/profile/profile.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/"                element={<Login />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Layout Routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile"   element={<Profile />} />
          {/* Additional admin routes can be added here */}
        </Route>

        {/* Fallback — redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
