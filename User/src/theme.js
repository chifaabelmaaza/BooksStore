import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            // main: '#4C8774',
            main: '#571b14',
        },
        secondary: {
            main: '#C9FCE9',
        },
        sidebar: {
            // main: '#364B44',
            main: '#56423E',
        },
        passiveButtonSidebar: {
            // main: '#80BDA8',
            main: '#D77836'
        },
        scdprim: {
            main: '#bc4749',
        },
        danger:{
            main: '#C21010',
        },
        darkText:{
            main: '#1e1e1e',
        },
        background: {
            default: '#f2f2f2',
            paper:"#ffffff",
        },
    }
});