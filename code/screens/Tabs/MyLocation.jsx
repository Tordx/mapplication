import React, { useState, useEffect } from "react";
import MapboxGL, { MarkerView } from "@rnmapbox/maps";
import Geolocation from '@react-native-community/geolocation';


const MyLocation = () => {

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, [userLocation]);

  return (
    <MapboxGL.MapView style={{ flex: 1 }}
    logoEnabled = {false}
    attributionEnabled = {false}
    >
      <MapboxGL.Camera
       zoomLevel={14} centerCoordinate = {userLocation} 
      />
      <MapboxGL.UserLocation visible={true} />
    </MapboxGL.MapView>
  );
};
export default MyLocation