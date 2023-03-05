import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import userService from '../../../services/user.service';
import CircularProgress from '@mui/material/CircularProgress';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { AppContext } from '../../../Context/AppContext';
import { IoNewspaperOutline } from 'react-icons/io5'
import { Badge, Stack } from '@mui/material';
// import { AiFillHeart } from 'react-icons/ai';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';


const UserMenu = ({ wishlist, setWishlist, setCart, cart }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // const { token, setToken } = useContext(AppContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    userService
      .logout()
      .then((res) => {
        if (res.data.success) {
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    userService
      .userInfo()
      .then((result) => {
        const user = result.data.user;
        // console.log(user);
        setUser({
          name: user.fullname,
          username: user.username,
          email: user.email,
          role: user.role,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return !loading && user ? (
    <>
      <Stack direction="row" spacing={2}>

        <Badge badgeContent={cart.length} overlap="circular" color="primary">
          <Tooltip title='Cart'>
            <IconButton size='small' sx={{ mx: 1, borderRadius: 3 }} component={Link} to={'/client/cart'}>
              <ShoppingBagIcon />
            </IconButton>
          </Tooltip>
        </Badge>

        {/* <Tooltip title='Wishlist'>
          <Badge badgeContent={wishlist.length} overlap="circular" color="primary">
            <IconButton size='small' sx={{ mx: 1, borderRadius: 3 }}>
              <FavoriteIcon />
            </IconButton>
          </Badge>
        </Tooltip> */}



        <Box sx={{ display: "flex" }}>
          <Tooltip title='Account settings'>
            <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.name.slice(0, 1).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              ml: 1,
            }}
          >
            <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
              {user.name}
            </Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: 'italic' }}>
              {user.role}
            </Typography>
          </Box>

          <Menu
            anchorEl={anchorEl}
            // id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem component={Link} to="/client/profile">
              <ListItemIcon>
                <FiUser fontSize='small' />
              </ListItemIcon>
              Profile
            </MenuItem>

            <MenuItem component={Link} to="/client/orders">
              <ListItemIcon>
                <IoNewspaperOutline fontSize='small' />
              </ListItemIcon>
              My orders
            </MenuItem>

            <MenuItem onClick={logout}>
              <ListItemIcon>
                <FiLogOut fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>

      </Stack>

    </>
  ) : (
    <CircularProgress />
  );
};

export default UserMenu;
