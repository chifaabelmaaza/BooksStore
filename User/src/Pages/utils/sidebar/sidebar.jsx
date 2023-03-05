import React from "react";
import Box from "@mui/material/Box";
import { GoHome } from "react-icons/go";
import { BsFillBasketFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { VscTag } from "react-icons/vsc";
import SidebarButton from "./sidebarButton";
import { FaUserCog } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


const AdminSideBar = ({ open, setOpen, setCurrentPage, currentPage }) => {
    function toggleMenu() {
        setOpen(!open);
    }
    const listIcons = [
        {
            text: "Home",
            icon: (
                <GoHome
                    className="nav-icons"
                    style={{ marginRight: `${open ? "15px" : 0}` }}
                    fontSize="25px"
                />
            ),
            path_link: '/dashboard'
        },
        {
            text: "Books",
            icon: (
                <BsFillBasketFill
                    className="nav-icons"
                    style={{ marginRight: `${open ? "15px" : 0}` }}
                    fontSize="25px"
                />
            ),
            path_link: 'product/list'
        },
        {
            text: "Categories",
            icon: (
                <FiMenu
                    className="nav-icons"
                    style={{ marginRight: `${open ? "15px" : 0}` }}
                    fontSize="25px"
                />
            ),
            path_link: 'categories/list'
        },
        {
            text: "Authors",
            icon: (
                <VscTag
                    className="nav-icons"
                    style={{ marginRight: `${open ? "15px" : 0}` }}
                    fontSize="25px"
                />
            ),
            path_link: 'brands/list'
        },
        {
            text: "Orders",
            icon: (
                <ReceiptLongIcon
                    className="nav-icons"
                    style={{ marginRight: `${open ? "15px" : 0}` }}
                    // fontSize="25px"
                />
            ),
            path_link: 'orders/list'
        },
        {
            text: "Admins",
            icon: (
                <FaUserCog
                    className="nav-icons"
                    style={{ marginRight: `${open ? "15px" : 0}` }}
                    fontSize="25px"
                />
            ),
            path_link: 'users/list'
        },
        {
            text: "Clients",
            icon: (
                <HiUserGroup
                    className="nav-icons"
                    style={{ marginRight: `${open ? "15px" : 0}` }}
                    fontSize="25px"
                />
            ),
            path_link: 'clients/list'
        },

    ];

    return (
        <Box sx={{
            height: "100%",
            backgroundColor: "sidebar.main",
            boxShadow: 3,
            borderRadius: "12px",
            margin: "8px 10px",
            transition: `width 1s`,
            width: open ? "270px" : "60px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            px: 1,
            flexWrap: "nowrap",
            overflow: "hidden",
        }}>

            <Box className={"scrollbar-hidden"} sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "space-between",
                flexDirection: "column",
                justifyContent: "flex-start",
                overflowX: "hidden",
                mt: 3
            }}>
                {listIcons.map((icon, index) => (
                    <SidebarButton
                        key={index}
                        open={open}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        iconButt={icon.icon}
                        textButt={icon.text}
                        link={icon.path_link}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default AdminSideBar;
