import { Box, Button, Chip, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import userService from '../../../services/user.service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AlertMessage from '../../../components/alerts/alertMessages';

const Profile = () => {

    const [user, setUser] = useState({ fullname: "", email: "", role: "", username: "", createdAt: "", oldPassword: "", newPassword: "", confirmPassword: "", phone: "", adress: "" });

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        setLoading(true);
        userService.userInfo().then((result) => {
            const user = result.data.user;
            setUser({
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                username: user.username,
                createdAt: user.createdAt,
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
                phone: user.phone,
                adress: user.adress
            });

            userService.getLastOrders().then((result) => {
                setOrders(result.data.orders);
                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setOpen(true);
                setMessage("Error while fetching orders");
                setType("error");
                setLoading(false);
            });
        }).catch((error) => {
            console.error(error);
            setOpen(true);
            setMessage("Error while fetching user info");
            setType("error");
        });


    }, []);

    const updateProfile = () => {
        const data = {
            fullname: user.fullname,
            phone: user.phone,
            adress: user.adress,
            email: user.email,
            id: user.id,
            username: user.username,
        }
        userService.updateInfo(data).then((result) => {
            setType("success");
            setMessage("Profile updated successfully");
            setOpen(true);
        }).catch((error) => {
            console.error(error);
            setMessage("Error while updating profile");
            setType("error");
            setOpen(true);
        });

    }

    const updatePassword = () => {
        const data = {
            id: user.id,
            oldPassword: user.oldPassword,
            password: user.newPassword,
            confirmPassword: user.confirmPassword,
        }
        // return console.log(data)

        userService.updatePassword(data).then((result) => {
            setType("success");
            setMessage("Password updated successfully");
            setOpen(true);
        }
        ).catch((error) => {
            console.error(error);
            setMessage("Error while updating password");
            setType("error");
            setOpen(true);
        }
        );
    }


    return (
        loading ? <div>Loading...</div> :
            <Container sx={{ height: "auto", pb: 5 }}>

                <Box sx={{ width: "90%", mx: "auto", my: 2 }}>
                    <Typography variant="overline" fontSize={26} fontWeight={600}>My Profile</Typography>
                </Box>
                <Divider />
                <Box sx={{ width: "100%", textAlign: "left", my: 2, px: 4 }}>
                    <Typography variant="overline" fontSize={26} fontWeight={300}>My Last Orders</Typography>
                </Box>

                <Table sx={{ '& td , & tr, &': { border: "none", borderBottom: "1px solid gray" }, "& tr:hover": { background: 'none' }, "& th": { width: 150, textTransform: "capitalize", border: "none", borderBottom: "1px solid gray" }, width: "100%", borderColor: "none", mt: 3 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Order ID</TableCell>
                            <TableCell align="left">Number of products</TableCell>
                            <TableCell align="left">Total Price (DH)</TableCell>
                            <TableCell align="left">Status</TableCell>
                            {/* <TableCell align="left">Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders.length ?

                                orders.map((item, index) => (

                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-between" }}>

                                                <Typography variant="body1" component={'p'} textAlign={"left"} sx={{ overflowWrap: "break-word", wordWrap: "break-word", hyphens: "auto", whiteSpace: "noraml" }}>{item?._id.slice(0, 6)}</Typography>

                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">{item?.productsList.length}</TableCell>
                                        <TableCell align="left">{(item.total).toFixed(2)}</TableCell>
                                        <TableCell align="center">{
                                            item.status === "pending" ? <Chip label="Pending" color="warning" size="small" />
                                                : item.status === 'delivered' ? <Chip label="Delivered" color="success" size="small" />
                                                    : item.status === 'canceled' ? <Chip label="Canceled" color="error" size="small" />
                                                        : item.status === 'processing' ? <Chip label="Processing" color="info" size="small" />
                                                            : <Chip label="Unknown" color="error" size="small" />
                                        }</TableCell>
                                        {/* <TableCell align="center">
                                            
                                            </TableCell> */}

                                    </TableRow>

                                )) : <TableRow>
                                    <TableCell align="center" colSpan={4}>No orders yet</TableCell>
                                </TableRow>
                        }


                    </TableBody>
                </Table>

                <Box sx={{ width: "100%", textAlign: "left", my: 2, px: 4 }}>
                    <Typography variant="overline" fontSize={26} fontWeight={300}>My Personal Info</Typography>
                </Box>

                <Box>
                    <Grid container spacing={2} sx={{ px: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField variant='filled' fullWidth label='Full name' value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField variant='filled' fullWidth label='Username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField variant='filled' fullWidth label='Username' value={user.email} readOnly />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField variant='filled' fullWidth label='Sign up date' value={new Date(user.createdAt).toLocaleDateString()} readOnly disabled />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField variant='filled' fullWidth autoComplete='off' label='Phone' value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField variant='filled' fullWidth multiline label='Adress' value={user.adress} onChange={(e) => setUser({ ...user, adress: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button variant='contained' sx={{ width: "50%" }} onClick={updateProfile}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ width: "100%", textAlign: "left", mb: 2, px: 4, mt: 4 }}>
                    <Typography variant="overline" fontSize={26} fontWeight={300}>Change password</Typography>
                </Box>

                <Box>
                    <Grid container spacing={2} sx={{ px: 2 }}>
                        <Grid item xs={12} sm={4}>
                            <TextField type="password" variant='filled' fullWidth label='Old password' value={user.oldPassword} onChange={(e) => setUser({ ...user, oldPassword: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField type="password" variant='filled' fullWidth label='New password' value={user.newPassword} onChange={(e) => setUser({ ...user, newPassword: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField type="password" variant='filled' fullWidth label='Confirm the new password' value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Button variant='contained' sx={{ width: "50%" }} onClick={updatePassword}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
                <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
            </Container>
    )
}

export default Profile