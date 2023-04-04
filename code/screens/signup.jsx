
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView , Alert , Button , Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { dbremoteAccounts } from '../../database/database';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';



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

const Signup = () => {

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
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
  const [photo, setPhoto] = React.useState(null);

  const navigation = useNavigation()
  const id = uuid.v4()

  const handleChoosePhoto = async() => {
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
          setPhoto(photolink)
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
             email : email,
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
             ProfilePhoto: photo
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
          onChangeText={(value) => setEmail(value)}
          value={email}
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
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setMobileNumber(value)}
          value={MobileNumber}
        />
        </View>
        <View style={{flexDirection: 'row'}}>
        <Loginbox 
          placeholder = 'Nationality' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setNationality(value)}
          value={Nationality}
        />
        <Loginbox 
          placeholder = 'IDType' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setIDType(value)}
          value={IDType}
        />
        <Loginbox 
          placeholder = 'IDNumber' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setIDNumber(value)}
          value={IDNumber}
        />
        </View>
        <View style={{flexDirection: 'row'}}>
        <Loginbox 
          placeholder = 'FirstName' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setFirstName(value)}
          value={FirstName}
        />
        <Loginbox 
          placeholder = 'MiddleName' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setMiddleName(value)}
          value={MiddleName}
        />
        <Loginbox 
          placeholder = 'LastName' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setLastName(value)}
          value={LastName}
        />
        </View>
        <Loginbox 
          placeholder = 'Birthday' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setBirthday(value)}
          value={Birthday}
        />
        <Loginbox 
          placeholder = 'Sex' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setSex(value)}
          value={Sex}
        />
        <Loginbox 
          placeholder = 'Address' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
          onChangeText={(value) => setAddress(value)}
          value={Address}
        />
        <Loginbox 
          placeholder = 'AlternateContactNumber' 
          secureTextEntry= {show} 
          onPress = {() => setShow(!show)} 
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
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
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

export default Signup