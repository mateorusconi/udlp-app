import React from 'react';

const Sidebar = ({ analysis, user, logout, aiReport, isAnalyzing, error }) => {
    return (
        <aside className="w-1/4 bg-white border-r border-slate-200 p-6 flex flex-col h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-udlp-text">Consignas</h2>
                {logout && (
                    <button onClick={logout} className="text-xs text-red-500 hover:text-red-700 font-medium">
                        Salir
                    </button>
                )}
            </div>

            <div className="bg-udlp-bg p-4 rounded-xl text-sm text-slate-600 leading-relaxed mb-6">
                <p>
                    Escribe un texto breve sobre tu día.
                    Intenta usar oraciones claras y separadas.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            {isAnalyzing && (
                <div className="mb-6 p-4 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100 flex items-center justify-center">
                    <div className="animate-pulse">Analizando tu texto...</div>
                </div>
            )}

            {aiReport ? (
                <div className="mb-6 animate-fade-in">
                    <h3 className="text-sm font-semibold text-green-600 mb-3 flex items-center gap-2">
                        <span>✨</span> Devolución
                    </h3>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {aiReport.studentReport}
                    </div>
                </div>
            ) : (
                <>
                    {analysis && analysis.suggestions.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-udlp-text mb-3">Sugerencias</h3>
                            <div className="space-y-3">
                                {analysis.suggestions.map((suggestion) => (
                                    <div
                                        key={suggestion.id}
                                        className={`p-3 rounded-lg text-sm border ${suggestion.type === 'warning'
                                                ? 'bg-amber-50 border-amber-100 text-amber-700'
                                                : 'bg-blue-50 border-blue-100 text-blue-700'
                                            }`}
                                    >
                                        {suggestion.message}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="mt-auto">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Palabras: {analysis ? analysis.wordCount : 0}</span>
                    {user && <span>{user.name}</span>}
                </div>
                <div className="text-xs text-slate-400 text-center">
                    UDLP - Versión 1.0
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
