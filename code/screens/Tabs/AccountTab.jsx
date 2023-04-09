import { View, Text , Image , Button, Pressable} from 'react-native'
import React from 'react'
import MapboxGL from '@rnmapbox/maps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setUserAccount } from '../../config/AccountSlice'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AccountTab = ()=> {

  const dispatch = useDispatch();

  const {useraccount} = useSelector((action) => action.user)
  console.log('====================================useraccount');
  console.log(useraccount);
  console.log('====================================useraccount');

  const navigation = useNavigation()

  const toedit = () => {
  console.log('====================================asdasd');
  console.log('asdasd');
  console.log('====================================asdasd');
    navigation.navigate('EditAccount')
  }
  
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };


  return (
    <View>
     <View style={{alignItems: 'center'}}>
      <Image
        source={{ uri: useraccount.Profilephoto}}
        style={{width: 200, height: 200,}}
      />
      <Text style={{fontSize: 18}}>{useraccount.username}</Text>
      <Text style={{fontSize: 18}}>{useraccount.MobileNumber}</Text>
      <Text style={{fontSize: 18}}>{useraccount.Nationality}</Text>
      <Pressable onPress={handleLogout}>
        <Icon
        name = 'exit-to-app'/>
      </Pressable>
      <Button title='edit' onPress={toedit}/>
    </View>
    </View>
    
  )
}

export default AccountTab