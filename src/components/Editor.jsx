import React, { useState } from 'react';

const Editor = ({ content, setContent, onSave, onFinish, lastSaved, isAnalyzing }) => {
    // Visual state
    const [fontSize, setFontSize] = useState('text-lg');
    const [lineHeight, setLineHeight] = useState('leading-relaxed');
    const [letterSpacing, setLetterSpacing] = useState('tracking-normal');

    const cycleFontSize = () => {
        if (fontSize === 'text-base') setFontSize('text-lg');
        else if (fontSize === 'text-lg') setFontSize('text-xl');
        else setFontSize('text-base');
    };

    const cycleLineHeight = () => {
        if (lineHeight === 'leading-normal') setLineHeight('leading-relaxed');
        else if (lineHeight === 'leading-relaxed') setLineHeight('leading-loose');
        else setLineHeight('leading-normal');
    };

    return (
        <main className="flex-1 p-8 h-full flex flex-col">
            <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
                <header className="mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-udlp-text">Zona de Trabajo</h1>
                        {lastSaved && (
                            <span className="text-xs text-slate-400">
                                Guardado: {lastSaved.toLocaleTimeString()}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2 items-center">
                        <button
                            onClick={onSave}
                            className="px-4 py-1 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors mr-2"
                            disabled={isAnalyzing}
                        >
                            Guardar
                        </button>

                        <button
                            onClick={onFinish}
                            className={`px-4 py-1 text-xs font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors mr-4 flex items-center gap-2 ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isAnalyzing}
                        >
                            {isAnalyzing ? 'Analizando...' : 'Finalizar'}
                        </button>

                        <div className="h-6 w-px bg-slate-200 mx-2"></div>

                        <button
                            onClick={cycleFontSize}
                            className="px-3 py-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            title="Ajustar Tamaño de Letra"
                        >
                            Aa
                        </button>
                        <button
                            onClick={cycleLineHeight}
                            className="px-3 py-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            title="Ajustar Espaciado"
                        >
                            ≡
                        </button>
                        <button
                            onClick={() => setLetterSpacing(prev => prev === 'tracking-normal' ? 'tracking-wide' : 'tracking-normal')}
                            className="px-3 py-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            title="Ajustar Espacio entre Letras"
                        >
                            A V
                        </button>
                    </div>
                </header>

                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative transition-all duration-300">
                    <textarea
                        className={`w-full h-full p-8 resize-none outline-none text-slate-700 font-medium placeholder:text-slate-300 transition-all duration-300 ${fontSize} ${lineHeight} ${letterSpacing}`}
                        placeholder="Escribe tu texto aquí..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        spellCheck="false"
                        disabled={isAnalyzing}
                    />
                </div>
            </div>
        </main>
    );
};

export default Editor;
