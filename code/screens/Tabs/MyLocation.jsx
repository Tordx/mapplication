import React, { useState, useEffect } from "react";
import MapboxGL from "@rnmapbox/maps";
import { check, PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from "@react-native-community/geolocation";
import { Pressable, Text, Linking, Platform, StyleSheet } from "react-native";
import { White, LightYellow, LightBlue, Black } from "../../Assets/Colors/Colors";
import  Icon  from "react-native-vector-icons/MaterialIcons";

const MyLocation = () => {

  const [visible, setVisible] = useState(false);
  const [showbutton, setButton] = useState(true);

  const openLocation = () => {
    
    setButton(false)
    if (Platform.OS === 'android') {
      Linking.openSettings();
      setTimeout(() => {
        Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
      }, 1000);
      
    }
  }
  
  const requestLocationPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE);
    if (status === 'granted') {
      setVisible(true);
      setButton(false)
      console.log(result);
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (result === 'granted') {
        setVisible(true);
      }
    }
  };

  useEffect(() => {
    requestLocationPermission
  },[])

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
      {showbutton ? <Pressable style = {[styles.button, {width: '50%', borderColor: Black, flexDirection: 'row', height: 50, position: 'absolute', top: 0, justifyContent: 'center', alignSelf: 'center'}]}  onPress={openLocation} >
      <Text style = {[styles.buttontext, {fontFamily: 'Nexa-Heavy', color: Black, fontSize: 17}]}>Set Location</Text>
      </Pressable> : null}
      {/* <Pressable style = {[styles.button, {width: '100%', borderWidth: 0, flexDirection: 'row', height: 75, position: 'absolute', bottom: 100, left: 10, justifyContent: 'center', alignSelf: 'center'}]}  onPress={openLocation} >
      <Icon name = 'person-pin' size = {75} color={'red'} />
      <Text style = {{fontFamily: 'Nexa-Heavy', color: Black, fontSize: 17, width: '90%'}}>Where you at</Text>
      </Pressable>  */}
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