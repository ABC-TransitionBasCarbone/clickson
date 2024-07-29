'use client';
import {Montserrat} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

const montserrat = Montserrat({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        abcBlue: {
            main: '#1c82b8'
        },
        abcOrange: {
            main: '#ff6900'
        },
        abcRed: {
            main: '#d32f2f'
        },
        abcGrey: {
            main: '#6d6d6d',
        },
        abcViolet: {
            main: '#9c27b0',
        },
       abcGreen: {
            main: '#2e7d32'
        }
    },
    typography: {
        fontFamily: montserrat.style.fontFamily,
    },
});

export default theme;