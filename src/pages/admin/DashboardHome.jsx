import React from 'react';
import { useRegistry } from '../../context/RegistryContext';

const DashboardHome = () => {
    const { students, staff } = useRegistry();

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Dashboard Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ borderLeft: '5px solid var(--primary)' }}>
                    <h3>Total Students</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>{students.length}</p>
                </div>
                <div className="card" style={{ borderLeft: '5px solid var(--secondary)' }}>
                    <h3>Total Staff</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>{staff.length}</p>
                </div>
                <div className="card" style={{ borderLeft: '5px solid var(--accent)' }}>
                    <h3>Pending Enquiries</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>3</p> {/* Mock data */}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
