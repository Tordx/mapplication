import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PouchDB from 'pouchdb-react-native' ;import { Image } from 'react-native';
import { Black, White } from '../Assets/Colors/Colors';
 'pouchdb-core';
export default function UserViewPage() {

    const {userview} = useSelector((action) => action.user)
    const [data, setData] = useState([]);

    

    useEffect(() => {


    const getdata = async () => {
      const dbremoteAccounts = new PouchDB('http://admin:admin@192.168.0.192:5984/m_account');
     
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
              const adminusername = newFilterData[0].username
              const adminpassword = newFilterData[0].password
              
              setData(FullDetails)
            }
          }
        } catch (error) {
          console.error(error);
          console.log(error)
        }
      }
    
    getdata()
    console.log('loaded');
    },[])
  return (
    <View style ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Black}}>
         <Image style = {{width: 200, height: 200, borderRadius: 100, marginVertical: 20}} resizeMode='contain' source={{uri: data.Image}} />
         <Text style = {{ fontSize: 30, color: White, fontFamily: 'Nexa-ExtraLight', justifyContent: 'center', alignItems: 'center', textAlign: 'left', marginBottom: 10}}>{data?.FullName}</Text> 
         <Text style={{fontSize: 20, color: White, textAlign: 'center', alignSelf: 'center', fontFamily: 'Nexa-ExtraLight'}}>Reviews: {data.CommentCount}</Text>
    </View>
  )
}