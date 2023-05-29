import { View, Text , Image , StyleSheet, Pressable, ScrollView, ToastAndroid} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CountryFlag from 'react-native-country-flag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Black, DarkYellow, LightBlue, LightYellow, White } from '../../../Assets/Colors/Colors'
import { useColorScheme } from 'react-native'



const AdminAccount = ()=> {


  const {useraccount} = useSelector((action) => action.user)
  const colorScheme = useColorScheme() ==='dark';
  const navigation = useNavigation()

  const toedit = () => {
    navigation.navigate('EditAccount')
  }
  
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Welcome');
    ToastAndroid.show('Sucessfully signed out', ToastAndroid.BOTTOM)
  };


  return (
    <>
    <ScrollView style = {{width: '100%', height: '100%', backgroundColor:  colorScheme ? Black : White}} showsVerticalScrollIndicator = {false} >
    <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor:  colorScheme ? Black : White, paddingBottom: 100}}>
    <Text style = {{paddingLeft: 20, color:  colorScheme ? White : Black, fontSize: 30, fontFamily: 'Nexa-Heavy', top: 10, alignSelf: 'flex-start'}}>Admin Account</Text>
     <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
     <View style={{borderWidth: 1, borderStyle: 'dashed', borderColor: colorScheme ? LightYellow : Black, alignItems: 'center', justifyContent: 'center', width: 220, height: 220, borderRadius: 200, marginBottom: 20}}>
     <View style={{borderWidth: 1, borderColor: colorScheme ?  LightBlue : Black, alignItems: 'center', justifyContent: 'center', width: 210, height: 210, borderRadius: 200}}>
      <Image
        source={{ uri: useraccount.Image}}
        style={{width: 200, height: 200, borderRadius: 200,}}
      />
      </View>
      </View>
         <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: 5}}>
         <Text style={{ fontSize: 30, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy'}}>{useraccount.FullName.toUpperCase()}</Text>
         <Text style={{ fontSize: 25, color:  colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', marginVertical: 20}}>{useraccount.MobileNumber}</Text>
         <Text style={{ fontSize: 25, color:  colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', marginVertical: 20}}>{useraccount.userType.toUpperCase()}</Text>
         </View>
    </View>
    <Pressable style = {[styles.button, {width: '85%', borderColor:  colorScheme ? LightYellow : Black, flexDirection: 'row', height: 100,}]} onPress={() => navigation.navigate('Addlocation')}>
      <FontAwesome
          name = 'map-marker' size={30} color = { colorScheme ? LightYellow : Black}/>
      
      <Text style = {[styles.buttontext, {fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? LightYellow : Black, fontSize: 25, marginLeft: 20}]}>More Location</Text>
      </Pressable>
    </View>
    </ScrollView>
    
    
    
    <Pressable onPress={handleLogout} style = {{position: 'absolute', top: 8, right: 10, flexDirection: 'row'}}>
          <FontAwesome
          name = 'sign-out' size={35} color = 'red'/>
        </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20, 
    height: 60, 
    width: '50%', 
    borderWidth: 1, 
    borderColor: White,  
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 5,
    marginTop: 20
},
})

export default AdminAccount