import { useState } from "react";
import {
  Modal,
  Box,
  Fade,
  Typography,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import categoryService from "../../services/category.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "white",
  mt: 1,
  borderRadius: 3,
  boxShadow: 3,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: 600,
};

const ModalUpdateCategory = ({
  open,
  handleOpen,
  getCategories,
  idCategoryupdate,
  image,
  name,
  setOpenAlert,
  setMessage,
  setType,
}) => {
  const [nameupdate, setNameUpdate] = useState("");
  const [imageupdate, setImageUpdate] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0] ? event.target.files[0] : null);
    setImageUpdate(event.target.files[0] ? event.target.files[0].name : "");
    //  console.log(event.target.files[0] ? event.target.files[0] : null);
  };

  async function saveCategoryData() {
    try {
      // console.log(image)
      setNameUpdate("");
      
      // console.log(selectedFile,nameupdate);
      let formData = new FormData();

      formData.append("name", nameupdate);
      formData.append("image", selectedFile);


      categoryService
        .updateCategory(formData, idCategoryupdate)
        .then(() => {
          setMessage('Category updated successfully');
          setType('success');
          setOpenAlert(true);
          getCategories();
          handleOpen();
        })
        .catch((err) => {
          console.log(err)
          setMessage('Error updating category');
          setType('error');
          setOpenAlert(true);
        });
    } catch (error) {
      console.log(error);
      setMessage('Error updating category');
      setType('error');
      setOpenAlert(true);
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleOpen}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Modifier la categorie
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "50%",
            }}
          >
            <Avatar
              variant={"square"}
              src={window.IMAGE_API_URL + `categories/` + image}
              sx={{ height: "50px", width: "100px" }}
            />
            <TextField
              id="standard-basic"
              label="Premier Nom"
              variant="standard"
              value={name}
            />
            <TextField
              id="standard-basic"
              label="Nouveau Nom"
              variant="standard"
              value={nameupdate}
              onChange={(e) => setNameUpdate(e.target.value)}
            />
             <Button
              variant="contained"
              onClick={() => document.getElementById("categoryImage").click()}
            >
              Select a  logo
              <input
                type="file"
                id="categoryImage"
                hidden
                onChange={changeHandler}
              />
            </Button>
            {selectedFile !== null ? 
              <Typography>
                file uploaded sucessfully
              </Typography>
                : null
            }
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "60%",
            }}
          >
            <Button
              variant="outlined"
              color="success"
              onClick={saveCategoryData}
            >
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleOpen}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalUpdateCategory;
