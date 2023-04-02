  //import liraries
  import React, { useState, useEffect, useRef } from 'react';
  import { View, Text, Modal, Pressable } from 'react-native';
  import MapboxGL from '@rnmapbox/maps';
  import { useSelector } from 'react-redux'
  import { Store } from '@reduxjs/toolkit';
  import PouchDB from 'pouchdb-react-native' ;
  import 'pouchdb-core';
  import Icon  from 'react-native-vector-icons/MaterialIcons';
  const token = 'sk.eyJ1IjoidG9yZHh4IiwiYSI6ImNsZG92OHF2OTAzangzdm80dnJrcHV6YmMifQ.O8EA2bhzmkD4DTBnrvh8Xg'

  MapboxGL.setWellKnownTileServer('Mapbox');
  MapboxGL.setAccessToken(token)

  const InfoModal = ({ isVisible, onClose, info, onPress }) => (
    <Modal visible={isVisible} onRequestClose={onClose} transparent animationType='slide'>
      <View  style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
      <View style = {{width: '90%', height: 150, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
        <Text>{info}</Text>
        <Pressable 
          onPress = {onPress}
          style = {{position: 'absolute', top: 10, right: 10}}
          >
          <Icon
          name = 'close'
          size = {25}
          />
        </Pressable>
      </View>
      </View>
    </Modal>
  );

  const ItemViewMap = () => {

    useEffect(() => {

    },[])
    
    const {ItemList} = useSelector((action) => action.items)
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {email} = useSelector((store) => store.login)
    const [usercoordinates, setUserCoordinates] = useState([119.97919707716136, 16.155291199328147]);
    const [selectedCoordinate, setSelectedCoordinate] = useState(null);

    
    

    return (
      <View style = {{width: '100%', height: '36%', position: 'absolute', top: 0}}>
      <MapboxGL.MapView style={{flex: 1}}
        logoEnabled = {false}
        attributionEnabled = {false}
      >
        <MapboxGL.Camera
          zoomLevel={15}
          centerCoordinate={ItemList.Coordinates}
        />
          <MapboxGL.PointAnnotation
            id={ItemList.Establishment}
            children={true}
            coordinate={ItemList.Coordinates}
            title={ItemList.Establishment}
            onSelected={() => {
              setSelectedMarker(marker);
              setShowModal(true);
            }}
          />
        
      
      </MapboxGL.MapView>
      <InfoModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        info={selectedMarker && selectedMarker.title}
        onPress = {() => setShowModal(false)}
      />
      <View style = {{ width: 75, height: 75, backgroundColor: 'red', position: 'absolute', bottom: 20, left: 15,  borderRadius: 20}}></View>
    </View>
    );
  };

  export default ItemViewMap;
