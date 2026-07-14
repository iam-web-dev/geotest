/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2F80ED',
          hover: '#1F6FE5',
          light: '#4C9AFF',
          soft: '#DCEBFF',
        },
      },
      borderRadius: {
        DEFAULT: '16px',
        sm: '10px',
        xs: '8px',
        lg: '24px',
      },
    },
  },
  plugins: [],
}