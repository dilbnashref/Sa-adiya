import React, { useState } from 'react';
import { useRegistry } from '../../context/RegistryContext';

const RegistersPage = () => {
    const { students, staff, addStudent, removeStudent, addStaff, removeStaff } = useRegistry();
    const [activeTab, setActiveTab] = useState('students');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setShowForm(false);
        setFormData({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'students') {
            addStudent({ ...formData, course: formData.course || 'N/A' });
        } else {
            addStaff({ ...formData, role: formData.role || 'Staff' });
        }
        setShowForm(false);
        setFormData({});
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <button
                    onClick={() => handleTabChange('students')}
                    style={{ padding: '1rem', borderBottom: activeTab === 'students' ? '2px solid var(--primary)' : 'none', fontWeight: activeTab === 'students' ? 'bold' : 'normal' }}
                >
                    Students Register
                </button>
                <button
                    onClick={() => handleTabChange('staff')}
                    style={{ padding: '1rem', borderBottom: activeTab === 'staff' ? '2px solid var(--primary)' : 'none', fontWeight: activeTab === 'staff' ? 'bold' : 'normal' }}
                >
                    Staff Register
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>{activeTab === 'students' ? 'Student List' : 'Staff List'}</h2>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--background)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input
                            placeholder="Name" required
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ padding: '0.5rem', borderRadius: '4px' }}
                        />
                        {activeTab === 'students' ? (
                            <>
                                <input
                                    placeholder="Roll No" required
                                    onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                                    style={{ padding: '0.5rem', borderRadius: '4px' }}
                                />
                                <input
                                    placeholder="Course"
                                    onChange={e => setFormData({ ...formData, course: e.target.value })}
                                    style={{ padding: '0.5rem', borderRadius: '4px' }}
                                />
                            </>
                        ) : (
                            <>
                                <input
                                    placeholder="Role" required
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    style={{ padding: '0.5rem', borderRadius: '4px' }}
                                />
                                <input
                                    placeholder="Department"
                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                    style={{ padding: '0.5rem', borderRadius: '4px' }}
                                />
                            </>
                        )}
                    </div>
                    <button type="submit" className="btn btn-secondary mt-2">Save</button>
                </form>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                        <th style={{ padding: '1rem' }}>ID</th>
                        <th style={{ padding: '1rem' }}>Name</th>
                        <th style={{ padding: '1rem' }}>{activeTab === 'students' ? 'Roll No' : 'Role'}</th>
                        <th style={{ padding: '1rem' }}>{activeTab === 'students' ? 'Course' : 'Department'}</th>
                        <th style={{ padding: '1rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(activeTab === 'students' ? students : staff).map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '1rem' }}>{item.id}</td>
                            <td style={{ padding: '1rem' }}>{item.name}</td>
                            <td style={{ padding: '1rem' }}>{activeTab === 'students' ? item.rollNo : item.role}</td>
                            <td style={{ padding: '1rem' }}>{activeTab === 'students' ? item.course : item.department}</td>
                            <td style={{ padding: '1rem' }}>
                                <button
                                    onClick={() => activeTab === 'students' ? removeStudent(item.id) : removeStaff(item.id)}
                                    style={{ color: 'red' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistersPage;
