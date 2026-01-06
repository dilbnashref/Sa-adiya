import React, { createContext, useState, useContext, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

const defaultContent = {
    header: {
        title: "Sa'adiya Foundation",
        logoParams: { text: "SF" }
    },
    contact: {
        email: "info@saadiya.org",
        phone: "+91 987 654 3210",
        address: "Sa'adiya Campus, Knowledge City, India"
    },
    home: {
        hero: {
            title: "Welcome to Sa'adiya Foundation",
            subtitle: "Empowering generations through knowledge and integrity.",
            bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
        },
        mission: "To provide world-class education with a focus on moral values and academic excellence.",
        vision: "To be a beacon of light in the educational landscape, fostering leaders of tomorrow.",
        founders: [
            { id: 1, name: "Dr. A. Rahman", role: "Founder", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop" },
            { id: 2, name: "Mrs. F. Begum", role: "Co-Founder", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&auto=format&fit=crop"
        ],
        institutes: [
            { id: 1, name: "Sa'adiya High School", link: "/institutes/high-school" },
            { id: 2, name: "Sa'adiya Arts & Science College", link: "/institutes/college" },
            { id: 3, name: "Sa'adiya Primary School", link: "/institutes/primary" }
        ]
    }
};

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(() => {
        const saved = localStorage.getItem('siteContent');
        return saved ? JSON.parse(saved) : defaultContent;
    });

    useEffect(() => {
        localStorage.setItem('siteContent', JSON.stringify(content));
    }, [content]);

    const updateContent = (section, key, value) => {
        setContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const addItem = (section, listKey, item) => {
        setContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [listKey]: [...prev[section][listKey], { ...item, id: Date.now() }] // Ensure ID
            }
        }));
    };

    // For simple arrays like gallery strings, we might handle them differently or wrap them in objects. 
    // For now let's assume gallery uses object or we handle string array specially. 
    // Actually, keeping gallery as strings is fine, but ID matching won't work.
    // Let's assume for gallery we pass the index or value to remove.
    const removeItem = (section, listKey, id) => {
        setContent(prev => {
            const list = prev[section][listKey];
            // Check if list contents are objects with ID or simple strings
            const isObject = typeof list[0] === 'object';
            const newList = isObject
                ? list.filter(item => item.id !== id)
                : list.filter((_, index) => index !== id); // If string, assume id is index

            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [listKey]: newList
                }
            };
        });
    };

    return (
        <ContentContext.Provider value={{ content, updateContent, addItem, removeItem }}>
            {children}
        </ContentContext.Provider>
    );
};
