//import liraries
import MapboxGL from '@rnmapbox/maps';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Black, LightBlue, LightYellow, White } from '../../Assets/Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { Loginbox } from '../loginPage';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { dbremoteEstablishment } from '../../../database/database';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const AddLocation = () => {

    const navigation = useNavigation()
    const [defaultcoord, setDefaultCoord] = useState([119.97919707716136, 16.155291199328147]);
    const [openModal, setOpenModal] = useState(true);
    const [Establishment, setEstablishment] = useState('');
    const [Image, setImage] = useState('');
    const [Idcardimage, setIdCardImage] =useState(null);
    const [PropertyType, setPropertyType] = useState('');
    const id = uuid.v4()
    const date = new Date()
    const todate = date.toLocaleDateString()

    const setnewlocation = async () => {

        if( Establishment === 0|| Idcardimage === 0) {
            return
        }
        else {
            try {
            var addestablishment = {
                _id: id,
                Establishment : Establishment,
                Coordinates: defaultcoord,
                Image: Idcardimage,
                Rating: 0,
                EstablishmentRating: 0,
                RatingCount: 0,
                ParkingRating: 0,
                RampRating: 0,
                TactilesRating: 0,
                CommentsCount: 0,
                CommentID: Establishment,
                PropertyType : PropertyType,
                Date : todate,
            }
                dbremoteEstablishment.put(addestablishment)
                    .then((response) =>{
                    Alert.alert('Sucess!','User may now submit a review to this establishment')
                    console.log(response)
                    setEstablishment('');
                    setPropertyType('');
                    setIdCardImage(null)
                    setDefaultCoord([119.97919707716136, 16.155291199328147]);

                    }).catch(err=>console.log(err))
            } catch (error) {
            console.log(error)
            }
        }
    }

       const handleEstablishmentImage = async() => {

        if(Idcardimage !== null){
          return;
        }
        launchImageLibrary({ noData: true }, async(response) => {
          // console.log(response);
          if (response) {
            const datapic = response
            const piclocation = datapic.assets[0].uri
            // setPhoto(response);
            try {
              const data = await RNFetchBlob.fs.readFile(datapic.assets[0].uri, 'base64');
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
              const photolink = result.data.link
              setIdCardImage(photolink)
              console.log('photolink', photolink);
              ToastAndroid.show('Sucessfully added Establishment Profile', ToastAndroid.SHORT)
            } catch (error) {
              console.log('error', error);
            }
          }
        });
      };

    
    return (
        <>
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
                zoomLevel={18}
                centerCoordinate={defaultcoord}
                logoEnabled = {false}
                attributionEnabled = {false}
                />
                <MapboxGL.PointAnnotation
                    id={id}
                    children={true}
                    coordinate={defaultcoord}
                    title={Establishment}
                />
            </MapboxGL.MapView>
            <View style={{backgroundColor: Black, justifyContent: 'center', alignItems: 'center', height: 400, borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
            <ScrollView style = {{width: '100%', height: '100%'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{paddingLeft: 20, color: White, fontSize: 20, fontFamily: 'Nexa-Heavy', paddingTop: 10, marginTop: 10, alignSelf: 'flex-start'}}>ADD NEW LOCATION</Text>
            <Pressable style = {[styles.button, {height: 150, width: 400, borderColor: Idcardimage === null ? LightBlue : '#202020'}]} onPress={handleEstablishmentImage} disabled = {Idcardimage === null ?  false : true}>
              <Text style = {[styles.buttontext, {fontFamily: 'Nexa-ExtraLight', color: '#707070'}]}>{Idcardimage === null ? "UPLOAD ID PHOTO" : "SUCESSFULLY UPLOADED!"}</Text>
              <Icon
                name = {Idcardimage === null ? 'image': 'check-box'}
                size={100}
                color={Idcardimage === null ? LightBlue: '#90EE90'}
              />
            </Pressable>
                <Text style={{ fontSize: 17, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Establishment Name</Text>
                <Loginbox
                placeholder = 'City Jail, Public Market, etc.,'
                onChangeText = {(text) => setEstablishment(text)}
                value = {Establishment}
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
                <Pressable style = {{justifyContent: 'center', alignItems: 'center',}} onPress = {setnewlocation} >
                    <Text style = {{borderColor: LightYellow, borderWidth: 1, borderRadius: 20, width: 200, padding: 20, textAlign: 'center', marginVertical: 10}}>
                        CONFIRM
                    </Text>
                </Pressable>
                </View>
                </ScrollView>
                </View>
            <Icon
                onPress={() => navigation.goBack('Toptabs')}
                style = {{position: 'absolute', top: 20, left: 5}}
                size={50}
                color={Black}
                name = 'keyboard-arrow-left'
            />
        </>
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


           
{/* <View>
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
</View> */}