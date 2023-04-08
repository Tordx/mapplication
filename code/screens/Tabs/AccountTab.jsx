import { View, Text , Image , Button, Pressable} from 'react-native'
import React from 'react'
import MapboxGL from '@rnmapbox/maps'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'


const AccountTab = ()=> {

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
  

  return (
    <View>
     <View style={{alignItems: 'center'}}>
      <Image
        source={{ uri: useraccount.Profilephoto }}
        style={{width: 200, height: 200,}}
      />
      <Text style={{fontSize: 18}}>{useraccount.username}</Text>
      <Text style={{fontSize: 18}}>{useraccount.MobileNumber}</Text>
      <Text style={{fontSize: 18}}>{useraccount.Nationality}</Text>
      <Button title='edit' onPress={toedit}/>
    </View>
    </View>
    
  )
}

export default AccountTab