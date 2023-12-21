import { defineConfig } from 'unocss'

export default defineConfig({
  // GEEN THEME!!!
  // wel, manieren van genereren van CSS
    
  theme: {
    colors:{
        primary: '#DFE6DA',
        secondary: '#EFEFEF',
      custom: {
        lightGreen: '#C6ECAE',
        darkGreen: '#94C9A9',
        purple: '#777DA7',
        orange: '#D5573B',
        brown: '#885053',
        lightPurple : '9BA0C2',

        
        red: '#D5573B',
        green: '#C6ECAE',
        blue: '#777DA7',
        grey: '#C7C7C7',
        greenblue: '#94C9A9',
      }
    },
    fontFamily: {
      header: ['strenuous-3d', 'sans-serif'],
      body: ['gravesend-sans', 'sans-serif'],
      pop: ['poppins', 'sans-serif'],
    },
  },
  safelist: [...Array.from({ length: 10 }, (_, i) => `col-start-${i + 1}`), ...Array.from({ length: 70 }, (_, i) => `row-start-${i + 1}`), ...Array.from({ length: 35 }, (_, i) => `row-span-${i + 1}`)],

})