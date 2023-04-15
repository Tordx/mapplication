
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView , Alert , Button , Platform, ScrollView, ToastAndroid, BackHandler } from 'react-native'
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

  
    const handleBackButton = () => {

      if (opening){
      navigation.navigate('welcomePage')
    } else {
      return null
    }
    };

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }, []);
  

  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [MobileNumber, setMobileNumber] = useState('')
  const [Nationality, setNationality] = useState('')
  const [IDType, setIDType] = useState('')
  const [disability, setDisability] = useState('')
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
  const [ProfilephotoDisplay, setProfilePhotoDisplay] = React.useState("https://imgur.com/a/Q9oD9Uu");
  const [IdcardimageDisplay, setIdCardImageDisplay] = React.useState("https://imgur.com/a/Q9oD9Uu");

  const navigation = useNavigation()
  const id = uuid.v4()

  const handleProfilePhoto = async() => {

    if(Profilephoto !== null){
      return;
    }

    launchImageLibrary({ noData: true }, async(response) => {
      console.log('response');
      console.log(response);
      console.log('response');
      // console.log(response);
      if (response) {
        const datapic = response
        const piclocation = datapic.assets[0].uri
        setProfilePhotoDisplay(piclocation)
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

    if(Idcardimage !== null){
      return;
    }
    launchImageLibrary({ noData: true }, async(response) => {
      // console.log(response);
      if (response) {
        const datapic = response
        const piclocation = datapic.assets[0].uri
        setIdCardImageDisplay(piclocation)
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
          ToastAndroid.show('Sucessfully added your ID', ToastAndroid.LONG)
        } catch (error) {
          console.log('error', error);
        }
      }
    });
  };

  const setnewuser = async () => {
      
       try {
         var adduser = {
             _id: id,
             username : username,
             password : password,
             MobileNumber : MobileNumber,
             Nationality : Nationality,
             Disability : disability,
             IDNumber : IDNumber,
             UserID: id,
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
             Account: "User",
             Status: 'inactive'
         }
      dbremoteAccounts.put(adduser)
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

      const handleNoSpace = (inputText) => {
        // Remove spaces from the input text using a regular expression
        const nospace = inputText.replace(/\s/g, '');
        setUsername(nospace)
      };

      const handlefirst = () => {
        if ((username.length < 6) && (password.length < 6)) {
          ToastAndroid.show('username and password must contain at least 6 alphanumeric', ToastAndroid.CENTER)
        } else {
          setFirst(false); setSecond(true) 
        }
      }
      const handleSecond = () => {
        if (!(FirstName && LastName && Address && Birthday && Sex)) {
          ToastAndroid.show('Please fill up all fields', ToastAndroid.SHORT)
        } else {
          setSecond(false); setthird(true)
        }
      }

      const handleFourth = () => {
        if (!(Nationality && disability && IDNumber && Idcardimage)) {
          ToastAndroid.show('Please fill up all fields', ToastAndroid.SHORT)
        } else {
          setForth(false); setfifth(true)
        }
      }
  return (
    <View style  ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Black}} >
      <ScrollView style = {{width: '100%', height: '100%'}}>
      <KeyboardAvoidingView style = {{justifyContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
       {opening && 
        <View style = {{justifyContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
       <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
        <Text style = {styles.headertagline}>Welcome to Ease Access!</Text>
        <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '80%'}}>We're thrilled to have you on our journey towards a more inclusive world for people with disabilities. With your support, we can work towards breaking down barriers and creating a more accessible and equal society. we can't wait for you to be a part of our community!</Text>
        <Pressable style = {styles.button}
          onPress={ () => {setOpening(false); setFirst(true)}}
        >
          <Text style = {styles.buttontext}>Continue</Text>
        </Pressable>
        </View>}
      {first && <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
      <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
      <Text style = {styles.headertagline}>Let's Get Started</Text>
        <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '80%'}}>First,  Create Your Account by Filling in Your Username and Password</Text>
        
        <Loginbox 
          placeholder = 'username' 
          secureTextEntry = {false} name = '' 
          onPress={() => console.log('usernamepressed')} 
          onChangeText={handleNoSpace}
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
          onPress={handlefirst}
        >
          <Text style = {styles.buttontext}>Next</Text>
        </Pressable>
        <Pressable style = {[styles.button, {width: 100, borderColor: 'red'}]}
          onPress={ () => {setOpening(true); setFirst(false);}}>
         <Icon
          name='arrow-back'
          size={30}
          color={'red'}
         />
        </Pressable></View>}
          {second && 
          <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
            <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
              <Text style = {styles.headertagline}>Then, few of your personal information</Text>
              <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '80%'}}>The information you provided are to be displayed in your account, and rest assured that all information are not used in other means</Text>
            <Pressable style = {[styles.button, {height: 150, width: 400, borderColor: Profilephoto === null ? LightBlue : '#202020'}]} onPress={handleProfilePhoto()} disabled = {Profilephoto === null ?  false : true}>
            <Text style = {[styles.buttontext, {fontFamily: 'Nexa-ExtraLight', color: '#707070'}]}>{Profilephoto === null ? "UPLOAD DISPLAY PHOTO" : "SUCESSFULLY UPLOADED!"}</Text>
            <Icon
              name = {Profilephoto === null ? 'image': 'check-box'}
              size={100}
              color={Profilephoto === null ? LightBlue: '#90EE90'}
            />
          </Pressable>
          {Profilephoto && <Image style = {{width: 350, height: 200}} resizeMode='contain' source={{uri: Profilephoto}} />}
        
        <Loginbox 
          placeholder = 'First mame' 
          onChangeText={(value) => setFirstName(value)}
          value={FirstName}
        />
        <Loginbox 
          placeholder = 'Middle name' 
          onChangeText={(value) => setMiddleName(value)}
          value={MiddleName}
        />
        <Loginbox 
          placeholder = 'Last name' 
          onChangeText={(value) => setLastName(value)}
          value={LastName}
        />
        
        <Loginbox 
          placeholder = 'Address' 
          onChangeText={(value) => setAddress(value)}
          value={Address}
        />

        <Loginbox 
          placeholder = 'Birthday' 
          onChangeText={(value) => setBirthday(value)}
          value={Birthday}
        />
        <Loginbox 
          placeholder = 'Sex/gender' 
          onChangeText={(value) => setSex(value)}
          value={Sex}
        />
         <Pressable style = {[styles.button]}
          onPress={handleSecond}
        >
          <Text style = {styles.buttontext}>Next</Text>
        </Pressable>
        <Pressable style = {[styles.button, {width: 100, borderColor: 'red'}]}
          onPress={ () => {setSecond(false); setFirst(true)}}
        >
         <Icon
          name='arrow-back'
          size={30}
          color={'red'}
         />
        </Pressable></View>}
        {third && 
         <View style = {{justifyContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
       <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
        <Text style = {styles.headertagline}>We'll keep you updated</Text>
        <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>To provide you with better service and support, we'll be collecting your phone number. Rest assured that we take your privacy seriously and will only use your phone number for the specific purposes outlined in our privacy policy.</Text>
        <Loginbox 
          placeholder = 'Mobile number' 
          onChangeText={(value) => setMobileNumber(value)}
          value={MobileNumber}
        />
        
        <Loginbox 
              placeholder = 'Alternate contact number' 
              onChangeText={(value) => setAlternateContactNumber(value)}
              value={AlternateContactNumber}
            />
        <Pressable style = {[styles.button]}
        onPress={ () => {setthird(false); setForth(true)}}
      >
        <Text style = {styles.buttontext}>Next</Text>
      </Pressable>
      <Pressable style = {[styles.button, {width: 100, borderColor: 'red'}]}
          onPress={ () => {setthird(false); setSecond(true);}}>
         <Icon
          name='arrow-back'
          size={30}
          color={'red'}
         />
        </Pressable></View>}
        {forth && 
           <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
             <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
              <Text style = {styles.headertagline}>We'll take a look before getting you on-board</Text>
              <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '90%'}}>Setup your Identification by providing your official PWD ID</Text>
             <Loginbox 
              placeholder = 'Nationality' 
              onChangeText={(value) => setNationality(value)}
              value={Nationality}
            /> 
            <Loginbox 
              placeholder = 'Type of Disability' 
              onChangeText={(value) => setDisability(value)}
              value={disability}
            />
            <Loginbox 
              placeholder = 'PWD ID Number' 
              onChangeText={(value) => setIDNumber(value)}
              value={IDNumber}
            />
            <Pressable style = {[styles.button, {height: 150, width: 400, borderColor: Idcardimage === null ? LightBlue : '#202020'}]} onPress={handleIDCardImage()} disabled = {Idcardimage === null ?  false : true}>
              <Text style = {[styles.buttontext, {fontFamily: 'Nexa-ExtraLight', color: '#707070'}]}>{Idcardimage === null ? "UPLOAD ID PHOTO" : "SUCESSFULLY UPLOADED!"}</Text>
              <Icon
                name = {Idcardimage === null ? 'image': 'check-box'}
                size={100}
                color={Idcardimage === null ? LightBlue: '#90EE90'}
              />
            </Pressable>
            {Idcardimage && <Image style = {{width: 350, height: 200}} resizeMode='contain' source={{uri: Idcardimage}} />}
            <Pressable style = {[styles.button]}
         onPress={handleFourth}
       >
         <Text style = {styles.buttontext}>Next</Text>
       </Pressable>
       <Pressable style = {[styles.button, {width: 100, borderColor: 'red'}]}
          onPress={ () => {setForth(false); setthird(true);}}>
         <Icon
          name='arrow-back'
          size={30}
          color={'red'}
         />
        </Pressable></View>
            }
        
        {fifth && 
        <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
        <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
          <Text style = {[styles.headertagline, {alignSelf: 'center'}]}>Thank you for signin up!</Text>
          <Text style = {{fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '90%'}}>At PWD App, our goal is to empower persons with disabilities by providing a platform that promotes accessibility and inclusion. However, to ensure that the app is used by those who truly need it, we have implemented a verification process to confirm that each user is a Person with Disability (PWD).</Text>

          <Pressable style = {[styles.button, {width: '85%', borderColor: LightYellow}]}
          onPress={() => setnewuser()}
          >
            <Text style = {[styles.buttontext, {fontFamily: 'Nexa-Heavy', color: LightYellow}]}>Sign up</Text>
          </Pressable>
        <Pressable style = {[styles.button, {width: 150, borderColor: 'red'}]}
          onPress={ () => {setForth(true); setfifth(false);}}>
         <Icon
          name='arrow-back'
          size={30}
          color={'red'}
         />
        </Pressable></View>}
      </KeyboardAvoidingView>
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