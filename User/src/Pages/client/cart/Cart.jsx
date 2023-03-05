import { Avatar, Box, Button, Container, Divider, Grid, IconButton, InputBase, Modal, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import DeleteConfirmation from '../../../components/alerts/deleteconfrimation';
import userService from '../../../services/user.service';
import DoneIcon from '@mui/icons-material/Done';
import AlertMessage from '../../../components/alerts/alertMessages';
import AddOrder from '../Profile/AddOrder';

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


const QuantityComponent = ({ row, cart, setCart }) => {

    const [qty, setQty] = useState(row.qty);


    const updateQty = () => {
        if (parseInt(row.qty) <= 1) {
            setQty(1)
        }
        userService.updateCartQty({ idproduct: row.product._id, qty: qty }).then(result => {
            setCart(cart.map((item) => item.product._id === row.product._id ? { ...item, qty: parseInt(row.qty) >= 1 ? qty : 1 } : item))
            setQty(qty)
        })
            .catch(err => console.log(err))
    }

    return (
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>

            <InputBase
                sx={{ ml: 3, mr: 2, flex: 1, }}
                placeholder="Prix min"
                inputProps={{ 'aria-label': 'Chercher un produit', min: 1, max: 100 }}
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)} />

            <Tooltip title="Confirm">
                <IconButton onClick={updateQty} color={"primary"} disabled={parseInt(row.qty) === parseInt(qty)}>
                    <DoneIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};


const Cart = ({ updateCart }) => {

    const [cart, setCart] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");
    const [disabledOrder, setDisabledOrder] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    useEffect(() => {
        userService
            .getCart()
            .then((result) => {
                let cart = [];
                try {
                    // cart = ;
                    // change the key idPoroduct to product

                    cart = result.data.cart.lproduct.map((item) => {
                        return { product: item.idproduct, qty: item.quantity };
                    });
                } catch {
                    cart = [];
                }
                setCart(cart);
                updateCart(cart);
            })
            .catch((err) => console.log(err));


    }, []);

    const [total, setTotal] = useState(0);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const rendeImage = (image) => {
        return (
            <Avatar
                variant={'square'}
                src={window.IMAGE_API_URL + `products/` + image}
                sx={{ width: 50, height: 50 }}
            />
        );
    };

    const fireDeleteDialog = (id) => {
        setSelectedId(id);
        setOpenDialog(true);
    };

    useEffect(() => {
        let total = 0;
        cart.forEach((item) => {
            total += item.product.price * item.qty;

        });
        setTotal(total);
    }, [cart]);



    const checkout = () => {
        if(!disabledOrder){

            handleOpen();
        }
        //clear cart

    }



    const columns = [
        {
            name: 'Image',
            selector: (row) => rendeImage(row.product.image),
            sortable: false,
            maxWidth: '80px',
        },
        {
            name: 'Nom',
            selector: (row) => row.product.name,
            center: true,
            sortable: true,
            maxWidth: '50%',
        },
        {
            name: 'Quantite',
            selector: (row) => <QuantityComponent row={row} cart={cart} setCart={setCart} />,

            // <InputBase
            //     sx={{ ml: 3, mr: 1, flex: 1, }}
            //     placeholder="Prix min"
            //     inputProps={{ 'aria-label': 'Chercher un produit', min: 0, max: 100 }}
            //     type="number"
            //     value={row.qty}
            //     onChange={(e) => setCart(cart.map((item) => item.product._id === row.product._id ? { ...item, qty: e.target.value } : item))} />,
            center: true,
            sortable: true,
            maxWidth: '20%',
        },
        {
            name: 'Prix',
            selector: (row) => (row.product.price).toFixed(2),
            sortable: true,
            maxWidth: '50%',
        },
        {
            name: 'Prix Total en DH',
            selector: (row) => (row.product.price * row.qty).toFixed(2),
            sortable: true,
            maxWidth: '50%',
        },

        {
            name: 'Actions',
            sortable: false,
            maxWidth: '30%',
            center: true,
            selector: (row) => (
                <Box
                    sx={{
                        display: 'flex',
                        align: 'center',
                        justifyContent: 'space-between',
                    }}
                >

                    <Tooltip title={'Delete'} placement='top' arrow>
                        <IconButton onClick={() => fireDeleteDialog(row.product._id)}>
                            <FaTrash style={{ fontSize: '18px', color: '#DC143C' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    const getCart = () => {
        userService
            .getCart()
            .then((result) => {
                let cart = [];
                try {
                    cart = result.data.cart.lproduct.map((item) => {
                        return { product: item.idproduct, qty: item.quantity };
                    });
                    // console.log(cart)
                } catch {
                    cart = [];
                }
                setCart(cart);
            })
            .catch((err) => console.log(err));
    }


    return (
        <Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "90%", mx: "auto", my: 2 }}>
                <Typography variant="overline" fontSize={26} fontWeight={600}>My Cart</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="overline" fontSize={26} fontWeight={600}>Total: {total} DH</Typography>
                <Divider orientation="vertical" flexItem />
                <Button variant="contained" color="success" onClick={checkout} disabled={disabledOrder}>Checkout</Button>
            </Box>
            <Divider />
            <Box sx={{ py: 5 }}>
                <DataTable
                    columns={columns}
                    data={cart}
                    // selectableRows
                    // onSelectedRowsChange={handleChange}
                    // clearSelectedRows={toggledClearRows}
                    // pagination
                    fixedHeader
                    fixedHeaderScrollHeight='540px'
                />
            </Box>
            <DeleteConfirmation
                open={openDialog}
                setOpen={setOpenDialog}
                type={'cart'}
                id={selectedId}
                setCart={setCart}
                cart={cart}
                getItems={getCart}
            />

            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddOrder setType={setType} setMessage={setMessage} setOpen={setOpen} cart={cart} setCart={setCart} handleClose={handleClose} total={total} disabledOrder={disabledOrder} setDisabledOrder={setDisabledOrder}/>
                </Box>
            </Modal>

            <AlertMessage type={type} open={open} setOpen={setOpen} message={message} />
        </Box>
    )
}


export default Cart