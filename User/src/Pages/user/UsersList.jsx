import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEye, FaPen, FaTimes, FaTrash } from 'react-icons/fa';
import SearchTable from '../../components/searchBar/searchTable';
import { HiPlusSm } from 'react-icons/hi';
import {
    Avatar,
    Box,
    Button,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import userService from '../../services/user.service';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../../components/alerts/deleteconfrimation';
import ModalAddUsers from './AddUser'
import ModalUpdateUser from './EditUser'
import AlertManager from "../../components/alerts/alertMessages"



const ListUsers = () => {
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);
    const [search, setSearch] = useState('');
    const [alignment, setAlignment] = useState('list');
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [currentId, setCurrentId] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info');

    const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
    const [messageUpdate, setMessageUpdate] = useState('');
    const [typeUpdate, setTypeUpdate] = useState('info');
    const [openModel, setOpenModel] = useState(false);
    const [openUpdateModel, setOpenUpdateModel] = useState(false);

    function handleOpen() {
        setOpenModel(!openModel);
    }
    function handleOpenUpdate() {
        setOpenUpdateModel(!openUpdateModel);
    }


    useEffect(() => {
        getUsers();

        userService.userInfo().then(res => {
            setCurrentId(res.data.user._id)
        })
            .catch(err => {
                console.log(err)
            })
    }, []);

    //GETT ALL PRODUCTS
    async function getUsers() {
        try {
            userService.getUsers()
                .then(res => {
                    console.log(res.data)
                    setUsers(res.data.users)
                })
        } catch (error) {
            console.log(error);
        }
    }

    // const rendeImage = (row) => {
    //     // console.log(window.IMAGE_API_URL + `brands/` + row.image)
    //     return (
    //         <Avatar variant={'square'} sx={{ width: 32, height: 32 }}>
    //             {row.fullname.slice(0, 1)}
    //         </Avatar>
    //     );
    // };

    const columns = [
        {
            name: 'Full Name',
            selector: (row) => row.fullname,
            center: true,
            sortable: true,
            maxWidth: '50%',
        },
        {
            name: 'email',
            selector: (row) => row.email,
            center: true,
            sortable: true,
            maxWidth: '20%',
        },
        {
            name: 'username',
            selector: (row) => row.username,
            sortable: true,
            maxWidth: '50%',
        },
        {
            name: 'Created At',
            selector: (row) => new Date(row.createdAt).toLocaleDateString(),
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

                    <Tooltip title={'Update'} placement='top' arrow>
                        <IconButton sx={{ color: 'primary.main', }} disabled={currentId !== row._id} onClick={handleOpenUpdate}>
                            <FaPen style={{ fontSize: '18px', color: currentId === row._id ? '#00A97D' : 'gray' }} />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title={'Delete'} placement='top' arrow>
                        <IconButton onClick={() => fireDeleteDialog(row._id)} disabled={currentId !== row._id}>
                            <FaTrash style={{ fontSize: '18px', color: '#DC143C' }} />
                        </IconButton>
                    </Tooltip> */}
                </Box>
            ),
        },
    ];

    // const handleChangeGrpButton = (event, newAlignment) => {
    //     setAlignment(newAlignment);
    // };

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    // const fireDeleteDialog = (id) => {
    //     if (id === currentId) {

    //         setSelectedId(id);
    //         setOpenDialog(true);
    //     }
    // };



    // Toggle the state so React Data Table changes to clearSelectedRows are triggered
    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    mx: 1,
                }}
            >
                <SearchTable text={search} setText={setSearch} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                    <Button
                        variant={'contained'}
                        size={'small'}
                        onClick={handleOpen}
                        sx={{
                            borderRadius: 2,
                            mx: 1,
                            mb: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroudColor: '#778D45',
                            color: 'white',
                        }}
                    >

                        <Typography
                            sx={{ mx: 1, color: 'white', textTransform: 'capitalize' }}
                        >
                            Ajouter
                        </Typography>

                        <HiPlusSm fontSize={21} />
                    </Button>
                </Box>
            </Box>
            <Box sx={{ padding: '0 10px' }}>
                <DataTable
                    columns={columns}
                    data={users}
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

            <ModalAddUsers
                open={openModel}
                handleOpen={handleOpen}
                getUsers={getUsers}
                setOpenAlert={setOpenAlert}
                setType={setType}
                setMessage={setMessage}
            />
            <ModalUpdateUser
                open={openUpdateModel}
                handleOpen={handleOpenUpdate}
                getUsers={getUsers}
                setOpenAlert={setOpenAlert}
                setType={setType}
                setMessage={setMessage}
            />
        </Box>
    );
};

export default ListUsers;
