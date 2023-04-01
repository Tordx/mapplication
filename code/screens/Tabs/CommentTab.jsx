import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import Map from '../../maps/FullViewMap'
import MapboxGL from '@rnmapbox/maps'
import ItemViewMap from '../../maps/ItemViewMap'
import { Black } from '../../Assets/Colors/Colors'
import { Rating, AirbnbRating } from 'react-native-ratings';
import ItemView from '../../components/ItemView'
import { FlatList } from 'react-native'
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core';

const CommentTab = () => {

  const [government, setGovernment] = useState('');
  const [corporate, setCorporate] = useState([]);
  const [local, setLocal] = useState([]);


  const getdata = async () => {

    const dbremoteEstablishment = new PouchDB('http://admin:admin@192.168.0.192:5984/m_establishments');

    console.log('Hello')
    try {
      console.log('Runs')
      let result = await dbremoteEstablishment.allDocs({
        include_docs: true,
        attachments: true,
        
      });
      if(result.rows){
        console.log('Runs?')
        let modifiedArr = result.rows.map(item => item.doc)
        let filteredData = modifiedArr.filter(item => {
          return item
        })
        if (filteredData) {
            const Government = filteredData.filter((item) => {
              return item.PropertyType == 'Government'
            })
            const Corporate = filteredData.filter((item) => {
              return item.PropertyType === 'Corporate'
            })
            const Local = filteredData.filter((item) => {
              return item.PropertyType === 'Local'
            })
            setGovernment(Government);
            console.log(Government);
            setCorporate(Corporate);
            setLocal(Local);
        }
      } 
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    
    console.log('this runs1')
    getdata()
    console.log('this runs')
  },[])

  const renderItem = ({item}) => {
    return (
    <View>
      <Text>{item.Establishment}</Text>
    </View>
    )
  } 
  return (
    
    <View style = {{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#f2f2f2'}}>
      <FlatList
        data={government}
        renderItem = {renderItem}
        keyExtractor = {item => item.id}
      />
    </View>
   
  )
}

export default CommentTab