/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14161A',      // near-black background, night-sky base
        panel: '#1E2128',    // card / raised surface on dark sections
        paper: '#F5F3EE',    // warm off-white for light sections
        amber: {
          DEFAULT: '#FF7A29', // primary neon-glow accent (warm sign tube)
          soft: '#FFB27A',
        },
        cyan: {
          DEFAULT: '#2FE6E6', // secondary neon accent (cool sign tube)
          soft: '#8FF2F2',
        },
        ash: '#9AA0A8',       // muted text on dark
        slate: '#4B4F58',     // muted text on light
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        neonAmber: '0 0 8px rgba(255,122,41,0.65), 0 0 24px rgba(255,122,41,0.35)',
        neonCyan: '0 0 8px rgba(47,230,230,0.65), 0 0 24px rgba(47,230,230,0.35)',
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(180deg, rgba(20,22,26,0) 0%, rgba(20,22,26,1) 100%)',
      },
    },
  },
  plugins: [],
};
