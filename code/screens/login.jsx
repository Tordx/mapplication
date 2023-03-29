
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnyMap } from 'immer/dist/internal';
import { dbremoteAccounts } from '../../database/database';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 
import { setCoordinates, setEmail, setPassword } from '../config/AccountSlice';
 

const Loginbox = (props) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style = {{width: '89%', justifyContent: 'center', alignItems: 'center', backgroundColor: isFocused ? '#6d98b1' : '#9ad9fd', borderRadius: 5,  margin: 5, flexDirection: 'row'}}>
    <TextInput style = {{width: '100%', fontSize: 18, margin: 5, paddingLeft: 10,}}
      placeholder = {props.placeholder}
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
  const [show, setShow] = useState(false)
  const [email, putEmail] = useState('')
  const [password, putPassword] = useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView style  ={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadada'}} behavior='padding'>
      <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Image source = {require('../images/sample_logo.png')} style = {{width: 200, height: 200}} resizeMode = 'contain' />
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
        <Pressable style = {{margin: 10, width: '35%', backgroundColor: '#f5f5f5', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
          onPress = {() => navigation.navigate('BottomTabs')}
        >
          <Text style = {{textAlign: 'center', fontSize: 17, fontWeight: '500'}}>
              LOG IN
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login