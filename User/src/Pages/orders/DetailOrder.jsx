import { Alert, Avatar, Button, Chip, Divider, Grid, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import productService from '../../services/product.services';

const DELIVERY_FREE = 25;

const DetailOrder = ({ order }) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");
    const [newOrder, setNewOrder] = useState({ ...order, products: [] });



    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        let list = []
        // setLoading(true)
        order.productsList.forEach((product, index) => {


            productService.getProductById(product.idProduct).then(result => {
                // console.log(result.product)

                // check if the product not already in the products list
                if (list.filter(item => item._id === result.product._id).length === 0) {
                    list.push(result.product);
                    setNewOrder({ ...order, products: list });
                }
            }).catch(err => console.log(err));
        });

        // setNewOrder({ ...order, products: list });

    }, [])


    // useEffect(() => {

    //     console.log(newOrder)

    // }, [newOrder])

    // return console.log("")
    return (
        newOrder.products.length > 0 ?
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
                                {newOrder.products.map((item, index) => (

                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-between" }}>
                                                <Avatar
                                                    variant={'square'}
                                                    src={window.IMAGE_API_URL + `products/` + item.image}
                                                    sx={{ width: 50, height: 50 }}
                                                />
                                                <Box sx={{ ml: 1 }}>
                                                    <Typography variant="body1" component={'p'} textAlign={"left"} sx={{ overflowWrap: "break-word", wordWrap: "break-word", hyphens: "auto", whiteSpace: "noraml" }}>{item.name}</Typography>
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
                                    <TextField variant='filled' size={"small"} sx={{ width: "100%" }} autoComplete='off' label='Phone' readOnly value={newOrder.phone} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField variant='filled' size={"small"} sx={{ width: "100%" }} label='Adress' value={newOrder.adress} readOnly />
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
                                            newOrder.status === "pending" ? <Chip label="Pending" color="warning" size="small" />
                                                : newOrder.status === 'delivered' ? <Chip label="Delivered" color="success" size="small" />
                                                    : newOrder.status === 'canceled' ? <Chip label="Canceled" color="error" size="small" />
                                                        : newOrder.status === 'processing' ? <Chip label="Processing" color="info" size="small" />
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
                                        {newOrder.total.toFixed(2) - DELIVERY_FREE} DH
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
                                        {(newOrder.total).toFixed(2)} DH
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Box>


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
            : null
    );
}

export default DetailOrder;