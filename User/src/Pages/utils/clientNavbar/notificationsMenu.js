import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {IoMdNotificationsOutline} from "react-icons/io";


const NotificationMenu = () => {
    const [notificationMenu, setNotificationMenu] = React.useState(null);
    const openNotifications = Boolean(notificationMenu);
    const handleClickN = (event) => {
        setNotificationMenu(event.currentTarget);
    };
    const handleCloseN = () => {
        setNotificationMenu(null);
    };
    return (
        <>
            <Tooltip title="Notifications">
                <IconButton
                    onClick={handleClickN}
                    size="small"
                    sx={{ ml: 2 }}
                    // aria-controls={openNotifications ? 'notification-menu' : undefined}
                    // aria-haspopup="true"
                    // aria-expanded={openNotifications ? 'true' : undefined}
                >
                    <IoMdNotificationsOutline className="nav-icons" style ={{fontSize:'25px'}} color='#4e5664'/>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={notificationMenu}
                // id="notification-menu"
                open={openNotifications}
                onClose={handleCloseN}
                onClick={handleCloseN}
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
                <MenuItem> 'product is about to end !'</MenuItem>
                <Divider />
                <MenuItem> 'check this new revies !'</MenuItem>
                <Divider />
                <MenuItem>'Hello thanks for the service !'</MenuItem>
            </Menu> 
        </>  
    );
};

export default NotificationMenu;