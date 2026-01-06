import React from 'react';
import { useContent } from '../context/ContentContext';

const Footer = () => {
    const { content } = useContent();
    const { contact } = content;

    return (
        <footer style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '3rem 0', marginTop: 'auto' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <h3>{content.header.title}</h3>
                        <p style={{ marginTop: '1rem', color: '#94a3b8' }}>Dedication to education and excellence.</p>
                    </div>
                    <div>
                        <h4>Contact</h4>
                        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>{contact.email}</p>
                        <p style={{ color: '#94a3b8' }}>{contact.phone}</p>
                        <p style={{ color: '#94a3b8' }}>{contact.address}</p>
                    </div>
                    <div>
                        <h4>Help</h4>
                        <ul style={{ listStyle: 'none', color: '#94a3b8', marginTop: '0.5rem' }}>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
