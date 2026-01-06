import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import HomePage from '../HomePage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { fileToBase64 } from '../../utils/fileUtils';

const CmsPage = () => {
    const { content, updateContent, addItem, removeItem } = useContent();
    const [activeTab, setActiveTab] = useState('home'); // home, leadership, institutes, gallery, contact
    const [subSection, setSubSection] = useState('hero');

    // Local state for forms
    const [newFounder, setNewFounder] = useState({ name: '', role: '', image: '' });
    const [newInstitute, setNewInstitute] = useState({ name: '', link: '', image: '' });
    const [newImage, setNewImage] = useState('');

    // --- Handlers ---
    const handleHomeTextChange = (key, value) => {
        // For hero which is nested
        if (subSection === 'hero') {
            updateContent('home', 'hero', { ...content.home.hero, [key]: value });
        } else {
            updateContent('home', key, value);
        }
    };

    const handleContactChange = (key, value) => {
        updateContent('contact', key, value);
    };

    // Generic Image Upload Handler
    const handleFileUpload = async (e, callback) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                callback(base64);
            } catch (err) {
                console.error("Error converting file:", err);
                alert("Failed to upload image.");
            }
        }
    };

    const handleAddFounder = (e) => {
        e.preventDefault();
        addItem('home', 'founders', newFounder);
        setNewFounder({ name: '', role: '', image: '' });
    };

    const handleAddInstitute = (e) => {
        e.preventDefault();
        addItem('home', 'institutes', newInstitute);
        setNewInstitute({ name: '', link: '', image: '' });
    };

    const handleAddImage = (e) => {
        e.preventDefault();
        if (newImage) {
            // Gallery is simple array of strings in our context currently
            // But addItem expects object usually if logic is generic. 
            // Our context: gallery is array of strings. 
            // Let's check addItem implementation: assumes object { ...item, id: Date.now() }
            // We should probably just manually update array for gallery since it's strings.
            const newGallery = [...content.home.gallery, newImage];
            updateContent('home', 'gallery', newGallery);
            setNewImage('');
        }
    };

    const handleRemoveGallery = (index) => {
        const newGallery = content.home.gallery.filter((_, i) => i !== index);
        updateContent('home', 'gallery', newGallery);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) minmax(400px, 50%)', gap: '2rem', height: 'calc(100vh - 100px)' }}>
            {/* --- Editor Column --- */}
            <div style={{ overflowY: 'auto', paddingRight: '1rem', borderRight: '1px solid var(--border)' }}>
                <h2 style={{ marginBottom: '1rem' }}>CMS</h2>

                {/* Main Tabs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    {['home', 'leadership', 'institutes', 'gallery', 'contact'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="btn"
                            style={{
                                backgroundColor: activeTab === tab ? 'var(--primary)' : 'transparent',
                                color: activeTab === tab ? 'white' : 'var(--text-main)',
                                textTransform: 'capitalize',
                                border: '1px solid var(--border)'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* --- Home Tab --- */}
                {activeTab === 'home' && (
                    <div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <button className={`btn ${subSection === 'hero' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSubSection('hero')}>Hero</button>
                            <button className={`btn ${subSection === 'text' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSubSection('text')}>Texts</button>
                        </div>

                        {subSection === 'hero' && (
                            <div className="card">
                                <h3>Hero Section</h3>
                                <div className="mt-4">
                                    <label className="block mb-2">Title</label>
                                    <input className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} value={content.home.hero.title} onChange={e => handleHomeTextChange('title', e.target.value)} />
                                    <label className="block mb-2">Subtitle</label>
                                    <input className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} value={content.home.hero.subtitle} onChange={e => handleHomeTextChange('subtitle', e.target.value)} />
                                    <label className="block mb-2">Banner Image</label>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                        <input className="w-full p-2 border rounded" style={{ flex: 1 }} value={content.home.hero.bannerImage} onChange={e => handleHomeTextChange('bannerImage', e.target.value)} placeholder="Image URL" />
                                        <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                                            Upload
                                            <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, base64 => handleHomeTextChange('bannerImage', base64))} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {subSection === 'text' && (
                            <div className="card">
                                <h3>Mission & Vision</h3>
                                <div className="mt-4">
                                    <label className="block mb-2">Mission</label>
                                    <textarea rows="3" className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} value={content.home.mission} onChange={e => handleHomeTextChange('mission', e.target.value)} />
                                    <label className="block mb-2">Vision</label>
                                    <textarea rows="3" className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} value={content.home.vision} onChange={e => handleHomeTextChange('vision', e.target.value)} />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* --- Leadership Tab --- */}
                {activeTab === 'leadership' && (
                    <div>
                        <h3>Leadership</h3>
                        <div className="card mb-4">
                            <h4>Add New</h4>
                            <form onSubmit={handleAddFounder} className="mt-2">
                                <input placeholder="Name" className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} required value={newFounder.name} onChange={e => setNewFounder({ ...newFounder, name: e.target.value })} />
                                <input placeholder="Role" className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} required value={newFounder.role} onChange={e => setNewFounder({ ...newFounder, role: e.target.value })} />

                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <input placeholder="Image URL" className="w-full p-2 border rounded" style={{ flex: 1 }} required value={newFounder.image} onChange={e => setNewFounder({ ...newFounder, image: e.target.value })} />
                                    <label className="btn btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                        Upload
                                        <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, base64 => setNewFounder({ ...newFounder, image: base64 }))} />
                                    </label>
                                </div>

                                <button className="btn btn-primary">Add Person</button>
                            </form>
                        </div>
                        {content.home.founders.map(f => (
                            <div key={f.id} className="card mt-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={f.image} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} alt="" />
                                    <div>
                                        <strong>{f.name}</strong><br />
                                        <span style={{ fontSize: '0.8rem' }}>{f.role}</span>
                                    </div>
                                </div>
                                <button className="btn" style={{ color: 'red' }} onClick={() => removeItem('home', 'founders', f.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- Institutes Tab --- */}
                {activeTab === 'institutes' && (
                    <div>
                        <h3>Institutes</h3>
                        <div className="card mb-4">
                            <h4>Add New</h4>
                            <form onSubmit={handleAddInstitute} className="mt-2">
                                <input placeholder="Name" className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} required value={newInstitute.name} onChange={e => setNewInstitute({ ...newInstitute, name: e.target.value })} />
                                <input placeholder="Link (e.g., /institutes/xyz)" className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} required value={newInstitute.link} onChange={e => setNewInstitute({ ...newInstitute, link: e.target.value })} />

                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <input placeholder="Image/Logo URL (Optional)" className="w-full p-2 border rounded" style={{ flex: 1 }} value={newInstitute.image || ''} onChange={e => setNewInstitute({ ...newInstitute, image: e.target.value })} />
                                    <label className="btn btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                        Upload
                                        <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, base64 => setNewInstitute({ ...newInstitute, image: base64 }))} />
                                    </label>
                                </div>

                                <button className="btn btn-primary">Add Institute</button>
                            </form>
                        </div>
                        {content.home.institutes.map(i => (
                            <div key={i.id} className="card mt-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {i.image && <img src={i.image} alt="" style={{ width: 30, height: 30, objectFit: 'contain' }} />}
                                    <div>
                                        <strong>{i.name}</strong><br />
                                        <span style={{ fontSize: '0.8rem' }}>{i.link}</span>
                                    </div>
                                </div>
                                <button className="btn" style={{ color: 'red' }} onClick={() => removeItem('home', 'institutes', i.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- Gallery Tab --- */}
                {activeTab === 'gallery' && (
                    <div>
                        <h3>Photo Gallery</h3>
                        <div className="card mb-4">
                            <h4>Add Image</h4>
                            <form onSubmit={handleAddImage} className="mt-2">
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <input placeholder="Image URL" className="w-full p-2 border rounded" style={{ flex: 1 }} required value={newImage} onChange={e => setNewImage(e.target.value)} />
                                    <label className="btn btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                        Upload
                                        <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, base64 => setNewImage(base64))} />
                                    </label>
                                </div>
                                <button className="btn btn-primary">Add to Gallery</button>
                            </form>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                            {content.home.gallery.map((img, idx) => (
                                <div key={idx} style={{ position: 'relative' }}>
                                    <img src={img} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
                                    <button
                                        onClick={() => handleRemoveGallery(idx)}
                                        style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', width: '20px', height: '20px', border: 'none', cursor: 'pointer' }}>
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Contact Tab --- */}
                {activeTab === 'contact' && (
                    <div>
                        <h3>Contact Details</h3>
                        <div className="card">
                            <div className="mt-4">
                                <label className="block mb-2">Email</label>
                                <input className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} value={content.contact.email} onChange={e => handleContactChange('email', e.target.value)} />
                                <label className="block mb-2">Phone</label>
                                <input className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} value={content.contact.phone} onChange={e => handleContactChange('phone', e.target.value)} />
                                <label className="block mb-2">Address</label>
                                <textarea rows="3" className="w-full p-2 mb-2 border rounded" style={{ width: '100%' }} value={content.contact.address} onChange={e => handleContactChange('address', e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* --- Preview Column --- */}
            <div style={{ position: 'sticky', top: 0 }}>
                <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Live Preview</h3>
                <div style={{
                    border: '4px solid #333',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    height: '100%',
                    backgroundColor: 'white',
                    position: 'relative',
                    boxShadow: 'var(--shadow-xl)'
                }}>
                    {/* Scaled Preview */}
                    <div style={{
                        width: '1280px',
                        height: '100vh',
                        transform: 'scale(0.35)',
                        transformOrigin: 'top left',
                        pointerEvents: 'none',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Header />
                        <div style={{ flex: 1 }}>
                            <HomePage />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CmsPage;
