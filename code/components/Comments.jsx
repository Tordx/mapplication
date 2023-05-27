import { View, Text, FlatList, Image, useColorScheme } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { setUserView } from '../config/AccountSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { ScrollView } from 'react-native';
import { dbremoteEstablishment , dbremoteComments, dbremoteAccounts } from '../../database/database';
import { Switch } from 'react-native';

 export const Ratings = (props) => { 
  const colorScheme = useColorScheme() === 'dark';
  return (
    <View style = {{justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start', flexDirection: 'column', paddingLeft: 10, marginVertical: 15, width: '100%', borderBottomWidth: 0.5, borderColor: LightBlue}} >
          <Text style = {{color: colorScheme ? White: Black, fontFamily: 'cocogooese_semibold', fontSize: 18, marginBottom: 5}}>{props.title}</Text>
          <View style = {{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 20}}>
            <Rating
            type='custom'
            onFinishRating={props.onFinishRating}
            tintColor = {props.tintColor}
            jumpValue = {props.jumpValue}
            imageSize={props.imageSize}
            ratingColor= '#ffdd85'
            readonly = {props.readonly}
            />
            <Text style = {{color: LightYellow, fontFamily: 'Nexa-Heavy', fontSize: 25, marginLeft: 10, textAlign: 'center'}}>{props.result}</Text>
            </View>
        </View>
  )
}

export default function Comments() {

    const {ItemList} = useSelector((action) => action.items)
    const {useraccount} = useSelector((action) => action.user)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [onrefresh, setOnRefresh] = useState(false)
    const now = new Date();
    const date = now.toLocaleDateString();
    const [data, setData] = useState([]);
    const [text, setText] = useState('');
    const [modal, setModal] = useState(false);
    const [imageattachment, setImageAttachment] = useState([]);
    const [establishment, setEstablishment] = useState(3);
    const [ramp, setRamp] = useState(3);
    const [parking, setParking] = useState(3);
    const [tactiles, setTactiles] = useState(3);
    const [isEnabled, setIsEnabled] = useState(false);
    const [FullName, setFullName] = useState(useraccount.FullName);
    const [image, setImage] = useState(useraccount.Image);
    const [userID, setUserID] = useState(useraccount.UserID)
    const overallrating = Math.min((establishment + ramp + parking + tactiles) / 4)
    const colorScheme = useColorScheme() === 'dark';
    const id = uuid.v4();

    console.log(data)

    useEffect(() => {
      
    if (isEnabled) {
      setFullName('Anonymous');
      setUserID('Anonymous')
      setImage('https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-4.jpg');
    } else {
      // Set fullName and image to their original values
      // You can replace these with your own logic to set the default values
      setFullName(useraccount.FullName);
      setImage(useraccount.Image);
      setUserID(useraccount.UserID)
    }
    },[isEnabled])

    const handleProfilePhoto = async () => {
      launchImageLibrary({ noData: true }, async (response) => {
        if (response) {
          const datapic = response;
          try {
            const data = await RNFetchBlob.fs.readFile(
              datapic.assets[0].uri,
              'base64'
            );
            const formData = new FormData();
            formData.append('image', data);
            const response = await fetch('https://api.imgur.com/3/image', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer bd49a5b019e13ffe584a4c735069141287166b0c',
              },
              body: formData,
            });
            const result = await response.json();
            const photolink = result.data.link;
            setImageAttachment([...imageattachment, photolink]); // push the new image link to the array
          } catch (error) {
            console.log('error', error);
          }
        }
      });
    };

    const adddata = async () => {
      
      try {
        const response = await dbremoteComments.put( {
          _id: id,
          FullName: FullName,
          Image: image,
          Text: text,
          ImageAttachment: imageattachment,
          Rating: overallrating,
          EstablishmentRating: establishment,
          ParkingRating: parking,
          RampRating: ramp,
          TactilesRating: tactiles,
          Date: date,
          CommentID: ItemList.CommentID,
          UserID: userID,
          Status: 'Active'
        });
        const update = await dbremoteAccounts.get(useraccount._id);
        const updatecommentcount = await dbremoteAccounts.put({
            _id: useraccount._id,
            ...update,
            CommentCount: useraccount.CommentCount + 1,

        });
        console.log(updatecommentcount)
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
        console.log(response)
        Alert.alert('Thanks for submitting a review!')
        setModal(false)
        setText('')
        setIsEnabled(false)
        setImageAttachment([])
        getdata()
      } catch (error) {
        console.log(error);
      }
    };

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
             
              return item.CommentID === ItemList.CommentID;
            })
            if (filteredData) {
                const newFilteredData = filteredData.filter((item) => {
                  return item.Status === 'Active'
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


    const removeImage = (index) => {
      const newImageAttachments = [...imageattachment];
      newImageAttachments.splice(index, 1);
      setImageAttachment(newImageAttachments);
    };

    const renderItem = ({item}) => {
        return (
          <Pressable style = {{width: '100%', height: 100, borderColor: LightBlue, borderBottomWidth: 1, justifyContent: 'center', alignSelf: 'center', borderRadius: 10}}
          onPress={() => {dispatch(setUserView(item)); navigation.navigate('CommentViewPage')}}
          android_ripple={{
            color: 'grey',
          }}
          >
            <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%',}}>
              <Pressable  onPress={() => {dispatch(setUserView(item)); navigation.navigate('UserViewPage')}} style = {{width: 75, height: 75, marginRight: 15, borderRadius: 50}} >
              <Image style = {{width: '100%', height: '100%', borderRadius: 50}} resizeMode='cover' source={{uri: item.Image}} />
              </Pressable>
              <View style = {{flexDirection: 'column', width: '75%'}}>
                  <Text style={{ fontSize: 16, color: colorScheme ? White: Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',}}>{item.FullName}</Text>
                  <Text style={{ fontSize: 15, color: colorScheme ? White: Black, fontFamily: 'Nexa-ExtraLight', width: '75%', marginVertical: 5}}>{item.Text.slice(0, 50)}</Text>
                  <Text style={{ fontSize: 12, color: colorScheme ? White: Black, fontFamily: 'Nexa-ExtraLight'}}>{item.Date}</Text>
              </View>
            <Text style={{position: 'absolute',right: 20, fontSize: 25, color: LightYellow}}>{item.Rating} ★</Text>
            
            </View>
          </Pressable>
        );
       
      }

      const refresh = () => {
        setOnRefresh(true)
        getdata()
        setOnRefresh(false)
      }

  return (
    <>
    <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
    
    <Pressable onPress = {() => setModal(true)} style = {{ width: 500, borderBottomWidth: 0.3, borderColor: White, justifyContent: 'center', alignItems: 'center'}}>
        <Text style = {{color: colorScheme ? White: Black, fontFamily: 'cocogooese_semibold', fontSize: 16, marginBottom: 10}}>Add a Review</Text>
        
      
      </Pressable>
      {data.length === 0 && 
        <View style = {{width: '100%', height: '100%', backgroundColor: Black, justifyContent: 'center', alignItems: 'center',}}>
      <Text style={{ color: White, fontFamily: 'cocogooese_semibold', fontSize: 16 }}>Be the first one to submit a review!</Text>
      </View>}
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
          <ScrollView style = {{width: '100%', height: '100%', }}>
        <View style = {{width: '100%', height: '100%', backgroundColor: colorScheme ? Black: White, justifyContent: 'center', alignItems: 'center',}}>
          <Text style = {{ fontSize: 30, color: colorScheme ? White: Black, fontFamily: 'Nexa-Heavy', textAlign: 'left', marginBottom: 10, marginTop: 20}}>SUBMIT A REVIEW</Text>
          <Text style = {{ fontSize: 20, color: colorScheme ? White: Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 20}}>Amplifying PWD voices with inclusive reviews - every voice deserves to be heard.</Text>
          <Text style={{fontSize: 25, color: colorScheme ? White: Black, textAlign: 'left', alignSelf: 'flex-start', paddingLeft: 20, fontFamily: 'Nexa-Heavy'}}>Your overall rating</Text>
          <Text style={{fontSize: 75, color: LightYellow, textAlign: 'left', alignSelf: 'flex-start', paddingLeft: 20, fontFamily: 'Nexa-Heavy'}}>{overallrating} ★</Text>
            
            <Ratings
            onFinishRating = {(newrating) => setEstablishment(newrating)}
            result = {establishment}
            title = 'Establishment'
            jumpValue = {0.5}
            imageSize = {25}
            tintColor = {colorScheme ? Black: White}
            />
            <Ratings
            onFinishRating = {(newrating) => setParking(newrating)}
            result = {parking}
            title = 'Parking'
            imageSize = {25}
            tintColor = {colorScheme ? Black: White}
            />
            <Ratings
            onFinishRating = {(newrating) => setRamp(newrating)}
            result = {ramp}
            title = 'Ramp'
            imageSize = {25}
            tintColor = {colorScheme ? Black: White}
            />
            <Ratings
            onFinishRating = {(newrating) => setTactiles(newrating)}
            result = {tactiles}
            title = 'Tactiles'
            imageSize = {25}
            tintColor = {colorScheme ? Black: White}
            />
            
            <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'center', marginTop: 10, width: 500, paddingTop: 10,}}>Upload Images</Text>
            <View style = {{justifyContent: 'center', alignSelf: 'center', margin: 20, flexDirection: 'row'}}>
            {imageattachment.map((imageLink, index) => (
              <View style = {{justifyContent: 'center', alignSelf: 'center', margin: 10, width: 100, height: 100, borderWidth: 2, alignItems: 'center', borderRadius: 20, borderColor: LightYellow}}>
              <Image key={index} source={{ uri: imageLink }} style={{  borderRadius: 20, width: 96, height: 96 }} />
              <Pressable onPress={() => removeImage(index)} style = {{position: 'absolute', top: -10, right: -10, backgroundColor: 'red', borderRadius: 100}}>
                <Icon name="close" size={30} color={White} />
              </Pressable>
            </View>
            ))}
           {imageattachment.length < 3 && (
              <Pressable style={{ justifyContent: 'center', alignSelf: 'flex-start', margin: 10, width: 100, height: 100, borderWidth: 2, alignItems: 'center', borderRadius: 20, borderColor: LightYellow }}
                onPress={handleProfilePhoto}>
                <Icon
                  name='photo'
                  size={60}
                  color={LightBlue}
                />
              </Pressable>
            )}
            </View>
            <View style = {{flexDirection: 'row',justifyContent: 'flex-start', alignSelf: 'flex-start', alignItems: 'center', marginBottom: 10, width: '100%', marginLeft: 15}}>
            <Image style = {{ paddingLeft: 20, width: 50, height: 50, borderRadius: 500}} resizeMode = 'cover' source={{uri: image}}/>
            <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginLeft: 5,}}>{FullName}</Text>
            </View>
            <View style = {{flexDirection: 'row',justifyContent: 'flex-start', alignSelf: 'flex-start', alignItems: 'center', marginBottom: 5, width: '100%', height: 40, backgroundColor: colorScheme ? '#202020': White}}>
            <Switch style = {{ paddingLeft: 20}} 
              trackColor={{false: '#808080', true: LightYellow}}
              thumbColor={isEnabled ? '#e2e2e2' : LightYellow}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
            />
            <Text style = {{ fontSize: 17, color: colorScheme ? White: Black, fontFamily: 'Nexa-ExtraLight', textAlign: 'center',}}>Submit anonymously</Text>
            </View>
            <Loginbox 
            
            placeholder = 'Write comment...'
            name = 'send'
            value = {text}
            onChangeText = {(text) => setText(text)}
            onPress = {adddata}
            />
        </View>
        </ScrollView>
      </Modal>
      
      </>
  )
}