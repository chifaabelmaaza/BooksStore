import React from 'react';
import {Snackbar,Alert} from '@mui/material';

const AlertMessage = ({message, open,setOpen,type }) => {



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


return(
  <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={1000}
        >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
              {message}
        </Alert>
  </Snackbar>
)
}

export default AlertMessage;