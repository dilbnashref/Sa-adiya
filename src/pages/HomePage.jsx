import React from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { content } = useContent();
    const { home } = content;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem' }}>

            {/* Hero Section */}
            <section
                style={{
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${home.hero.bannerImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    padding: '8rem 1.5rem',
                    textAlign: 'center'
                }}
            >
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1.5rem' }}>{home.hero.title}</h1>
                    <p style={{ fontSize: '1.5rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>{home.hero.subtitle}</p>
                    <div style={{ marginTop: '2rem' }}>
                        <Link to="/admission" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>Apply for Admission</Link>
                    </div>
                </div>
            </section>

            <div className="container">
                {/* Mission & Vision */}
                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Our Mission</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{home.mission}</p>
                    </div>
                    <div className="card" style={{ borderTop: '4px solid var(--secondary)' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Our Vision</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{home.vision}</p>
                    </div>
                </section>

                {/* Founders */}
                <section style={{ marginTop: '4rem' }}>
                    <h2 className="text-center" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Leadership</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        {home.founders.map(founder => (
                            <div key={founder.id} className="text-center">
                                <div style={{ width: '200px', height: '200px', margin: '0 auto 1.5rem', overflow: 'hidden', borderRadius: '50%', border: '4px solid white', boxShadow: 'var(--shadow-lg)' }}>
                                    <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem' }}>{founder.name}</h3>
                                <p style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>{founder.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gallery */}
                <section style={{ marginTop: '4rem' }}>
                    <h2 className="text-center" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Photo Gallery</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {home.gallery.map((img, index) => (
                            <div key={index} style={{ borderRadius: '12px', overflow: 'hidden', height: '250px', boxShadow: 'var(--shadow-md)' }}>
                                <img src={img} alt={`Gallery ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                    onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Institutes */}
                <section style={{ marginTop: '4rem' }}>
                    <h2 className="text-center" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Our Institutes</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                        {home.institutes.map(inst => (
                            <Link key={inst.id} to={inst.link} className="btn" style={{ backgroundColor: 'white', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                {inst.name}
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
