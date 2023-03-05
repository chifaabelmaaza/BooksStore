import { Alert, Avatar, Button, Chip, Divider, Grid, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import userService from '../../../services/user.service';

const DELIVERY_FREE = 25;

const OrderDetails = ({ order }) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");
    const [currentOrder, setCurrentOrder] = useState(order);


    const cancelOrder = () => {
        userService.cancelOrder({ idOrder: order._id }).then(result => {
            // console.log(result)
            setMessage("Order canceled successfully");
            setType("success");
            setOpen(true);
            // console.log(result)
            // const newOrder = result.data.order;
            window.location.reload();
        }).catch(err => {
            setMessage("Error while canceling order, please contact the support");
            setType("error");
            setOpen(true);
            console.log(err);
        });

    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Container >
            <Box sx={{ width: "100%", mx: "auto", mb: 1 }}>
                <Typography variant="overline" component={'p'} fontSize={20} textAlign={"center"} fontWeight={600}>Order Details</Typography>
                <Divider />

            </Box>

            <Grid container spacing={2}>

                <Grid item xs={12} sm={12} md={6}>
                    <Table sx={{ '& td , & tr, &': { border: "none", borderBottom: "1px solid gray" }, "& tr:hover": { background: 'none' }, "& th": { width: 150, textTransform: "capitalize", border: "none", borderBottom: "1px solid gray" }, width: "100%", borderColor: "none", mt: 3 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>Product</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left">Price (DH)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentOrder.products.map((item, index) => (

                                <TableRow key={index}>
                                    <TableCell align="left">
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-between" }}>
                                            <Avatar
                                                variant={'square'}
                                                src={window.IMAGE_API_URL + `products/` + item.info.image}
                                                sx={{ width: 50, height: 50 }}
                                            />
                                            <Box sx={{ ml: 1 }}>
                                                <Typography variant="body1" component={'p'} textAlign={"left"} sx={{ overflowWrap: "break-word", wordWrap: "break-word", hyphens: "auto", whiteSpace: "noraml" }}>{item.info.name}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">{item.quantity}</TableCell>
                                    <TableCell align="left">{(item.price * item.quantity).toFixed(2)}</TableCell>
                                </TableRow>

                            ))}


                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="overline" component={'p'} textAlign={"center"} fontWeight={600}>Order Info</Typography>
                    <Divider />

                    <Box sx={{ my: 2, width: "100%" }}>

                        <Grid container spacing={1} sx={{ my: 1 }}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField variant='filled' size={"small"} sx={{ width: "100%" }} autoComplete='off' label='Phone' readOnly value={currentOrder.phone} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField variant='filled' size={"small"} sx={{ width: "100%" }} label='Adress' value={currentOrder.adress} readOnly />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />
                        <Grid container spacing={1} sx={{ my: 1 }}>

                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" component={'p'} fontSize={16} textAlign={"left"}>
                                    Status:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" fontWeight={600} fontSize={12} component={'div'} textAlign={"right"}>
                                    {
                                        currentOrder.status === "pending" ? <Chip label="Pending" color="warning" size="small" />
                                            : currentOrder.status === 'delivered' ? <Chip label="Delivered" color="success" size="small" />
                                                : currentOrder.status === 'canceled' ? <Chip label="Canceled" color="error" size="small" />
                                                    : currentOrder.status === 'processing' ? <Chip label="Processing" color="info" size="small" />
                                                        : <Chip label="Unknown" color="error" size="small" />
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ my: 1 }}>

                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" component={'p'} fontSize={16} textAlign={"left"}>
                                    total:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" fontWeight={600} fontSize={16} component={'p'} textAlign={"right"}>
                                    {currentOrder.total.toFixed(2) - DELIVERY_FREE} DH
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={1} sx={{ my: 1 }}>

                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" component={'p'} fontSize={16} textAlign={"left"}>
                                    delivery fee:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" fontWeight={600} fontSize={16} component={'p'} textAlign={"right"}>
                                    {(DELIVERY_FREE).toFixed(2)} DH
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={1} sx={{ my: 1 }}>

                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" component={'p'} fontSize={16} textAlign={"left"}>
                                    Total Price:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" fontWeight={600} fontSize={16} component={'p'} textAlign={"right"}>
                                    {(currentOrder.total).toFixed(2)} DH
                                </Typography>
                            </Grid>
                        </Grid>

                    </Box>

                    {

                        order.status === "pending" ?
                            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                                <Button variant="contained" color="secondary" sx={{ px: 5, }} onClick={cancelOrder} disabled={loading}>
                                    Cancel Order
                                </Button>

                            </Box> : null
                    }
                </Grid>

                <Grid item xs={12}>
                    <Snackbar
                        open={open}
                        onClose={handleCloseAlert}
                        autoHideDuration={3000}
                    >
                        <Alert onClose={handleCloseAlert} severity={type} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </Grid>

            </Grid>
        </Container>

    );
}

export default OrderDetails;