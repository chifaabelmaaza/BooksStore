import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertManager from './alertMessages'

import productService from "../../services/product.services";
import brandService from "../../services/brand.service";
import categoryService from "../../services/category.service";
import userService from '../../services/user.service';

const DeleteConfirmation = ({ open, setOpen, type, id, getItems, setCart, cart }) => {

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const handleClose = () => {
        setOpen(false);
    };


    const handleDelete = async () => {
        if (type === 'product') {

            //Delet Product
            // async function deleteProduct(id) {
            try {
                productService.deleteProduct(id)
                    .then(() => {
                        getItems();
                        handleClose();
                        setAlertMessage("Product deleted successfully.");
                        setAlertSeverity('success');
                        setOpenAlert(true);
                    })

            } catch (error) {
                console.log(error);
                setAlertMessage("Something went wrong. Please try again later.");
                setAlertSeverity('error');
                setOpenAlert(true);
                handleClose();
            }
            // }
        }
        else if (type === 'brand') {

            //Delet Product
            // async function deleteProduct(id) {
            try {
                brandService.deleteBrand(id)
                    .then(() => {
                        getItems();
                        handleClose();
                        setAlertMessage("Brand deleted successfully.");
                        setAlertSeverity('success');
                        setOpenAlert(true);
                    })

            } catch (error) {
                console.log(error);
                setAlertMessage("Something went wrong. Please try again later.");
                setAlertSeverity('error');
                setOpenAlert(true);
                handleClose();
            }
            // }
        }
        else if (type === 'category') {

            //Delet Product
            // async function deleteProduct(id) {
            try {
                categoryService.deleteCategory(id)
                    .then(() => {
                        getItems();
                        handleClose();
                        setAlertMessage("Category deleted successfully.");
                        setAlertSeverity('success');
                        setOpenAlert(true);
                    })
                    .catch(error => {
                        console.log(error);
                        setAlertMessage("Something went wrong. Please try again later.");
                        setAlertSeverity('error');
                        setOpenAlert(true);
                        handleClose();
                    })

            } catch (error) {
                console.log(error);
                setAlertMessage("Something went wrong. Please try again later.");
                setAlertSeverity('error');
                setOpenAlert(true);
                handleClose();
            }
            // }
        }
        else if (type === 'cart') {
            // delete product from cart
            try {
                userService.removeFromCart(id)
                    .then(() => {
                        getItems();
                        const newCart = cart.filter(item => item._id !== id);
                        setCart(newCart);
                        handleClose();
                        setAlertMessage("Product deleted from cart successfully.");
                        setAlertSeverity('success');
                        setOpenAlert(true);
                    })
                    .catch(error => {
                        console.log(error);
                        setAlertMessage("Something went wrong. Please try again later.");
                        setAlertSeverity('error');
                        setOpenAlert(true);
                        handleClose();
                    })
            }
            catch (error) {
                console.log(error);
                setAlertMessage("Something went wrong. Please try again later.");
                setAlertSeverity('error');
                setOpenAlert(true);
                handleClose();
            }

        }
        else if (type === 'order') {
            userService.updateOrder({ idOrder: id, status: 'canceled' })
                .then(res => {
                    setAlertMessage("Order status updated successfully");
                    setAlertSeverity('success');
                    setOpenAlert(true);
                    getItems();
                    handleClose()
                })
                .catch(err => {
                    setAlertMessage("Error updating order status");
                    setAlertSeverity('error');
                    setOpenAlert(true);
                    handleClose()
                })
        }
        else {
            setAlertMessage("Something went wrong. Please try again later.");
            setAlertSeverity('error');
            setOpenAlert(true);
            handleClose();

        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this item?"}
                </DialogTitle>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={handleDelete} color="error" autoFocus>
                        {
                            type === 'order' ? 'Cancel Order' : 'Delete'
                        }
                    </Button>
                </DialogActions>
            </Dialog>

            <AlertManager
                open={openAlert}
                setOpen={setOpenAlert}
                message={alertMessage}
                type={alertSeverity}
            />
        </>
    )
}

export default DeleteConfirmation;