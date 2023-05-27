
import { View, Text, Pressable, Image, ScrollView, StyleSheet, RefreshControl } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Black, LightBlue, LightYellow, White } from '../../../Assets/Colors/Colors'
import { FlatList } from 'react-native'
import { useDispatch} from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import {  } from 'react-native'
import { setItem } from '../../../config/ItemSlice'
import { dbremoteEstablishment } from '../../../../database/database'
import { useColorScheme } from 'react-native'

const AdminCommentList = () => {
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
        <Pressable style = {{width: '98%', height: 100, borderColor: LightBlue, borderWidth: 2, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginVertical: 5, marginHorizontal: 10, borderRadius: 20}}
          onPress={() => {
            dispatch(setItem(item));
            navigation.navigate('AdminItemViewPage')
          }}
          onLongPress={() => {dispatch(setItem(item)); navigation.navigate('EditLocation')}}
          android_ripple = {{
            color:'grey',
            radius: 200,
            borderRadius: 500
          }}
        >
            <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Image style = {{width: 75, height: 75, marginRight: 15,marginLeft: 15, borderRadius: 20}} resizeMode='cover' source={{uri: item?.Image}} />
                <View style = {{flexDirection: 'column', width: '75%'}}>
                    <Text style={{ fontSize: 16, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left', marginBottom: 5}}>{item.Establishment}</Text>
                    <Text style={{ fontSize: 15, color:  colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight'}}>Review Count: {item.CommentsCount}</Text>
                </View>
              <Text style={{position: 'absolute',right: 20, fontSize: 25, color: LightYellow}}>{item.Rating === 0 ? 0 : Math.min(item.Rating / item.RatingCount).toFixed(2)} ★</Text>
              
              </View>
        </Pressable>
      );
     
    } 
    return (
      
        <View style = {{backgroundColor:  colorScheme ? Black : White, flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        <Text style={{ fontSize: 20, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left', marginTop: 20, width: '95%'}}>ESTABLISHMENTS</Text>
        <View style = {{backgroundColor:  colorScheme ? Black : White, width: '95%', justifyContent: 'center', alignItems: 'center',}}>
        <ScrollView horizontal showsHorizontalScrollIndicator = {false} style = {{flexDirection: 'row'}}>
        <Pressable  style = {selectedCategory === 'Government' ? styles.selectedCategory : styles.nonselectedCategory} onPress={() => setSelectedCategory('Government')}>
          <Text style = {selectedCategory === 'Government' ? [styles.selectedText, {color: colorScheme ? White : Black}] : [styles.nonselectedText, {color:  colorScheme ? White : Black}]}>Government</Text>
        </Pressable>
        <Pressable  style = {selectedCategory === 'Corporate' ? styles.selectedCategory : styles.nonselectedCategory} onPress={() => setSelectedCategory('Corporate')}>
        <Text style = {selectedCategory === 'Corporate' ?  [styles.selectedText, {color: colorScheme ? White : Black}] : [styles.nonselectedText, {color:  colorScheme ? White : Black}]}>Corporate</Text>
        </Pressable>
        <Pressable  style = {selectedCategory === 'Local' ? styles.selectedCategory : styles.nonselectedCategory} onPress={() => setSelectedCategory('Local')}>
        <Text style = {selectedCategory === 'Local' ?  [styles.selectedText, {color: colorScheme ? White : Black}] : [styles.nonselectedText, {color:  colorScheme ? White : Black}]}>Local</Text>
        </Pressable>
      </ScrollView>
      </View>
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
     
    )
  }
  
  const styles = StyleSheet.create({
    selectedText: {fontSize: 17, color: Black, fontFamily: 'cocogooese_semibold'},
    nonselectedText: {fontSize: 17, color: White, fontFamily: 'cocogooese_semibold'},
    selectedCategory: {backgroundColor: LightYellow, width: 150, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginTop: 20},
    nonselectedCategory: {borderColor: LightYellow, borderWidth: 2, width: 150, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginTop: 20}
  })

//make this component available to the app
export default AdminCommentList;
