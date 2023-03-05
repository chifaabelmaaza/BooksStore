import React, { useState } from "react";
import { Modal, Box, Fade, Typography, Button, TextField, Grid, IconButton } from "@mui/material";
import userService from "../../services/user.service";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  backgroundColor: "white",
  mt: 1,
  borderRadius: 3,
  boxShadow: 3,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  // height: 350,
};

const ModalAddUsers = ({ open, handleOpen, getUsers, setMessage, setOpenAlert, setType }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);


  async function saveUser() {
    setConfirmPwd("")
    setPassword("")
    setUserName("")    
    setEmail("")
    setFullName("")
    setLoading(true)
    try {
      if (fullName === "" || email === "" || userName === "" || password === ""|| confirmPwd === "") {
        setMessage('Please fill all the fields');
        setType('warning');
        setOpenAlert(true);
        setLoading(false);
      } else {
        const data = {
          fullname: fullName,
          email: email,
          username: userName,
          password: password,
          confirmPassword: confirmPwd
        }
        userService
          .addClient(data)
          .then(() => {
            setMessage('client created successfully');
            setType('success');
            setOpenAlert(true);
            handleOpen();
            getUsers();
            setLoading(false);

          })
          .catch((err) => {
            console.log("failure ");
            console.log(err);
            setMessage('Error while adding the client, please try again');
            setType('error');
            setOpenAlert(true);
            setLoading(false);
            handleOpen();
          });

      }
    } catch (error) {
      console.log(error);
      setMessage('Error while adding the client, please try again');
      setType('error');
      setOpenAlert(true);
      setLoading(false);

    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleOpen}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Ajouter un Client
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{px:1}}>
              <TextField
                id="standard-basic"
                label="Nom complet"
                variant="standard"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
             <Grid item xs={12} sm={6} sx={{px:1}}>
              <TextField
                id="standard-basic"
                label="User name"
                variant="standard"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{px:1, mt:1}}>
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{px:1}}>
            <TextField
              variant="standard"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              type={visible ? "text" : "password"}
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
            </Grid>
            <Grid item xs={12} sm={6} sx={{px:1}}>
              <TextField
                variant="standard"
                label="Confirmpassword"
                name="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                fullWidth
                type={visible ? "text" : "password"}
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
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "60%",
              mt:2,
            }}
          >
            <Button variant="outlined" color="success" onClick={saveUser} disabled={loading}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleOpen}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalAddUsers;
