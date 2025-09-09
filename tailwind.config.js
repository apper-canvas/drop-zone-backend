/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#10b981',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      animation: {
        'pulse-success': 'pulse-success 0.6s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'pulse-success': {
          '0%': { transform: 'scale(1)', backgroundColor: '#10b981' },
          '50%': { transform: 'scale(1.05)', backgroundColor: '#059669' },
          '100%': { transform: 'scale(1)', backgroundColor: '#10b981' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}