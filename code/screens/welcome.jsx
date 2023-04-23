import React,{ useEffect, useState, Button } from 'react'
import { StyleSheet, StatusBar, TextInput, View, Text, TouchableOpacity, Image, PermissionsAndroid  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Black, LightBlue, LightYellow, White } from '../Assets/Colors/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserAccount } from '../config/AccountSlice';
import Geolocation from '@react-native-community/geolocation';

const Welcome = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const checkLogin = async () => {
        try {
          const userCredentials = await AsyncStorage.getItem('userCredentials');
          if (userCredentials !== null) {
            const FullDetails = await JSON.parse(userCredentials);
            dispatch(setUserAccount(FullDetails))
            if(FullDetails.userType === 'user') {
            navigation.navigate('BottomTabs')
            }
            if (FullDetails.userType === 'admin')
            navigation.navigate('Toptabs')
          }
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        checkLogin()
    },[])

    

  return (
    <View style = {styles.container}>
        <StatusBar backgroundColor={'#202020'} barStyle ='light-content' />
             <Image source = {require('../Assets/images/alaminos-logo.png')} style = {{width: '50%', height: 300, alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 25}} resizeMode = 'contain' />
         <Text style = {styles.headertagline}>Alaminos City, PWD-friendly Application</Text>
         <Text style = {styles.headertagline}>Join and be heard!</Text>
        <View style = {styles.buttoncontainer}>
            <TouchableOpacity style = {styles.button} 
            onPress = {() => navigation.navigate('Login')}>
                <Text style = {styles.buttontext}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity  style = {[styles.button, {borderColor: LightYellow}]} 
            onPress = {() => navigation.navigate('Signup')}>
                <Text  style = {styles.buttontext} >Register</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

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
        fontSize: 25, 
        color: White, 
        fontFamily: 'Nexa-ExtraLight'
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

export default Welcome;