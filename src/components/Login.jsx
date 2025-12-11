import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [role, setRole] = useState(null); // 'student' | 'professor' | null
    const [name, setName] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (name.trim()) {
            login(name, role);
        }
    };

    if (!role) {
        return (
            <div className="min-h-screen bg-udlp-bg flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center border border-slate-100">
                    <h1 className="text-3xl font-bold text-udlp-text mb-8">Bienvenido a UDLP</h1>
                    <div className="space-y-4">
                        <button
                            onClick={() => setRole('student')}
                            className="w-full py-4 px-6 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition-colors text-lg"
                        >
                            Soy Estudiante
                        </button>
                        <button
                            onClick={() => setRole('professor')}
                            className="w-full py-4 px-6 bg-slate-50 text-slate-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors text-lg"
                        >
                            Soy Profesor
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-udlp-bg flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full border border-slate-100">
                <button
                    onClick={() => setRole(null)}
                    className="text-slate-400 text-sm mb-6 hover:text-slate-600"
                >
                    ← Volver
                </button>

                <h2 className="text-2xl font-bold text-udlp-text mb-6">
                    {role === 'student' ? 'Ingreso Estudiante' : 'Ingreso Profesor'}
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-udlp-accent/20 text-slate-700"
                            placeholder="Tu nombre completo"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-udlp-accent text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
