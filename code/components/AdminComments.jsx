import { View, Text, Pressable, Image,RefreshControl, FlatList, Modal } from 'react-native'
import React, {useState, useEffect} from 'react'
import { dbremoteComments, dbremoteEstablishment } from '../../database/database';
import { useDispatch, useSelector } from 'react-redux';
import { LightBlue, LightYellow, Black, White } from '../Assets/Colors/Colors';
import { setUserView } from '../config/AccountSlice';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ToastAndroid } from 'react-native';

export default function AdminComments() {

  const {ItemList} = useSelector((action) => action.items);
  const {userview} = useSelector((action) => action.user)
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [onrefresh, setOnRefresh] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

const deletecomment = async() => {

  
    const update = await dbremoteComments.get(userview._id);
    const updatecommentcount = await dbremoteComments.put({
        _id: userview._id,
        ...update,
        Status: 'deleted'

    });
    console.log(updatecommentcount)
    const doc = await dbremoteEstablishment.get(ItemList._id);
    console.log(doc)
    const updatedEstablishment = {
      _id: ItemList._id,
      ...doc,
      CommentsCount: ItemList.CommentsCount - 1,
      Rating: ItemList.Rating - userview.Rating,
      RatingCount: ItemList.RatingCount - 1,
      ParkingRating: ItemList.ParkingRating -  userview.ParkingRating,
      RampRating: ItemList.RampRating - userview.RampRating,
      TactilesRating: ItemList.TactilesRating - userview.TactilesRating,
      EstablishmentRating: ItemList.EstablishmentRating - userview.EstablishmentRating,
      Date: data.date,
    };
    await dbremoteEstablishment.put(updatedEstablishment);
    console.log(updatedEstablishment)
    ToastAndroid.show('Comment deleted', ToastAndroid.LONG)
    setOpenModal(false)
    getdata()
    console.log(updatecommentcount)


}



    const renderItem = ({item}) => {
        return (
          <Pressable style = {{width: '100%', height: 100, borderColor: LightBlue, borderBottomWidth: 1, justifyContent: 'center', alignSelf: 'center'}}
          onPress={() => {dispatch(setUserView(item)); navigation.navigate('CommentViewPage')}}
          onLongPress={() =>{ setOpenModal(true); dispatch(setUserView(item))}}
          android_ripple={{
            color: 'grey',
          }}
          >
            <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%',}}>
              <Pressable  onPress={() => {dispatch(setUserView(item)); navigation.navigate('UserViewPage')}} style = {{width: 75, height: 75, marginRight: 15, borderRadius: 50}} >
              <Image style = {{width: '100%', height: '100%', borderRadius: 50}} resizeMode='cover' source={{uri: item.Image}} />
              </Pressable>
              <View style = {{flexDirection: 'column', width: '75%'}}>
                  <Text style={{ fontSize: 16, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left',}}>{item.FullName}</Text>
                  <Text style={{ fontSize: 15, color: White, fontFamily: 'Nexa-ExtraLight', width: '75%', marginVertical: 5}}>{item.Text.slice(0, 50)}</Text>
                  <Text style={{ fontSize: 12, color: White, fontFamily: 'Nexa-ExtraLight'}}>{item.Date}</Text>
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
    <View style = {{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
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
      <Modal
        visible = {openModal}
        transparent
        onRequestClose={() => setOpenModal(false)}
      >
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style = {{width: '90%', height: '40%', backgroundColor: Black,  justifyContent: 'center', alignItems: 'center', borderRadius: 20, elevation: 10}}>
            <FontAwesome name = 'warning' size = {40} color = {'yellow'} />
          <Text style = {{textAlign: 'center', fontSize: 15, width: '95%', marginTop: 5, fontFamily: 'Nexa-ExtraLight'}}>Warning: Please review the following comment carefully before deleting it. We value freedom of expression and encourage diverse opinions but we do not tolerate hate speech or any form of discrimination on our platform. Please ensure that the comment violates our community guidelines before taking any action. If you have any doubts or questions, please consult our policies and reach out to our support team for further guidance. Thank you for your efforts in keeping our platform safe and respectful for all users.</Text>
          <Pressable onPress={deletecomment}>
            <Text style = {{marginTop: 10, padding: 10, borderRadius: 20, borderColor: 'red', borderWidth: 2, color: 'red', fontSize: 20, fontFamily: 'Nexa-Heavy', textAlign: 'center'}}>DELETE</Text>
          </Pressable>
          <Pressable onPress={() => setOpenModal(false)} style = {{top: 15, position: 'absolute', right: 15}}>
          <FontAwesome name = 'close' size = {25} color = {White} />
          </Pressable>
          </View>
         
        </View>
      </Modal>
      </View>
  )
}