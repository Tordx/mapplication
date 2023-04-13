import { View, Text , Image } from 'react-native'
import React , {useState} from 'react'
import { Loginbox } from '../loginPage'
import { useSelector } from 'react-redux'


const AdminApprovingForm = () => {

    const {useraccount} = useSelector((store) => store.user)

    const [username, setUsername] = useState(useraccount.username)
    const [password, setPassword] = useState(useraccount.password)
    const [MobileNumber, setMobileNumber] = useState(useraccount.MobileNumber)
    const [Nationality, setNationality] = useState(useraccount.Nationality)
    const [IDType, setIDType] = useState(useraccount.IDType)
    const [IDNumber, setIDNumber] = useState(useraccount.IDNumber)
    const [Profilephoto, setProfilePhoto] = useState(useraccount.Profilephoto)
    const [Idcardimage, setIdCardImage] = useState(useraccount.Idcardimage)
    const [FirstName, setFirstName] = useState(useraccount.FirstName)
    const [MiddleName, setMiddleName] = useState(useraccount.MiddleName)
    const [LastName, setLastName] = useState(useraccount.LastName)
    const [Birthday, setBirthday] = useState(useraccount.Birthday)
    const [Sex, setSex] = useState(useraccount.Sex)
    const [Address, setAddress] = useState(useraccount.Address)
    const [AlternateContactNumber, setAlternateContactNumber] = useState(useraccount.AlternateContactNumber)
    const [userstatus, setUserStatus] = useState('')

    console.log('===================================useraccount.Profilephoto=');
    console.log(useraccount.Profilephoto);
    console.log('==================================useraccount.Profilephoto==');

    console.log('===================================useraccount.Idcardimage=');
    console.log(useraccount.Idcardimage);
    console.log('==================================useraccount.Idcardimage==');
  return (

    <View style={{backgroundColor: "black" , justifyContent: 'center' , alignItems: 'center' , flex: 1}}> 
        <View style={{flexDirection: 'row'}}>
            <Image source={{uri: Profilephoto}} style={{ width: 100, height: 100 , margin: 5 }} resizeMode='cover'/>
            <Image source={{uri: Idcardimage}} style={{ width: 100, height: 100 , margin: 5 }} resizeMode='cover'/>
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
          placeholder = 'IDType' 
          onChangeText={(value) => setIDType(value)}
          value={IDType}
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
    </View>
  )
}

export default AdminApprovingForm