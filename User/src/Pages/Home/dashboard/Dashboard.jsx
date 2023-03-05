import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Statistic from "./Statisctic";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import GroupIcon from "@mui/icons-material/Group";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Image1 from "./images/51ECRZXoGyL._SY346_.jpg";
import Image2 from "./images/41DE1QUjacL.jpg";
import Image3 from "./images/41jtehS-nhL._SY346_.jpg";
import Image4 from "./images/51ovLviBXvL._SY346_.jpg";
import Image5 from "./images/41wYTfu3ffL._SY346_.jpg";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const revenu_orders = [
    {
      name: "January",
      orders: 520,
      revenue: 25600,
    },
    {
      name: "February",
      orders: 320,
      revenue: 18000,
    },
    {
      name: "March",
      orders: 600,
      revenue: 50000,
    },
    {
      name: "April",
      orders: 550,
      revenue: 30000,
    },
    {
      name: "May",
      orders: 400,
      revenue: 15560,
    },
    {
      name: "June",
      orders: 20,
      revenue: 10000,
    },
    {
      name: "July",
      orders: 200,
      revenue: 30000,
    },
    {
      name: "August",
      orders: 250,
      revenue: 25000,
    },
    {
      name: "September",
      orders: 100,
      revenue: 60000,
    },
    {
      name: "October",
      orders: 555,
      revenue: 45215,
    },
    {
      name: "November",
      orders: 352,
      revenue: 32641,
    },
    {
      name: "December",
      orders: 1000,
      revenue: 100000,
    },
  ];

  const data02 = [
    {
      name: "Memoirs",
      value: 2400,
    },
    {
      name: "Personal Finance",
      value: 4567,
    },
    {
      name: "True Crime",
      value: 1398,
    },
    {
      name: "Romance",
      value: 9800,
    },
    {
      name: "Travel",
      value: 3908,
    },
    {
      name: "History",
      value: 4800,
    },
  ];

  const products = [
    {
      name: "Fairy Tale",
      image: Image1,
    },
    {
      name: "Our Missing Hearts",
      image: Image2,
    },
    {
      name: "The Christie Affair",
      image: Image3,
    },
    {
      name: "Tanqueray",
      image: Image4,
    },
    {
      name: "Things We Do in the Dark",
      image: Image5,
    },
  ];

  return (
    <Box
      sx={{ mb: 3, height: "90vh", overflowY: "auto" }}
      className="scrollbar-hidden"
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          height: { sm: 150, md: 200 },
          borderRadius: 3,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          px: 4,
          py: { xs: 3, md: 7 },
        }}
      >
        <Typography
          variant="body2"
          fontSize={24}
          color="white"
          component={"div"}
        >
          Welcome back to the Dashboard of{" "}
          <Typography variant="overline" fontSize={25} fontWeight={500}>
            Books Shope
          </Typography>
        </Typography>
      </Box>
      <Container maxWidth={"xl"}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            mt: { xs: 1, md: -6 },
          }}
        >
          <Statistic
            title="Out of stock"
            number={10}
            icon={<ProductionQuantityLimitsIcon fontSize="large" />}
          />
          <Statistic
            title="Total sales"
            number={265}
            icon={<LocalMallIcon fontSize="large" />}
          />
          <Statistic
            title="Total orders"
            number={89}
            icon={<StarPurple500Icon fontSize="large" />}
          />
          <Statistic
            title="Visitors"
            number={6522}
            icon={<GroupIcon fontSize="large" />}
          />
          <Statistic
            title="Revenue"
            number={3500 + "DH"}
            icon={<AttachMoneyIcon fontSize="large" />}
          />
        </Box>

        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item sm={12} md={9} sx={{ boxShadow: 2, borderRadius: 3 }}>
            <Typography
              variant="overline"
              component={"p"}
              fontSize={22}
              fontWeight={500}
              color="darkText.main"
              textAlign={"left"}
            >
              Revenue / Orders
            </Typography>
            <Divider sx={{ mb: 2, width: "90%" }} />
            <Box sx={{ mb: 2 }}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenu_orders} syncId="revenu_order_id">
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#e25939" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#e25939" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#e25939"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <ResponsiveContainer
                width="100%"
                height={300}
                // margin={{ top: 10, right: 60, left: 0, bottom: 0 }}
              >
                <AreaChart data={revenu_orders} syncId="revenu_order_id">
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#e25939" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#e25939" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Legend verticalAlign="top" height={36} />

                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorOrder)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item sm={12} md={3} className="pt-0">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Box sx={{ boxShadow: 2, borderRadius: 3, width: "100%", px: 2 }}>
                <Typography
                  variant="overline"
                  component={"p"}
                  fontSize={18}
                  fontWeight={500}
                  color="darkText.main"
                  textAlign={"left"}
                >
                  Sales
                </Typography>
                <Divider sx={{ mb: 2, width: "90%" }} />

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                  <Pie
          data={data02}
          // cx={120}
          cy={150}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          nameKey="name"
          dataKey="value"
          label
        >
          {data02.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
                    {/* <Pie
                      data={data02}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      // fill="#4c8774"
                      // label
                    /> */}

                    {/* {data02.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))} */}

                    <Legend verticalAlign="top" height={36} />

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              <Box
                sx={{
                  boxShadow: 2,
                  borderRadius: 3,
                  width: "100%",
                  px: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant="overline"
                  component={"p"}
                  fontSize={18}
                  fontWeight={500}
                  color="darkText.main"
                  textAlign={"left"}
                >
                  Out of stock
                </Typography>
                <Divider sx={{ mb: 2, width: "90%" }} />
                {products.map((product, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Avatar
                      src={product.image}
                      sx={{ width: 50, height: 50, borderRadius: 1, mr: 4 }}
                      variant="square"
                    />
                    <Typography
                      variant="overline"
                      component={"p"}
                      fontSize={16}
                      fontWeight={500}
                      color="darkText.main"
                      textAlign={"left"}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
