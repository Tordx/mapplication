import React, { useState, useEffect, useRef } from "react";
import MapboxGL from "@rnmapbox/maps";
import { check, PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from "@react-native-community/geolocation";
import { Pressable, Text, Linking, Platform, StyleSheet } from "react-native";
import { White, LightYellow, LightBlue, Black } from "../../Assets/Colors/Colors";
import  Icon  from "react-native-vector-icons/MaterialIcons";

const MyLocation = () => {


  const [visible, setVisible] = useState(false);
  const [showbutton, setButton] = useState(true);
  const [status, setStatus] = useState(null);
  const componentRef = useRef(null);

  const openLocation = async() => {
    const status = await check(PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE);
    setButton(false)
    if (Platform.OS === 'android') {
      Linking.openSettings();
      setTimeout(() => {
        Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
      }, 1000);
      setStatus(status); // set the status state here
    }
  }

  const requestLocationPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE);
    console.log(status);
    if (status === 'unavailable') {
      setVisible(true);
      setButton(false)
      console.log(status);
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (result === 'granted') {
        setVisible(true);
      }
    }
    setStatus(status); // set the status state here
  };

  useEffect(() => {
    requestLocationPermission();
  },[])

  useEffect(() => {
    if (status === 'granted') {
      // do something here when status is granted
      window.location.reload(); // refresh the page
    }
  }, [status])
  return (
    <>
    
      <MapboxGL.MapView style={{ flex: 1 }} logoEnabled={false} attributionEnabled={false}>
        <MapboxGL.Camera
          zoomLevel={17}
          followUserLocation={true}
          followUserMode="normal"
          followZoomLevel={17}
        />
      <MapboxGL.UserLocation visible={true} showsUserHeadingIndicator = {true} minDisplacement={10} />
      </MapboxGL.MapView>
      {showbutton ? <Pressable style = {[styles.button, {width: '50%', borderWidth: 0, backgroundColor: 'red', flexDirection: 'row', height: 50, position: 'absolute', top: 0, justifyContent: 'center', alignSelf: 'center'}]}  onPress={openLocation} >
      <Icon name = 'location-pin' size = {20} color={White} />
      <Text style = {{color: White, fontFamily: 'Nexa-Heavy', fontSize: 15}}>GET LOCATION</Text>
      </Pressable> : null}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20, 
    height: 60, 
    width: '50%', 
    borderWidth: 1, 
    borderColor: White,  
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 5,
    marginTop: 20
},
})

export default MyLocation;