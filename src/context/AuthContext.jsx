import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { id, name, role: 'student' | 'professor' }
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        // Try to load user from local storage on mount
        const savedUser = localStorage.getItem('udlp_user');
        if (savedUser) setUser(JSON.parse(savedUser));

        // Load API Key from Environment Variable
        const envKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (envKey) {
            setApiKey(envKey);
        }
    }, []);

    const login = (name, role) => {
        const newUser = {
            id: uuidv4(),
            name,
            role
        };
        setUser(newUser);
        localStorage.setItem('udlp_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('udlp_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, apiKey }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
