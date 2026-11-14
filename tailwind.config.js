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
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
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