//import liraries
import MapboxGL from '@rnmapbox/maps';
import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { Modal } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Black, LightBlue, LightYellow, White } from '../../Assets/Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { Loginbox } from '../loginPage';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const AddLocation = () => {

    const navigation = useNavigation()
    const [defaultcoord, setDefaultCoord] = useState([119.97919707716136, 16.155291199328147]);
    const [openModal, setOpenModal] = useState(false);
    const [location, setLocation] = useState('');
    const [Image, setImage] = useState('');
    const [PropertyType, setPropertyType] = useState('');

    const HandleImage = async() => {
    
        launchImageLibrary({ noData: true }, async (response) => {

            if (response) {
              const datapic = response;
              console.log(response)
              try {
                console.log(data)
                const data = await RNFetchBlob.fs.readFile(
                  datapic.assets[0].uri,
                  'base64'
                );
                const formData = new FormData();
                formData.append('image', data);
                const response = await fetch('https://api.imgur.com/3/image', {
                  method: 'POST',
                  headers: {
                    'Authorization': 'Bearer bd49a5b019e13ffe584a4c735069141287166b0c',
                  },
                  body: formData,
                });
                const result = await response.json();
                const photolink = result.data.link;
                setImage(Image, photolink);
              } catch (error) {
                console.log('error', error);
              }
            }
          });
      };

    return (
        <View style={styles.container}>
              <Pressable style = {[styles.button, {height: 150, width: 400, borderColor: Image === '' ? LightBlue : '#202020'}]} 
              onPress={HandleImage} 
              disabled = {Image === '' ?false : true}>
            <Text style = {[styles.buttontext, {fontFamily: 'Nexa-ExtraLight', color: '#707070'}]}>{Image === '' ? "UPLOAD DISPLAY PHOTO" : "SUCESSFULLY UPLOADED!"}</Text>
            {Image == '' && <Icon
                name = {'image'}
                size={100}
                color={LightBlue}
              />
              }
          </Pressable>
          {Image && <Image style = {{width: 200, height: 200, marginBottom: 20, borderRadius: 500}} resizeMode='cover' source={{uri: Image}} />}
          <Text style={{ fontSize: 17, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Establishment Name</Text>
          <Loginbox
            placeholder = 'City Jail, Public Market, etc.,'
          />
          <Text style={{ fontSize: 17, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Property Type</Text>
        <View style = {{width: '95%', justifyContent: 'center', alignItems: 'center', borderColor: LightBlue, borderWidth: 2, borderRadius: 20,  margin: 5, flexDirection: 'row'}}>
            <Picker
            itemStyle = {{fontFamily:'Nexa-ExtraLight'}}
            style={{width: '100%', fontSize: 18, margin: 5, paddingLeft: 20, color: White}}
            selectedValue={PropertyType}
            value = {PropertyType}
            onValueChange={(itemValue, itemIndex) => setPropertyType(itemValue)}
            
            >
            <Picker.Item enabled = {false} label="Select" value="Select" /> 
            <Picker.Item label="Government" value="Government" /> 
            <Picker.Item label="Corporate" value="Corporate" />
            <Picker.Item label="Local" value="Local" />
            </Picker>
        </View>
            <Modal
                visible = {openModal}
                onRequestClose={() => navigation.navigate('Toptabs')}
            >
            <View style = {{flex: 1,}}>
                <MapboxGL.MapView style={{flex: 1}}
                    logoEnabled = {false}
                    attributionEnabled = {false}
                    onLongPress={(event) => {
                        console.log('Long press event:', event);
                        const coordinates = event.geometry.coordinates;
                        setDefaultCoord(coordinates)
                        console.log('Selected coordinates:', coordinates);
                    }}
                >
                    <MapboxGL.Camera
                    zoomLevel={15}
                    centerCoordinate={defaultcoord}
                    logoEnabled = {false}
                    attributionEnabled = {false}
                    />
                    <MapboxGL.PointAnnotation
                        id={location}
                        children={true}
                        coordinate={defaultcoord}
                        title={location}
                    />
                </MapboxGL.MapView>
                    
                    </View>
                    <Pressable style = {{justifyContent: 'center', alignItems: 'center', position: 'absolute', alignSelf: 'center', bottom: 20 }}
                        onPress={() => setOpenModal(false)}
                    >
                        <Text style = {{color: Black, backgroundColor: LightYellow, padding: 20, width: 200, textAlign: 'center', fontFamily: 'Nexa-Heavy', borderRadius: 20}}>
                            CONFIRM
                        </Text>
                    </Pressable>
                    <Pressable style = {{justifyContent: 'center', alignItems: 'center', position: 'absolute', alignSelf: 'center', top: 20, left: 5 }}
                        onPress={() => navigation.goBack('Toptabs')}
                    >
                       <Icon name = 'keyboard-arrow-left' size = {50} color={Black}/>
                    </Pressable>
            </Modal>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Black
    },

    button: {
    
        borderRadius: 20, 
      height: 60, 
      width: '85%', 
      borderWidth: 2, 
      borderColor: White,  
      justifyContent: 'center', 
      alignItems: 'center', 
      margin: 5,
      marginTop: 20
    }
});

//make this component available to the app
export default AddLocation;
