export const analyzeText = (text) => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    const suggestions = [];

    // 1. Long Sentences (> 25 words)
    sentences.forEach((sentence, index) => {
        const wordCount = sentence.trim().split(/\s+/).length;
        if (wordCount > 25) {
            suggestions.push({
                id: `long-sent-${index}`,
                type: 'warning',
                message: 'Esta oración es muy larga. Intenta usar un punto para dividirla.'
            });
        }
    });

    // 2. Capitalization at start
    if (text.length > 0 && /[a-z]/.test(text[0])) {
        suggestions.push({
            id: 'cap-start',
            type: 'correction',
            message: 'Recuerda comenzar con mayúscula.'
        });
    }

    // 3. Repeated Words (proximity check)
    for (let i = 0; i < words.length - 1; i++) {
        const current = words[i].toLowerCase().replace(/[.,!?;:]/g, '');
        const next = words[i + 1].toLowerCase().replace(/[.,!?;:]/g, '');

        if (current === next && current.length > 1) { // Ignore single letters like 'y', 'a'
            suggestions.push({
                id: `rep-word-${i}`,
                type: 'warning',
                message: `Repetiste la palabra "${current}".`
            });
        }
    }

    // 4. Basic Grammar/Style Checks (Heuristics)
    const lowerText = text.toLowerCase();

    if (lowerText.includes(' de el ')) {
        suggestions.push({
            id: 'de-el',
            type: 'correction',
            message: 'Se escribe "del" en lugar de "de el".'
        });
    }

    if (lowerText.includes(' a el ')) {
        suggestions.push({
            id: 'a-el',
            type: 'correction',
            message: 'Se escribe "al" en lugar de "a el".'
        });
    }

    // 5. Paragraph Length
    paragraphs.forEach((para, index) => {
        const paraSentences = para.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (paraSentences.length > 5) {
            suggestions.push({
                id: `long-para-${index}`,
                type: 'warning',
                message: 'Este párrafo es muy extenso. Intenta hacer un punto y aparte.'
            });
        }
    });

    return {
        wordCount: words.length,
        sentenceCount: sentences.length,
        suggestions: suggestions.slice(0, 5) // Limit to 5 suggestions to avoid overwhelming
    };
};
