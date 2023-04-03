import { View, Text, FlatList, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core';
import { Black, LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
import { Loginbox } from '../screens/loginPage';
import uuid from 'react-native-uuid';
import { Pressable } from 'react-native';
import { Modal } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

 export const Ratings = (props) => (
    <View style = {{justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start', flexDirection: 'column', marginLeft: 20, marginVertical: 15}} >
          <Text style = {{color: White, fontFamily: 'cocogooese_semibold', fontSize: 20,}}>{props.title}</Text>
          <View style = {{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Rating
            type='custom'
            onFinishRating={props.onFinishRating}
            tintColor = {Black}
            jumpValue = {props.jumpValue}
            imageSize={45}
            ratingColor= '#ffdd85'
            readonly = {props.readonly}
            />
            <Text style = {{color: LightYellow, fontFamily: 'Nexa-Heavy', fontSize: 25, marginLeft: 10, textAlign: 'center'}}>{props.result}</Text>
            </View>
        </View>
  )

export default function Comments() {

    const {ItemList} = useSelector((action) => action.items)
    const {useraccount} = useSelector((action) => action.login)
    const navigation = useNavigation();
    const [onrefresh, setOnRefresh] = useState(false)
    const now = new Date();
    const date = now.toLocaleDateString();
    const [data, setData] = useState('');
    const [text, setText] = useState('');
    const [modal, setModal] = useState(false);
    const [imageattachment, setImageAttachment] = useState('');
    const [establishment, setEstablishment] = useState(3);
    const [ramp, setRamp] = useState(3);
    const [parking, setParking] = useState(3);
    const [tactiles, setTactiles] = useState(3);
    const overallrating = Math.min((establishment + ramp + parking + tactiles) / 4)
    const id = uuid.v4();

   
    console.log(overallrating)

    const adddata = async () => {

      const dbremoteComments = new PouchDB('http://admin:admin@192.168.0.192:5984/m_comments');
      const dbremoteEstablishment = new PouchDB('http://admin:admin@192.168.0.192:5984/m_establishments');
    
      try {
        var response = {
          _id: id,
          FullName: useraccount.FullName,
          Image: useraccount.Image,
          Text: text,
          ImageAttachment: imageattachment,
          Rating: overallrating,
          ParkingRating: parking,
          RampRating: ramp,
          TactilesRating: tactiles,
          Date: date,
          CommentID: ItemList.CommentID,
        };
        dbremoteComments.put(response);
        console.log(response)
        
        const doc = await dbremoteEstablishment.get(ItemList._id);
        const updatedEstablishment = {
          _id: ItemList._id,
          ...doc,
          CommentsCount: ItemList.CommentsCount + 1,
          Rating: ItemList.Rating + overallrating,
          RatingCount: ItemList.RatingCount + 1,
          ParkingRating: ItemList.ParkingRating + parking,
          RampRating: ItemList.ParkingRating + ramp,
          TactilesRating: ItemList.TactilesRating + tactiles,
          EstablishmentRating: ItemList.EstablishmentRating + establishment,
          Date: date,
        };
        await dbremoteEstablishment.put(updatedEstablishment);
        console.log(updatedEstablishment)
        Alert.alert('Thanks for submitting a review!')
        setModal(false)
        setText('')
        getdata()
      } catch (error) {
        console.log(error);
      }
    };


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
          <View style = {{width: 402, height: 100, borderColor: LightBlue, borderBottomWidth: 2, justifyContent: 'center', alignItems: 'flex-start', margin: 10., borderRadius: 10}}
          >
            <View style = {{padding: 15, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
              <Image style = {{width: 75, height: 75, marginRight: 15, borderRadius: 50}} resizeMode='cover' source={{uri: item?.Image}} />
              <View style = {{width: '50%'}}>
                  <Text style={{ fontSize: 16, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left', marginBottom: 5}}>{item.FullName}</Text>
                  <Text style={{ fontSize: 15, color: White, fontFamily: 'Nexa-ExtraLight'}}>{item.Text}</Text>
                  <Text style={{ fontSize: 12, color: White, fontFamily: 'Nexa-ExtraLight'}}>{item.Date}</Text>
              </View>
            </View>
            <Text style={{position: 'absolute',right: 20, fontSize: 25, color: LightYellow}}>{item.Rating} ★</Text>
          </View>
        );
       
      }

      const refresh = () => {
        setOnRefresh(true)
        getdata()
        setOnRefresh(false)
      }

  return (
    <>
    
    <View style = {{marginTop: 130, justifyContent: 'center', alignItems: 'center',}}>
    
     
    <Pressable onPress = {() => setModal(true)} style = {{ width: 500, borderBottomWidth: 0.3, borderColor: White, justifyContent: 'center', alignItems: 'center',}}>
        <Text style = {{color: White, fontFamily: 'cocogooese_semibold', fontSize: 16, marginBottom: 10}}>Add a Review</Text>
      </Pressable>
      <FlatList
        data={data}
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
      <Modal
        animationType='slide'
        transparent
        visible = {modal}
        onRequestClose={() => setModal(false)}
      >
        <View style = {{width: '100%', height: '100%', backgroundColor: Black, justifyContent: 'center', alignItems: 'center',}}>
          <Text style = {{ fontSize: 30, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left', marginBottom: 10}}>SUBMIT A REVIEW</Text>
          <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>Amplifying PWD voices with inclusive reviews - every voice deserves to be heard.</Text>
          <Text style={{fontSize: 25, color: White, textAlign: 'left', alignSelf: 'flex-start', paddingLeft: 20, fontFamily: 'Nexa-Heavy'}}>Overall Rating</Text>
          <Text style={{fontSize: 50, color: LightYellow, textAlign: 'left', alignSelf: 'flex-start', paddingLeft: 20, fontFamily: 'Nexa-Heavy'}}>{overallrating} ★</Text>
            
            <Ratings
            onFinishRating = {(newrating) => setEstablishment(newrating)}
            result = {establishment}
            title = 'Establishment'
            jumpValue = {0.5}
            />
            <Ratings
            onFinishRating = {(newrating) => setParking(newrating)}
            result = {parking}
            title = 'Parking'
            />
            <Ratings
            onFinishRating = {(newrating) => setRamp(newrating)}
            result = {ramp}
            title = 'Ramp'
            />
            <Ratings
            onFinishRating = {(newrating) => setTactiles(newrating)}
            result = {tactiles}
            title = 'Tactiles'
            />
            <View style = {{justifyContent: 'center', alignSelf: 'flex-start', margin: 20, flexDirection: 'row'}}>
            {<View style = {{justifyContent: 'center', alignSelf: 'flex-start', margin: 10, width: 100, height: 100, borderWidth: 2, alignItems: 'center', borderRadius: 20, borderColor: LightYellow}}>
              <Image style = {{width: '100%', height: '100%', borderRadius: 19}} resizeMode='cover' source={require('../Assets/images/welcome-logo.png')} />
            </View>}
            <Pressable style = {{justifyContent: 'center', alignSelf: 'flex-start', margin: 10, width: 100, height: 100, borderWidth: 2, alignItems: 'center', borderRadius: 20, borderColor: LightYellow}}>
              <Icon
                name='photo'
                size={60}
                color={LightBlue}
              />
            </Pressable>
            </View>
            <Loginbox 
            
            placeholder = 'Write comment...'
            name = 'send'
            value = {text}
            onChangeText = {(text) => setText(text)}
            onPress = {adddata}
            />
        </View>
      </Modal>
      </>
  )
}