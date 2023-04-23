
import React, {useState,useEffect} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView, StyleSheet , ToastAndroid , Alert, BackHandler } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 
import { setUserAccount } from '../config/AccountSlice';
import LinearGradient from 'react-native-linear-gradient';
import { Black, LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native';
import { dbremoteAccounts } from '../../database/database';
 

export const Loginbox = (props) => {

  const [isFocused, setIsFocused] = useState(false);
  const {useraccount} = useSelector((action) => action.user)

  return (
    <View style = {{width: '95%', height: 65,justifyContent: 'flex-start', alignItems: 'center', borderColor: isFocused ? LightYellow : LightBlue, borderWidth: 2, borderRadius: 20,  margin: 5, flexDirection: 'row'}}>
    <TextInput style = {{width: '90%', height: '100%', fontSize: 18, paddingLeft: 20, color: White, fontFamily: 'Nexa-ExtraLight', borderRadius: 20, }}
      placeholder = {props.placeholder}
      placeholderTextColor = {'#606060'}
      secureTextEntry = {props.secureTextEntry}
      onFocus={props.onFocus ? props.onFocus : () => setIsFocused(true)}
      onBlur={props.onBlur ? props.onBlur : () => setIsFocused(false)}
      value = {props.value}
      onChange = {props.onChange}
      onChangeText = {props.onChangeText}
      maxLength={300}
      autoComplete='off'
      autoCapitalize='none'
      disabled = {props.disabled}
      

      />
      <Pressable onPress = {props.onPress} disabled = {props.disabled} style = {{position: 'absolute', right: 10}}>
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

  
  const [show, setShow] = useState(true)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const {useraccount} = useSelector((state) => state.user)

  
  const loginaccount = async() => {

    if (username.length === 0) {
      ToastAndroid.show("username is empty", ToastAndroid.CENTER)
    } else if (password.length === 0) {
      ToastAndroid.show("password is empty", ToastAndroid.CENTER)
    } else {
      try {
        setLoading(true)
        let result = await dbremoteAccounts.allDocs({
          include_docs: true,
          attachments: true,
        });
        if (result.rows) {
          let modifiedArr = result.rows.map(
            item => item.doc
          );
          let filteredData = modifiedArr.filter(item => {
            return item.username === username.toLowerCase()
          });
          if (filteredData.length) {
            let newFilterData = filteredData.map((item) => {
              return item
            });
            const FullDetails = newFilterData[0]
            const adminusername = newFilterData[0].username
            const adminpassword = newFilterData[0].password
            const adminaccount = newFilterData[0].userType
            const adminstatus = newFilterData[0].Status
  
            if(adminusername === username && adminpassword === password) {
              if(adminstatus !== "active"){
                Alert.alert('Account is not active', ' Please contact your moderators for more Info')
                setLoading(false)
                return;
              } else {
                if(adminaccount === "user") {
                  navigation.navigate('BottomTabs');
                  await AsyncStorage.setItem('userCredentials', JSON.stringify(FullDetails));
                  dispatch(setUserAccount(FullDetails));
                  setUserName('')
                  setPassword('')
                  setLoading(false)
                } 
                if(adminaccount === "admin") {
                  await AsyncStorage.setItem('userCredentials', JSON.stringify(FullDetails));
                  dispatch(setUserAccount(FullDetails));
                  setLoading(false)
                  setUserName('')
                  setPassword('')
                  navigation.navigate('Toptabs');
                }
              }
            } else {
              Alert.alert('Whoooooops!', "something went wrong or your username & password didn't match our system")
              setLoading(false)
            }
          } else {
            Alert.alert('Username not found', "The username you entered doesn't exist in our system. Please try again.")
            setLoading(false)
          }
        }
      } catch (error) {
        setLoading(false)
        setLoggingIn(true)
      }
    }
  }
  return (
    <View style  ={styles.container}>
      <View style = {{justifyContent: 'center', alignItems: 'center', width: '98%'}}>
        <Image source = {require('../Assets/images/sample_logo.png')} style = {{width: 200, height: 200}} resizeMode = 'contain' />
        <Text style = {styles.headertagline}>Great to have you back!</Text>
        <Loginbox 
          placeholder = 'username' 
          secureTextEntry = {false}
          value = {username}
          onChangeText = {(value) => setUserName(value)}
        />
        <Loginbox 
          placeholder = 'password' 
          secureTextEntry= {show} 
          name = {show ? 'visibility' : 'visibility-off'}
          onPress = {() => setShow(!show)}
          value = {password}
          onChangeText = {(value) => setPassword(value)}
        />
      </View>
      <KeyboardAvoidingView style = {{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, width: '90%'}}>
      <Pressable style = {{margin: 10, width: '100%', backgroundColor: '#f5f5f5', height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 20}}
          onPress = {loginaccount}
        >
          <Text style = {{textAlign: 'center', fontSize: 17, fontFamily: 'Nexa-Heavy', color: Black}}>
              LOG IN
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
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
      <Modal 

        transparent
        visible = {loggingIn}
        onRequestClose={() => setLoggingIn(false)}
        style={styles.container}
        animationType='fade'

      >
        <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000199'}}>
          <View style={{width: 400, height: 150, backgroundColor: White, borderRadius: 20, justifyContent: 'center', alignItems: 'center',}}>
          <Text style = {{textAlign: 'center', fontSize: 17, fontFamily: 'Nexa-Heavy', color: Black}}>Make sure you're connected to the internet</Text>
          <Pressable style={{position: 'absolute', top: 10, right: 10,justifyContent: 'center', alignItems: 'center',}}
            onPress={() => setLoggingIn(false)}
          >
            <Text style = {{ borderRadius: 20, backgroundColor: 'red', padding: 10, color: White, fontFamily: 'Nexa-Heavy'}}>close</Text>
          </Pressable>
          </View>
          
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
    
  container: {

      width: '100%', 
      height: '100%', 
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: Black
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