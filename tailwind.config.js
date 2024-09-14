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
        'max-w-1300': { 'raw': '(max-width: 1300px)' },
        'max-w-1185': { 'raw': '(max-width: 1185px)' },
        'max-w-1080': { 'raw': '(max-width: 1080px)' },
        'max-w-950': { 'raw': '(max-width: 950px)' },
        'max-w-870': { 'raw': '(max-width: 870px)' },
        'max-w-810': { 'raw': '(max-width: 810px)' },
        'max-w-780': { 'raw': '(max-width: 780px)' },
        'max-w-650': { 'raw': '(max-width: 650px)' },
        'max-w-600': { 'raw': '(max-width: 600px)' },
        'max-w-550': { 'raw': '(max-width: 550px)' },
        'max-w-530': { 'raw': '(max-width: 530px)' },
        'max-w-500': { 'raw': '(max-width: 500px)' },
        'max-w-450': { 'raw': '(max-width: 450px)' },
        'max-w-430': { 'raw': '(max-width: 430px)' }, 
        'max-w-425': { 'raw': '(max-width: 425px)' }, 
        'max-w-395': { 'raw': '(max-width: 395px)' }, 
        'max-h-849': { 'raw': '(max-height: 849px)' },
        'max-h-800': { 'raw': '(max-width: 800px)' },// Definir un nuevo breakpoint personalizado
      },
  },
  darkMode: "class",
  plugins: [nextui()],
}

