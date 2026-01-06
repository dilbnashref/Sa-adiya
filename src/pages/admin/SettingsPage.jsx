import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
    const { changePassword } = useAuth();
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("Passwords do not match!");
            return;
        }
        changePassword(passwords.new);
        setPasswords({ new: '', confirm: '' });
    };

    return (
        <div style={{ maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '2rem' }}>Settings</h2>
            <div className="card">
                <h3>Change Password</h3>
                <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>New Password</label>
                        <input
                            type="password" required
                            value={passwords.new}
                            onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm Password</label>
                        <input
                            type="password" required
                            value={passwords.confirm}
                            onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
