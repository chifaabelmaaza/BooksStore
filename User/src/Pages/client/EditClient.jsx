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

const ModalUpdateClient = ({ open, handleOpen, getUsers, setMessage, setOpenAlert, setType, selectedId,oldfullName ,olddate, olduserName,oldemail}) => {
    
    const [client, setclient] = useState({
        fullname: oldfullName,
        email: oldemail,
        username: olduserName,
        createdAt: olddate,
        id: selectedId
    })
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
// console.log(olddate)
    // const [fullName, setFullName] = useState(oldfullName);
    // const [email, setEmail] = useState(oldemail)
    // const [userName, setUserName] = useState(olduserName);
    // const [oldPassword, setOldPassword] = useState("");
    // const [createdAt, setCreatedAt] = useState(olddate);
    // const [id, setId] = useState(selectedId);
    // console.log(selectedId,oldfullName ,olddate, olduserName,oldemail)
    // useEffect(() => {
    //     userService.getUserInfo(selectedId).then((res) => {
    //         const user = res.data.user;
    //         setFullName(user.fullname);
    //         setEmail(user.email);
    //         setUserName(user.username);
    //         setCreatedAt(new Date(user.createdAt).toLocaleDateString());

    //     })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])

    const resetPassword = () => {
        const datapwd = {
            id: selectedId,
            // oldPassword :oldPassword
        }

        userService.resetPassword(datapwd)
            .then(() => {
                setMessage('Password reset successfully');
                setType('success');
                setOpenAlert(true);
                handleOpen();
                getUsers();
            })
            .catch((err) => {
                console.log(err);
                setMessage('Error while resetting the password, please try again');
                setType('error');
                setOpenAlert(true);
                handleOpen();
            })
    }

    async function saveUser() {
        setLoading(true)
        try {
            if (client.fullname === "" || client.email === "" || client.username === "" ) {
                setMessage('Please fill all the fields');
                setType('warning');
                setOpenAlert(true);
                setLoading(false);
            } else {
                const data = {client}
                userService
                    .updateUser(data)
                    .then(() => {
                        setMessage('Client updated successfully');
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
                        Modifier un Client
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ px: 1 }}>
                            <TextField
                                
                                label="Nom complet"
                                variant="standard"
                                fullWidth
                                value={client.fullname}
                                onChange={(e) => setclient({ ...client, fullname: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ px: 1 }}>
                            <TextField
                                
                                label="User name"
                                variant="standard"
                                fullWidth
                                value={client.username}
                                onChange={(e) => setclient({ ...client, username: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ px: 1, mt: 1 }}>
                            <TextField
                                
                                label="Email"
                                variant="standard"
                                type="email"
                                fullWidth
                                value={client.email}
                                onChange={(e) => setclient({ ...client, email: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ px: 1, mt: 1 }}>
                            <TextField
                                label="Date de creation"
                                variant="standard"
                                disabled
                                readOnly
                                fullWidth
                                value={new Date(olddate).toLocaleDateString()}
                            />
                        </Grid>

                        {/* <Grid item xs={12} sm={6} sx={{ px: 1 }}>
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
                        </Grid> */}
                        <Grid item xs={12} sm={12} sx={{ px: 1, my:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <Button sx={{ px: 2 }} color="primary" variant="outlined" disabled={loading} onClick={resetPassword}>
                                Réinitialiser le mot de passe
                            </Button>
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

export default ModalUpdateClient;
