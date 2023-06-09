import { View, Text, StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { dbremoteAccounts } from '../../../database/database';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { FlatList } from 'react-native';
import PouchDB from 'pouchdb-react-native'; 'pouchdb-core';
import { useEffect } from 'react';
import { Black, LightBlue, LightYellow, White } from '../../Assets/Colors/Colors';
import { Dimensions } from 'react-native';
import { BackHandler } from 'react-native';
import { dbremoteComments } from '../../../database/database';



const HistoryTab = () => {

  const colorScheme = useColorScheme()=== 'dark';
  const {useraccount} = useSelector((action) => action.user)
  const [comments, setComments] = useState([]);

  const getdata = async () => {
        
        try {

          let result = await dbremoteComments.allDocs({
            include_docs: true,
            attachments: true,
            
          });
          if(result.rows){
            let modifiedArr = result.rows.map(item => 
                item.doc
            )
            let filteredData = modifiedArr.filter(item => {
              return item
            })
            if (filteredData) {
                const newFilteredData = filteredData.filter((item) => {
                  return item.UserID === useraccount.UserID;
                })
            
                setComments(newFilteredData);
                console.log(newFilteredData);
            }
          } 
        } catch (error) {
          console.error(error);
        }
    }
  
  
  useEffect(() => {
    
    getdata()
  },[])




  const renderItem = ({item}) => {
    return (
      <Pressable style = {{width: '100%', height: 100, justifyContent: 'center', alignSelf: 'center', alignItems: 'flex-start'}}
      >
        <View style = {{padding: 15, flexDirection: 'row',justifyContent: 'center', alignItems: 'center', padding: 10,  borderColor: LightBlue, borderBottomWidth: 1}}>
          <View style = {{width: '100%', height: '100%'}}>
              <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', width: '60%', paddingTop: 10}}>{item.Text}</Text>
              <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', width: '60%',  marginVertical: 5}}>{item.CommentID}</Text>
              <Text style={{  fontSize: 12, color:  colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight',}}>{item.Date}</Text>
          </View>
        </View>
        <Text style={{position: 'absolute',right: 20, fontSize: 30, color: LightYellow}}>{Math.min(item.Rating).toFixed(2)} ★</Text>
      </Pressable>
    );
   
  } 

  return (
    <View style = {{flex: 1, backgroundColor:  colorScheme ? Black : White}}>
    <View style={{height: 45, width: '100%'}}>
      <Text style = {{paddingLeft: 20, color:  colorScheme ? White : Black, fontSize: 30, fontFamily: 'Nexa-Heavy', top: 10}}>Review History</Text>
      
      </View>
    <View style = {{flex: 1, backgroundColor:  colorScheme ? Black : White, paddingBottom: 100}}>
      
      <FlatList
        data={comments}
        renderItem = {renderItem}
        keyExtractor = {item => item._id}
      />
    </View>
    </View>
  )
}

export default HistoryTab