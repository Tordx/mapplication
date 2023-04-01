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

      getEventData(usercoordinates)

    },[usercoordinates])
      
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {email} = useSelector((store) => store.login)
    const [usercoordinates, setUserCoordinates] = useState([119.97919707716136, 16.155291199328147]);
    const [selectedCoordinate, setSelectedCoordinate] = useState(null);

    const getEventData = async() => {

      const remoteAccounts = new PouchDB('http://admin:admin@192.168.0.192:5984/m_account');

      var result = await remoteAccounts.allDocs({
        include_docs: true,
        attachments: true
      });
      if(result.rows){
          let modifiedArr = result.rows.map(function(item){
          return item.doc
      });
      let filteredData = modifiedArr.filter(item => {
          return item
        });
        if(filteredData) {
            let newFilterData = filteredData.map(item => {
                return item
                
            })
            setUserCoordinates(newFilterData[0].coordinates)
            console.log(newFilterData[0].coordinates)
            
        }
    }  
    };

    const [markers] = useState([
      {
          title: "People's Park",
          coordinates: [119.97919707716136, 16.155291199328147]
      },
      {
          title: 'Municipal Hall',
          coordinates: [119.97967189841017, 16.155688111027104]
      },
      {
          title: 'St. Joseph Cathedral',
          coordinates: [119.97852568801113, 16.155319396284753]
      },
      {
          title: 'City Health Center',
          coordinates: [119.97852568801113, 16.15648541146365]
      },
      {
          title: 'NBI Building',
          coordinates: [119.9801147770741, 16.15587464113419]
      },
      {
          title: 'Post Office',
          coordinates: [119.97990763368551, 16.156217042168677]
      }
  ]);
    

    return (
      <View style = {{width: '100%', height: '41%', position: 'absolute', top: 0}}>
      <MapboxGL.MapView style={{flex: 1}}>
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={usercoordinates}
        />

        {markers.map((marker) => (
          <MapboxGL.PointAnnotation
            id={marker.title}
            children={true}
            coordinate={marker.coordinates}
            title={marker.title}
            onSelected={() => {
              setSelectedMarker(marker);
              setShowModal(true);
            }}
          />
        ))}
        
      
      </MapboxGL.MapView>
      <InfoModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        info={selectedMarker && selectedMarker.title}
        onPress = {() => setShowModal(false)}
      />
      <View style = {{ width: 75, height: 75, backgroundColor: 'red', position: 'absolute', bottom: 10, left: 10,  borderRadius: 20}}></View>
    </View>
    );
  };

  export default ItemViewMap;
