import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'udlp_sessions';

export const saveSession = (sessionData) => {
    const sessions = getSessions();
    const existingIndex = sessions.findIndex(s => s.id === sessionData.id);

    const sessionToSave = {
        ...sessionData,
        lastModified: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
        sessions[existingIndex] = sessionToSave;
    } else {
        sessions.push(sessionToSave);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    return sessionToSave;
};

export const getSessions = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const getSessionById = (id) => {
    const sessions = getSessions();
    return sessions.find(s => s.id === id);
};

export const getSessionsByStudent = (studentId) => {
    const sessions = getSessions();
    return sessions.filter(s => s.studentId === studentId);
};

export const createNewSession = (studentId, studentName) => {
    return {
        id: uuidv4(),
        studentId,
        studentName,
        content: '',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        analysis: null,
        aiReport: null
    };
};
