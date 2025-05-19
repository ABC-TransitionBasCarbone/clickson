'use client'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

let theme = createTheme({
  palette: {
    primary: {
      main: '#1c82b8',
    },
    secondary: {
      main: '#ff6900',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#6d6d6d',
    },
    info: {
      main: '#9c27b0',
    },
    success: {
      main: '#2e7d32',
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
})

theme = responsiveFontSizes(theme)
export default theme
