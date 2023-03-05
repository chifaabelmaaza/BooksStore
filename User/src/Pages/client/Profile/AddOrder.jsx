import { Alert, Avatar, Button, Divider, Grid, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import userService from '../../../services/user.service';

const DELIVERY_FREE = 25;

const AddOrder = ({ cart, handleClose, total, setCart,
    setDisabledOrder }) => {

    const [user, setUser] = useState({ phone: "", adress: "" });
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");
    const [close, setClose] = useState(false);
    const [cartItems, setCartItems] = useState(cart);
    const [loading, setLoading] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {

        userService.userInfo().then((result) => {
            const user = result.data.user;
            // console.log(user);
            setUser({
                phone: user.phone,
                adress: user.adress,
            });
        }).catch(err => console.log(err));

    }, [])


    const handleOrder = () => {
        if(!user.phone || !user.adress){
            setType("error");
            setMessage("Please fill all fields");
            setOpen(true);
            return;
        }
        if(user.phone.length!== 10){
            setType("error");
            setMessage("Phone number must be 10 digits");
            setOpen(true);
            return;
        }
        if(user.adress.length < 5){
            setType("error");
            setMessage("Adress must be at least 5 characters");
            setOpen(true);
            return;
        }
        setLoading(true);
        const productsList = cartItems.map((item) => {
            return { idProduct: item.product._id, quantity: item.qty, price: item.product.price };
        });

        const data = {
            productsList: productsList,
            phone: user.phone,
            adress: user.adress,
            total: total + DELIVERY_FREE,
        }
        userService.createOrder(data).then(result => {
            setType("success");
            setMessage("Order created successfully, An agent will contact you soon to confirm your order, until then you can cancel it anytime, Thank you for choosing us!");
            setOpen(true);
            setClose(true);
            setDisabledOrder(true);
            // setCart([]);

        }).catch(err => {
            setType("error");
            setMessage("Error creating order");
            setOpen(true);
        }
        );

    }

    return (
        <Container>
            <Box sx={{ width: "100%", mx: "auto", mb: 1 }}>
                <Typography variant="overline" component={'p'} fontSize={20} textAlign={"center"} fontWeight={600}>Checkout</Typography>
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
                            {cartItems.map((item, index) => (

                                <TableRow key={index}>
                                    <TableCell align="left">
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-between" }}>
                                            <Avatar
                                                variant={'square'}
                                                src={window.IMAGE_API_URL + `products/` + item.product.image}
                                                sx={{ width: 50, height: 50 }}
                                            />
                                            <Box sx={{ ml: 1 }}>
                                                <Typography variant="body1" component={'p'} textAlign={"left"} sx={{ overflowWrap: "break-word", wordWrap: "break-word", hyphens: "auto", whiteSpace: "noraml" }}>{item.product.name}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">{item.qty}</TableCell>
                                    <TableCell align="left">{(item.product.price * item.qty).toFixed(2)}</TableCell>
                                </TableRow>

                            ))}


                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="overline" component={'p'} textAlign={"center"} fontWeight={600}>Payment</Typography>
                    <Divider />

                    <Box sx={{ my: 2, width: "100%" }}>
                        <Typography variant="body2" component={'p'} textAlign={"left"}>
                            The phone and the adress will be used to contact you and deliver your order.
                        </Typography>
                        <Typography variant="body2" component={'p'} textAlign={"left"}>
                            If you changed them here they will be used only for this order. your profile will not be updated.
                        </Typography>
                        <Grid container spacing={1} sx={{ my: 1 }}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField variant='filled' size={"small"} sx={{ width: "100%" }} autoComplete='off' label='Phone' value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField variant='filled' size={"small"} sx={{ width: "100%" }} label='Adress' value={user.adress} onChange={(e) => setUser({ ...user, adress: e.target.value })} />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />
                        <Grid container spacing={1} sx={{ my: 1 }}>

                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" component={'p'} fontSize={16} textAlign={"left"}>
                                    total price:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" fontWeight={600} fontSize={16} component={'p'} textAlign={"right"}>
                                    {total.toFixed(2)} DH
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
                                    Total:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Typography variant="overline" fontWeight={600} fontSize={16} component={'p'} textAlign={"right"}>
                                    {(total + DELIVERY_FREE).toFixed(2)} DH
                                </Typography>
                            </Grid>
                        </Grid>

                    </Box>

                    <Box>
                        <Button variant="contained" color="primary" sx={{ width: "100%" }} onClick={handleOrder} disabled={loading}>
                            Order
                        </Button>

                    </Box>
                </Grid>

                <Grid item xs={12}>
                    {
                        close ?
                            <Button variant="outlined" color="secondary" sx={{ px: 5 }} onClick={handleClose}>
                                Close
                            </Button> : null
                    }
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
    )

}

export default AddOrder;