import React, { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import "./card.css"
import { AppContext } from '../../../Context/AppContext'
import userService from '../../../services/user.service';

const ProductCard = ({ product, cart, setCart, setTypeProduct, setOpenAlertProduct, setMessageProduct, handleOpenPreview, setSelectedProduct }) => {

    const { connected } = useContext(AppContext);
    
    const addtoCart = (product) => {
        if (connected) {
            const exist = cart.find((x) => {
                if (x.product._id === product._id)
                    return x.product._id === product._id
                else
                    return false
            });
            if (exist) {
                setTypeProduct("warning")
                setMessageProduct("Le produit est déjà dans le panier")
                setOpenAlertProduct(true)
            } else {
                userService.addToCart({ idproduct: product._id })
                    .then((result) => {
                        if (result.code === 'ERR_BAD_REQUEST') {
                            setTypeProduct("error")
                            setMessageProduct("Une erreur s'est produite")
                            setOpenAlertProduct(true)
                        }
                        else {
                            const cartItem = {product: product, qty: 1}
                            setCart([...cart, cartItem])
                            setTypeProduct("success")
                            setMessageProduct("Le produit a été ajouté au panier")
                            setOpenAlertProduct(true)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        setTypeProduct("error")
                        setMessageProduct("Une erreur s'est produite")
                        setOpenAlertProduct(true)
                    })
            }
        }
        else {
            setTypeProduct("error")
            setMessageProduct("Vous devez vous connecter pour ajouter un produit au panier")
            setOpenAlertProduct(true)
        }
    }

    return (
        <div className="el-wrapper">
            <div className="box-up">
                <img className="img" src={window.IMAGE_API_URL + `products/` + product.image} alt="" style={{ height: 250 }} />
                <div className="img-info">
                    <div className="info-inner">
                        <span className="p-name">{product.name}</span>
                        <span className="p-company">{product.brandId.name}</span>
                    </div>
                    <div className="a-size">{product.description.slice(0, 50)}</div>
                </div>
            </div>

            <div className="box-down">
                <div className="h-bg">
                    <div className="h-bg-inner"></div>
                </div>

                <div className="cart" >
                    <span className="price">{product.price.toFixed(2)} DH</span>
                    <span className="add-to-cart">
                        <Tooltip title="Ajouter au panier" arrow>
                            <IconButton size="small" sx={{ mx: 0, color: "#fff" }} onClick={() => addtoCart(product)}>
                                <AddShoppingCartIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Voir" arrow>
                            <IconButton size="small" sx={{ mx: 0, color: "#fff" }} onClick={() => { setSelectedProduct(product); handleOpenPreview() }}>
                                <SavedSearchIcon />
                            </IconButton>
                        </Tooltip>
                    </span>
                </div>
            </div>

        </div>
    )

}
export default ProductCard;