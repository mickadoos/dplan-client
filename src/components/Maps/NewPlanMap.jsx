import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "80vw",
  maxWidth: "580px",
  height: "250px",
  margin: "auto",
  borderRadius: "15px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function NewPlanMap(props) {
  const defaultMapOptions = {
    disableDefaultUI: true,
    gestureHandling: "none",
    zoomControl: false,
    clickableIcons: false,
  };

  const position = {
    lat: 37.772,
    lng: -122.214,
  };

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    // <LoadScript
    //   googleMapsApiKey="AIzaSyAkayr4GFOG86tL9kgZ7MjC0vvTzVQuutQ"
    // >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: props.lat, lng: props.lng }}
      zoom={17}
      options={defaultMapOptions}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker onLoad={onLoad} position={{ lat: props.lat, lng: props.lng }} />
    </GoogleMap>
    // </LoadScript>
  );
}

export default React.memo(NewPlanMap);
