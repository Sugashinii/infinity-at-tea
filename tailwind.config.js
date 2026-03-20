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
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
