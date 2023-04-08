import { View, Text, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import Map from '../../maps/FullViewMap'
import MapboxGL from '@rnmapbox/maps'
import ItemViewMap from '../../maps/ItemViewMap'
import { Black, LightBlue, LightYellow, White } from '../../Assets/Colors/Colors'
import { Rating, AirbnbRating } from 'react-native-ratings';
import ItemView from '../../components/ItemView'
import { FlatList } from 'react-native'
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core';
import { useDispatch} from 'react-redux'
import { setItem } from '../../config/ItemSlice'
import { useNavigation } from '@react-navigation/native'

const CommentTab = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [government, setGovernment] = useState('');
  const [corporate, setCorporate] = useState([]);
  const [local, setLocal] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Government');


  const getdata = async () => {

    const dbremoteEstablishment = new PouchDB('http://admin:admin@192.168.0.192:5984/m_establishments');

    try {
      let result = await dbremoteEstablishment.allDocs({
        include_docs: true,
        attachments: true,
        
      });
      if(result.rows){
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
            setCorporate(Corporate);
            setLocal(Local);
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
      <Pressable style = {{width: '98%', height: 100, borderColor: LightBlue, borderWidth: 2, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginVertical: 10, marginHorizontal: 10, borderRadius: 20}}
        onPress={() => {
          dispatch(setItem(item));
          navigation.navigate('ItemViewPage')
        }}
      >
          <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
              <Image style = {{width: 75, height: 75, marginRight: 15,marginLeft: 15, borderRadius: 20}} resizeMode='cover' source={{uri: item?.Image}} />
              <View style = {{flexDirection: 'column', width: '75%'}}>
                  <Text style={{ fontSize: 16, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left', marginBottom: 5}}>{item.Establishment}</Text>
                  <Text style={{ fontSize: 15, color: White, fontFamily: 'Nexa-ExtraLight'}}>Review Count: {item.RatingCount}</Text>
              </View>
            <Text style={{position: 'absolute',right: 20, fontSize: 25, color: LightYellow}}>{Math.min(item.Rating / item.RatingCount).toFixed(2)} ★</Text>
            
            </View>
      </Pressable>
    );
   
  } 
  return (
    
    <View style = {{alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: Black}}>
      <View style = {{ position: 'absolute', top: 10}}>
     
      <Text style = {{paddingLeft: 20, color: White, fontSize: 30, fontFamily: 'Nexa-Heavy'}}>Establishments</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator = {false} style = {{flexDirection: 'row'}}>
      <Pressable  style = {selectedCategory === 'Government' ? styles.selectedCategory : styles.nonselectedCategory} onPress={() => setSelectedCategory('Government')}>
        <Text style = {selectedCategory === 'Government' ? styles.selectedText : styles.nonselectedText}>Government</Text>
      </Pressable>
      <Pressable  style = {selectedCategory === 'Corporate' ? styles.selectedCategory : styles.nonselectedCategory} onPress={() => setSelectedCategory('Corporate')}>
      <Text style = {selectedCategory === 'Corporate' ? styles.selectedText : styles.nonselectedText}>Corporate</Text>
      </Pressable>
      <Pressable  style = {selectedCategory === 'Local' ? styles.selectedCategory : styles.nonselectedCategory} onPress={() => setSelectedCategory('Local')}>
      <Text style = {selectedCategory === 'Local' ? styles.selectedText : styles.nonselectedText}>Local</Text>
      </Pressable>
    </ScrollView>
    </View>
      <View style = {{marginTop: 125}}>
      <FlatList
        data={selectedCategory === 'Government' ? government : selectedCategory === 'Corporate' ? corporate : local}
        renderItem = {renderItem}
        keyExtractor = {item => item._id}
      />
      </View>
    </View>
   
  )
}

const styles = StyleSheet.create({
  selectedText: {fontSize: 17, color: Black, fontFamily: 'cocogooese_semibold'},
  nonselectedText: {fontSize: 17, color: White, fontFamily: 'cocogooese_semibold'},
  selectedCategory: {backgroundColor: LightYellow, width: 150, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginTop: 20},
  nonselectedCategory: {borderColor: LightYellow, borderWidth: 2, width: 150, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginTop: 20}
})

export default CommentTab