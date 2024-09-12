/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {fontFamily: {
      playwrite: ['"Playwrite PL"', 'serif'],
      montserrat: ['"Montserrat"', 'sans-serif']
    }},
    screens: {
        'lg': '1050px',
        'max-h-849': { 'raw': '(max-height: 849px)' },
        'max-w-530': { 'raw': '(max-width: 530px)' },
        'max-w-430': { 'raw': '(max-width: 430px)' },
        'max-w-450': { 'raw': '(max-width: 450px)' },  
        'max-h-800': { 'raw': '(max-width: 800px)' },// Definir un nuevo breakpoint personalizado
      },
  },
  darkMode: "class",
  plugins: [nextui()],
}

