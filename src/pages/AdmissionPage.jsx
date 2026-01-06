import React, { useState } from 'react';

const AdmissionPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        institute: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Enquiry submitted successfully! (This is a demo)');
        // In a real app, this would send data to backend
        setFormData({ name: '', email: '', phone: '', institute: '', message: '' });
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
            <div className="card">
                <h1 className="text-center" style={{ marginBottom: '2rem' }}>Admission Enquiry</h1>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Student Name</label>
                            <input
                                type="text" id="name" name="name" required
                                value={formData.name} onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
                            <input
                                type="tel" id="phone" name="phone" required
                                value={formData.phone} onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email" id="email" name="email" required
                            value={formData.email} onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="institute" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Institute</label>
                        <select
                            id="institute" name="institute" required
                            value={formData.institute} onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'white' }}
                        >
                            <option value="">-- Select an Institute --</option>
                            <option value="high-school">Sa'adiya High School</option>
                            <option value="college">Sa'adiya Arts & Science College</option>
                            <option value="primary">Sa'adiya Primary School</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message / Queries</label>
                        <textarea
                            id="message" name="message" rows="4"
                            value={formData.message} onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start', padding: '1rem 3rem' }}>
                        Submit Enquiry
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdmissionPage;
