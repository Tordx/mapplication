import { View, Text, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import Map from '../../maps/FullViewMap'
import MapboxGL from '@rnmapbox/maps'
import ItemViewMap from '../../maps/ItemViewMap'
import { Black, DarkYellow, LightBlue, LightYellow, White } from '../../Assets/Colors/Colors'
import { Rating, AirbnbRating } from 'react-native-ratings';
import ItemView from '../../components/ItemView'
import { FlatList } from 'react-native'
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core';
import { useDispatch} from 'react-redux'
import { setItem } from '../../config/ItemSlice'
import { useNavigation } from '@react-navigation/native'
import { RefreshControl } from 'react-native'
import { dbremoteEstablishment } from '../../../database/database'
import { useColorScheme } from 'react-native'

const CommentTab = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [government, setGovernment] = useState('');
  const [corporate, setCorporate] = useState([]);
  const [local, setLocal] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Government');
  const [onrefresh, setOnRefresh] = useState(false);
  const colorScheme = useColorScheme() === 'dark';


  const getdata = async () => {;

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

  const refresh = () => {
    setOnRefresh(true)
    getdata()
    setOnRefresh(false)
  }

  const renderItem = ({item}) => {
    return (
      <Pressable style = {{width: '98%', height: 100, borderColor: colorScheme ? LightBlue: Black, borderWidth: colorScheme ? 2:1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginVertical: 2, marginHorizontal: 10, borderRadius: 10}}
        onPress={() => {
          dispatch(setItem(item));
          navigation.navigate('ItemViewPage')
        }}
      >
          <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
              <Image style = {{width: 75, height: 75, marginRight: 15,marginLeft: 15, borderRadius: 20}} resizeMode='cover' source={{uri: item?.Image}} />
              <View style = {{flexDirection: 'column', width: '75%'}}>
                  <Text style={{ fontSize: 16, color: colorScheme ? White: Black, fontFamily: 'Nexa-Heavy', textAlign: 'left', marginBottom: 5}}>{item.Establishment}</Text>
                  <Text style={{ fontSize: 15, color: colorScheme ? White: Black, fontFamily: 'Nexa-ExtraLight'}}>Review Count: {item.CommentsCount}</Text>
              </View>
            <Text style={{position: 'absolute',right: 20, fontSize: 25, color: colorScheme ? LightYellow : DarkYellow, fontWeight: 'bold'}}>{item.Rating === 0 ? 0 : Math.min(item.Rating / item.RatingCount).toFixed(2)} ★</Text>
            
            </View>
      </Pressable>
    );
   
  } 
  return (
    
    <View style = {{alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: colorScheme ? Black: White}}>
      <View style = {{ position: 'absolute', top: 10}}>
     
      <Text style = {{paddingLeft: 20, color: colorScheme ? White: Black, fontSize: 30, fontFamily: 'Nexa-Heavy'}}>Establishments</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator = {false} style = {{flexDirection: 'row'}}>
      <Pressable  style = {selectedCategory === 'Government' ? [styles.selectedCategory, {backgroundColor: colorScheme ? LightYellow : DarkYellow}] : styles.nonselectedCategory} onPress={() => setSelectedCategory('Government')}>
        <Text style = {selectedCategory === 'Government' ? styles.selectedText : [styles.nonselectedText, {color: colorScheme ? White : Black}]}>Government</Text>
      </Pressable>
      <Pressable  style = {selectedCategory === 'Corporate' ? [styles.selectedCategory, {backgroundColor: colorScheme ? LightYellow : DarkYellow}]  : styles.nonselectedCategory} onPress={() => setSelectedCategory('Corporate')}>
      <Text style = {selectedCategory === 'Corporate' ? styles.selectedText : [styles.nonselectedText, {color: colorScheme ? White : Black}]}>Corporate</Text>
      </Pressable>
      <Pressable  style = {selectedCategory === 'Local' ?[styles.selectedCategory, {backgroundColor: colorScheme ? LightYellow : DarkYellow}]  : styles.nonselectedCategory} onPress={() => setSelectedCategory('Local')}>
      <Text style = {selectedCategory === 'Local' ? styles.selectedText : [styles.nonselectedText, {color: colorScheme ? White : Black}]}>Local</Text>
      </Pressable>
    </ScrollView>
    </View>
      <View style = {{marginTop: 125}}>
      <FlatList
        data={selectedCategory === 'Government' ? government : selectedCategory === 'Corporate' ? corporate : local}
        renderItem = {renderItem}
        keyExtractor = {item => item._id}  
        refreshControl={
          <RefreshControl
          onRefresh={refresh}
          refreshing = {onrefresh}
          
          colors={[LightBlue, LightYellow]}
          />
          }
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