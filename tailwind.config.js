/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tea: {
          50: '#fefcfa',
          100: '#fcf6f0',
          200: '#f8eadd',
          300: '#efd4bd',
          400: '#e3b593',
          500: '#d59468',
          600: '#c87948',
          700: '#a75f38',
          800: '#864c31',
          900: '#6c3f2a',
          950: '#3a1f13',
          980: '#1a0d08', // Added darker shade
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 15px 2px rgba(200, 121, 72, 0.4)' },
          '50%': { opacity: .8, boxShadow: '0 0 5px 0px rgba(200, 121, 72, 0.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
