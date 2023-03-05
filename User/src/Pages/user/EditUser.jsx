import React, { useState } from "react";
import { Modal, Box, Fade, Typography, Button, TextField, Grid, IconButton } from "@mui/material";
import userService from "../../services/user.service";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect } from "react";

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
    // height: 300,
};

const ModalUpdateUser = ({ open, handleOpen, getUsers, setMessage, setOpenAlert, setType }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [createdAt, setCreatedAt] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        userService.userInfo().then((res) => {
            const user = res.data.user;
            setId(user._id);
            setFullName(user.fullname);
            setEmail(user.email);
            setUserName(user.username);
            setCreatedAt(new Date(user.createdAt).toLocaleDateString());

        })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    async function saveUser() {
        setConfirmPwd("")
        setPassword("")
        setOldPassword("")
        
        setLoading(true)
        try {
            if (fullName === "" || email === "" || userName === "" || password === ""|| confirmPwd === "" || oldPassword === "") {
                setMessage('Please fill all the fields');
                setType('warning');
                setOpenAlert(true);
                setLoading(false);
            } else {
                const data = {
                    id: id,
                    fullname: fullName,
                    email: email,
                    username: userName,
                    role: "admin"
                }
                const datapwd = {
                    id: id,
                    oldPassword: oldPassword,
                    password: password,
                    confirmPassword: confirmPwd,
                }
                userService
                    .updateUser(data)
                    .then(() => {
                        userService
                            .updateUserPwd(datapwd)
                            .then(() => {
                                setMessage('Password Updated successfully');
                                setType('success');
                                setOpenAlert(true);
                                handleOpen();
                                getUsers();
                                setLoading(false);

                            })
                            .catch((err) => {
                                console.log("failure ");
                                console.log(err);
                                setMessage('Error while adding the admin, please try again');
                                setType('error');
                                setOpenAlert(true);
                                setLoading(false);
                                handleOpen();
                            });
                            setMessage('User Updated successfully');
                            setType('success');
                            setOpenAlert(true);
                    })
                    .catch((err) => {
                        console.log("failure ");
                        console.log(err);
                        setMessage('Error while adding the admin, please try again');
                        setType('error');
                        setOpenAlert(true);
                        setLoading(false);
                        handleOpen();
                    });
                

            }
        } catch (error) {
            console.log(error);
            setMessage('Error while adding the admin, please try again');
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
                        Modifier un Admin
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ px: 1 }}>
                            <TextField
                                id="standard-basic"
                                label="Nom complet"
                                variant="standard"
                                fullWidth
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ px: 1 }}>
                            <TextField
                                id="standard-basic"
                                label="User name"
                                variant="standard"
                                fullWidth
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ px: 1, mt: 1 }}>
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
                        <Grid item xs={12} sm={6} sx={{ px: 1, mt: 1 }}>
                            <TextField
                                label="Date de creation"
                                variant="standard"
                                disabled
                                readOnly
                                fullWidth
                                value={createdAt}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ px: 1 }}>
                            <TextField
                                variant="standard"
                                label="Ancien mot de passe"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
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
                        <Grid item xs={12} sm={6} sx={{ px: 1 }}>
                            <TextField
                                variant="standard"
                                label="Nouveau mot de passe"
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
                                name="Confirmpassword"
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
                            mt: 2
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

export default ModalUpdateUser;
