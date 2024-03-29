/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        md: '1.25rem',
        large: '3rem',
      },
      colors: {
        'text': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        'background': {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        'primary': {
          50: '#edeef7',
          100: '#dcdeef',
          200: '#b8bce0',
          300: '#959bd0',
          400: '#7179c1',
          500: '#4e58b1',
          600: '#3e468e',
          700: '#2f356a',
          800: '#1f2347',
          900: '#101223',
          950: '#080912',
        },
        'secondary': {
          50: '#e5ecff',
          100: '#ccd9ff',
          200: '#99b3ff',
          300: '#668cff',
          400: '#3366ff',
          500: '#0040ff',
          600: '#0033cc',
          700: '#002699',
          800: '#001966',
          900: '#000d33',
          950: '#00061a',
        },
        'accent': {
          50: '#faf2ea',
          100: '#f6e6d5',
          200: '#ecccac',
          300: '#e3b382',
          400: '#d99959',
          500: '#d0802f',
          600: '#a66626',
          700: '#7d4d1c',
          800: '#533313',
          900: '#2a1a09',
          950: '#150d05',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}