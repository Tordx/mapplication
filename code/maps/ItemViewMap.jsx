  //import liraries
  import React, { useState, useEffect, useRef } from 'react';
  import { View, Text, Modal, Pressable, FlatList } from 'react-native';
  import MapboxGL from '@rnmapbox/maps';
  import { useDispatch, useSelector } from 'react-redux'
  import { Store } from '@reduxjs/toolkit';
  import PouchDB from 'pouchdb-react-native' ;
  import 'pouchdb-core';
  import Icon  from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import { dbremoteComments } from '../../database/database';
import { Dimensions } from 'react-native';
import { setNewImage } from '../config/ItemSlice';
  const token = 'sk.eyJ1IjoidG9yZHh4IiwiYSI6ImNsZG92OHF2OTAzangzdm80dnJrcHV6YmMifQ.O8EA2bhzmkD4DTBnrvh8Xg'

  MapboxGL.setWellKnownTileServer('Mapbox');
  MapboxGL.setAccessToken(token)

  const InfoModal = ({ isVisible, onClose, info, onPress }) => (
    <Modal visible={isVisible} onRequestClose={onClose} transparent animationType='fade'>
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

      getcommentimage()

    },[images])

    
    const dispatch = useDispatch();
    const {ItemList} = useSelector((action) => action.items)
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [images, setImages] = useState();
    const [TopImage, setTopImage] = useState("");
    const {useraccount} = useSelector((store) => store.user)

    const getcommentimage = async() => {

        let result = await dbremoteComments.allDocs({
          attachments: true,
          include_docs: true,
        });
        if(result.rows) {
          let modifiedArr = result.rows.map(item => 
            item.doc
        );
          let filteredData = modifiedArr.filter((item) => {
            return item.CommentID === ItemList.CommentID
          })
          
          const newFilteredData = filteredData.map((item) => item.ImageAttachment);
          const newFilteredURL = newFilteredData.map(item => item.filter(url => url !== ""));
          const flattenedImages = newFilteredURL.flat(); // <-- flatten the images array
          if (flattenedImages[0] === null) {
            return
          } else {
            setTopImage(flattenedImages[0])
            dispatch(setNewImage(flattenedImages[0]))
          }
          console.log(flattenedImages[0]);
          setImages(flattenedImages)
          console.log(flattenedImages);
        }


    }

    const windowWidth = Dimensions.get('window').width;

    const renderItem = ({ item }) => {
        return(
          <Image
            source = {{uri: item}}
            style = {{width: windowWidth, height: '100%', alignSelf: 'center'}}
          />
        )
    }
    return (
      <>
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
          />
        
      
      </MapboxGL.MapView>
      {TopImage && (
      <Pressable
        onPress={() => setShowModal(true)} style = {{ width: 75, height: 75, position: 'absolute', bottom: 20, left: 15,  borderRadius: 20}}>
        <Image source={{uri: TopImage}} resizeMode='cover' style = {{width: '100%', height: '100%', borderRadius: 21}} />

        </Pressable>
      )}
    </View>
    
    <Modal visible={showModal} onRequestClose={() => setShowModal(false)} animationType='slide'>
       <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
        <FlatList
        data={images}
        horizontal
        pagingEnabled
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      </View>
      </Modal>
    </>
    );
  };

  export default ItemViewMap;
