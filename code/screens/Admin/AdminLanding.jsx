import { View, Text , FlatList , Image , Pressable } from 'react-native'
import React , {useState , useEffect} from 'react'
import { dbremoteAccounts } from '../../../database/database'
import { useNavigation } from '@react-navigation/native'


const AdminLanding = () => {

  useEffect(() => {
    
    getUserData()

  }, [])
  
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
            setUserData(newFilterData)
          }
        }
      } catch (error) {
        console.error(error);
        console.log(error)
      }
    }

    const renderItem = ({item}) => {
        return (
        <Pressable onPress={() => {navigation.navigate('AdminApprovingForm')}}>
            <View style={{justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{fontSize: 25}}>
                    {item.FullName}
                </Text>
           </View> 
       </Pressable>
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