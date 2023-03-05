import {
  Box,
  Fade,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import productService from "../../../services/product.services";
import AlertManager from "../../../components/alerts/alertMessages";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import DetailProduct from "./DetailProduct";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  backgroundColor: "white",
  mt: 1,
  borderRadius: 3,
  boxShadow: 3,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: 800,
  overflowY:"auto"
};

const Products = ({ categoryId, brandId, cart, setCart }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [typeProduct, setTypeProduct] = useState("info");
  const [messageProduct, setMessageProduct] = useState("");
  const [openAlertProduct, setOpenAlertProduct] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [itemsByPage, setItemsByPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  function handleOpenPreview() {
    setOpenPreview(!openPreview);
  }
  const [filter, setFilter] = useState({
    category: "",
    brand: "",
    priceMin: 0,
    priceMax: 0,
    name: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("This is an alert");
  const [type, setType] = useState("info");

  const getAllProducts = () => {
    productService
      .getAllProduct()
      .then((res) => {
        // console.log(res.products)
        setProducts(res.products);
        setLoading(false);
        setFilteredProducts(res.products);
        setCount(res.products.length);
      })
      .catch((err) => {
        console.log(err);
        setMessage(
          "Une erreur s'est produite lors de la récupération des produits"
        );
        setType("error");
        setOpenAlert(true);
        setLoading(true);
      });
  };

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const brand = params.get("brand");

    if (category) {
      productService
        .getProductsByCategory(category)
        .then((res) => {
          setProducts(res.products);
          setFilteredProducts(res.products);
          setCount(res.products.length);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setMessage(
            "Une erreur s'est produite lors de la récupération des produits"
          );
          setType("error");
          setOpenAlert(true);
          setLoading(true);
        });
    } else if (brand) {
      productService
        .getProductsByBrand(brand)
        .then((res) => {
          setProducts(res.products);
          setFilteredProducts(res.products);
          setCount(res.products.length);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setMessage(
            "Une erreur s'est produite lors de la récupération des produits"
          );
          setType("error");
          setOpenAlert(true);
          setLoading(true);
        });
    } else {
      getAllProducts();
    }
  }, []);

    useEffect(() => {
        let start = (page - 1) * itemsByPage;
        let end = start + itemsByPage;
        setStartIndex(start);
        if (end > filteredProducts.length) {
            end = filteredProducts.length;
        }
        setEndIndex( end);
        
    }, [page, itemsByPage, filteredProducts])

  const runFilter = () => {
    let list = [];
    if (filter.priceMin === "") {
      filter.priceMin = 0;
    }
    if (filter.priceMax === "") {
      filter.priceMax = 0;
    }
    products.map((product) => {
      const item = {
        ...product,
        category: product.categoryId._id,
        brand: product.brandId._id,
      };
      if (filter.name && !item.name.includes(filter.name)) {
        return false;
      } else if (filter.category && item.category !== filter.category) {
        return false;
      } else if (filter.brand && item.brand !== filter.brand) {
        return false;
      } else if (
        filter.priceMin &&
        parseFloat(item.price) < parseFloat(filter.priceMin)
      ) {
        return false;
      } else if (
        filter.priceMax &&
        parseFloat(item.price) > parseFloat(filter.priceMax)
      ) {
        return false;
      } else {
        list.push(item);
      }
    });
    setFilteredProducts(list);
    setCount(list.length);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Box sx={{ width: "100%", height: "90vh", pb: 3, overflowY: "auto" }} className=" scrollbar-hidden">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              width: 500,
              my: 2,
              borderRadius: 3,
              boxShadow: 3,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
            }}
          >
            <InputBase
              sx={{ ml: 3, mr: 1, width: "100%", flex: 1 }}
              placeholder="Chercher un bouquin..."
              inputProps={{ "aria-label": "Chercher un bouquin" }}
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={runFilter}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 1, px: 1, }} >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ overflowY: "auto", height: "78vh" }}
            className=" scrollbar-hidden"
          >
            <Box className="filter">
              <Filter
                filter={filter}
                setFilter={setFilter}
                runFilter={runFilter}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            sx={{ overflowY: "auto", height: "78vh" }}
            className=" scrollbar-hidden"
          >
            <Box
              className="list_of_products"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {filteredProducts.length === 0 ? (
                <Typography variant="overline" fontSize={20}>
                  Aucun produit trouvé
                </Typography>
              ) : (
                filteredProducts
                  .slice(startIndex, endIndex)
                  .map(
                    (product) =>
                      product.quantity >= 1 && (
                        <ProductCard
                          key={product._id}
                          product={product}
                          cart={cart}
                          setCart={setCart}
                          setTypeProduct={setTypeProduct}
                          setOpenAlertProduct={setOpenAlertProduct}
                          setMessageProduct={setMessageProduct}
                          handleOpenPreview={handleOpenPreview}
                          setSelectedProduct={setSelectedProduct}
                        />
                      )
                  )
              )}
            </Box>
            {
              <>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    select
                    label="Items par page"
                    value={itemsByPage}
                    onChange={(e) => {
                      setItemsByPage(e.target.value);
                      setCount(filteredProducts.length);
                      setPage(1);
                    }}
                    defaultValue={itemsByPage}
                    sx={{ mr: 3, width: 90 }}
                    variant="standard"
                    size="small"
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </TextField>
                  <Pagination
                    count={
                      count / itemsByPage < 1
                        ? 1
                        : Math.ceil(count / itemsByPage)
                    }
                    page={page}
                    onChange={handleChange}
                    showFirstButton
                    showLastButton
                  />
                </Box>
              </>
            }
          </Grid>
        </Grid>
      </Box>
      <AlertManager
        open={openAlert}
        setOpen={setOpenAlert}
        message={message}
        type={type}
      />
      <AlertManager
        open={openAlertProduct}
        setOpen={setOpenAlertProduct}
        message={messageProduct}
        type={typeProduct}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPreview}
        onClose={handleOpenPreview}
      >
        <Fade in={openPreview}>
          <Box sx={style}  className=" scrollbar-hidden">
            <DetailProduct
              product={selectedProduct}
              cart={cart}
              setCart={setCart}
              setTypeProduct={setTypeProduct}
              setOpenAlertProduct={setOpenAlertProduct}
              setMessageProduct={setMessageProduct}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Products;
