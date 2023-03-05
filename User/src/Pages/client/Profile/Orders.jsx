import { Box, Button, Chip, Container, Divider, Modal, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import userService from '../../../services/user.service';
import productService from '../../../services/product.services';
import OrderDetails from './OrderDetails';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {md:"90%", xl:"60%"},
    bgcolor: 'white',
    // border: '2px solid #000',
    boxShadow: 24,
    p: {md:2, xl:4},
    borderRadius: 3,
    maxHeight: "80vh",
    overflowY: "auto"
};

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [open, setOpen] = useState(false);

    const handleOpen = (order) => {
        setOpen(true);
        setSelectedOrder(order)
    }

    const handleClose = () => setOpen(false);


    useEffect(() => {

        userService.getOrders().then(result => {
            result.data.orders.forEach(order => {
                order.products = [];
                order.productsList.forEach((product, index) => {
                    productService.getProductById(product.idProduct).then(result => {
                        order.products.push({ ...product, info: result.product });

                    }).catch(err => console.log(err));
                });

            }
            );

            console.log(result.data.orders)
            setOrders(result.data.orders);

        }).catch(err => console.log(err));


    }, []);

    return (
        <Container sx={{ minHeight: "80vh", pb: 4 }}>
            <Box sx={{ width: "90%", mx: "auto", my: 2 }}>
                <Typography variant="overline" fontSize={26} fontWeight={600}>My Orders</Typography>
            </Box>
            <Divider />
            <Table sx={{ '& td , & tr, &': { border: "none", borderBottom: "1px solid gray" }, "& tr:hover": { background: 'none' }, "& th": { width: 150, textTransform: "capitalize", border: "none", borderBottom: "1px solid gray" }, width: "100%", borderColor: "none", mt: 3 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Order ID</TableCell>
                        <TableCell align="left">Number of products</TableCell>
                        <TableCell align="left">Total Price (DH)</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Details</TableCell>
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

                                    <TableCell align="center">
                                        <Button variant="text" size="small" color="primary" onClick={() => handleOpen(item)}>
                                            View
                                        </Button>
                                    </TableCell>

                                </TableRow>

                            )) : <TableRow>
                                <TableCell align="center" colSpan={4}>No orders yet</TableCell>
                            </TableRow>
                    }


                </TableBody>
            </Table>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                   <OrderDetails order={selectedOrder} />
                </Box>
            </Modal>
        </Container>
    )
}

export default Orders