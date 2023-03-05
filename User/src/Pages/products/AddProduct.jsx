import productService from '../../services/product.services';
import categoryService from '../../services/category.service';
import brandService from '../../services/brand.service';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertManager from '../../components/alerts/alertMessages';
import {
  TextField,
  Box,
  Button,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material';

function AddProduct() {
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState('');
  let [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [brands, setBrandes] = useState([]);
  const [image, setimage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('This is an alert');
  const [type, setType] = useState('info');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    categoryService.getAllCategories().then((res) => {
      // console.log(res);
      setCategories(res.categories);
    });
    brandService.getAllBrands().then((res) => {
      // console.log(res);
      setBrandes(res.brands);
    });
  }, []);

  async function SaveProduct() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('quantity', quantity);
      formData.append('categoryId', category);
      formData.append('brandId', brand);
      formData.append('price', price);
      formData.append('image', selectedFile);
      // console.log(formData);
      if (
        name === '' ||
        image === '' ||
        category === '' ||
        !category ||
        brand === '' ||
        !brand ||
        quantity <= 0 ||
        price <= 0
      ) {
        setMessage('Please check all the inputs');
        setType('error');
        setOpenAlert(true);
        setLoading(false);
    
      } else {
        await productService.addProduct(formData);
        setMessage('Product added successfully');
        setType('success');
        setOpenAlert(true);
        setTimeout(() => {
          navigate('/product/list');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setMessage('Error while adding product, please try again');
      setType('error');
      setOpenAlert(true);
      setLoading(false);
    }
  }

  // const renderAlert = (message,serverity) => {
  //   alert(message,serverity);
  //   return (
  //     <AlertManager  setOpenAlert={setOpenAlert} openAlert={openAlert} message={message} serverity={serverity}
  //     ></AlertManager>
  //   );
  // };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0] ? event.target.files[0] : null);
    setimage(event.target.files[0] ? event.target.files[0].name : '');
    // console.log(event.target.files[0] ? event.target.files[0].name : "");
  };

  const CancelSave = () => {
    navigate('/product/list');
  };

  return (
    <Box
      sx={{
        my: 4,
        width: '100%',
        overflow: 'hidden',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Grid container spacing={2} sx={{ px: 3 }}>
        <Grid item md={6} sm={12}>
          <TextField
            id='standard-required'
            label='Nom du bouquin'
            variant='standard'
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            id='standard-required'
            select
            label='Categorie'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            helperText='Choisissez la categorie de votre bouquin'
            variant='standard'
            required
            fullWidth
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            id='standard-required'
            select
            label='Author'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            helperText='Choisissez l auteur de votre bouquin'
            variant='standard'
            required
            fullWidth
          >
            {brands.map((brand, index) => (
              <MenuItem key={index} value={brand._id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            id='standard-required'
            label='Quantite'
            variant='standard'
            required
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            id='standard-required'
            label='Description'
            variant='standard'
            required
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            id='standard-required'
            label='Prix'
            variant='standard'
            required
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Button
            variant='contained'
            sx={{ mx: 3 }}
            onClick={() => document.getElementById('productImage').click()}
          >
            Telecharger image
            <input
              type='file'
              id='productImage'
              hidden
              onChange={changeHandler}
            />
          </Button>
          {selectedFile !== null ? (
            <Typography>file uploaded sucessfully</Typography>
          ) : null}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // width: "30%",
        }}
      >
        <Button
          variant='outlined'
          color='success'
          sx={{ mx: 3 }}
          onClick={SaveProduct}
          disabled={loading}
        >
          Save
        </Button>
        <Button variant='outlined' color='error' onClick={CancelSave}>
          Cancel
        </Button>
      </Box>

      <AlertManager
        open={openAlert}
        setOpen={setOpenAlert}
        message={message}
        type={type}
      />
    </Box>
  );
}
export default AddProduct;
