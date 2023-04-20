import { View, Text , Image , StyleSheet, Pressable, ScrollView, ToastAndroid} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CountryFlag from 'react-native-country-flag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Black, LightBlue, LightYellow, White } from '../../../Assets/Colors/Colors'



const AdminAccount = ()=> {


  const {useraccount} = useSelector((action) => action.user)

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
    <ScrollView style = {{width: '100%', height: '100%', backgroundColor: Black}} showsVerticalScrollIndicator = {false} >
    <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Black, paddingBottom: 100}}>
    <Text style = {{paddingLeft: 20, color: White, fontSize: 30, fontFamily: 'Nexa-Heavy', top: 10, alignSelf: 'flex-start'}}>Admin Account</Text>
     <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
     <View style={{borderWidth: 1, borderStyle: 'dashed', borderColor: LightYellow, alignItems: 'center', justifyContent: 'center', width: 220, height: 220, borderRadius: 200, marginBottom: 20}}>
     <View style={{borderWidth: 1, borderColor: LightBlue, alignItems: 'center', justifyContent: 'center', width: 210, height: 210, borderRadius: 200}}>
      <Image
        source={{ uri: useraccount.Image}}
        style={{width: 200, height: 200, borderRadius: 200,}}
      />
      </View>
      </View>
         <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: 5}}>
         <Text style={{ fontSize: 30, color: White, fontFamily: 'Nexa-Heavy'}}>{useraccount.FullName}</Text>
         <Text style={{ fontSize: 25, color: White, fontFamily: 'Nexa-ExtraLight', marginVertical: 20}}>{useraccount.MobileNumber}</Text>
         </View>
    </View>
    <Pressable onPress={() => navigation.navigate('Addlocation')} style = {{}}>
          <FontAwesome
          name = 'plus' size={35} color = 'red'/>
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