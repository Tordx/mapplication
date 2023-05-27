import { View, Text , Image , Button , Alert , Pressable } from 'react-native'
import React , {useState} from 'react'
import { Loginbox } from '../loginPage'
import { useSelector } from 'react-redux'
import { dbremoteAccounts } from '../../../database/database'
import { useNavigation } from '@react-navigation/native'
import { launchImageLibrary } from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob';
import { ScrollView } from 'react-native-gesture-handler'
import { Black, LightBlue, LightYellow, White } from '../../Assets/Colors/Colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { Modal } from 'react-native'
import { countries } from '../../Assets/Countries'
import { useColorScheme } from 'react-native'



const AdminApprovingForm = () => {

    const {useraccount} = useSelector((store) => store.user)
    const {approvingaccount} = useSelector((store) => store.user)
    const colorScheme = useColorScheme() === 'dark';
    const [id, setID] = useState(approvingaccount._id)
    const [rev, setRev] = useState(approvingaccount._rev)
    const [username, setUsername] = useState(approvingaccount.username)
    const [password, setPassword] = useState(approvingaccount.password)
    const [MobileNumber, setMobileNumber] = useState(approvingaccount.MobileNumber)
    const [Nationality, setNationality] = useState(approvingaccount.Nationality)
    const [Disability, setDisability] = useState(approvingaccount.Disability)
    const [IDNumber, setIDNumber] = useState(approvingaccount.IDNumber)
    const [UserID, setUserID] = useState(approvingaccount.UserID)
    const [FirstName, setFirstName] = useState(approvingaccount.FirstName)
    const [MiddleName, setMiddleName] = useState(approvingaccount.MiddleName)
    const [LastName, setLastName] = useState(approvingaccount.LastName)
    const [Birthday, setBirthday] = useState(approvingaccount.Birthday)
    const [Sex, setSex] = useState(approvingaccount.Sex)
    const [Address, setAddress] = useState(approvingaccount.Address)
    const [AlternateContactNumber, setAlternateContactNumber] = useState(approvingaccount.AlternateContactNumber)
    const [userType] = useState(approvingaccount.userType)
    const [userstatus, setUserStatus] = useState(approvingaccount.Status)
    const [ProfilephotoDisplay, setProfilePhotoDisplay] = useState(approvingaccount.Image);
    const [IdcardimageDisplay, setIdCardImageDisplay] = useState(approvingaccount.Idcardimage);
    const [ViewID, setViewID] = useState(false);
    const [viewProfile, setViewProfile] = useState(false);
    const [CreationDate] = useState(approvingaccount.CreationDate)
    const [CommentCount] = useState(approvingaccount.CommentCount)
    

    const navigation = useNavigation()

    const handleProfilePhoto = async() => {

        launchImageLibrary({ noData: true }, async(response) => {
          console.log('response');
          console.log(response);
          console.log('response');
          // console.log(response);
          if (response) {
            const datapic = response
            const piclocation = datapic.assets[0].uri
            setProfilePhotoDisplay(piclocation)
            // setPhoto(response);
            try {
              const data = await RNFetchBlob.fs.readFile(datapic.assets[0].uri, 'base64');
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
              const photolink = result.data.link
              setProfilePhotoDisplay(photolink)
              console.log('photolink', photolink);
            } catch (error) {
              console.log('error', error);
            }
          }
        });
      };

      const handleIDCardImage = async() => {

        launchImageLibrary({ noData: true }, async(response) => {
          // console.log(response);
          if (response) {
            const datapic = response
            const piclocation = datapic.assets[0].uri
            setIdCardImageDisplay(piclocation)
            // setPhoto(response);
            try {
              const data = await RNFetchBlob.fs.readFile(datapic.assets[0].uri, 'base64');
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
              const photolink = result.data.link
              setIdCardImageDisplay(photolink)
              console.log('photolink', photolink);
            } catch (error) {
              console.log('error', error);
            }
          }
        });
      };

    const ApproveUser = async () => {
      
        try {
          var adduser = {
              _id: id,
              _rev: rev,
              username : username,
              password : password,
              MobileNumber : MobileNumber,
              Nationality : Nationality,
              Disability : Disability,
              IDNumber : IDNumber,
              UserID: UserID,
              FullName: FirstName + ' ' + MiddleName + ' ' + LastName,
              FirstName : FirstName,
              MiddleName : MiddleName,
              LastName : LastName,
              Birthday : Birthday,
              Sex : Sex,
              Address : Address,
              AlternateContactNumber : AlternateContactNumber,
              Image: ProfilephotoDisplay,
              Idcardimage: IdcardimageDisplay,
              userType: userType,
              Status: userstatus,
              CreationDate: CreationDate,
              CommentCount: CommentCount,
          }
       dbremoteAccounts.put(adduser)
          .then((response) =>{
            Alert.alert('Saved changes!')
            console.log(response)
            navigation.navigate('Toptabs')
 
          })
          .catch(err=>console.log(err))
          
        } catch (error) {
         console.log(error)
        }
       }
  return (
    <ScrollView style = {{flex: 1}}>
    <View style={{backgroundColor:  colorScheme ? Black : White, justifyContent: 'center' , alignItems: 'center' , flex: 1}}> 
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
            <Pressable onPress={() => setViewProfile(true)} style = {{justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
            <Image source={{uri: ProfilephotoDisplay}} style={{ width: 150, height: 150 , margin: 5, borderRadius: 300 }} resizeMode='cover'/>
            <FontAwesome style={{position: 'absolute',}} name = 'search' size = {30}  />
            </Pressable>
            <Pressable onPress={() => handleProfilePhoto()}>
              <FontAwesome name = 'edit' size={30} color={'red'} />
            </Pressable>
       </View>   
       <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Username</Text>
       <View style = {{width: '95%', height: 60, justifyContent: 'center', alignItems: 'center', borderColor: LightBlue, borderWidth: 2, borderRadius: 20,  margin: 5, flexDirection: 'row'}}>
        <Text style={{width: '100%', fontSize: 18, margin: 5, paddingLeft: 20, color:  colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight'}}>{username}</Text>
       </View>
       <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Password</Text>
       {password === Birthday ? 
       <View
       style = {{width: '50%', height: 60, justifyContent: 'center', alignItems: 'center', borderColor: LightYellow,borderWidth: 2, borderRadius: 20,  margin: 5, flexDirection: 'row'}}
       >
        <FontAwesome name = 'check' size = {35} color = {'#90ee90'}/>
        <Text> Sumbit to make changes </Text>
       </View>  :  <Pressable 
        android_ripple={{color: 'gray', radius: 60}}  
        style = {{width: '50%', height: 60, justifyContent: 'center', alignItems: 'center', borderColor: LightYellow,borderWidth: 2, borderRadius: 20,  margin: 5, flexDirection: 'row'}}
        onLongPress={() => {setPassword(Birthday); Alert.alert("Reset Request", "user's password is now set to its birthday")}}>
        <Text style={{width: '100%', fontSize: 15, margin: 5, color: LightYellow, fontFamily: 'Nexa-Heavy', textAlign: 'center'}}>{"RESET PASSWORD"}</Text>
        </Pressable>}
         <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>First Name</Text>
         <Loginbox 
          placeholder = 'FirstName' 
          onChangeText={(value) => setFirstName(value)}
          value={FirstName}
        />
         <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Middle Name</Text>
        <Loginbox 
          placeholder = 'MiddleName' 
          onChangeText={(value) => setMiddleName(value)}
          value={MiddleName}
        />
         <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Last Name</Text>
        <Loginbox 
          placeholder = 'LastName' 
          onChangeText={(value) => setLastName(value)}
          value={LastName}
        />
         <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Birthdate</Text>
        <Loginbox 
          placeholder = 'Birthdate' 
          onChangeText={(value) => setBirthday(value)}
          value={Birthday}
        />
         <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Sex/Gender</Text>
        <Loginbox 
          placeholder = 'Sex/Gender' 
          onChangeText={(value) => setSex(value)}
          value={Sex}
        />
        <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Address</Text>
        <Loginbox 
        placeholder = 'Address' 
        onChangeText={(value) => setAddress(value)}
        value={Address}
        />
        <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Mobile Number</Text>
        <Loginbox 
          placeholder = 'MobileNumber' 
          onChangeText={(value) => setMobileNumber(value)}
          value={MobileNumber}
        />
        <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Alternate Number</Text>
        <Loginbox 
        placeholder = 'Alternate Contact Number' 
        onChangeText={(value) => setAlternateContactNumber(value)}
        value={AlternateContactNumber}
        />
        <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Nationality</Text>
        <View style = {{width: '95%', justifyContent: 'center', alignItems: 'center', borderColor: LightBlue, borderWidth: 2, borderRadius: 20,  margin: 5, flexDirection: 'row'}}>
                <Picker
                  itemStyle = {{fontFamily:'Nexa-ExtraLight'}}
                  style={{width: '100%', fontSize: 18, margin: 5, paddingLeft: 20, color:  colorScheme ? White : Black}}
                  selectedValue={Nationality}
                  value = {Nationality}
                  onValueChange={(itemValue, itemIndex) => setNationality(itemValue)}
                  
                >
                    {countries.map((country) => (
                      <Picker.Item key={country.id} label={country.name} value={country.id} />
                    ))}
                </Picker>
              </View>
        <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>Disability</Text>
         <Loginbox 
          placeholder = 'Disability' 
          onChangeText={(value) => setDisability(value)}
          value={Disability}
        />
        <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>ID Number</Text>
        <Loginbox 
        placeholder = 'IDNumber' 
        onChangeText={(value) => setIDNumber(value)}
        value={IDNumber}
         />
         <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
            <Pressable onPress={() => setViewID(true)} style = {{justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
            <Image source={{uri: IdcardimageDisplay}} style={{ width: 250, height: 150 , margin: 5, borderRadius: 20 }} resizeMode='cover'/>
            <FontAwesome style={{position: 'absolute',}} name = 'search' size = {30}  />
            </Pressable>
            <Pressable onPress={() => handleIDCardImage()}>
              <FontAwesome name = 'edit' size={30} color={'red'} />
            </Pressable>
       </View>
        <Text style={{ fontSize: 17, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'left',width: '93%', marginVertical: 5}}>User Status</Text>
        <View style = {{width: '95%', justifyContent: 'center', alignItems: 'center', borderColor: LightBlue, borderWidth: 2, borderRadius: 20,  margin: 5, flexDirection: 'row'}}>
        <Picker
          itemStyle = {{fontFamily:'Nexa-ExtraLight'}}
          style={{width: '100%', fontSize: 18, margin: 5, paddingLeft: 20, color:  colorScheme ? White : Black}}
          selectedValue={userstatus}
          value = {userstatus}
          onValueChange={(itemValue, itemIndex) => setUserStatus(itemValue)}
          
        >
          <Picker.Item label="Active" value="Active" /> 
          <Picker.Item label="Inactive" value="Inactive" />
          <Picker.Item label="Pending" value="Pending" />
        </Picker>
      </View>
        <Pressable style = {[styles.button, {width: '85%', borderColor: LightYellow}]}
          onPress={ApproveUser}>
             <FontAwesome
          name = 'check' size={20} color = {'#90ee90'}/>
            <Text style = {[styles.buttontext, {fontFamily: 'Nexa-Heavy', color: LightYellow}]}>Submit changes</Text>
          </Pressable>
    </View>
    <Modal
      transparent
      animationType='fade'
      visible = {viewProfile}
      onRequestClose={() => setViewProfile(false)}
    >
      <Pressable style = {{width: '100%', height: '100%', backgroundColor: '#00000099', justifyContent: 'center', alignItems: 'center',}}
      onPressOut={() => setViewProfile(false)}
      >
        <Image source={{uri: ProfilephotoDisplay}} resizeMode='contain' style = {{height: '100%', width: '100%'}} />
      </Pressable>
    </Modal>
    <Modal
      transparent
      animationType='fade'
      visible = {ViewID}
      onRequestClose={() => setViewID(false)}
    >
      <Pressable style = {{width: '100%', height: '100%', backgroundColor: '#00000099', justifyContent: 'center', alignItems: 'center',}}
      onPressOut={() => setViewID(false)}
      >
        <Image source={{uri: IdcardimageDisplay}} resizeMode='contain' style = {{height: '100%', width: '100%'}} />
      </Pressable>
    </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20, 
    height: 60, 
    width: '50%', 
    borderWidth: 1, 
    borderColor: White,  
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 5,
    marginTop: 20
},
})

export default AdminApprovingForm