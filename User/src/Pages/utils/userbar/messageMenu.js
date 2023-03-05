import React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {TbMessageCircle2} from "react-icons/tb";

const MessageMenu = () => {
    const [messageMenu, setMessageMenu] = React.useState(null);
    const openMessages = Boolean(messageMenu);
    const handleClickM = (event) => {
        setMessageMenu(event.currentTarget);
    };
    const handleCloseM = () => {
        setMessageMenu(null);
    };
    return (
        <>
            <Tooltip title="Messages">
                <IconButton
                    onClick={handleClickM}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={openMessages ? 'message-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMessages ? 'true' : undefined}
                >
                    <TbMessageCircle2 className="nav-icons" style ={{fontSize:'25px'}} color='#4e5664'/>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={messageMenu}
                id="message-menu"
                open={openMessages}
                onClose={handleCloseM}
                onClick={handleCloseM}
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
                <MenuItem>
                    <Avatar /> 'Hello !'
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Avatar /> 'New command !'
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Avatar /> 'Hello thanks for the service !'
                </MenuItem>
            </Menu> 
        </>  
    );
};

export default MessageMenu;