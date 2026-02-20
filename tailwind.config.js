
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: '#0a1628',
          mid: '#15233b',
          light: '#1e2f4e',
          card: '#112240',
        },
        gold: {
          primary: '#d4af37',
          light: '#f3e5ab',
          glow: '#ffd700',
          soft: '#c5a028',
          dim: '#8a7020',
        },
        cream: {
          DEFAULT: '#f8f5f2',
          muted: '#e6e2dd',
        }
      },
      fontFamily: {
        arabic: ['"Noto Kufi Arabic"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
