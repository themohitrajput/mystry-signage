/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        amber: {
          DEFAULT: 'rgb(var(--color-amber) / <alpha-value>)',
          soft: 'rgb(var(--color-amber-soft) / <alpha-value>)',
        },
        cyan: {
          DEFAULT: 'rgb(var(--color-cyan) / <alpha-value>)',
          soft: 'rgb(var(--color-cyan-soft) / <alpha-value>)',
        },
        ash: 'rgb(var(--color-ash) / <alpha-value>)',
        slate: 'rgb(var(--color-slate) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        neonAmber: '0 0 8px rgba(33,193,33,0.65), 0 0 24px rgba(33,193,33,0.35)',
        neonCyan: '0 0 8px rgba(47,230,230,0.65), 0 0 24px rgba(47,230,230,0.35)',
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(180deg, rgba(20,22,26,0) 0%, rgba(20,22,26,1) 100%)',
      },
    },
  },
  plugins: [],
};
