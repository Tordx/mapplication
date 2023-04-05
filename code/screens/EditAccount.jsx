
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView , Alert , Button , Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { dbremoteAccounts } from '../../database/database';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { useSelector } from 'react-redux';



const Loginbox = (props) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style = {{width: '30%', justifyContent: 'center', alignItems: 'center', backgroundColor: isFocused ? '#ccb16a' : '#ffdd85', borderRadius: 5,  margin: 5, flexDirection: 'row'}}>
    <TextInput style = {{width: '100%', fontSize: 18, margin: 5, paddingLeft: 5,}}
      placeholder = {props.placeholder}
      secureTextEntry = {props.secureTextEntry}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChangeText={props.onChangeText}
      value={props.value}
      />
      <Pressable onPress = {props.onPress} style = {{position: 'absolute', right: 10}}>
        <Icon
          name = {props.name}
          color = '#fff'
          size  = {25}
        />
      </Pressable>
    </View>
  )
}

const EditAccount = () => {

 const {useraccount} = useSelector((action) => action.login)
 console.log('====================================useraccount');
 console.log(useraccount);
 console.log('====================================useraccount');

  const [show, setShow] = useState(false)
  const [ids, setID] = useState(useraccount.id)
  const [username, setUsername] = useState(useraccount.username)
  const [password, setPassword] = useState(useraccount.password)
  const [MobileNumber, setMobileNumber] = useState(useraccount.MobileNumber)
  const [Nationality, setNationality] = useState(useraccount.Nationality)
  const [IDType, setIDType] = useState(useraccount.IDType)
//   const [IDCardImage, setIDCardImage] = useState(useraccount.IDCardImage)
  const [IDNumber, setIDNumber] = useState(useraccount.IDNumber)
//   const [ProfilePicture, setProfilePicture] = useState(useraccount)
  const [FirstName, setFirstName] = useState(useraccount.FirstName)
  const [MiddleName, setMiddleName] = useState(useraccount.MiddleName)
  const [LastName, setLastName] = useState(useraccount.LastName)
  const [Birthday, setBirthday] = useState(useraccount.Birthday)
  const [Sex, setSex] = useState(useraccount.Sex)
  const [Address, setAddress] = useState(useraccount.Address)
  const [AlternateContactNumber, setAlternateContactNumber] = useState(useraccount.AlternateContactNumber)
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
             _id: ids,
             username : username,
             password : password,
             MobileNumber : MobileNumber,
             Nationality : Nationality,
             IDType : IDType,
             IDCardImage : IDCardImage,
             IDNumber : IDNumber,
             ProfilePicture : ProfilePicture,
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

  return (
    <KeyboardAvoidingView style  ={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadada'}} behavior='padding'>
      <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Image source = {require('../Assets/images/sample_logo.png')} style = {{width: 200, height: 200}} resizeMode = 'contain' />
        <View style={{flexDirection: 'row'}}>
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
        <Loginbox 
          placeholder = 'MobileNumber' 
          onChangeText={(value) => setMobileNumber(value)}
          value={MobileNumber}
        />
        </View>
        <View style={{flexDirection: 'row'}}>
        <Loginbox 
          placeholder = 'Nationality' 
          onChangeText={(value) => setNationality(value)}
          value={Nationality}
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
        </View>
        <View style={{flexDirection: 'row'}}>
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
        </View>
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
        <Loginbox 
          placeholder = 'Address' 
          onChangeText={(value) => setAddress(value)}
          value={Address}
        />
        <Loginbox 
          placeholder = 'AlternateContactNumber' 
          onChangeText={(value) => setAlternateContactNumber(value)}
          value={AlternateContactNumber}
        />
         {/* <Loginbox 
          placeholder = 'IDCardImage' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setIDCardImage(value)}
          value={IDCardImage}
        />
        <Loginbox 
          placeholder = 'ProfilePicture' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setProfilePicture(value)}
          value={ProfilePicture}
        /> */}
        
        {/* <Button title="Upload Photo" onPress={handleUploadPhoto} /> */}
        <View style={{flexDirection: "row"}}>
        <Button  title="PROFILE PHOTO" onPress={handleProfilePhoto} />
        <Button title="ID CARD IMAGE" onPress={handleIDCardImage} />
        </View>

        <Pressable style = {{margin: 10, width: '35%', backgroundColor: '#f5f5f5', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
        onPress={() => setNewSuperAdmin()}
        >
          <Text style = {{textAlign: 'center', fontSize: 17, fontWeight: '500'}}>
             SIGN UP
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default EditAccount