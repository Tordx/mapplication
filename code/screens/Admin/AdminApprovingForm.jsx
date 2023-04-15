import { View, Text , Image , Button , Alert , Pressable } from 'react-native'
import React , {useState} from 'react'
import { Loginbox } from '../loginPage'
import { useSelector } from 'react-redux'
import { dbremoteAccounts } from '../../../database/database'
import { useNavigation } from '@react-navigation/native'
import { launchImageLibrary } from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob';



const AdminApprovingForm = () => {

    const {useraccount} = useSelector((store) => store.user)
    const {approvingaccount} = useSelector((store) => store.user)


    const [id, setID] = useState(approvingaccount._id)
    const [rev, setRev] = useState(approvingaccount._rev)
    const [username, setUsername] = useState(approvingaccount.username)
    const [password, setPassword] = useState(approvingaccount.password)
    const [MobileNumber, setMobileNumber] = useState(approvingaccount.MobileNumber)
    const [Nationality, setNationality] = useState(approvingaccount.Nationality)
    const [Disability, setDisability] = useState(approvingaccount.Disability)
    // const [IDType, setIDType] = useState(approvingaccount.IDType)
    const [IDNumber, setIDNumber] = useState(approvingaccount.IDNumber)
    const [Profilephoto, setProfilePhoto] = useState(approvingaccount.Profilephoto)
    const [Idcardimage, setIdCardImage] = useState(approvingaccount.Idcardimage)
    const [UserID, setUserID] = useState(approvingaccount.UserID)
    // const [FullName, setFullName] = useState(approvingaccount.FullName)
    const [FirstName, setFirstName] = useState(approvingaccount.FirstName)
    const [MiddleName, setMiddleName] = useState(approvingaccount.MiddleName)
    const [LastName, setLastName] = useState(approvingaccount.LastName)
    const [Birthday, setBirthday] = useState(approvingaccount.Birthday)
    const [Sex, setSex] = useState(approvingaccount.Sex)
    const [Address, setAddress] = useState(approvingaccount.Address)
    const [AlternateContactNumber, setAlternateContactNumber] = useState(approvingaccount.AlternateContactNumber)
    const [account, setAccount] = useState(approvingaccount.Account)
    const [userstatus, setUserStatus] = useState(approvingaccount.Status)
    const [ProfilephotoDisplay, setProfilePhotoDisplay] = useState(approvingaccount.Profilephoto);
    const [IdcardimageDisplay, setIdCardImageDisplay] = useState(approvingaccount.Idcardimage);

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
              setProfilePhoto(photolink)
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
              setIdCardImage(photolink)
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
              Profilephoto: Profilephoto,
              Idcardimage: Idcardimage,
              Account: account,
              Status: userstatus
          }
       dbremoteAccounts.put(adduser)
          .then((response) =>{
            Alert.alert('Approve User!')
            console.log(response)
           //  SyncSuperAdmin()
            navigation.navigate('AdminLanding')
 
          })
          .catch(err=>console.log(err))
          
        } catch (error) {
         console.log(error)
        }
       }
  return (

    <View style={{backgroundColor: "black" , justifyContent: 'center' , alignItems: 'center' , flex: 1}}> 
        <View style={{flexDirection: 'row'}}>
            <Pressable onPress={() => handleProfilePhoto()}>
            <Image source={{uri: ProfilephotoDisplay}} style={{ width: 100, height: 100 , margin: 5 }} resizeMode='cover'/>
            </Pressable>
            <Pressable onPress={() => handleIDCardImage()}>
            <Image source={{uri: IdcardimageDisplay}} style={{ width: 100, height: 100 , margin: 5 }} resizeMode='cover'/>
            </Pressable>
       </View>   
           
       <Loginbox 
          placeholder = 'username' 
          onChangeText={(value) => setUsername(value)}
          value={username}
        />
        <Loginbox 
          placeholder = 'password' 
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <Loginbox 
          placeholder = 'MobileNumber' 
          onChangeText={(value) => setMobileNumber(value)}
          value={MobileNumber}
        />
        <Loginbox 
          placeholder = 'Nationality' 
          onChangeText={(value) => setNationality(value)}
          value={Nationality}
        />
         <Loginbox 
          placeholder = 'Disability' 
          onChangeText={(value) => setDisability(value)}
          value={Disability}
        /><Loginbox 
        placeholder = 'IDNumber' 
        onChangeText={(value) => setIDNumber(value)}
        value={IDNumber}
         />
        <Loginbox 
          placeholder = 'FirstName' 
          onChangeText={(value) => setFirstName(value)}
          value={FirstName}
        />
        <Loginbox 
          placeholder = 'MiddleName' 
          onChangeText={(value) => setMiddleName(value)}
          value={MiddleName}
        />
        <Loginbox 
          placeholder = 'LastName' 
          onChangeText={(value) => setLastName(value)}
          value={LastName}
        />
        <Loginbox 
          placeholder = 'Birthday' 
          onChangeText={(value) => setBirthday(value)}
          value={Birthday}
        />
        <Loginbox 
          placeholder = 'Sex' 
          onChangeText={(value) => setSex(value)}
          value={Sex}
        />
           <Loginbox 
          placeholder = 'Address' 
          onChangeText={(value) => setAddress(value)}
          value={Address}
        />
           <Loginbox 
          placeholder = 'AlternateContactNumber' 
          onChangeText={(value) => setAlternateContactNumber(value)}
          value={AlternateContactNumber}
        />
         <Loginbox 
          placeholder = 'Status' 
          onChangeText={(value) => setUserStatus(value)}
          value={userstatus}
        />
         <Button title='Approve User' onPress={ApproveUser}/>
    </View>
  )
}

export default AdminApprovingForm