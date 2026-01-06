import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

import { ContentProvider } from './context/ContentContext';

import AdmissionPage from './pages/AdmissionPage';

import { AuthProvider } from './context/AuthContext';
import { RegistryProvider } from './context/RegistryContext';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import RegistersPage from './pages/admin/RegistersPage';
import CmsPage from './pages/admin/CmsPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  return (
    <ContentProvider>
      <AuthProvider>
        <RegistryProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <main style={{ flex: 1 }}>
                    <HomePage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/admission" element={
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <main style={{ flex: 1 }}>
                    <AdmissionPage />
                  </main>
                  <Footer />
                </div>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="registers" element={<RegistersPage />} />
                <Route path="cms" element={<CmsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="*" element={<div className="container mt-4">Page Not Found</div>} />
            </Routes>
          </Router>
        </RegistryProvider>
      </AuthProvider>
    </ContentProvider>
  );
}

export default App;
