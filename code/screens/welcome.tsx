import React from 'react'
import { ImageBackground, Pressable, StatusBar, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {

    const navigation = useNavigation();

  return (
    <ImageBackground source={{uri: 'https://cutewallpaper.org/cdn-cgi/mirage/879d3f56044898301ccabab4a8a90586cd5663eca603a14193df05b49a03034b/1280/21/black-cartoon-wallpaper/Black-cartoon-wallpaper-SF-Wallpaper.jpg'}}
        style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}
        resizeMode = 'cover'
    >
        <StatusBar
            hidden = {true}
        />
        <View style = {{justifyContent: 'center', alignContent: 'center', width: '100%', height: '100%'}}>
            <Text style = {{textAlign: 'center', fontSize: 50, color: '#fff', bottom: 50, fontWeight: 'bold'}}>WELCOME</Text>
        <View style = {{position: 'absolute', bottom: 30, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <TouchableOpacity style = {{borderRadius: 5, height: 60, width: '75%', backgroundColor: '#9ad9fd',  justifyContent: 'center', alignItems: 'center', margin: 5}} 
            onPress = {() => navigation.navigate('Login')}>
                <Text style = {{textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'black'}}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity  style = {{borderRadius: 5, height: 60, width: '75%', backgroundColor: '#ffdd85',  justifyContent: 'center', alignItems: 'center', margin: 5}} 
            onPress = {() => navigation.navigate('Signup')}>
                <Text  style = {{textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'black'}} >SIGN UP</Text>
            </TouchableOpacity>
        </View>
        </View>
    </ImageBackground>
  )
}

export default Welcome