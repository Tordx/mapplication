import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Map from '../../maps/FullViewMap'
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';
 

const DirectionsTab = () => { 

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
    <MapboxGL.MapView style={{ flex: 1 }}>
      <MapboxGL.Camera
       zoomLevel={14} centerCoordinate = {userLocation} 
      />
      
      <MapboxGL.UserLocation visible={true} />
    </MapboxGL.MapView>
  );
}

export default DirectionsTab