import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) {
        navigate('/admin/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const isActive = (path) => location.pathname === path;

    const linkStyle = (path) => ({
        display: 'block',
        padding: '0.75rem 1rem',
        borderRadius: '6px',
        marginBottom: '0.5rem',
        backgroundColor: isActive(path) ? 'var(--primary-light)' : 'transparent',
        color: 'white',
        textDecoration: 'none'
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: 'var(--primary)', color: 'white', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'white' }}>Admin Portal</h2>
                <nav style={{ flex: 1 }}>
                    <Link to="/admin/dashboard" style={linkStyle('/admin/dashboard')}>Dashboard</Link>
                    <Link to="/admin/registers" style={linkStyle('/admin/registers')}>Registers (Staff/Student)</Link>
                    <Link to="/admin/cms" style={linkStyle('/admin/cms')}>Content Editor</Link>
                    <Link to="/admin/settings" style={linkStyle('/admin/settings')}>Settings</Link>
                </nav>
                <button onClick={handleLogout} className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', width: '100%', justifyContent: 'center' }}>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, backgroundColor: 'var(--background)', padding: '2rem', overflowY: 'auto' }}>
                <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '2rem' }}>Welcome, {user.username}</h1>
                    <Link to="/" target="_blank" className="btn btn-secondary">View Site</Link>
                </header>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', minHeight: '80%' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
