import React, { useState, useEffect, useContext } from 'react';
import AdminSideBar from '../Pages/utils/sidebar/sidebar';
import UserBar from '../Pages/utils/userbar/userBar';
import Box from '@mui/material/Box';
import { AppContext } from '../Context/AppContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from '../Pages/products/ProductList';
import ProductAdd from '../Pages/products/AddProduct';
import ProductUpdate from '../Pages/products/EditProduct';
import CategoriesList from '../Pages/categories/list_catg';
import BrandsList from '../Pages/brands/list_brands';
import Login from '../Pages/login/loginAdmin';
import Home from '../Pages/Home/Home';
import UsersList from '../Pages/user/UsersList';
import ListClients from '../Pages/client/ClientList';
import Dashboard from '../Pages/Home/dashboard/Dashboard';
import Navbar from '../Pages/utils/clientNavbar/userBar';
import Products from '../Pages/client/products/ListProducts';
import Cart from '../Pages/client/cart/Cart';
import Profile from '../Pages/client/Profile/Profile';
import Orders from '../Pages/client/Profile/Orders';
import AdminOrders from '../Pages/orders/Orders';
import userService from '../services/user.service';


const AppRoutes = () => {
  const { connected, userType } = useContext(AppContext);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [countCart, setCountCart] = useState(0);

  function getCurrentPage() {
    const path = window.location.pathname;
    if (path.split('/')[1] === 'authentication') {
      setCurrentPage('Login');
    }
    if (path.split('/')[1] === 'home') {
      setCurrentPage('Books Store');
    }
    if (path.split('/')[1] === 'dashboard') {
      setCurrentPage('Dashboard');
    }
    if (path.split('/')[1] === 'categories') {
      // console.log(path.split("/")[1])
      setCurrentPage('Categories');
    }
    if (path.split('/')[1] === 'product') {
      setCurrentPage('Books');
    }
    if (path.split('/')[1] === 'brands') {
      setCurrentPage('Authors');
    }
    if (path.split('/')[1] === 'users') {
      setCurrentPage('Users');
    }

    if (path.split('/')[1] === 'clients') {
      setCurrentPage('Clients');
    }
  }

  const getUserCart = () => {
    userService.getCart().then((result) => {
      // console.log(result.data.cart.lproduct);
      setCart(result.data.cart.lproduct)
      setCountCart(result.data.cart.lproduct.length)
    }).catch((error) => {
      console.log(error.message);
    })
  }

  useEffect(() => {
    if (connected && userType === 'client') {
      getUserCart();
    }
    getCurrentPage();

    // console.log('connected', connected);
  }, []);


  useEffect(() => {
    if (connected && userType === 'client') {
      // const id = result.data.user._id;
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

            // console.log(cart)
          } catch {
            cart = [];
          }
          setCart(cart);
        })
        .catch((err) => console.log(err));
    }
  }, [connected]);

  return (
    <Routes Basename='/'>
      {/* <Route path='' element={<Navigate to={'/home'} replace />} /> */}
      {/* <Route path="authentication" element={!connected ? <Login/> : <Navigate to={"/home"} replace/>}/> */}
      <Route
        path='authentication'
        element={
          !connected ? <Login /> : <Navigate to={ userType === 'admin' ?'/dashboard' : "/"} replace />
        }
      />
      
      <Route
        path='*'
        element={
          connected && userType === 'admin' ? (
            <>
              <AdminSideBar
                open={openSideBar}
                setOpen={setOpenSideBar}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  mx: 2,
                }}
              >
                <UserBar
                  open={openSideBar}
                  setOpen={setOpenSideBar}
                  currentPage={currentPage}
                />
                <Box
                  sx={{
                    width: '100%',
                    // height: '100%',
                    backgroundColor: 'white',
                    mt: 1,
                    borderRadius: 3,
                    boxShadow: 3,
                  }}
                >
                  <Routes>
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='' element={<Navigate to={ '/dashboard'} replace />} />

                    <Route path='product'>
                      <Route
                        path=''
                        element={<Navigate to={'/product/list'} replace />}
                      />
                      <Route path='list' element={<ProductList />} />
                      <Route path='add' element={<ProductAdd />} />
                      <Route path='update/:id' element={<ProductUpdate />} />
                    </Route>
                    <Route path='categories'>
                      <Route
                        path=''
                        element={<Navigate to={'/categories/list'} replace />}
                      />
                      <Route path='list' element={<CategoriesList />} />
                    </Route>

                    <Route path='brands'>
                      <Route
                        path=''
                        element={<Navigate to={'/brands/list'} replace />}
                      />
                      <Route path='list' element={<BrandsList />} />
                    </Route>

                    <Route path='users'>
                      <Route
                        path=''
                        element={<Navigate to={'/users/list'} replace />}
                      />
                      <Route path='list' element={<UsersList />} />
                    </Route>

                    <Route path='clients'>
                      <Route
                        path=''
                        element={<Navigate to={'/clients/list'} replace />}
                      />
                      <Route path='list' element={<ListClients />} />
                    </Route>
                    <Route path='orders'>
                      <Route
                        path=''
                        element={<Navigate to={'/orders/list'} replace />}
                      />
                      <Route path='list' element={<AdminOrders />} />
                    </Route>
                  </Routes>
                </Box>
              </Box>
            </>
          ) : (
            <>
              {/* <AdminSideBar
                open={openSideBar}
                setOpen={setOpenSideBar}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              /> */}
              <Box
                sx={{
                  // width: '100%',
                  width: '100vw',
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  mx: 2,
                }}
              >
                <Navbar
                  open={openSideBar}
                  setOpen={setOpenSideBar}
                  currentPage={currentPage}
                  cart={cart}
                  setCart={setCart}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
                <Box
                  className="mui_main_box"
                  sx={{
                    width: '100wh',
                    // height: '100%',
                    backgroundColor: window.location.pathname.split('/')[1] === 'home' || window.location.pathname.split('/')[1] === '' ? '#f2f2f2' : 'white',
                    mt: window.location.pathname.split('/')[1] === 'home' || window.location.pathname.split('/')[1] === '' ? 0 : 1,
                    borderRadius: window.location.pathname.split('/')[1] === 'home' || window.location.pathname.split('/')[1] === '' ? 0 : 3,
                    boxShadow: window.location.pathname.split('/')[1] === 'home' || window.location.pathname.split('/')[1] === '' ? "none" : 3,
                  }}
                >
                  <Routes>
                    <Route path='' element={<Home />} />

                    <Route path='home' element={<Home />} />
                    <Route path='client'>
                      <Route
                        path='products'
                        element={<Products cart={cart} setCart={setCart} />}
                      />
                      <Route
                        path='cart'
                        element={
                          connected ? (
                            <Cart updateCart={setCart} />
                          ) : (
                            <Navigate to={'/client/products'} replace />
                          )
                        }
                      />
                      <Route
                        path='profile'
                        element={
                          connected ? (
                            <Profile />
                          ) : (
                            <Navigate to={'/client/products'} replace />
                          )
                        }
                      />
                      <Route
                        path='orders'
                        element={
                          connected ? (
                            <Orders />
                          ) : (
                            <Navigate to={'/client/products'} replace />
                          )
                        }
                      />
                    </Route>
                  </Routes>
                </Box>
              </Box>
            </>
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
