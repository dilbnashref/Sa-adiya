import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username, password) => {
        // Mock authentication
        if (username === 'admin' && password === 'admin123') {
            const userData = { username: 'admin', role: 'admin' };
            setUser(userData);
            localStorage.setItem('adminUser', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('adminUser');
    };

    const changePassword = (newPassword) => {
        // Mock password change - in real app this would call API
        console.log("Password changed to:", newPassword);
        alert("Password changed successfully (Mock)");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
