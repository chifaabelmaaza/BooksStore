import { Button, Chip, Divider, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import userService from '../../services/user.service';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import DataTable from 'react-data-table-component';
import AlertManager from "../../components/alerts/alertMessages"
import DetailOrder from './DetailOrder'
import DeleteConfirmation from '../../components/alerts/deleteconfrimation';

const Status = ({ status }) => {

    return (
        <Typography variant="overline" fontWeight={600} fontSize={12} component={'div'} textAlign={"right"}>
            {
                status === "pending" ? <Chip label="Pending" color="warning" size="small" />
                    : status === 'delivered' ? <Chip label="Delivered" color="success" size="small" />
                        : status === 'canceled' ? <Chip label="Canceled" color="error" size="small" />
                            : status === 'processing' ? <Chip label="Processing" color="info" size="small" />
                                : <Chip label="Unknown" color="error" size="small" />
            }
        </Typography>
    )

}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: "90%", xl: "60%" },
    bgcolor: 'white',
    // border: '2px solid #000',
    boxShadow: 24,
    p: { md: 2, xl: 4 },
    borderRadius: 3,
    maxHeight: "80vh",
    overflowY: "auto"
};

const AdminOrders = () => {

    // const [selectedRows, setSelectedRows] = React.useState(false);
    // const [toggledClearRows, setToggleClearRows] = React.useState(false);
    // const [search, setSearch] = useState('');
    // const [alignment, setAlignment] = useState('list');
    const [orders, setOrders] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [currentId, setCurrentId] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info');
    const [open, setOpen] = useState(false);
    // const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
    // const [messageUpdate, setMessageUpdate] = useState('');
    // const [typeUpdate, setTypeUpdate] = useState('info');
    const [openModel, setOpenModel] = useState(false);
    // const [openUpdateModel, setOpenUpdateModel] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});


    // function handleOpen() {
    //     setOpenModel(!openModel);
    // }
    // function handleOpenUpdate() {
    //     setOpenUpdateModel(!openUpdateModel);
    // }

    const getOrders = () => {
        userService.getAllOrders().then(res => {
            // console.log(res.data.orders)
            setOrders(res.data.orders)
        })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getOrders();
    }, []);


    
  const fireCancelDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };


    const viewOrder = (order) => {
        setSelectedOrder(order);
        setOpenModal(true);
    }


    const updateStatus = (id, status) => {
        if (status !== 'canceled') {

            userService.updateOrder({ idOrder: id, status })
                .then(res => {
                    setMessage("Order status updated successfully");
                    setType('success');
                    setOpen(true);
                    getOrders();
                })
                .catch(err => {
                    setMessage("Error updating order status");
                    setType('error');
                    setOpen(true);
                })
        }
        else{
            fireCancelDialog(id);
        }
    }

    const columns = [
        {
            name: 'Order ID',
            selector: (row) => row._id.slice(0, 6),
            center: true,
            sortable: true,
            maxWidth: '10%',
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
            center: true,
            sortable: true,
            maxWidth: '10%',
        },
        {
            name: 'Number of Products',
            selector: (row) => row.productsList.length,
            center: true,
            sortable: true,
            maxWidth: '20%',
        },
        {
            name: 'Total Price',
            selector: (row) => (row.total).toFixed(2) + " DH",
            sortable: true,
            center: true,
            maxWidth: '10%',
        },
        {
            name: 'Created At',
            selector: (row) => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
            center: true,
            maxWidth: '10%',
        },
        {
            name: 'Status',
            selector: (row) => <Status status={row.status} />,
            sortable: true,
            center: true,
            maxWidth: '50%',
        },
        {
            name: 'Actions',
            sortable: false,
            maxWidth: '50%',
            center: true,
            selector: (row) => (
                <Box
                    sx={{
                        display: 'flex',
                        align: 'center',
                        justifyContent: 'space-around',
                    }}
                >

                    <Tooltip title={'Pending'} placement='top' arrow>
                        <IconButton sx={{ color: 'warning', }} size="small" disabled={row.status === 'pending' || row.status === 'canceled'} onClick={() => updateStatus(row._id, 'pending')}>
                            <PauseCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={'processing'} placement='top' arrow>
                        <IconButton sx={{ color: 'primary.main', }} size="small" disabled={row.status === 'processing' || row.status === 'canceled'} onClick={() => updateStatus(row._id, 'processing')}>
                            <AccessTimeIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={'Delivered'} placement='top' arrow>
                        <IconButton sx={{ color: 'success', }} size="small" disabled={row.status === 'delivered' || row.status === 'canceled'} onClick={() => updateStatus(row._id, 'delivered')}>
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={'Cancelled'} placement='top' arrow>
                        <IconButton sx={{ color: 'error', }} size="small" disabled={row.status === 'canceled'} onClick={() => updateStatus(row._id, 'canceled')}>
                            <CancelIcon />
                        </IconButton>
                    </Tooltip>


                    <Tooltip title={'View'} placement='top' arrow>
                        <IconButton sx={{ color: 'primary.main', }} size="small" onClick={() => viewOrder(row)}>
                            <SavedSearchIcon />
                        </IconButton>
                    </Tooltip>

                </Box>
            ),
        },
    ];


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: "100%", mx: "auto", my: 2 }}>
                <Typography variant="overline" fontSize={26} fontWeight={600}>Orders</Typography>
                <Divider sx={{ mb: 2 }} />

            </Box>
            <Box sx={{ padding: '0 10px' }}>
                <DataTable
                    columns={columns}
                    data={orders}
                    // selectableRows
                    // onSelectedRowsChange={handleChange}
                    //clearSelectedRows={toggledClearRows}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='540px'
                />
            </Box>

            {/* <DeleteConfirmation
                open={openDialog}
                setOpen={setOpenDialog}
                type={'user'}
                id={selectedId}
                getItems={getUsers}
            /> */}

            <AlertManager
                open={openAlert}
                setOpen={setOpenAlert}
                message={message}
                type={type}
            />


            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DetailOrder order={selectedOrder} />
                </Box>
            </Modal>

            <DeleteConfirmation
                open={openDialog}
                setOpen={setOpenDialog}
                type={'order'}
                id={selectedId}
                getItems={getOrders}
            />


        </Box>
    )
}
export default AdminOrders