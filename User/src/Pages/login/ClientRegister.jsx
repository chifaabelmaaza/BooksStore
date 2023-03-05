import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    TextField,
    IconButton,
    Divider,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import userService from '../../services/user.service';
import { AppContext } from "../../Context/AppContext";
import AlertManager from '../../components/alerts/alertMessages';

const style = {
    width: "100%",
    // backgroundColor: "white",
    // mt: 1,
    // borderRadius: 3,
    // boxShadow: 3,
    // p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    // height: 300,
};

const PasswordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;


const RegisterClient = ({ setSelectedPage, handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [visible, setVisible] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('This is an alert');
    const [type, setType] = useState('info');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setConnected, setToken } = useContext(AppContext);

    function register() {
        setLoading(true);
        try {
            const data = {
                'email': email,
                'password': password,
                'confirmPassword': confirmPassword,
                'fullname': fullName,
                'username': username,
                'role': 'client'
            };
            if (password !== confirmPassword) {
                setMessage('Password and Confirm password are not the same');
                setType('error');
                setOpenAlert(true);
                setLoading(false);
            }
            else if (!PasswordValidator.test(password)) {
                setMessage('Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character');
                setType('error');
                setOpenAlert(true);
                setLoading(false);
            }
            else if (email === "" || password === "" || confirmPassword === "" || fullName === "" || username === "") {
                setMessage('Please fill all the fields');
                setType('error');
                setOpenAlert(true);
                setLoading(false);
            } else {
                userService.clientRegister(data).then(result => {
                    // console.log(result.data.error.code)
                    if (result.data.success) {
                        const token = result.data.token;
                        localStorage.setItem('token', token)
                        setToken(token);
                        setConnected(true);
                        setMessage('Account reacted successfullly, enjoy your shopping');
                        setType('success');
                        setOpenAlert(true);
                        handleClose();
                        window.location.reload();
                        // setTimeout(() => {
                        //     navigate('/home');
                        // }, 2000);
                    }
                    // if(result.data.error.code === 11000){
                    //     setMessage('The username or email is already used');
                    //     setType('error');
                    //     setOpenAlert(true);
                    //     setLoading(false);
                    // }
                    else {
                        setMessage('An error occured, probably the email is already used');
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
        <Box sx={{ width: "100%", height: "100", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={style}>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "100%",
                        px: 2,
                        my: 2
                    }}
                >
                    <TextField
                        
                        label="Full Name"
                        variant="standard"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        sx={{ width: "100%", my: 1 }}
                    />

                    <TextField
                        
                        label="Username"
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ width: "100%", my: 1 }}
                    />
                    <TextField
                        
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ width: "100%", my: 1 }}
                    />

                    <TextField
                        variant="standard"
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <TextField
                        variant="standard"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <Button variant="outlined" color="success" onClick={register} disabled={loading}>
                        Register
                    </Button>

                </Box>
                <Divider variant="middle" sx={{ width: "100%", my: 1 }}>
                    OR
                </Divider>
                <Button variant="text" color="success" onClick={() => setSelectedPage(0)}>
                    Login
                </Button>

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

export default RegisterClient;
