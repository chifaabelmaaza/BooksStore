import React from 'react'
import {Box, IconButton, InputBase} from "@mui/material";
import {MdOutlineSearch} from "react-icons/md";


export default function SearchTable({text, setText}) {

    return (
        <Box sx={{
            bgcolor: 'white',
            borderColor:"#778D45",
            border:"1px solid #778D45",
            color: "primary.main",
            width: 300,
            minWidth: 200,
            height: 35,
            borderRadius: 3,
            boxShadow: 0.5,
            pr:2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            position:"relative"
        }}>
            <IconButton disabled={text === ""}>
                <MdOutlineSearch fontSize={28} style={{color:'#778D45'}}/>
            </IconButton>
            <InputBase
                sx={{width: "85%", color:'#778D45'}}
                placeholder="Search in the table ..."
                inputProps={{'aria-label': 'SearchBar ...'}}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </Box>
    )
}