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
const AddLocation = () => {

    const navigation = useNavigation()
    const [defaultcoord, setDefaultCoord] = useState([119.97919707716136, 16.155291199328147]);
    const [openModal, setOpenModal] = useState(true);
    const [Establishment, setEstablishment] = useState('');
    const [Image, setImage] = useState('');
    const [PropertyType, setPropertyType] = useState('');
    const id = uuid.v4()
    const date = new Date()
    const todate = date.toLocaleDateString()

    const setnewlocation = async () => {
      
        try {
          var addestablishment = {
              _id: id,
              Establishment : Establishment,
              Coordinates: defaultcoord,
              Image: Image,
              Rating: 5,
              EstablishmentRating: 5,
              RatingCount: 1,
              ParkingRating: 5,
              RampRating: 5,
              TactilesRating: 5,
              CommentsCount: 1,
              CommentID: Establishment,
              PropertyType : PropertyType,
              Date : todate,
          }
       dbremoteEstablishment.put(addestablishment)
          .then((response) =>{
            Alert.alert('Sucess!','user may now submit a review to this establishment')
            console.log(response)
            setEstablishment('');
            setPropertyType('');
            setDefaultCoord([119.97919707716136, 16.155291199328147]);
 
          })
          .catch(err=>console.log(err))
          
        } catch (error) {
         console.log(error)
        }
       }

    
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
                zoomLevel={15}
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
            <View style={{backgroundColor: Black, justifyContent: 'center', alignItems: 'center', height: '37%', borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
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