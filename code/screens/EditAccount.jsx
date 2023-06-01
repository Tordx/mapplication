
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView , Alert , Button , Platform , ScrollView, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { dbremoteAccounts } from '../../database/database';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserAccount } from '../config/AccountSlice';
import { Black, DarkYellow, LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
import { StyleSheet } from 'react-native';
import { Loginbox } from './loginPage';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const EditAccount = () => {

  const {useraccount} = useSelector((action) => action.user)
  const dispatch = useDispatch();
  const colorScheme = useColorScheme() === 'dark';
  const [show, setShow] = useState(false)
  const [ids, setID] = useState(useraccount._id)
  const [revs, setRev] = useState(useraccount._rev)
  const [username, setUsername] = useState(useraccount.username)
  const [password, setPassword] = useState('')
  const [MobileNumber, setMobileNumber] = useState(useraccount.MobileNumber)
  const [Nationality, setNationality] = useState(useraccount.Nationality)
  const [Disability, setDisability] = useState(useraccount.Disability)
  const [UserID] = (useraccount.UserID)
  const [IDNumber, setIDNumber] = useState(useraccount.IDNumber)
  const [FirstName, setFirstName] = useState(useraccount.FirstName)
  const [MiddleName, setMiddleName] = useState(useraccount.MiddleName)
  const [LastName, setLastName] = useState(useraccount.LastName)
  const [Birthday, setBirthday] = useState(useraccount.Birthday)
  const [Sex, setSex] = useState(useraccount.Sex)
  const [Address, setAddress] = useState(useraccount.Address)
  const [AlternateContactNumber, setAlternateContactNumber] = useState(useraccount.AlternateContactNumber)
  const [Profilephoto, setProfilePhoto] = React.useState(useraccount.Image);
  const [Idcardimage, setIdCardImage] = React.useState(useraccount.Idcardimage);
  const [CommentCount] = useState(useraccount.CommentCount)
  const [loading, isloading] = useState(false);
  const navigation = useNavigation()

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

  const setNewSuperAdmin = async () => {
       try {
        
        isloading(true)
         var updateuser = {
             _id: ids,
             _rev: revs,
             username : username,
             password : password,
             MobileNumber : MobileNumber,
             Nationality : Nationality,
             Disability : Disability,
             IDNumber : IDNumber,
             FullName: FirstName + ' ' + MiddleName + ' ' + LastName,
             FirstName : FirstName,
             MiddleName : MiddleName,
             LastName : LastName,
             Birthday : Birthday,
             Sex : Sex,
             Address : Address,
             AlternateContactNumber : AlternateContactNumber,
             Image: Profilephoto,
             Idcardimage: Idcardimage,
             UserID: UserID,
             userType: "user",
             Status: "active",
             CommentCount: CommentCount,
         }
         dbremoteAccounts.put(updateuser)
         dispatch(setUserAccount(updateuser));
         console.log(updateuser);
         Alert.alert('Account details changed.')
         navigation.navigate('BottomTabs')
         

       } catch (error) {
        console.log(error)
       }
      }

      const checkpassword = async() => {
        try {
          let result = await dbremoteAccounts.allDocs({
            include_docs: true,
            attachments: true,
          });
          if (result.rows) {
            let modifiedArr = result.rows.map(
              item => item.doc
            );
            let filteredData = modifiedArr.filter(item => {
              return item.username === useraccount.username
            });
            const newFilterData = filteredData[0].password; // Use optional chaining to avoid errors if filteredData[0] is undefined
            if (newFilterData === password) {
              ToastAndroid.show("Great! Let's move on to the next stage", ToastAndroid.CENTER);
              setFirst(false);
              setSecond(true) 
              
            } else {
              ToastAndroid.show("Password is incorrect, please try again", ToastAndroid.CENTER);
              return;
            }
          }
        }catch (err) {
          console.log(err);
          ToastAndroid.show('Something went wrong, try again', ToastAndroid.LONG)
        }
      }

      const [first, setFirst] = useState(true)
      const [second, setSecond] = useState(false)

  return (
    <View style  ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme ? Black : White}} behavior='padding'>
    <ScrollView style = {{width: '100%', height: '100%'}}>
    <View style = {{justifyContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
    {first && <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
    <Image source = {{uri: 'https://i.imgur.com/19s7qDu.png'}} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
      <Text style = {[styles.headertagline, {color: colorScheme ? White : Black}]}>Verify your account</Text>
      <Text style = {{ fontSize: 20, color: colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>Please enter your password to proceed.</Text>
      <Loginbox 
        placeholder = 'password' 
        secureTextEntry= {show} 
        name = {show ? 'visibility' : 'visibility-off'}
        onPress = {() => setShow(!show)} 
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <Pressable style = {[styles.button,{borderColor: colorScheme ? LightYellow : Black}]}
        onPress={checkpassword}
      >
        <Text style = {[styles.buttontext, {color: colorScheme ? LightYellow : Black}]}>Next</Text>
      </Pressable>
      <Text style = {{ fontSize: 15, color: colorScheme ? LightYellow : Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginTop: 20, paddingHorizontal: 20}}>If you forgot your password, you may visit the Alaminos city Hall or contact the moderators for a password reset request</Text>
        
        </View>}
        {second && 
        <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
       <Image source = {{uri: 'https://i.imgur.com/19s7qDu.png'}} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
            <Text style = {[styles.headertagline, {color: colorScheme ? White : Black}]}>Edit Information</Text>
            <Text style = {{ fontSize: 20, color: colorScheme ? LightYellow : Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>Ensure that all provided information is true, accurate, complete, and up-to-date to avoid negative consequences. False or misleading information can have serious legal and ethical implications.</Text>
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
        placeholder = 'Mobile Number' 
        onChangeText={(value) => setMobileNumber(value)}
        value={MobileNumber}
      />
           <View style={{flexDirection: "row" , marginBottom :20}}>
            <View>
            <Image source={{uri: Profilephoto}} style={{ width: 250, height: 250 , margin: 10, borderRadius: 500 }}/>
            <Button  title="PROFILE PHOTO" onPress={handleProfilePhoto} />
            </View>
            </View>
            <View style={{flexDirection: "row",alignItems: 'center', justifyContent: 'space-between', width: '50%'}}>
          
      </View>
          <Pressable style = {[styles.button, { borderColor: colorScheme ? LightYellow : Black}]}
       onPress={setNewSuperAdmin}
     >
       <Text style = {[styles.buttontext, {color: colorScheme ? LightYellow : Black}]}>UPDATE PROFILE</Text>
     </Pressable></View>
          }
     <Modal 

      transparent
      visible = {loading}
      style={styles.container}
      animationType='slide'

      >
      <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000199'}}>
        <View style={{width: 400, height: 150, backgroundColor: White, borderRadius: 20, justifyContent: 'center', alignItems: 'center',}}>
        <Text style = {{textAlign: 'center', fontSize: 17, fontFamily: 'Nexa-Heavy', color: Black}}>Please wait, while we set things up</Text>
        </View>
        
      </View>
      </Modal>  
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

export default EditAccount