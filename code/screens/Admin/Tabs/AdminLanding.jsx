import { View, Text , FlatList , Image , Pressable } from 'react-native'
import React , {useState , useEffect} from 'react'
import { dbremoteAccounts } from '../../../../database/database'
import { useNavigation } from '@react-navigation/native'
import { setApprovingAccoung, setUserView } from '../../../config/AccountSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Black, LightBlue, LightYellow, White } from '../../../Assets/Colors/Colors'
import { Loginbox } from '../../loginPage'
import { RefreshControl } from 'react-native'


const AdminLanding = () => {


  const liveupdate = async() => {
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
  }

  useEffect(() => {
    
    liveupdate()
  
  }, [])
  
  const {useraccount} = useSelector((store) => store.user)
  const dispatch = useDispatch()
  
  const [userdata, setUserData] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [refresh, setRefresh] = useState(false)
  const navigation = useNavigation();

  
  useEffect(() => {
    
    getUserData()
  }, [searchTerm])

  const getUserData = async() => {
    try {
      let result = await dbremoteAccounts.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.rows) {
        let modifiedArr = result.rows.map(item => item.doc);
        let filterUserData = modifiedArr.filter(item => item.FullName !== useraccount.FullName);
        let filterStatusData = filterUserData.filter(item => item.Status !== "active");
        let filteredData = filterStatusData.filter(item => {
          return item && (
            new RegExp(searchTerm, 'i').test(item.FullName) ||
            new RegExp(searchTerm, 'i').test(item.Address) ||
            new RegExp(searchTerm, 'i').test(item.Disability)
          )
        });
        if (filteredData.length) {
          let newFilteredData = filteredData.map(item => item);
          setUserData(newFilteredData);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

    const handleSearchChange = (event) => {
      setSearchTerm('');
    };

    const renderItem = ({item}) => {
        return (
          <Pressable style = {{width: '100%', height: 100, borderColor: LightBlue, borderBottomWidth: 1, justifyContent: 'center', alignSelf: 'center'}}
                onPress={() => {navigation.navigate("AdminApprovingForm"); dispatch(setApprovingAccoung(item))}}>
             <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', paddingVertical: 30}}>
              <Image style = {{width: 75, height: 75, marginRight: 15,marginLeft: 15, borderRadius: 20}} resizeMode='cover' source={{uri: item?.Image}} />
              <View style = {{flexDirection: 'column', width: '75%'}}>
                  
                  <Text style={{ fontSize: 18, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '75%'}}>{item.FullName}</Text>
                  <Text style={{ fontSize: 15, color: White, fontFamily: 'Nexa-ExtraLight', width: '75%', marginVertical: 5}}>{item.Disability}</Text>
                  <Text style={{ fontSize: 12, color: White, fontFamily: 'Nexa-ExtraLight'}}>{item.CreationDate}</Text>
              </View>
            <Text style={{position: 'absolute',right: 20, fontSize: 12, color: 'red', fontFamily: 'cocogooese_semibold'}}>{item.Status}</Text>
            
            </View>
                </Pressable>

        );
       
      } 
      const refreshlist  = () => {
        setRefresh(true)
        getUserData()
        setRefresh(false)
  }


  return (
    <View style = {{backgroundColor: Black, flex: 1, justifyContent: 'center', alignItems: 'center',}}>
     <Text style={{ fontSize: 20, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '95%', marginVertical: 20}}>NEW APPLICATION</Text>
      <Loginbox
       placeholder = 'Search by name, status, disability...'
       name = 'close'
       onChangeText={(value) => setSearchTerm(value)}
       value={searchTerm}
       onPress={handleSearchChange}
      />
      <FlatList
        data={userdata}
        renderItem = {renderItem}
        keyExtractor = {item => item._id}
        refreshControl={
          <RefreshControl
          onRefresh={refreshlist}
          refreshing = {refresh}
          />}
      />
    </View>
  )
}

export default AdminLanding