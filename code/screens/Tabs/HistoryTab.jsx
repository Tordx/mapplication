import { View, Text, StatusBar } from 'react-native'
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



const HistoryTab = () => {

  const {useraccount} = useSelector((action) => action.login)
  const [comments, setComments] = useState([]);

  const getdata = async () => {

    const dbremoteComments = new PouchDB('http://admin:admin@192.168.0.192:5984/m_comments');
        
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
                  return item.FullName === useraccount.FullName;
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

  const { height } = Dimensions.get('window');

  const TAB_BAR_HEIGHT = 80;


  const renderItem = ({item}) => {
    return (
      <Pressable style = {{width: '100%', height: 125, borderColor: LightBlue, borderBottomWidth: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'flex-start', margin: 10., borderRadius: 20}}
        // onPress={() => {
        //   dispatch(setItem(item));
        //   navigation.navigate('ItemViewPage')
        // }}
      >
        <View style = {{padding: 15, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
          {/* <Image style = {{width: 100, height: 100, marginRight: 15, borderRadius: 20}} resizeMode='cover' source={{uri: item.Image}} /> */}
          <View style = {{width: '100%'}}>
              <Text style={{ fontSize: 22, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left'}}>{item.Date}</Text>
              <Text style={{ fontSize: 17, color: White, fontFamily: 'Nexa-ExtraLight'}}>{item.Text}</Text>
          </View>
        </View>
        <Text style={{position: 'absolute',right: 20, fontSize: 35, color: LightYellow}}>{Math.min(item.Rating).toFixed(2)} ★</Text>
      </Pressable>
    );
   
  } 

  return (
    <View style = {{flex: 1, backgroundColor: Black}}>
    <View style={{height: 45, width: '100%'}}>
      <Text style = {{paddingLeft: 20, color: White, fontSize: 25, fontFamily: 'Nexa-Heavy', top: 10}}>Review History</Text>
      
      </View>
    <View style = {{flex: 1, backgroundColor: Black, paddingBottom: 100}}>
      
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