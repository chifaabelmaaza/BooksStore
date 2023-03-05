import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import productService from '../../services/product.services';
import AlertManager from '../../components/alerts/alertMessages';
import { Container } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
const DetailProduct = ({ id }) => {


    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({ name: "", description: "", price: 0, stock: 0, image: "" });
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('An error has occurred, please try again later');
    const [type, setType] = useState('error');

    useEffect(() => {
        setLoading(true);
        productService.getProductById(id).then((res) => {
            console.log(res.product)
            setProduct(res.product)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setProduct(null)
            setLoading(true)
            setOpenAlert(true)
        });

    }, [id])


    return (
        loading ? <Box sx={{ width: "100%", textAlign: "center", my: 3 }}> <CircularProgress /> </Box> :
            <Box>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h3" sx={{ fontWeight: 600, mb: 1, textAlign: 'center', textTransform: "capitalize" }}>{product.name}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={window.IMAGE_API_URL + `products/` + product.image} alt={product.name} width={"80%"} style={{ borderRadius: 6, textAlign: "center", maxHeight:500 }} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Table sx={{ '& td , & th, & tr, &': { border: "none" }, "& th": { width: 150, textTransform: "capitalize" }, width: "100%", borderColor: "none" }} size="medium" aria-label="simple table">
                                <TableBody>

                                    <TableRow>
                                        <TableCell component="th" align='left' scope="row" >
                                            <Typography variant="span" sx={{ fontWeight: 600, mb: 1, textAlign: 'left', textTransform: "capitalize" }}>
                                                Name
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="left" >{product.name}</TableCell>

                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" align='left' scope="row" >
                                            <Typography variant="span" sx={{ fontWeight: 600, mb: 1, textAlign: 'left', textTransform: "capitalize" }}>
                                                Author
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="left" >{product.brandId.name}</TableCell>

                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" align='left' scope="row" >
                                            <Typography variant="span" sx={{ fontWeight: 600, mb: 1, textAlign: 'left', textTransform: "capitalize" }}>
                                                Category
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="left" >{product.categoryId.name}</TableCell>

                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" align='left' scope="row" >
                                            <Typography variant="span" sx={{ fontWeight: 600, mb: 1, textAlign: 'left', textTransform: "capitalize" }}>
                                                Price
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="left" >{product.price}{" "} DH</TableCell>

                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" align='left' scope="row" >
                                            <Typography variant="span" sx={{ fontWeight: 600, mb: 1, textAlign: 'left', textTransform: "capitalize" }}>
                                                quantity
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="left" >{product.quantity > 0 ? product.quantity : "Out of stock"}</TableCell>

                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" align='left' scope="row" >
                                            <Typography variant="span" sx={{ fontWeight: 600, mb: 1, textAlign: 'left', textTransform: "capitalize" }}>
                                                number of sells
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="left" >{product.sales > 0 ? product.sales : "Has not been salled yet"}</TableCell>

                                    </TableRow>


                                    <TableRow>
                                        <TableCell component="th" align='left' scope="row" >
                                            <Typography variant="span" sx={{ fontWeight: 600, mb: 1, textAlign: 'left', textTransform: "capitalize" }}>
                                                Description
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="left" >{product.description}</TableCell>

                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Container>


                <AlertManager
                    open={openAlert}
                    setOpen={setOpenAlert}
                    message={message}
                    type={type}
                />
            </Box>
    )
};

export default DetailProduct;