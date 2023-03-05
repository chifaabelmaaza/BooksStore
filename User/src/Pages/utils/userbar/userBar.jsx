import React from 'react';
import {Box,Typography,IconButton} from '@mui/material';
// import MessageMenu from './messageMenu';
// import NotificationMenu from './notificationsMenu';
import UserMenu from './userMenu';
import {MdArrowForwardIos} from "react-icons/md";

const UserBar = ({open,setOpen,currentPage}) => {

    return (

        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'space-between',
            width: '100%',
            my:1,
        }}>
             <Box sx={{display:"flex", alignItems:"center"}}>
                <IconButton
                    sx={{
                        borderRadius: 3,
                        transition: "transform 0.5s",
                        fontSize: 20,
                        color: "primary.main",
                        transform: open ? "rotate(-180deg)" : "rotate(0deg)",
                        // "&:hover": {color: "primary.main"}
                    }} onClick={() => setOpen(!open)}>
                    <MdArrowForwardIos/>
                </IconButton>
                <Typography sx={{ml:3}} variant={'h4'} color={'primary'}>
                    {currentPage} 
                </Typography>
        </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <UserMenu/>
            </Box>
        </Box>

    );
};
export default UserBar;