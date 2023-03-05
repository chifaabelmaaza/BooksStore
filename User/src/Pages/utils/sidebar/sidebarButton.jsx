import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

const SidebarButton = ({
  open,
  iconButt,
  textButt,
  link,
  setCurrentPage,
  currentPage,
}) => {
  const navigate = useNavigate();
  function handleClick(){
    setCurrentPage(textButt)
    navigate(link)
  }


  return (
    <Tooltip title={`${open ? "" : textButt}`} placement="top-end" arrow>
      <Button
        className="menu-icons"
        onClick={handleClick}
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
          my: 1,
          width: "100%",
          overflow: "hidden",
          color:
            currentPage === textButt
              ? "passiveButtonSidebar.main"
              : "#FFF6F4",
        }}
      >
        <Grid container spacing={6} sx={{ flexWrap: "nowrap" }}>
          <Grid item xs={1}>
            {iconButt}
          </Grid>
          <Grid item xs={11}>
            <Typography noWrap variant="body1" textAlign={"left"}>
              {textButt}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </Tooltip>
  );
};

export default SidebarButton;
