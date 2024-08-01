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
        primary: {
            main: '#1c82b8'
        },
        secondary: {
            main: '#ff6900'
        },
        error: {
            main: '#d32f2f'
        },
        warning: {
            main: '#6d6d6d',
        },
        info: {
            main: '#9c27b0',
        },
        success: {
            main: '#2e7d32'
        }
    },
    typography: {
        fontFamily: montserrat.style.fontFamily,
    },
});

export default theme;
