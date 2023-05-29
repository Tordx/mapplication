import { View, Text , Image , StyleSheet, Pressable, ScrollView, ToastAndroid, useColorScheme} from 'react-native'
import React from 'react'
import MapboxGL from '@rnmapbox/maps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setUserAccount } from '../../config/AccountSlice'
import Icon from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CountryFlag from 'react-native-country-flag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Black, DarkYellow, LightBlue, LightYellow, White } from '../../Assets/Colors/Colors'



const AccountTab = ()=> {

  const dispatch = useDispatch();
  const {useraccount} = useSelector((action) => action.user)
  const navigation = useNavigation()
  const colorScheme =  useColorScheme() === 'dark';

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
    <ScrollView style = {{width: '100%', height: '100%', backgroundColor: colorScheme ?  Black : White}} showsVerticalScrollIndicator = {false} >
    <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor:  colorScheme ? Black : White, paddingBottom: 100}}>
    <Text style = {{paddingLeft: 20, color:  colorScheme ? White : Black, fontSize: 30, fontFamily: 'Nexa-Heavy', top: 10, alignSelf: 'flex-start'}}>My Account</Text>
     <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
     <View style={{borderWidth: 1, borderStyle: 'dashed', borderColor: colorScheme ? LightYellow : LightBlue, alignItems: 'center', justifyContent: 'center', width: 220, height: 220, borderRadius: 200, marginBottom: 20}}>
     <View style={{borderWidth: 2, borderColor:  colorScheme ?  LightBlue : DarkYellow, alignItems: 'center', justifyContent: 'center', width: 210, height: 210, borderRadius: 200}}>
      <Image
        source={{ uri: useraccount.Image}}
        style={{width: 200, height: 200, borderRadius: 200,}}
      />
      </View>
      </View>
         <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: 5}}>
         <Text style={{ fontSize: 30, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy'}}>{useraccount.FullName}</Text>
         <Text style={{ fontSize: 25, color:  colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', marginVertical: 20}}>{useraccount.MobileNumber}</Text>
         </View>
    </View>
     <Text style={{ fontSize: 25, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', width: '90%', textAlign: 'left'}}>About</Text>
    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', margin: 5, width: '95%', height: 90, borderTopWidth: 0.5, borderColor: colorScheme ? LightBlue : DarkYellow}}>
    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '90%', height: 90}}>
        <View style = {{alignItems: 'center', justifyContent: 'center', width: '30%',height: '100%'}}>
        <FontAwesome size={25} name = 'star-o' color = {LightYellow}  style = {{ position: 'absolute', bottom: 40}}/>
              <Text style={{ position: 'absolute', bottom: 20, fontSize: 15, textAlign: 'center', fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black}}>{useraccount.CommentCount} REVIEWS</Text>
            </View>
        <View style = {{alignItems: 'center', justifyContent: 'center', width: '33%',height: '100%'}}>
              <Text style = {{fontSize: 22, position: 'absolute', bottom: 40, color:  colorScheme ? White : Black}}>♿</Text>
              <Text style={{ position: 'absolute', bottom: 20, fontSize: 15, textAlign: 'center', fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black}}>{useraccount.Disability.toUpperCase()}</Text>
            </View>
         <View style = {{alignItems: 'center', justifyContent: 'center', width: '30%',height: '100%'}}>
          <FontAwesome size={25} name = 'id-card' color = { colorScheme ? White : Black}  style = {{ position: 'absolute', bottom: 40}}/>
          <Text style={{ position: 'absolute', bottom: 20, fontSize: 15, textAlign: 'center', fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black}}>{useraccount.IDNumber.toUpperCase()}</Text>
        </View>
         </View>
         </View>
    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '95%', height: 90, borderBottomWidth: 0.5, borderColor: colorScheme ? LightBlue : DarkYellow, marginBottom: 20, margin: 5,}}>
      <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '90%', height: 90}}>
        <View style = {{alignItems: 'center', justifyContent: 'center', width: '30%', flexDirection: 'column', height: '100%'}}>
          <Icon
            name  = {useraccount.Sex === 'female' ? 'female-symbol' : 'male-symbol'}
            color = {useraccount.Sex === 'female' ? 'pink' : 'blue'}
            size={25}
            style = {{ position: 'absolute', bottom: 40}}
          />
          <Text style={{fontSize: 15, fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black, marginLeft: 10,  position: 'absolute', bottom: 20}}>{useraccount.Sex.toUpperCase()}</Text>
        </View>
          <View style = {{alignItems: 'center', justifyContent: 'center', width: '33.33%', height: '100%'}}>
          <CountryFlag isoCode={useraccount.Nationality} size={20} style = {{bottom: 43, position: 'absolute'}} />
          <Text style={{fontSize: 15, fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black,  position: 'absolute', bottom: 20}}>{useraccount.Nationality.toUpperCase()}</Text>
        </View>
        <View style = {{alignItems: 'center', justifyContent: 'center', width: '30%',height: '100%'}}>
          <Text style = {{fontSize: 22, position: 'absolute', bottom: 40,color: White}}>🎂</Text>
          <Text style={{ position: 'absolute', bottom: 20, fontSize: 15, textAlign: 'center', fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black}}>{useraccount.Birthday.toUpperCase()}</Text>
        </View>
      </View>
    </View>
    <Pressable style = {[styles.button, {width: '85%', borderColor:  colorScheme ? LightYellow : Black}]}
          onPress={toedit}>
             <FontAwesome
          name = 'edit' size={20} color = { colorScheme ? LightYellow : Black}/>
            <Text style = {[styles.buttontext, {fontFamily: 'Nexa-Heavy', color:  colorScheme ? LightYellow : Black}]}>Edit Info</Text>
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

export default AccountTab