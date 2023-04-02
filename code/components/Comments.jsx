import { View, Text, FlatList, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import PouchDB from 'pouchdb-react-native' ;import { LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
import { Loginbox } from '../screens/loginPage';
 'pouchdb-core';

export default function Comments() {
    const {ItemList} = useSelector((action) => action.items)
    const [data, setData] = useState()
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
                  return item.CommentID === ItemList.CommentID;
                })
            
                setData(newFilteredData);
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
          <View style = {{width: 402, height: 125, borderColor: LightBlue, borderBottomWidth: 2, justifyContent: 'center', alignItems: 'flex-start', margin: 10., borderRadius: 10}}
          >
            <View style = {{padding: 15, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
              <Image style = {{width: 75, height: 75, marginRight: 15, borderRadius: 50}} resizeMode='cover' source={{uri: item.Image}} />
              <View style = {{width: '45%'}}>
                  <Text style={{ fontSize: 22, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left'}}>{item.FullName}</Text>
                  <Text style={{ fontSize: 15, color: White, fontFamily: 'Nexa-ExtraLight'}}>{item.Text}</Text>
              </View>
            </View>
            <Text style={{position: 'absolute',right: 20, fontSize: 25, color: LightYellow}}>{item.Rating} ★</Text>
          </View>
        );
       
      } 

  return (
    <View style = {{marginTop: 125, justifyContent: 'center', alignItems: 'center',}}>
        <Loginbox 
        
            placeholder = 'Write comment...'
            name = 'send'
        />
      <FlatList
        data={data}
        renderItem = {renderItem}
        keyExtractor = {item => item._id}
      />
      </View>
  )
}