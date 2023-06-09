
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView , Alert , Button , Platform, ScrollView, ToastAndroid, BackHandler, useColorScheme } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { dbremoteAccounts } from '../../database/database';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Loginbox } from './loginPage';
import { Black, LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import {countries} from '../Assets/Countries'
import { generalProhibitedUsernames } from '../Assets/usernames';


const Signup = () => {

  
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () =>  {
          if (opening && navigation.canGoBack()) {
            navigation.goBack();
            return true;
          } else {
            return null;
          }
        }
      );
  
      return () => backHandler.remove();
    }, [opening, navigation])
  );
  
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const date = new Date()
  const getdate = date.toLocaleDateString()
  const colorScheme = useColorScheme() === 'dark';
  const navigation = useNavigation()
  const id = uuid.v4()

  const checkusername = async() => {

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
          return item.username === username
        });
        const lowercaseNewFilterData = filteredData?.username?.toLowerCase();
        const lowercaseUsername = username?.toLowerCase();
        const regex = new RegExp(generalProhibitedUsernames.join('|'), 'i');
        
        if (lowercaseNewFilterData === lowercaseUsername) {
          Alert.alert('Wait up!', 'Username already exists.');
          return;
        } else if (regex.test(lowercaseUsername)) {
          Alert.alert('Wait up!', 'Prohibited username, Please choose a different one.');
        } else {
          setFirst(false);
          setSecond(true);
        }
      }
    }catch (err) {
      console.log(err);
      ToastAndroid.show('Something went wrong, try again', ToastAndroid.LONG)
    }
  }


  const handleProfilePhoto = async() => {

    if(Profilephoto !== null){
      return;
    }

    launchImageLibrary({ noData: true }, async(response) => {
      if (response) {
        const datapic = response
        const piclocation = datapic.assets[0].uri
        setProfilePhotoDisplay(piclocation)
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
          ToastAndroid.show('Sucessfully added your ID', ToastAndroid.SHORT)
        } catch (error) {
          console.log('error', error);
        }
      }
    });
  };

  const setnewuser = async () => {

    if(Profilephoto === 0 || Idcardimage === 0) {
      Alert.alert('Uploading Profile Picture and ID Card Picture is required')
    }
    else { 
       try {
         var adduser = {
             _id: id,
             username : username.toLowerCase(),
             password : password,
             MobileNumber : MobileNumber,
             Nationality : Nationality,
             Disability : disability,
             IDNumber : IDNumber,
             UserID: username + id,
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
             userType: "user",
             Status: 'Inactive',
             CreationDate: getdate,
             CommentCount: 0,
         }
      dbremoteAccounts.put(adduser)
         .then((response) =>{
           Alert.alert('Amazing!','Your account needs to get verified by one of our moderators within 24 to 48hrs before you can access it.')
           console.log(response)
           setUsername('');
           setPassword('');
           setMobileNumber('');
           setNationality('');
           setIDType('');
           setDisability('');
           setIDNumber('');
           setProfilePicture('');
           setFirstName('');
           setMiddleName('');
           setLastName('');
           setBirthday('');
           setSex('');
           setAddress('');
           setAlternateContactNumber('');
           setProfilePhoto(null);
           setIdCardImage(null);
           setProfilePhotoDisplay("");
           setIdCardImageDisplay("");
           setSelectedDate(new Date());
           setShowDatePicker(false);
           setOpening(true)
           setfifth(false)
           navigation.replace('Login')

         })
         .catch(err=>console.log(err))
         
       } catch (error) {
        console.log(error)
       }
      }
    } 

      const [opening, setOpening] = useState(true)
      const [first, setFirst] = useState(false)
      const [second, setSecond] = useState(false)
      const [third, setthird] = useState(false)
      const [forth, setForth] = useState(false)
      const [fifth, setfifth] = useState(false)

      const handleNoSpace = (inputText) => {
       
        const nospace = inputText.replace(/\s/g, '');
        setUsername(nospace)
      };

      const handlefirst = () => {
        if (username.length < 6){
          ToastAndroid.show('must contain at least 6 alphanumeric username', ToastAndroid.CENTER)
        } else if (password.length < 6) {
          ToastAndroid.show('must contain at least 6 alphanumeric password', ToastAndroid.CENTER)
        } else {
          checkusername()
        }
      }
      const handleSecond = () => {
        if (!(FirstName && LastName && Address && Birthday && Sex)) {
          ToastAndroid.show('Please fill up all fields', ToastAndroid.SHORT)
        } else {
          setSecond(false); 
          setthird(true)
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
    <View style  ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} >
    {showDatePicker && (
       <View style  ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <DatePicker
        modal
        open = {showDatePicker}
        style={styles.datePicker}
        date={selectedDate}
        mode="date"
        format="MM-DD-YYYY"
        onConfirm={(date) => {
          setShowDatePicker(false)
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const selectedDate = new Date(date).toLocaleDateString('en-US', options);
          setBirthday(selectedDate);
        }}
        onCancel={() => {
          setShowDatePicker(false)
        }}
          onDateChange={(date) => setSelectedDate(date)}
        />
        </View>
      )}
      <ScrollView style = {{width: '100%', height: '100%', backgroundColor: colorScheme ? Black : White}}>
      <KeyboardAvoidingView style = {{justifyContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
       {opening && 
        <View style = {{justifyContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
       <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
        <Text style = {[styles.headertagline, {color: colorScheme ? White : Black}]}>Welcome to Ease Access!</Text>
        <Text style = {{ fontSize: 20, color: colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '80%'}}>We're thrilled to have you on our journey towards a more inclusive world for people with disabilities. With your support, we can work towards breaking down barriers and creating a more accessible and equal society. we can't wait for you to be a part of our community!</Text>
        <Pressable style = {styles.button}
          onPress={ () => {setOpening(false); setFirst(true)}}
        >
          <Text style = {[styles.buttontext, {color: colorScheme ? White : Black}]}>Continue</Text>
        </Pressable>
        </View>}
      {first && <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', alignSelf: 'center'}}>
      <Image source = {require('../Assets/images/welcome-signup.png')} style = {{width: 1000, height: 300}} resizeMode = 'contain' />
      <Text style = {[styles.headertagline, {color: colorScheme ? White : Black}]}>Let's Get Started</Text>
        <Text style = {{ fontSize: 20, color: colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '80%'}}>First,  Create Your Account by Filling in Your Username and Password</Text>
        
        <Loginbox 
          placeholder = 'username' 
          secureTextEntry = {false} name = ''
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
          <Text style = {[styles.buttontext, {color: colorScheme ? White : Black}]}>Next</Text>
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
              <Text style = {[styles.headertagline, {color: colorScheme ? White : Black}]}>Then, few of your personal information</Text>
              <Text style = {{ fontSize: 20, color: colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '80%'}}>The information you provided are to be displayed in your account, and rest assured that all information are not used in other means</Text>
            <Pressable style = {[styles.button, {borderWidth: colorScheme ?  2 : 1, height: 150, width: 400, borderColor: colorScheme ? LightBlue  : Profilephoto ? LightBlue : '#808080'}]} onPress={handleProfilePhoto} disabled = {Profilephoto === null ?  false : true}>
            <Text style = {[styles.buttontext, {fontFamily: 'Nexa-ExtraLight', color: '#707070'}]}>{Profilephoto === null ? "UPLOAD DISPLAY PHOTO" : "SUCESSFULLY UPLOADED!"}</Text>
            {Profilephoto == null && <Icon
                name = {'image'}
                size={100}
                color={colorScheme ? LightBlue : '#808080'}
              />
              }
          </Pressable>
          {Profilephoto && <Image style = {{width: 200, height: 200, marginBottom: 20, borderRadius: 500}} resizeMode='cover' source={{uri: Profilephoto}} />}
        
        <Loginbox 
          placeholder = 'First name' 
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
          name = 'calendar-today'
          onPress = {() => setShowDatePicker(true)}
          onFocus = {() => setShowDatePicker(true)}
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
        <Text style = {[styles.headertagline, {color: colorScheme ? White : Black}]}>We'll keep you updated</Text>
        <Text style = {{ fontSize: 20, color: colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>To provide you with better service and support, we'll be collecting your phone number. Rest assured that we take your privacy seriously and will only use your phone number for the specific purposes outlined in our privacy policy.</Text>
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
              <Text style = {[styles.headertagline, {color: colorScheme ? White : Black}]}>We'll take a look before getting you on-board</Text>
              <Text style = {{ fontSize: 20, color: colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '90%'}}>Setup your Identification by providing your official PWD ID</Text>
              <View style = {{width: '95%', justifyContent: 'center', alignItems: 'center', borderColor: LightBlue, borderWidth: 2, borderRadius: 20,  margin: 5, flexDirection: 'row'}}>
                <Picker
                  itemStyle = {{fontFamily:'Nexa-ExtraLight'}}
                  style={{width: '100%', fontSize: 18, margin: 5, paddingLeft: 20, color: colorScheme ? White : Black}}
                  selectedValue={Nationality}
                  value = {Nationality}
                  onValueChange={(itemValue, itemIndex) => setNationality(itemValue)}
                  
                >
                    {countries.map((country) => (
                      <Picker.Item key={country.id} label={country.name} value={country.id} />
                    ))}
                </Picker>
              </View>
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
            <Pressable style = {[styles.button, {height: 150, width: 400, borderColor: Idcardimage === null ? LightBlue : '#202020'}]} onPress={handleIDCardImage} disabled = {Idcardimage === null ?  false : true}>
              <Text style = {[styles.buttontext, {fontFamily: 'Nexa-ExtraLight', color: '#707070'}]}>{Idcardimage === null ? "UPLOAD ID PHOTO" : "SUCESSFULLY UPLOADED!"}</Text>
              <Icon
                name = {Idcardimage === null ? 'image': 'check-box'}
                size={100}
                color={Idcardimage === null ? LightBlue: '#90EE90'}
              />
            </Pressable>
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
          <Text style = {{fontSize: 20, color: colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20, width: '90%'}}>At Ease Access, our goal is to empower persons with disabilities by providing a platform that promotes accessibility and inclusion. However, to ensure that the app is used by those who truly need it, we have implemented a verification process to confirm that each user is a Person with Disability (PWD).</Text>

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
      bordercolor: White, 
      justifyContent: 'center', 
      alignItems: 'center', 
      margin: 5,
      marginTop: 20
  },
  buttontext: {
      
      textAlign: 'center', 
      fontSize: 20, 
      fontFamily: 'Nexa-Heavy'
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  dateText: {
    fontSize: 18,
    color: 'white'
  },
  calendarIcon: {
    marginLeft: 10
  },
  datePicker: {
    width: 300,
    marginBottom: 20,
  },
  hiddenInput: {
    borderWidth: 0
  },
  hiddenText: {
    height: 0
  },
  btnTextConfirm: {
    color: '#0080ff'
  },
  btnTextCancel: {
    color: '#333'
  }
});


export default Signup