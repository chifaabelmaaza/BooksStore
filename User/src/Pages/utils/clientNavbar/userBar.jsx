import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, IconButton, Button, Divider, Modal, Stack, Menu, MenuItem, Avatar } from '@mui/material';
// import MessageMenu from './messageMenu';
// import NotificationMenu from './notificationsMenu';
import UserMenu from './userMenu';
import { MdArrowForwardIos } from "react-icons/md";
import { AppContext } from '../../../Context/AppContext';
import LoginClient from '../../login/ClientLogin';
import RegisterClient from '../../login/ClientRegister';
import { Link, useNavigate } from 'react-router-dom';
import brandService from '../../../services/brand.service';
import categoryService from '../../../services/category.service';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};


const Navbar = ({ open, setOpen, currentPage, wishlist, setWishlist, setCart, cart }) => {
    

    const navigate = useNavigate();

    const { connected, token } = useContext(AppContext)

    const [openModal, setOpenModal] = useState(false);
    const [selectedPage, setSelectedPage] = useState(0);

    const [anchorCatEl, setAnchorCatEl] = useState(null);
    const [anchorBraEl, setAnchorBraEl] = useState(null);

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)


    const openCategories = Boolean(anchorCatEl);
    const openBrands = Boolean(anchorBraEl);

    const handleClickCategories = (event) => {
        setAnchorCatEl(event.currentTarget);
    };

    const handleClickBrands = (event) => {
        setAnchorBraEl(event.currentTarget);
    };

    const handleCloseCategories = () => {
        setAnchorCatEl(null);
    };

    const handleCloseBrands = () => {
        setAnchorBraEl(null);
    };

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleLoginModal = () => {
        setSelectedPage(0);
        handleOpen();
    }
    const handleRegisterModal = () => {
        setSelectedPage(1);
        handleOpen();
    }

    useEffect(() => {
        setLoading(true)
        categoryService.getAllCategories().then((res) => {
            setCategories(res.categories)
            setLoading(false)
        })
            .catch((err) => {
                console.log(err)
                setLoading(true)
            })

        brandService.getAllBrands().then((res) => {
            setBrands(res.brands)
            setLoading(false)
        })
            .catch((err) => {
                console.log(err)
                setLoading(true)
            })

    }, [])


    const searchForCategory = (id) => {
        window.location.href = `/client/products?category=${id}`
        // navigate(`/client/products?category=${id}`)
        handleCloseCategories()
    }

    const searchForBrand = (id) => {
        window.location.href = `/client/products?brand=${id}`
        // navigate(`/client/products?brand=${id}`)
        handleCloseBrands()
    }


    return (

        loading ? <div>Loading...</div> :
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'space-between',
            width: '100%',
            my: 1,
        }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* <IconButton
                    sx={{
                        borderRadius: 3,
                        transition: "transform 0.5s",
                        fontSize: 20,
                        color: "primary.main",
                        transform: open ? "rotate(-180deg)" : "rotate(0deg)",
                        // "&:hover": {color: "primary.main"}
                    }} onClick={() => setOpen(!open)}>
                    <MdArrowForwardIos />
                </IconButton> */}
                <Typography sx={{ mx:1  }} variant={'h4'} color={'primary'}>
                    BooksStore
                </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
                <Button variant='text'color="primary" onClick={()=> {window.location.href = "/"}}>Home</Button>
                <Button variant='text' color="primary" onClick={()=>{window.location.href = "/client/products"}}>Books</Button>
                <Button variant='text' id="brand-button" color="primary" aria-controls={openCategories ? 'category-menu' : undefined} aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined} onClick={handleClickCategories} >Categories</Button>
                <Button variant='text' id="category-button" color="primary" aria-controls={openBrands ? 'brand-menu' : undefined} aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined} onClick={handleClickBrands} >Authors</Button>
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {
                    !connected ?

                        //  <Box>
                            <Button variant='contained' color="primary" onClick={handleLoginModal} sx={{px:3, py:1, borderRadius:5}}>
                                Login
                            </Button>
                        // </Box> 
                        :
                         <UserMenu wishlist={wishlist} setWishlist={setWishlist} setCart={setCart} cart={cart} />
                }
                {/* <MessageMenu/>
                <NotificationMenu/> */}

            </Box>

            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                        Welcome To BooksStore - {selectedPage === 0 ? "Login" : "Register"}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {
                        selectedPage === 0 ?
                            <LoginClient setSelectedPage={setSelectedPage} handleClose={handleClose} />
                            :
                            <RegisterClient setSelectedPage={setSelectedPage} handleClose={handleClose} />
                    }
                </Box>
            </Modal>

            <Menu
                id="category-menu"
                anchorEl={anchorCatEl}
                open={openCategories}
                onClose={handleCloseCategories}
                MenuListProps={{
                    'aria-labelledby': 'category-button',
                }}
            >
                {
                    categories.map((category, index) => (
                        <MenuItem key={index} onClick={() => searchForCategory(category._id)}>
                            <Avatar
                                variant={"square"}
                                src={window.IMAGE_API_URL + `categories/` + category.image}
                                sx={{ width: 30, height: 30, mr: 1 }}
                            /> {category.name}
                        </MenuItem>
                    ))
                }

            </Menu>

            <Menu
                id="brand-menu"
                anchorEl={anchorBraEl}
                open={openBrands}
                onClose={handleCloseBrands}
                MenuListProps={{
                    'aria-labelledby': 'brand-button',
                }}
            >
                {
                    brands.map((brand, index) => (
                        <MenuItem key={index} onClick={() => searchForBrand(brand._id)}>
                            <Avatar
                                variant={"square"}
                                src={window.IMAGE_API_URL + `brands/` + brand.image}
                                sx={{ width: 30, height: 30, mr: 1 }}
                            /> {brand.name}
                        </MenuItem>
                    ))
                }
            </Menu>
        </Box>

    );
};
export default Navbar;