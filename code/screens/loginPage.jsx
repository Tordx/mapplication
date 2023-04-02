
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 
import { setCoordinates, setEmail, setPassword } from '../config/AccountSlice';
import LinearGradient from 'react-native-linear-gradient';
import { Black, LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
 

const Loginbox = (props) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style = {{width: '90%', justifyContent: 'center', alignItems: 'center', borderColor: isFocused ? LightYellow : LightBlue, borderWidth: 2, borderRadius: 20,  margin: 5, flexDirection: 'row'}}>
    <TextInput style = {{width: '100%', fontSize: 18, margin: 5, paddingLeft: 20, color: White, fontFamily: 'Nexa-ExtraLight'}}
      placeholder = {props.placeholder}
      placeholderTextColor = {'#606060'}
      secureTextEntry = {props.secureTextEntry}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      value = {props.value}
      onChangeText = {props.onChangeText}

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

const Login = () => {

  const loginaccount = async() => {

     const remoteAccounts = new PouchDB('http://admin:admin@192.168.0.192:5984/m_account');
     

    try {
      const result = await remoteAccounts.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.rows) {
        const modifiedArr = result.rows.map(item => item.doc);
        const filteredData = modifiedArr.filter(item => {

          return item?.email === email});

        if (filteredData.length > 0) {
          const newFilterData = filteredData.map(item => item);

          const emailAddress = newFilterData[0].email
          const Password = newFilterData[0].password
          const Coordinates = newFilterData[0].coordinates

          dispatch(setCoordinates(Coordinates));
          dispatch(setEmail(emailAddress));
          dispatch(setPassword(Password));
          navigation.navigate('BottomTabs');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  const [show, setShow] = useState(true)
  const [email, putEmail] = useState('')
  const [password, putPassword] = useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <LinearGradient style  ={styles.container} colors={['#202020','#202020', '#202020']}>
      <View style = {{justifyContent: 'center', alignItems: 'center', width: '98%'}}>
        <Image source = {require('../Assets/images/sample_logo.png')} style = {{width: 200, height: 200}} resizeMode = 'contain' />
        <Text style = {styles.headertagline}>Great to have you back!</Text>
        <Loginbox 
          placeholder = 'username' 
          secureTextEntry = {false}
          onPress={() => console.log('usernamepressed')}
          value = {email}
          onChangeText = {(value) => putEmail(value)}
        />
        <Loginbox 
          placeholder = 'password' 
          secureTextEntry= {show} 
          name = {show ? 'visibility' : 'visibility-off'}
          onPress = {() => setShow(!show)}
          value = {password}
          onChangeText = {(value) => putPassword(value)}
        />
      </View>
      <KeyboardAvoidingView style = {{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, width: '90%'}}>
      <Pressable style = {{margin: 10, width: '100%', backgroundColor: '#f5f5f5', height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 20}}
          onPress = {() => navigation.navigate('BottomTabs')}
        >
          <Text style = {{textAlign: 'center', fontSize: 17, fontFamily: 'Nexa-ExtraLight', color: Black}}>
              LOG IN
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
};

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
      borderColor: LightBlue,  
      justifyContent: 'center', 
      alignItems: 'center', 
      margin: 5
  },
  buttontext: {
      
      textAlign: 'center', 
      fontSize: 20, 
      fontWeight: '400', 
      color: White, 
      fontFamily: 'Nexa-ExtraLight'
  }

})


export default Login