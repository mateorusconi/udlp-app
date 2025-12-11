/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for "premium" and "undemanding" look
        'udlp-bg': '#f8fafc', // Very light blue-grey
        'udlp-text': '#334155', // Slate 700
        'udlp-accent': '#6366f1', // Indigo 500
      }
    },
  },
  plugins: [],
}
