import React, { useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { Room } from "@mui/icons-material";
import axios from 'axios'
import { Container, Grid, Paper, Typography, Button, Modal, Box, TextField } from '@mui/material';

const MapforProfile = (props) => {
  const [currviewState, setcurrViewState] = React.useState({
    currlongitude: props.details.long,
    currlatitude: props.details.lat,
    zoom: 10,
  });
  const [viewState, setViewState] = React.useState({
    longitude: props.details.long,
    latitude: props.details.lat,
    zoom: 10,
  });
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: "600px",
        transform: 'translate(-50%, -50%)',
        maxWidth: '100%', // Adjust the maximum width as needed
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', // Enable vertical scrolling
        maxHeight: '90vh', // Limit the maximum height to the viewport height
      }}
    >
      <Typography variant="h6" gutterBottom>
        Address : {props.details.address}
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
        {currviewState.currlatitude != 0 &&
          currviewState.currlongitude != 0 ? 
            <Marker
              latitude={currviewState.currlatitude}
              longitude={currviewState.currlongitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Room style={{ color: "red", fontSize: viewState.zoom * 5 }} />
            </Marker> : null}
      </Map>
    </Box>
  </Modal>
  );
};

export default MapforProfile;
