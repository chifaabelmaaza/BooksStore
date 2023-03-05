import React, { useState, useEffect } from 'react';
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
import { FiLogOut, FiSettings } from 'react-icons/fi';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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
        if(res.data.success){
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
          role: 'Super Admin',
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return !loading && user ? (
    <>
      <Tooltip title='Account settings'>
        <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }}>
            {user.name.slice(0, 1)}
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
        {/* <MenuItem>
          <ListItemIcon>
            <FiSettings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <FiLogOut fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  ) : (
    <CircularProgress />
  );
};

export default UserMenu;
