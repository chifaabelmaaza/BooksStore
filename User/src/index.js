import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
// import { AppProvider } from './Context/AppContext';
import { theme } from './theme';
import { CssBaseline } from '@mui/material';

//const myElem=React.createElement("h1",{},"Bonjour EMSI")
//jsx (javascript xml)

window.IMAGE_API_URL = 'http://localhost:3001/uploads/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline enableColorScheme />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
