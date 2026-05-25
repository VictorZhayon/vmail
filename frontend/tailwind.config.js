/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1e6a0b',
          600: '#185009',
          700: '#113806',
        },
      },
    },
  },
  plugins: [],
}
