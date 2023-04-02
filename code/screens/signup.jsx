
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable, KeyboardAvoidingView , Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { dbremoteAccounts } from '../../database/database';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 
// import uuid from 'react-native-uuid';



const Loginbox = (props) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style = {{width: '85%', justifyContent: 'center', alignItems: 'center', backgroundColor: isFocused ? '#ccb16a' : '#ffdd85', borderRadius: 5,  margin: 5, flexDirection: 'row'}}>
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

  const navigation = useNavigation()

  const setNewSuperAdmin = async () => {
      
    // const id = uuid.v4();

      if(1+1 == 3){
        console.log('hey')
      }
      // if((classname.length == 0) && (subject.length == 0) ) {
      //   console.log('ilove')}
     else{
       try {
         var NewSuperAdmin = {
          _id: email,
           email : email,
           password : password,
          //  FacultyPresident: facultypresident,
          //  FacultyVicePresident : facultyvicepresident,
          //  FacultyMembers : facultymembers,
          //  place: place,
          //  Price : price,
          //  Preptime : preptime,
          //  Deliveryfee : deliveryfee,
          //  Status: status,
          //  Image: Images
         }
      //    console.log(Images)
      //    console.log('Images')
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
      }

  return (
    <KeyboardAvoidingView style  ={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadada'}} behavior='padding'>
      <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Image source = {require('../Assets/images/sample_logo.png')} style = {{width: 200, height: 200}} resizeMode = 'contain' />
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