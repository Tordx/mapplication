import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Black, LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
import { dbremoteAccounts } from '../../database/database';
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CountryFlag from 'react-native-country-flag'
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { setUserView } from '../config/AccountSlice';
export default function UserViewPage() {

    const {userview} = useSelector((action) => action.user)
    const [data, setData] = useState('');
    const [nationality, setNationality] = useState('')
    const [comment, setComment] = useState();
    const navigation = useNavigation();
    const colorScheme = useColorScheme()=== 'dark';
    const dispatch = useDispatch();
    const getdata = async () => {
      try {
        let result = await dbremoteAccounts.allDocs({
          include_docs: true,
          attachments: true,
        });
        if (result.rows) {
          let modifiedArr = result.rows.map(
            
            item => item.doc
          );
          let filteredData = modifiedArr.filter(item => {
            
            return item.UserID === userview.UserID
          });
          if (filteredData.length) {
            let newFilterData = filteredData.map((item) => {
              return item
            });
            const FullDetails = newFilterData[0]
            const nationality = newFilterData[0].Nationality
            const CommentCount = newFilterData[0].CommentCount
            setNationality(nationality)
            setComment(CommentCount)
            console.log(CommentCount);
            setData(FullDetails)
          }
        }
      } catch (error) {
        console.error(error);
        console.log(error)
      }
    }

    useEffect(() => {
      
    console.log(data)
    console.log('this was scanned');
    getdata()
    },[])
    
  return (
    <View style ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor:  colorScheme ? Black : White}}>
           <View style={{borderWidth: 1, borderStyle: 'dashed', borderColor: LightYellow, alignItems: 'center', justifyContent: 'center', width: 220, height: 220, borderRadius: 200, marginBottom: 20}}>
     <View style={{borderWidth: 1, borderColor: LightBlue, alignItems: 'center', justifyContent: 'center', width: 210, height: 210, borderRadius: 200}}>
      <Image
        source={{ uri: userview.Image }}
        style={{width: 200, height: 200, borderRadius: 200,}}
      />
      </View>
      </View>
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: 5}}>
          <Text style={{ fontSize: 30, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy'}}>{userview.FullName}</Text>
          <View style = {{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 15}}>
              <FontAwesome size={30} name = 'star-o' color = {LightYellow}/>
              <Text style={{marginLeft: 15, fontSize: 25, textAlign: 'center', fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black}}>{comment} REVIEWS</Text>
            </View>
        </View>
        <Text style={{ fontSize: 25, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', width: '90%', textAlign: 'left'}}>About</Text>
   {data && <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', margin: 5, width: '95%', height: 90, borderWidth: 1, borderColor: LightBlue,borderRadius: 20}}>
      <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '90%', height: 90}}>
        <View style = {{alignItems: 'center', justifyContent: 'center', width: '30%', flexDirection: 'column', height: '100%'}}>
            <FontAwesome
              name  = {data.Sex === 'female' ? 'venus' : 'mars'}
              color = {data.Sex === 'female' ? 'pink' : 'blue'}
              size={25}
              style = {{ position: 'absolute', bottom: 40}}
            />
            <Text style={{fontSize: 15, fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black, marginLeft: 10,  position: 'absolute', bottom: 20}}>{data.Sex}</Text>
          </View>
          <View style = {{alignItems: 'center', justifyContent: 'center', width: '33%',height: '100%'}}>
          <FontAwesome5 size={25} name = 'wheelchair' color = {'blue'}  style = {{ position: 'absolute', bottom: 40}}/>
                <Text style={{ position: 'absolute', bottom: 20, fontSize: 15, textAlign: 'center', fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black}}>{data.Disability}</Text>
              </View>
              <View style = {{alignItems: 'center', justifyContent: 'center', width: '30%', height: '100%'}}>
            <CountryFlag isoCode={nationality} size={20} style = {{bottom: 43, position: 'absolute'}} />
            <Text style={{fontSize: 15, fontFamily: 'Nexa-ExtraLight', color:  colorScheme ? White : Black,  position: 'absolute', bottom: 20}}>{nationality.toUpperCase()}</Text>
          </View>
        </View>
      </View>}
      <Pressable style = {{position: 'absolute', top: 15, left: 15}}
        onPress={() => {navigation.goBack('CommentTab');}}
      >
        <Icon
          name='keyboard-arrow-left'
          size={50}
          color={ colorScheme ? White : Black}
        />
      </Pressable>
    </View>
  )
}