import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Header = () => {
    const { content } = useContent();
    return (
        <header style={{ backgroundColor: 'var(--surface)', padding: '1rem 0', boxShadow: 'var(--shadow-sm)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {content.header.title}
                </Link>
                <nav style={{ display: 'flex', gap: '2rem' }}>
                    <Link to="/">Home</Link>
                    <Link to="/institutes">Institutes</Link>
                    <Link to="/admission">Admission</Link>
                    <Link to="/admin/login" className="btn btn-secondary">Admin</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
