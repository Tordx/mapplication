import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PouchDB from 'pouchdb-react-native' ;import { Image } from 'react-native';
import { Black, White } from '../Assets/Colors/Colors';
import { dbremoteAccounts } from '../../database/database';
export default function UserViewPage() {

    const {userview} = useSelector((action) => action.user)
    const [data, setData] = useState('');
    console.log(userview)
    const getdata = async () => {
      console.log('loaded');
      try {
        let result = await dbremoteAccounts.allDocs({
          include_docs: true,
          attachments: true,
        });
        if (result.rows) {
          console.log('11');
          let modifiedArr = result.rows.map(
            
            item => item.doc
          );
          console.log('22');
          let filteredData = modifiedArr.filter(item => {
            return item.UserID === userview.UserID
          });
          if (filteredData.length) {
            console.log('33');
            let newFilterData = filteredData.map((item) => {
              return item
            });
            const FullDetails = newFilterData[0]
            
            console.log('ss');
            setData(FullDetails)
            console.log(FullDetails);   
            console.log('loaded');
          }
        }
      } catch (error) {
        console.error(error);
        console.log(error)
      }
    }

    useEffect(() => {
      console.log(userview)
      console.log('what the fuck');
    console.log(data)
    getdata()
    },[])
  return (
    <View style ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Black}}>
         <Image style = {{width: 200, height: 200, borderRadius: 100, marginVertical: 20}} resizeMode='contain' source={{uri: data.Image}} />
         <Text style = {{ fontSize: 30, color: White, fontFamily: 'Nexa-ExtraLight', justifyContent: 'center', alignItems: 'center', textAlign: 'left', marginBottom: 10}}>{data?.FullName}</Text> 
         <Text style={{fontSize: 20, color: White, textAlign: 'center', alignSelf: 'center', fontFamily: 'Nexa-ExtraLight'}}>Reviews: {data.CommentCount}</Text>
    </View>
  )
}