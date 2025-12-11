import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateReports = async (apiKey, studentName, text, sessionData) => {
    if (!apiKey) {
        throw new Error("API Key is required");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prompt for Student Report
    const studentPrompt = `
    Actúa como un asistente pedagógico amable y motivador para un estudiante con dificultades del lenguaje (dislexia/dispraxia).
    El estudiante se llama ${studentName}.
    Analiza el siguiente texto escrito por él:
    "${text}"

    Genera un reporte breve y directo para el ESTUDIANTE con:
    1. Un comentario positivo sobre el contenido (valora sus ideas).
    2. Una o dos sugerencias concretas para mejorar la escritura (ortografía o claridad), explicadas de forma sencilla.
    3. Un mensaje de cierre alentador.
    
    Usa un tono cercano, claro y "no demandante". Evita tecnicismos.
  `;

    // Prompt for Professor Report
    const professorPrompt = `
    Actúa como un experto en psicopedagogía y lingüística.
    Analiza el siguiente texto escrito por el estudiante ${studentName}:
    "${text}"

    Genera un reporte técnico para el PROFESOR con:
    1. Análisis de dificultades observadas (ortografía, sintaxis, cohesión, coherencia).
    2. Fortalezas del estudiante en esta producción.
    3. Recomendaciones específicas de intervención.
    4. 3 Ejercicios prácticos sugeridos para trabajar las dificultades detectadas.

    Formato estructurado y profesional.
  `;

    try {
        const [studentResult, professorResult] = await Promise.all([
            model.generateContent(studentPrompt),
            model.generateContent(professorPrompt)
        ]);

        return {
            studentReport: studentResult.response.text(),
            professorReport: professorResult.response.text(),
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error("Error generating AI reports:", error);

        // Try to list models to debug
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const modelList = await genAI.getGenerativeModel({ model: "gemini-pro" }).apiKey; // Hack to get client? No.
            // The SDK doesn't expose listModels easily on the client instance in all versions, 
            // but let's try to just throw the error.
            // Actually, let's try to use a known stable model for free tier: gemini-1.5-flash-8b
        } catch (e) { }

        throw error;
    }
};

export const getAvailableModels = async (apiKey) => {
    // This is a helper to debug
    try {
        // Note: The JS SDK might not have a direct listModels method exposed easily in the main entry 
        // without using the ModelManager (which is server side usually).
        // Let's try a direct fetch to the API to be sure.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        return data.models ? data.models.map(m => m.name) : [];
    } catch (e) {
        return ["Error listing models"];
    }
};
