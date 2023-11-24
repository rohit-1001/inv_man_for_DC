import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { Room } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Typography } from "@mui/material";
import { Container, Grid, Paper, Button, Box, TextField } from '@mui/material';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const ShowInfo = (props) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    phone: 0,
    address: {}, // Add address
    companyGenre: '', // Add company genre
    logo: '',
    GSTNO: 0,
    Grole: "",
    dob: "",
  });
  const [currviewState, setcurrViewState] = React.useState({
    currlongitude: 0,
    currlatitude: 0,
    zoom: 10,
  });
  const [viewState, setViewState] = React.useState({
    longitude: 78,
    latitude: 22,
    zoom: 3.1,
  });
  const [openModalLocation, setOpenModalLocation] = useState(false);

  const handleOpenModalLocation = async () => {
    setOpenModalLocation(true);
  };

  const handleCloseModalLocation = () => {
    setOpenModalLocation(false);
  };

  const handleOpen = async () => {
    try {
      const c = await axios.post('/selectedprofile', {email:props.email}, {
        withCredentials: true
      })
      const { name, email, phone, address, companyGenre, logo, GSTNO, Grole, dob } = c.data
      setCompanyInfo({ name, email, phone, address, companyGenre, logo, GSTNO, Grole, dob })
      const updatedViewState = {
        currlongitude: address.long,
        currlatitude: address.lat,
        zoom: 7,
      };
      const updatedViewState1 = {
        longitude: address.long,
        latitude: address.lat,
        zoom: 7,
      };
      setViewState(updatedViewState1);
      setcurrViewState(updatedViewState);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured");
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 1000,
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  

  return (
    <div>
      {/* <TextField className="form-control-plaintext" onClick={handleOpen}>
        {props.email}
      </TextField> */}
      <Typography
        style={{ color: "#1976d2", cursor: "pointer" }}
        onClick={handleOpen}
      >
        {props.email}
      </Typography>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {/* Company Profile */}
              <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '60px', textAlign: 'center', display: "flex" }}>
                  <div style={{ width: "100%", margin: "0 auto" }}>
                    <img
                      src={companyInfo.logo}
                      alt="Company Logo"
                      style={{ width: '250px', height: '250px', borderRadius: '50%', marginBottom: '10px' }}
                    />
                  </div>
                  <div style={{ width: "100%", margin: "0 auto", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column" }}>
                    <div style={{ marginBottom: '17px' }}>
                      <Typography variant="h5">{companyInfo.name}</Typography>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <Typography variant="subtitle1">Email: {companyInfo.email}</Typography>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <Typography variant="subtitle1">Contact Number: {companyInfo.phone}</Typography>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <Typography variant="subtitle1">Address: {companyInfo.address.address ? companyInfo.address.address : " ---"}</Typography>
                      {companyInfo.address.address ? 
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenModalLocation}
                      startIcon={<EditIcon />}
                    >
                      View on map
                    </Button>
                  </div>
                  : 
                  null}
                  <Modal
                    open={openModalLocation}
                    onClose={handleCloseModalLocation}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "600px",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "100%", // Adjust the maximum width as needed
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        overflowY: "auto", // Enable vertical scrolling
                        maxHeight: "90vh", // Limit the maximum height to the viewport height
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Address : {companyInfo.address.address}
                      </Typography>
                      <br></br>
                      <Map
                        {...viewState}
                        mapboxAccessToken="pk.eyJ1Ijoicm9oaXQtcGhhbGtlIiwiYSI6ImNscDUzcndoaTFwengya3M0dXFqd280N2cifQ.CGxX9btLQEWnORk0aMFZHw"
                        onMove={(evt) => {
                          setViewState(evt.viewState);
                        }}
                        style={{ width: 600, height: 400 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                      >
                        <Marker
                          latitude={currviewState.currlatitude}
                          longitude={currviewState.currlongitude}
                          offsetLeft={-20}
                          offsetTop={-10}
                        >
                          <Room
                            style={{
                              color: "red",
                              fontSize: viewState.zoom * 8,
                            }}
                          />
                        </Marker>
                      </Map>
                    </Box>
                  </Modal>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <Typography variant="subtitle1">Company Type: {companyInfo.companyGenre}</Typography>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <Typography variant="subtitle1">GST No: {companyInfo.GSTNO === 0 ? " ---" : companyInfo.GSTNO}</Typography>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <Typography variant="subtitle1">Role: {companyInfo.Grole === "vendor" ? "Vendor" : "Company"}</Typography>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                      <Typography variant="subtitle1">Date of Birth: {companyInfo.dob}</Typography>
                    </div>
                  </div>
                </Paper>
                <br></br>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Modal>
    </div>
  );
};

export default ShowInfo;
