
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView , Alert , Button , Platform, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { dbremoteAccounts } from '../../database/database';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Loginbox } from './loginPage';
import { Black, LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
import { StyleSheet } from 'react-native';


const Signup = () => {

  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [MobileNumber, setMobileNumber] = useState('')
  const [Nationality, setNationality] = useState('')
  const [IDType, setIDType] = useState('')
  const [IDCardImage, setIDCardImage] = useState('')
  const [IDNumber, setIDNumber] = useState('')
  const [ProfilePicture, setProfilePicture] = useState('')
  const [FirstName, setFirstName] = useState('')
  const [MiddleName, setMiddleName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Birthday, setBirthday] = useState('')
  const [Sex, setSex] = useState('')
  const [Address, setAddress] = useState('')
  const [AlternateContactNumber, setAlternateContactNumber] = useState('')
  const [Profilephoto, setProfilePhoto] = React.useState(null);
  const [Idcardimage, setIdCardImage] = React.useState(null);

  const navigation = useNavigation()
  const id = uuid.v4()

  const handleProfilePhoto = async() => {
    launchImageLibrary({ noData: true }, async(response) => {
      // console.log(response);
      if (response) {
        const datapic = response
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
          setProfilePhoto(photolink)
          console.log('photolink', photolink);
        } catch (error) {
          console.log('error', error);
        }
      }
    });
  };

  const handleIDCardImage = async() => {
    launchImageLibrary({ noData: true }, async(response) => {
      // console.log(response);
      if (response) {
        const datapic = response
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
        } catch (error) {
          console.log('error', error);
        }
      }
    });
  };

  const setNewSuperAdmin = async () => {
      
       try {
         var NewSuperAdmin = {
             _id: id,
             username : username,
             password : password,
             MobileNumber : MobileNumber,
             Nationality : Nationality,
             IDType : IDType,
             IDCardImage : IDCardImage,
             IDNumber : IDNumber,
             ProfilePicture : ProfilePicture,
             UserID: id,
             FullName: FirstName + ' ' + MiddleName + ' ' + LastName,
             FirstName : FirstName,
             MiddleName : MiddleName,
             LastName : LastName,
             Birthday : Birthday,
             Sex : Sex,
             Address : Address,
             AlternateContactNumber : AlternateContactNumber,
             Profilephoto: Profilephoto,
             Idcardimage: Idcardimage
         }
      dbremoteAccounts.put(NewSuperAdmin)
         .then((response) =>{
           Alert.alert('Your Super Admin is Added has been successfully added!')
           console.log(response)
          //  SyncSuperAdmin()
           navigation.navigate('BottomTabs')

         })
         .catch(err=>console.log(err))
         
       } catch (error) {
        console.log(error)
       }
      }

      const [opening, setOpening] = useState(true)
      const [first, setFirst] = useState(false)
      const [second, setSecond] = useState(false)
      const [third, setthird] = useState(false)
      const [forth, setForth] = useState(false)
      const [fifth, setfifth] = useState(false)
  return (
    <View style  ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Black}} behavior='padding'>
      <ScrollView style = {{width: '100%', height: '100%'}}>
      <View style = {{justifyContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
       {opening && 
        <View style = {{justifyContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
       <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
        <Text style = {styles.headertagline}>Welcome to Alaminos city PWD community!</Text>
        <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>We're thrilled to have you on our journey towards a more inclusive world for people with disabilities. With your support, we can work towards breaking down barriers and creating a more accessible and equal society. we can't wait for you to be a part of our community!</Text>
        <Pressable style = {styles.button}
          onPress={ () => {setOpening(false); setFirst(true)}}
        >
          <Text style = {styles.buttontext}>Continue</Text>
        </Pressable>
        </View>}
      {first && <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
      <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
        <Text style = {styles.headertagline}>Welcome to Alaminos city PWD community!</Text>
        <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>We're thrilled to have you on our journey towards a more inclusive world for people with disabilities. With your support, we can work towards breaking down barriers and creating a more accessible and equal society. we can't wait for you to be a part of our community!</Text>
        
        <Loginbox 
          placeholder = 'username' 
          secureTextEntry = {false} name = '' 
          onPress={() => console.log('usernamepressed')} 
          onChangeText={(value) => setUsername(value)}
          value={username}
        />
        <Loginbox 
          placeholder = 'password' 
          secureTextEntry= {show} 
          name = {show ? 'visibility' : 'visibility-off'}
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <Pressable style = {[styles.button]}
          onPress={ () => {setFirst(false); setSecond(true)}}
        >
          <Text style = {styles.buttontext}>Next</Text>
        </Pressable></View>}
          {second && 
          <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
            <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
              <Text style = {styles.headertagline}>Welcome to Alaminos city PWD community!</Text>
              <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>We're thrilled to have you on our journey towards a more inclusive world for people with disabilities. With your support, we can work towards breaking down barriers and creating a more accessible and equal society. we can't wait for you to be a part of our community!</Text>
        <Loginbox 
          placeholder = 'FirstName' 
          onChangeText={(value) => setFirstName(value)}
          value={FirstName}
        />
        <Loginbox 
          placeholder = 'MiddleName' 
          onChangeText={(value) => setMiddleName(value)}
          value={MiddleName}
        />
        <Loginbox 
          placeholder = 'LastName' 
          onChangeText={(value) => setLastName(value)}
          value={LastName}
        />
        <Loginbox 
          placeholder = 'Birthday' 
          onChangeText={(value) => setBirthday(value)}
          value={Birthday}
        />
        <Loginbox 
          placeholder = 'Sex' 
          onChangeText={(value) => setSex(value)}
          value={Sex}
        />
         <Pressable style = {[styles.button]}
          onPress={ () => {setSecond(false); setthird(true)}}
        >
          <Text style = {styles.buttontext}>Next</Text>
        </Pressable></View>}
        {third && 
         <View style = {{justifyContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
       <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
        <Text style = {styles.headertagline}>Welcome to Alaminos city PWD community!</Text>
        <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>We're thrilled to have you on our journey towards a more inclusive world for people with disabilities. With your support, we can work towards breaking down barriers and creating a more accessible and equal society. we can't wait for you to be a part of our community!</Text>
        <Loginbox 
          placeholder = 'MobileNumber' 
          onChangeText={(value) => setMobileNumber(value)}
          value={MobileNumber}
        />
        <Loginbox 
          placeholder = 'Address' 
          onChangeText={(value) => setAddress(value)}
          value={Address}
        />
        <Pressable style = {[styles.button]}
        onPress={ () => {setthird(false); setForth(true)}}
      >
        <Text style = {styles.buttontext}>Next</Text>
      </Pressable></View>}
        {forth && 
           <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
             <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
              <Text style = {styles.headertagline}>Welcome to Alaminos city PWD community!</Text>
              <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>We're thrilled to have you on our journey towards a more inclusive world for people with disabilities. With your support, we can work towards breaking down barriers and creating a more accessible and equal society. we can't wait for you to be a part of our community!</Text>
             <Loginbox 
              placeholder = 'Nationality' 
              onChangeText={(value) => setNationality(value)}
              value={Nationality}
            /> 
            <Loginbox 
              placeholder = 'Alternate contact number' 
              onChangeText={(value) => setAlternateContactNumber(value)}
              value={AlternateContactNumber}
            />
            <Loginbox 
              placeholder = 'IDType' 
              onChangeText={(value) => setIDType(value)}
              value={IDType}
            />
            <Loginbox 
              placeholder = 'IDNumber' 
              onChangeText={(value) => setIDNumber(value)}
              value={IDNumber}
            />
            <Pressable style = {[styles.button]}
         onPress={ () => {setForth(false); setfifth(true)}}
       >
         <Text style = {styles.buttontext}>Next</Text>
       </Pressable></View>
            }
        
        {/* <View style={{flexDirection: "row"}}>
        <Button  title="PROFILE PHOTO" onPress={handleProfilePhoto} />
        <Button title="ID CARD IMAGE" onPress={handleIDCardImage} />
        </View>

        <Pressable style = {{margin: 10, width: '35%', backgroundColor: '#f5f5f5', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
        onPress={() => setNewSuperAdmin()}
        >
          <Text style = {{textAlign: 'center', fontSize: 17, fontWeight: '500'}}>
             SIGN UP
          </Text>
        </Pressable> */}
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    
  container: {

      width: '100%', 
      height: '100%', 
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center'
  },
  headertagline: {

      textAlign: 'center', 
      fontSize: 35, 
      color: White, 
      fontFamily: 'Nexa-Heavy',
      marginBottom: 20
  },
  buttoncontainer: {
      position: 'absolute', 
      bottom: 30, 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%'
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
  },
  buttontext: {
      
      textAlign: 'center', 
      fontSize: 20, 
      color: White, 
      fontFamily: 'Nexa-Heavy'
  }

})

export default Signup