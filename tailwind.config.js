/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // veya 'media'
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Varsa özel renkleriniz
      }
    },
  },
  plugins: [],
}