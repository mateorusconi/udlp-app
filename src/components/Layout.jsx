import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor';
import { analyzeText } from '../utils/textAnalysis';
import { useAuth } from '../context/AuthContext';
import { createNewSession, saveSession } from '../services/storage';
import { generateReports } from '../services/ai';

const Layout = () => {
    const { user, logout, apiKey } = useAuth();
    const [content, setContent] = useState('');
    const [analysis, setAnalysis] = useState({ wordCount: 0, suggestions: [] });
    const [sessionId, setSessionId] = useState(null);
    const [lastSaved, setLastSaved] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiReport, setAiReport] = useState(null);
    const [error, setError] = useState(null);

    // Initialize session
    useEffect(() => {
        if (user && !sessionId) {
            const newSession = createNewSession(user.id, user.name);
            setSessionId(newSession.id);
        }
    }, [user, sessionId]);

    useEffect(() => {
        setAnalysis(analyzeText(content));
    }, [content]);

    const handleSave = useCallback((report = null) => {
        if (sessionId && user) {
            saveSession({
                id: sessionId,
                studentId: user.id,
                studentName: user.name,
                content,
                analysis,
                aiReport: report || aiReport
            });
            setLastSaved(new Date());
        }
    }, [sessionId, user, content, analysis, aiReport]);

    // Auto-save
    useEffect(() => {
        const interval = setInterval(() => {
            handleSave();
        }, 30000);
        return () => clearInterval(interval);
    }, [handleSave]);

    const handleFinish = async () => {
        if (!apiKey) {
            setError("Se requiere una API Key de Gemini para finalizar.");
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            const reports = await generateReports(apiKey, user.name, content);
            setAiReport(reports);
            handleSave(reports); // Save immediately with reports
        } catch (err) {
            console.error(err);

            // Try to get available models to show to user
            let modelInfo = "";
            try {
                const { getAvailableModels } = await import('../services/ai');
                const models = await getAvailableModels(apiKey);
                modelInfo = `Modelos disponibles: ${models.join(', ')}`;
            } catch (e) { }

            setError(`Error: ${err.message}. ${modelInfo}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex h-screen w-screen bg-udlp-bg overflow-hidden font-sans">
            <Sidebar
                analysis={analysis}
                user={user}
                logout={logout}
                aiReport={aiReport}
                isAnalyzing={isAnalyzing}
                error={error}
            />
            <Editor
                content={content}
                setContent={setContent}
                onSave={() => handleSave()}
                onFinish={handleFinish}
                lastSaved={lastSaved}
                isAnalyzing={isAnalyzing}
            />
        </div>
    );
};

export default Layout;
