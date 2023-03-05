import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPen, FaTrash } from "react-icons/fa";
import SearchTable from "../../components/searchBar/searchTable";
import { TbLayoutGrid, TbList, TbFilter } from "react-icons/tb";
import { HiPlusSm } from "react-icons/hi";
import AlertManager from "../../components/alerts/alertMessages";
import DeleteConfirmation from '../../components/alerts/deleteconfrimation';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";

import brandService from "../../services/brand.service";
import ModalAddBrand from "./add_brand";
import ModalUpdateBrand from "./update_brand";

const ListBrand = () => {
  const [brands, setBrands] = useState([]);
  const [productNbr, setProductNbr] = useState(0);
  const [idBrandpdate, setIdBrandUpdate] = useState(0);
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [search, setSearch] = useState("");
  const [alignment, setAlignment] = useState("list");
  const [openModel, setOpenModel] = React.useState(false);
  const [openModelUpdate, setOpenModelUpdate] = React.useState(false);
  const [name, setName] = useState("");
  const [image, setimage] = useState();
  const [marque, setMarque] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('This is an alert');
  const [type, setType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState('');
  const [typeUpdate, setTypeUpdate] = useState('info');

  function handleOpen() {
    setOpenModel(!openModel);
  }

  // function UpdateBrandFct(id) {
  //   setIdBrandUpdate(id);
  //   handleOpenUpdate();
  // }
  function handleOpenUpdate() {
    setOpenModelUpdate(!openModelUpdate);
  }
  useEffect(() => {
    getBrands();
  }, []);

  //GETT ALL PRODUCTS
  async function getBrands() {
    try {
      brandService.getAllBrands()
        .then(result => {
          setBrands(result.brands);
        })
        .catch(error => {
          console.log(error);
        })
      // console.log(result.products)
    } catch (error) {
      console.log(error);
    }
  }

   //GETT Product Number
  //  async function getProductNumber(id) {
  //   try {
  //     brandService.getNumbProdByBrand(id)
  //       .then(result => {
  //         console.log(result.nmrByCatg);
  //         setProductNbr(result.nmrByCatg);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       })
  //     // console.log(result.products)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const fireDeleteDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };



  // const handleChangeGrpButton = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  // const handleClearRows = () => {
  //   setToggleClearRows(!toggledClearRows);
  // };

  const rendeImage = (row) => {
    // console.log(window.IMAGE_API_URL + `brands/` + row.image)
    return (
      <Avatar
        variant={"square"}
        src={window.IMAGE_API_URL + `brands/` + row.image}
        sx={{ height: '58px', width: '100%',display: 'block',
        marginLeft: 'auto',marginRight: '15px',  }}
      />
    );
  };

  const columns = [
    {
      name: "Image",
      selector: (row, index) => rendeImage(row),
      sortable: false,
      maxWidth: "20%",
      center:true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      maxWidth: "50%",
    },
    {
      name: "Book Number",
      selector: (row) => row.product_number,
      sortable: true,
      center: true,
      maxWidth: "30%",
    },
    {
      name: "Actions",
      sortable: false,
      maxWidth: "30%",
      center: true,
      selector: (row) => (
        <Box
          sx={{
            display: "flex",
            align: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Tooltip title={"Update"} placement="top" arrow>
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={() => {
                  setIdBrandUpdate(row._id);
                  setimage(row.image);
                  setName(row.name);
                  handleOpenUpdate();
                }}
              >
                <FaPen style={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip>

          </Box>
          <Tooltip title={"Delete"} placement="top" arrow>
            <IconButton
              sx={{ color: "danger.main" }}
              onClick={() => fireDeleteDialog(row._id)}
            >
              <FaTrash style={{ fontSize: "18px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" , height: '100%' }}>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          mx: 1,
        }}
      >
        <SearchTable text={search} setText={setSearch} />
        <Box sx={{ display: "flex", alignItems: "center" }}>

          <Box>
            <Button
              variant={"contained"}
              size={"small"}
              onClick={handleOpen}
              sx={{
                borderRadius: 2,
                mx: 2,
                mb: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroudColor: "#778D45",
                color: "white",
              }}
            >
              <Typography sx={{ mx: 1 }}>Ajouter</Typography>
              <HiPlusSm fontSize={21} />
            </Button>
            <ModalAddBrand
              open={openModel}
              handleOpen={handleOpen}
              getBrands={getBrands}
              setOpenAlert={setOpenAlert}
              setType={setType}
              setMessage={setMessage}
              setLoading={setLoading}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: "0 10px", height: '84vh' }}>
        <DataTable
          columns={columns}
          data={brands}
          //selectableRows
          //onSelectedRowsChange={handleChange}
          //clearSelectedRows={toggledClearRows}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="700px"
        />
      </Box>

      <DeleteConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        type={'brand'}
        id={selectedId}
        getItems={getBrands}
      />

      <AlertManager
        open={openAlert}
        setOpen={setOpenAlert}
        message={message}
        type={type}
      />

      <AlertManager
        open={openUpdateAlert}
        setOpen={setOpenUpdateAlert}
        message={messageUpdate}
        type={typeUpdate}
      />

      <ModalUpdateBrand
        open={openModelUpdate}
        handleOpen={handleOpenUpdate}
        getBrands={getBrands}
        idMarqueUpdate={idBrandpdate}
        setOpenAlert={setOpenUpdateAlert}
        setType={setTypeUpdate}
        setMessage={setMessageUpdate}
        name={name}
        image={image}
      />
    </Box>
  );
};

export default ListBrand;
