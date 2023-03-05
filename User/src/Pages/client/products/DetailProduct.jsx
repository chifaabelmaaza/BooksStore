import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { AppContext } from "../../../Context/AppContext";
import userService from "../../../services/user.service";

const DetailProduct = ({
  product,
  cart,
  setCart,
  setTypeProduct,
  setOpenAlertProduct,
  setMessageProduct,
}) => {
  const { connected } = useContext(AppContext);

  const addtoCart = () => {
    if (connected) {
      // const exist = cart.find((x) => x._id === product._id);
      const exist = cart.find((x) => {
        if (x.product._id === product._id) return x.product._id === product._id;
        else return false;
      });
      if (exist) {
        setTypeProduct("warning");
        setMessageProduct("Le produit est déjà dans le panier");
        setOpenAlertProduct(true);

        // setCart(
        //     cart.map((x) =>
        //         x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        //     )
        // );
      } else {
        userService
          .addToCart(product._id)
          .then(() => {
            setCart([...cart, { ...product, qty: 1 }]);
            setTypeProduct("success");
            setMessageProduct("Le produit a été ajouté au panier");
            setOpenAlertProduct(true);
          })
          .catch((error) => {
            console.log(error);
            setTypeProduct("error");
            setMessageProduct("Une erreur s'est produite");
            setOpenAlertProduct(true);
          });
      }
    } else {
      setTypeProduct("error");
      setMessageProduct(
        "Vous devez vous connecter pour ajouter un produit au panier"
      );
      setOpenAlertProduct(true);
    }
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 1,
                textAlign: "center",
                textTransform: "capitalize"
              }}
            >
              {product.name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <img
              src={window.IMAGE_API_URL + `products/` + product.image}
              alt={product.name}
              width={"80%"}
              style={{ borderRadius: 6, textAlign: "center", maxHeight:500 , paddingBottom:10}}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Table
              sx={{
                "& td , & th, & tr, &": { border: "none" },
                "& th": { width: 150, textTransform: "capitalize" },
                width: "100%",
                borderColor: "none",
              }}
              size="medium"
              aria-label="simple table"
            >
              <TableBody>
                <TableRow>
                  <TableCell component="th" align="left" scope="row">
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        textAlign: "left",
                        textTransform: "capitalize",
                      }}
                    >
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" align="left" scope="row">
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        textAlign: "left",
                        textTransform: "capitalize",
                      }}
                    >
                      Author
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{product.brandId.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" align="left" scope="row">
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        textAlign: "left",
                        textTransform: "capitalize",
                      }}
                    >
                      Category
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{product.categoryId.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" align="left" scope="row">
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        textAlign: "left",
                        textTransform: "capitalize",
                      }}
                    >
                      Price
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{product.price} DH</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" align="left" scope="row">
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        textAlign: "left",
                        textTransform: "capitalize",
                      }}
                    >
                      quantity
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {product.quantity > 0 ? product.quantity : "Out of stock"}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" align="left" scope="row">
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        textAlign: "left",
                        textTransform: "capitalize",
                      }}
                    >
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Box
              sx={{
                display: "flex",
                my: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" color="primary" onClick={addtoCart}>
                Ajouter au panier
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DetailProduct;
