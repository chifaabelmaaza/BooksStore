import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Statistic = ({ title, number, icon }) => {
  return (
    // <Box sx={{}}>
    <Grid
      container
      spacing={2}
      sx={{
        p: 1,
        bgcolor: "white",
        width: 250,
        minHeight: 100,
        boxShadow: 3,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt:1
      }}
    >
      <Grid
        item
        xs={12}
        md={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ color: "primary.main" }}>{icon}</Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          display: "flex",
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="overline"
          fontSize={18}
          fontWeight={500}
          lineHeight={1}
          color="primary.main"
        >
          {title}
        </Typography>
        <Typography
          variant="overline"
          fontSize={25}
          fontWeight={500}
          lineHeight={2}
          color="darkText.main"
        >
          {number}
        </Typography>
      </Grid>
    </Grid>
    // </Box>
  );
};

export default Statistic;
