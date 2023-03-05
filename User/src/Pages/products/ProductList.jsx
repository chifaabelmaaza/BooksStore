import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEye, FaPen, FaTimes, FaTrash } from 'react-icons/fa';
import SearchTable from '../../components/searchBar/searchTable';
import { TbLayoutGrid, TbList, TbFilter } from 'react-icons/tb';
import { HiPlusSm } from 'react-icons/hi';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  Modal,
  Divider,
} from '@mui/material';
import productService from '../../services/product.services';
import { Link } from 'react-router-dom';

import DeleteConfirmation from '../../components/alerts/deleteconfrimation';
import DetailProduct from './DetailProduct';

const options = [10, 15, 20,25];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  bgcolor: 'background.paper',
  borderRadius: 3,
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 900,
  overflowY:"auto"
};

const ListProduct = () => {
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [search, setSearch] = useState('');
  const [alignment, setAlignment] = useState('list');
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    getProducts();
  }, []);

  //GETT ALL PRODUCTS
  async function getProducts() {
    try {
      let result = await productService.getAllProduct();
      // console.log(result.products)
      setProducts(result.products);
    } catch (error) {
      console.log(error);
    }
  }

  const rendeImage = (row) => {
    // console.log(window.IMAGE_API_URL + `brands/` + row.image)
    return (
      <Avatar
        variant={'square'}
        src={window.IMAGE_API_URL + `products/` + row.image}
        sx={{ height: '58px', width: '100%',display: 'block',
        marginLeft: 'auto',marginRight: '15px', }}
      />
    );
  };

  const columns = [
    {
      name: 'Image',
      selector: (row, index) => rendeImage(row),
      sortable: false,
      maxWidth: '10%',
      center:true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      // center: true,
      sortable: true,
      minWidth: '20%',
      maxWidth:'70%',
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      center: true,
      sortable: true,
      maxWidth: '20%',
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
      maxWidth: '20%',
    },
    {
      name: 'Brand',
      selector: (row) => row.brandId.name,
      sortable: true,
      maxWidth: '50%',
    },
    {
      name: 'Category',
      selector: (row) => row.categoryId.name,
      sortable: true,
      maxWidth: '50%',
    },
    {
      name: 'Actions',
      sortable: false,
      maxWidth: '30%',
      center: true,
      selector: (row) => (
        <Box
          sx={{
            display: 'flex',
            align: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Tooltip title={'Preview'} placement='top' arrow>
            <IconButton onClick={() => fireDetailModal(row._id)}>
              {/* <Link to={`/product/detail/${row._id}`}> */}
              <FaEye style={{ fontSize: '18px', color: '#2B8785' }} />
              {/* </Link> */}
            </IconButton>
          </Tooltip>
          <Tooltip title={'Update'} placement='top' arrow>
            <IconButton sx={{ color: 'primary.main' }}>
              <Link to={`/product/update/${row._id}`}>
                <FaPen style={{ fontSize: '18px', color: '#00A97D' }} />
              </Link>
            </IconButton>
          </Tooltip>
          <Tooltip title={'Delete'} placement='top' arrow>
            <IconButton onClick={() => fireDeleteDialog(row._id)}>
              <FaTrash style={{ fontSize: '18px', color: '#DC143C' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleChangeGrpButton = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const fireDeleteDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const fireDetailModal = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          height: '50px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          mx: 1,
        }}
      >
        <SearchTable text={search} setText={setSearch} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Button
            variant={"text"}
            size={"small"}
            sx={{
              borderRadius: 2,
              mx: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // color: "#778D45",
              // "&:hover": {color: "#778D45"}
            }}
          >
            <TbFilter fontSize={18} />
            <Typography sx={{ mx: 1 }}>Filter</Typography>
          </Button> */}

          {/* <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleChangeGrpButton}
            aria-label="Platform"
            sx={{ mx: 1 }}
            size={"small"}
            color={"primary"}
          >
            <ToggleButton value="list" sx={{ borderRadius: 3 }}>
              <TbList fontSize={18} />
              <Typography sx={{ mx: 1, textTransform: "capitalize" }}>
                Table view
              </Typography>
            </ToggleButton>
            <ToggleButton value="grid" sx={{ borderRadius: 3 }}>
              <TbLayoutGrid fontSize={18} />
              <Typography sx={{ mx: 1, textTransform: "capitalize" }}>
                Grid View
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup> */}
          <Button
            variant={'contained'}
            size={'small'}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroudColor: '#778D45',
              color: 'white',
            }}
          >
            <Link to={`/product/add`} style={{ textDecoration: 'none', mx: 1 }}>
              <Typography
                sx={{ mx: 1, color: 'white', textTransform: 'capitalize' }}
              >
                Ajouter
              </Typography>
            </Link>

            <HiPlusSm fontSize={21} />
          </Button>
        </Box>
      </Box>
      <Box sx={{ padding: '0 10px' , height: '84vh' }}>
        <DataTable
          columns={columns}
          data={products}
          //selectableRows
          //onSelectedRowsChange={handleChange}
          //clearSelectedRows={toggledClearRows}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={options}
          fixedHeader
          fixedHeaderScrollHeight='700px'
        />
      </Box>

      <DeleteConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        type={'product'}
        id={selectedId}
        getItems={getProducts}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} className=" scrollbar-hidden">
          <Box sx={{display:'flex', alignItems:"center", justifyContent:"space-between"}}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Detail product
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <FaTimes style={{ fontSize: '20px', color: '#808080' }} onClick={handleCloseModal}/>
            </IconButton>
          </Box>
          <Divider />
          <Box id='modal-modal-description' sx={{ mt: 2 }}>
            <DetailProduct id={selectedId} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListProduct;
