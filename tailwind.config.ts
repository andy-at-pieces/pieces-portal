import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pieces Enterprise Portal palette (light theme, matching portal.pieces.app)
        ink: {
          DEFAULT: '#0a0b0c',
          900: '#111213',
          700: '#2a2b2d',
          500: '#5b5d61',
          400: '#797b80',
          300: '#a4a6ab',
        },
        surface: {
          DEFAULT: '#ffffff',
          50: '#fafbfc',
          100: '#f4f5f7',
          200: '#eceef1',
          300: '#e1e4e8',
          400: '#d0d4da',
        },
        // Pieces brand accents (used sparingly in light context)
        lime: '#deff83',
        limeDark: '#1c1d1e',
        accent: {
          // status colors
          green: '#16a34a',
          greenSoft: '#ecfdf5',
          red: '#dc2626',
          redSoft: '#fef2f2',
          orange: '#ea580c',
          orangeSoft: '#fff7ed',
          blue: '#2563eb',
          blueSoft: '#eff6ff',
          violet: '#7c3aed',
          violetSoft: '#f5f3ff',
          teal: '#0d9488',
          tealSoft: '#f0fdfa',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
};
export default config;
