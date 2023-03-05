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


const LoginClient = ({ setSelectedPage, handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('This is an alert');
    const [type, setType] = useState('info');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setConnected, setToken } = useContext(AppContext);

    function login() {
        setLoading(true)
        try {
            const data = {
                'email': email,
                'password': password
            };
            if (email === "" || password === "") {
                setMessage('Please fill all the fields');
                setType('error');
                setOpenAlert(true);
                setLoading(false);
            } else {
                userService.clientLogin(data).then(result => {
                    // console.log(result.data)
                    if (result.data.success) {
                        const token = result.data.token;
                        // const user_id = result.data.user._id;
                        localStorage.setItem('token', token)
                        setConnected(true);
                        setMessage('Logged In successfullly');
                        setType('success');
                        setOpenAlert(true);
                        setToken(token);
                        handleClose()
                        window.location.reload();
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
            setMessage('Error while connection, please report to the administrator');
            setType('error');
            setOpenAlert(true);
            setLoading(false);

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
                        px:2,
                        my:2
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label="Email"
                        variant="standard"
                        value={email}
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ width: "100%" }}
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
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Button variant="outlined" color="success" onClick={login} sx={{px:5}} disabled={loading}>
                        Login
                    </Button>
                </Box>
                <Divider variant="middle" sx={{ width: "100%", my: 1 }}>
                    OR
                </Divider>

                <Button variant="text" color="success" onClick={() => setSelectedPage(1)}>
                    Register
                </Button>
                
                <Typography component={Link} to={"/authentication"} variant="body2" color="success" sx={{mt:2}}>
                    Login as an admin
                </Typography>
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

export default LoginClient;
