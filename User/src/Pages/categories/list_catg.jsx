import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPen, FaTrash } from "react-icons/fa";
import SearchTable from "../../components/searchBar/searchTable";
import { TbLayoutGrid, TbList, TbFilter } from "react-icons/tb";
import { HiPlusSm } from "react-icons/hi";
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
import AlertManager from "../../components/alerts/alertMessages";
import DeleteConfirmation from '../../components/alerts/deleteconfrimation';

import categoryService from "../../services/category.service";
import ModalAddCategory from "./add_catg";
import ModalUpdateCategory from "./update_catg";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [idCategoryupdate, setIdCategoryUpdate] = useState(0);
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [search, setSearch] = useState("");
  const [alignment, setAlignment] = useState("list");
  const [openModel, setOpenModel] = React.useState(false);
  const [openModelUpdate, setOpenModelUpdate] = React.useState(false);
  const [name, setName] = useState("");
  const [image, setimage] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('This is an alert');
  const [type, setType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState('');
  const [typeUpdate, setTypeUpdate] = useState('info');

  function handleOpen() {
    setOpenModel(!openModel);
  }

  function handleOpenUpdate() {
    setOpenModelUpdate(!openModelUpdate);
  }
  useEffect(() => {
    getCategories();
  }, []);

  //GETT ALL PRODUCTS
  async function getCategories() {
    try {
      let result = await categoryService.getAllCategories();
    //   console.log(result.categories)
      setCategories(result.categories);
    } catch (error) {
      console.log(error);
    }
  }
  //Delet Category
  const fireDeleteDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };


  const handleChangeGrpButton = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  const rendeImage = (row) => {
    return (
      <Avatar
        variant={"square"}
        src={window.IMAGE_API_URL + `categories/` + row.image}
        sx={{height: '58px', width: '100%',display: 'block',
        marginLeft: 'auto',marginRight: '15px', }}
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
      name: "Books Number",
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
                  setIdCategoryUpdate(row._id);
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
              onClick={() =>fireDeleteDialog(row._id)}
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
          <Box>
            <Button
              variant={"contained"}
              size={"small"}
              onClick={handleOpen}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb:0.5,
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
            <ModalAddCategory
              open={openModel}
              handleOpen={handleOpen}
              getCategories={getCategories}
              setOpenAlert={setOpenAlert}
              setType={setType}
              setMessage={setMessage}
              setLoading={setLoading}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: "0 10px" , height: '84vh'}}>
        <DataTable
          columns={columns}
          data={categories}
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
        type={'category'}
        id={selectedId}
        getItems={getCategories}
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
      <ModalUpdateCategory
        open={openModelUpdate}
        handleOpen={handleOpenUpdate}
        getCategories={getCategories}
        idCategoryupdate={idCategoryupdate}
        setOpenAlert={setOpenUpdateAlert}
        setType={setTypeUpdate}
        setMessage={setMessageUpdate}
        name={name}
        image={image}
      />
     
      
    </Box>
  );
};

export default ListCategories;
