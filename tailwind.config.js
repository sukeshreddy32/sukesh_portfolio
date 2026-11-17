/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#030712',
          card: 'rgba(8, 14, 30, 0.75)',
          border: 'rgba(56, 189, 248, 0.2)',
          cyan: '#00f2fe',
          cyanGlow: '#4facfe',
          purple: '#a855f7',
          violet: '#7c3aed',
          pink: '#f43f5e',
          amber: '#fbbf24',
          emerald: '#10b981',
          blue: '#3b82f6'
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'ui-monospace', 'monospace'],
        display: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(0,242,254,0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(0,242,254,0.9))' },
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, rgba(6, 11, 25, 0.95) 0%, rgba(13, 27, 62, 0.85) 100%)',
        'glow-radial': 'radial-gradient(circle at center, rgba(0,242,254,0.15) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
