import React, { useState, useEffect } from 'react';
import AppRoutes from './routes';
import './App.css';
import AdminSideBar from './Pages/utils/sidebar/sidebar';
import UserBar from './Pages/utils/userbar/userBar';
import Box from '@mui/material/Box';
import { AppProvider } from './Context/AppContext';


function App() {
  return (
    <div className='App'>
      <AppProvider>
        <Box sx={{ display: 'flex', height: '97vh' }}>
          <AppRoutes />
        </Box>
      </AppProvider>
    </div>
  );
}

export default App;
