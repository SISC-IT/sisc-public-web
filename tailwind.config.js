/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        dinCondensed: ['"DIN Condensed"', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0f172a',
          card: 'rgba(30, 41, 59, 0.4)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
