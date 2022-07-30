/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html','./js/app.js/autoComplete.js/handler.js'],
  theme: {
    fontFamily: {
      lato: ['"Lato"', 'sans-serif'],
      oswald: ['"Oswald"', 'sans-serif']
    },
    screens: {
         sm: '480px',
         md: '768px',
         lg: '976px',
         xl: '1440px'
    },
    dropShadow: {
      red : '0px 8px 8px hsl(12, 88%, 79%)',
      blue : '0px 8px 12px #06b6d499'
   },
    extend: {},
  },
  plugins: [],
}
