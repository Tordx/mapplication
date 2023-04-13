import { View, Text , FlatList , Image , Pressable } from 'react-native'
import React , {useState , useEffect} from 'react'
import { dbremoteAccounts } from '../../../database/database'
import { useNavigation } from '@react-navigation/native'
import { setApprovingAccoung } from '../../config/AccountSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


const AdminLanding = () => {

  useEffect(async() => {
    
    getUserData()
    
    await dbremoteAccounts.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', function(change) {
        getUserData()
        console.log(change);
      }).on('error', function (err) {
        console.log(err);
      });

  }, [])
  
  const {useraccount} = useSelector((store) => store.user)
  const dispatch = useDispatch()
  
  const [userdata, setUserData] = useState('')
  
  const navigation = useNavigation()

  const getUserData = async() => {

    try {
        let result = await dbremoteAccounts.allDocs({
          include_docs: true,
          attachments: true,
        });
        if (result.rows) {
          let modifiedArr = result.rows.map(
            item => item.doc
          );
          let filteredData = modifiedArr.filter(item => {
            return item
          });
          if (filteredData.length) {
            let newFilterData = filteredData.map((item) => {
              return item
            });
            const admindata = newFilterData.filter((item) => item.FullName !== useraccount.FullName);
            const filterdata = admindata.filter((item) => item.Status !== "Active");
            setUserData(filterdata)


          }
        }
      } catch (error) {
        console.error(error);
        console.log(error)
      }
    }

    const renderItem = ({item}) => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center',}}>
                <Pressable onPress={() => {navigation.navigate("AdminApprovingForm") , dispatch(setApprovingAccoung(item))}}>
                    <View style={{flexDirection: 'row'}}>
                    <Image source={{uri: item.Profilephoto}} style={{ width: 100, height: 100 , margin: 5 }} resizeMode='cover'/>
                    <Text style={{fontSize: 70}}>
                        {item.FullName}
                    </Text>
                    </View>
                </Pressable>
           </View> 

        );
       
      } 

  return (
    <View>
      <Text>AdminLanding</Text>
      <FlatList
        data={userdata}
        renderItem = {renderItem}
        keyExtractor = {item => item._id}
      />

    </View>
  )
}

export default AdminLanding