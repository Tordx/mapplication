
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {

  placeholder: string,  
  secureTextEntry: boolean,
  name: string,
  onPress: () => void,
}

const Loginbox = (props: Props) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style = {{width: '85%', justifyContent: 'center', alignItems: 'center', backgroundColor: isFocused ? '#ccb16a' : '#ffdd85', borderRadius: 5,  margin: 5, flexDirection: 'row'}}>
    <TextInput style = {{width: '100%', fontSize: 18, margin: 5, paddingLeft: 5,}}
      placeholder = {props.placeholder}
      secureTextEntry = {props.secureTextEntry}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
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

  return (
    <KeyboardAvoidingView style  ={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadada'}} behavior='padding'>
      <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Image source = {require('../Assets/images/sample_logo.png')} style = {{width: 200, height: 200}} resizeMode = 'contain' />
        <Loginbox 
          placeholder = 'username' 
          secureTextEntry = {false} name = '' 
          onPress={() => console.log('usernamepressed')} 
        />
        <Loginbox 
          placeholder = 'password' 
          secureTextEntry= {show} 
          name = {show ? 'visibility' : 'visibility-off'}
          onPress = {() => setShow(!show)} 
        />
        <Pressable style = {{margin: 10, width: '35%', backgroundColor: '#f5f5f5', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
        
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