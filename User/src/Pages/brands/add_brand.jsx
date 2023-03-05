import { useState, useContext } from "react";
import { Modal, Box, Fade, Typography, Button, TextField } from "@mui/material";
import brandService from "../../services/brand.service";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
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
  height: 320,
};

const ModalAddBrand = ({ open, handleOpen, getBrands, setMessage, setOpenAlert, setType, setLoading }) => {
  const [name, setName] = useState("");
  const [image, setimage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  // const navigate = useNavigate();
  // const { setConnected } = useContext(AppContext);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0] ? event.target.files[0] : null);
    setimage(event.target.files[0] ? event.target.files[0].name : "");
    // console.log(event.target.files[0] ? event.target.files[0].name : "");
  };


  async function saveBrandData() {
    try {
      setName("");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", selectedFile);
      // console.log(formData.get("name"));
      if (name === "" || image === "") {
            setMessage('Please Fill the inputs');
            setType('error');
            setOpenAlert(true);
      } else {
        brandService
          .addBrand(formData)
          .then(() => {
            setMessage('Brand added successfully');
            setType('success');
            setOpenAlert(true);
            handleOpen();
            getBrands();
           
          })
          .catch((err) => {
            console.log("failure ");
            console.log(err);
          });

      }
    } catch (error) {
      console.log(error);
      setMessage('Error while adding the brand, please try again');
      setType('error');
      setOpenAlert(true);
      setLoading(false);

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
            Add a new Author
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
            <TextField
              id="standard-basic"
              label="Nom"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => document.getElementById("brandImage").click()}
            >
              Select a  picture
              <input
                type="file"
                id="brandImage"
                hidden
                onChange={changeHandler}
              />
            </Button>
            {selectedFile !== null ? (
              <Typography>file uploaded sucessfully</Typography>
            ) : null}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "60%",
               mt:3
            }}
          >
            <Button variant="outlined" color="success" onClick={saveBrandData}>
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

export default ModalAddBrand;
