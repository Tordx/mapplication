import { View, Text , Image , Button, Pressable} from 'react-native'
import React from 'react'
import MapboxGL from '@rnmapbox/maps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setUserAccount } from '../../config/AccountSlice'
import Icon from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Black, LightBlue, LightYellow, White } from '../../Assets/Colors/Colors'


const AccountTab = ()=> {

  const dispatch = useDispatch();

  const {useraccount} = useSelector((action) => action.user)

  const navigation = useNavigation()

  const toedit = () => {
    navigation.navigate('EditAccount')
  }
  
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };


  return (
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Black}}>
     <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={{ uri: useraccount.Image}}
        style={{width: 200, height: 200, borderRadius: 200, marginBottom: 20}}
      />
         <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', margin: 20}}>
         <Text style={{ fontSize: 20, color: White, fontFamily: 'Nexa-Heavy'}}>{useraccount.FullName}</Text>
         <Text style={{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight'}}>  |  </Text>
         <Text style={{ fontSize: 18, color: White, fontFamily: 'Nexa-Heavy'}}>{useraccount.MobileNumber}</Text>
         </View>
    </View>
    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '95%', height: 90, borderWidth: 1, borderColor: LightBlue, borderRadius: 20}}>
      <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '90%', height: 90}}>
        <View style = {{alignItems: 'center', justifyContent: 'center', width: '30%', flexDirection: 'row'}}>
          <Icon
            name  = {useraccount.Sex === 'female' ? 'female-symbol' : 'male-symbol'}
            color = {useraccount.Sex === 'female' ? 'pink' : 'blue'}
            size={25}
          />
          <Text style={{fontSize: 15, fontFamily: 'Nexa-ExtraLight', color: White, marginLeft: 10}}>{useraccount.Sex.toUpperCase()}</Text>
        </View>
          <View style = {{alignItems: 'center', justifyContent: 'center', width: '33.33%', height: '95%'}}>
          <Text style={{fontSize: 15, fontFamily: 'Nexa-ExtraLight', color: White}}>{useraccount.Nationality.toUpperCase()}</Text>
        </View>
        <View style = {{alignItems: 'center', justifyContent: 'center', width: '30%'}}>
          <Text style={{fontSize: 15, textAlign: 'center', fontFamily: 'Nexa-ExtraLight', color: White}}>{useraccount.Birthday.toUpperCase()}</Text>
        </View>
      </View>
    </View>
     
      <Pressable onPress={handleLogout} style = {{position: 'absolute', top: 20, right: 20, flexDirection: 'row'}}>
          <FontAwesome
          name = 'sign-out' size={35} color = 'red'/>
        </Pressable>
    </View>
    
  )
}

export default AccountTab