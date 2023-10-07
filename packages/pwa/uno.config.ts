import { defineConfig } from 'unocss'

export default defineConfig({
  // GEEN THEME!!!
  // wel, manieren van genereren van CSS
    
  theme: {
    colors:{
      bg: {
        primary: '#DFE6DA',
        secondary: '#EFEFEF',
      },
      custom: {
        red: '#D5573B',
        brown: '#885053',
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
  }
})