import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSessions } from '../services/storage';

const ProfessorDashboard = () => {
    const { logout } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {
        const allSessions = getSessions();
        // Sort by date desc
        allSessions.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        setSessions(allSessions);
    }, []);

    return (
        <div className="min-h-screen bg-udlp-bg flex flex-col font-sans">
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-udlp-text">Panel Docente</h1>
                <button
                    onClick={logout}
                    className="text-sm text-slate-500 hover:text-red-500 transition-colors"
                >
                    Cerrar Sesión
                </button>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Session List */}
                <aside className="w-1/3 bg-white border-r border-slate-200 overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                            Sesiones Recientes
                        </h2>
                        <div className="space-y-2">
                            {sessions.length === 0 ? (
                                <p className="text-slate-400 text-sm">No hay sesiones registradas.</p>
                            ) : (
                                sessions.map(session => (
                                    <button
                                        key={session.id}
                                        onClick={() => setSelectedSession(session)}
                                        className={`w-full text-left p-4 rounded-xl transition-colors ${selectedSession?.id === session.id
                                                ? 'bg-blue-50 border-blue-100 ring-1 ring-blue-200'
                                                : 'hover:bg-slate-50 border border-transparent'
                                            }`}
                                    >
                                        <div className="font-semibold text-slate-700">{session.studentName}</div>
                                        <div className="text-xs text-slate-400 mt-1">
                                            {new Date(session.lastModified).toLocaleString()}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </aside>

                {/* Detail View */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {selectedSession ? (
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
                                <h2 className="text-lg font-semibold text-slate-800 mb-4">Texto del Estudiante</h2>
                                <div className="prose prose-slate max-w-none">
                                    <p className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                                        {selectedSession.content || "Sin contenido."}
                                    </p>
                                </div>
                            </div>

                            {selectedSession.aiReport && (
                                <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-8">
                                    <h2 className="text-lg font-semibold text-indigo-900 mb-4">Informe IA para Docente</h2>
                                    <div className="prose prose-indigo max-w-none text-indigo-800">
                                        {/* We will render markdown here later, for now just text */}
                                        <pre className="whitespace-pre-wrap font-sans text-sm">
                                            {selectedSession.aiReport.professorReport}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400">
                            Selecciona una sesión para ver los detalles
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProfessorDashboard;
