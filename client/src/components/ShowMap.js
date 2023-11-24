import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import { Room } from "@mui/icons-material";
import axios from 'axios'

const ShowMap = () => {
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
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const updatedViewState = {
          currlongitude: longitude,
          currlatitude: latitude,
          zoom: 10,
        };
        setcurrViewState(updatedViewState);
        function getCity() {
          axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
            .then((res) => {
              console.log(res.data.display_name)
            })
            .catch((err) => {
              console.log(err)
            })
        }
        getCity()
      });
    }
    else{
            const updatedViewState = {
              currlongitude: 0,
              currlatitude: 0,
              zoom: 3.1,
            };
            setcurrViewState(updatedViewState);
          }
  }, [navigator.geolocation]);
  return (
    <div>
      <Map
        {...viewState}
        mapboxAccessToken="pk.eyJ1Ijoicm9oaXQtcGhhbGtlIiwiYSI6ImNscDUzcndoaTFwengya3M0dXFqd280N2cifQ.CGxX9btLQEWnORk0aMFZHw"
        onMove={(evt) => {
          setViewState(evt.viewState);
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              let latitude = position.coords.latitude;
              let longitude = position.coords.longitude;
              const updatedViewState = {
                currlongitude: longitude,
                currlatitude: latitude,
                zoom: 10,
              };
              setcurrViewState(updatedViewState);
            });
          }
          else{
            const updatedViewState = {
              currlongitude: 0,
              currlatitude: 0,
              zoom: 3.1,
            };
            setcurrViewState(updatedViewState);
          }
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
    </div>
  );
};

export default ShowMap;
