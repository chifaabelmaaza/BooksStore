import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import userService from '../../services/user.service';
import { AppContext } from "../../Context/AppContext";
import AlertManager from '../../components/alerts/alertMessages';

const style = {
  width: 500,
  backgroundColor: "white",
  mt: 1,
  borderRadius: 3,
  boxShadow: 3,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  // height: 300,
};

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('This is an alert');
  const [type, setType] = useState('info');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {setConnected} = useContext(AppContext);

  function loginAsAdmin() {
    try {
        const loginAd = {
            'email': email,
            'password': password
        };
        if (email === "" || password === "") {
        } else {
            userService.login(loginAd).then(result => {
              // console.log(result.data)
              if (result.data.success) {
                  const token = result.data.token;
                  const user_id = result.data.user._id;
                  localStorage.setItem('token', token)
                  localStorage.setItem('user', user_id);
                  setConnected(true);
                  setMessage('Logged In successfullly');
                  setType('success');
                  setOpenAlert(true);
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
              }
              else {
                setMessage('Email or password are incorrect.');
                setType('error');
                setOpenAlert(true);
                setLoading(false);
              }
            
            }).catch(error => {
              console.log(error);
              setMessage('Error while connection, Email or password not correct, please try again');
              setType('error');
              setOpenAlert(true);
              setLoading(false);
            }) 
        }
        
    }
    catch (error) {
        console.log(error);
    }
}

  return (
    <Box sx={{ width: "100%", height:"100", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Box sx={style}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Welcome back to your space
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "50%",
          }}
        >
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "100%" }}
          />

          <TextField
              variant="standard"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // error={login.touched.password && Boolean(login.errors.password)}
              // helperText={login.touched.password && login.errors.password}
              fullWidth
              type={visible ? "text" : "password"}
              sx={{ my: 1 }}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </IconButton>
                ),
              }}
            />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button variant="outlined" color="success" onClick={loginAsAdmin}>
            Login
          </Button>
        </Box>
      </Box>
      <AlertManager
        open={openAlert}
        setOpen={setOpenAlert}
        message={message}
        type={type}
      />
    </Box>
  );
};

export default LoginAdmin;
