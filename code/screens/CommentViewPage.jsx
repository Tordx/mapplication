import { View, Text, Image, Pressable, ScrollView, Modal, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Black, LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
import { Ratings } from '../components/Comments';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export default function CommentViewPage() {

    const colorScheme =  useColorScheme() === 'dark';
    const {userview} = useSelector((action) => action.user)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const navigation = useNavigation();

    const handleImagePress = (index) => {
      setSelectedImageIndex(index);
      setModalVisible(true);
    };
  
    const handleNextPress = () => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % userview.ImageAttachment.length);
    };
  
    const handlePrevPress = () => {
      setSelectedImageIndex((prevIndex) => (prevIndex + userview.ImageAttachment.length - 1) % userview.ImageAttachment.length);
      console.log()
    };

    let fullName = userview.FullName;
    let lastLetter = fullName.charAt(fullName.length - 1);
    let fullNameWithApostrophe;

    if (lastLetter === 's') {
      fullNameWithApostrophe = fullName + "'";
    } else {
      fullNameWithApostrophe = fullName + "'s";
    }

  return (
    <View style ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme ? Black: White}}>
        <ScrollView style = {{width: '100%', height: '100%', backgroundColor: colorScheme ? Black: White}}>
            <View style ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Image style = {{width: 150, height: 150, borderRadius: 50, marginVertical: 20}} resizeMode='contain' source={{uri: userview.Image}} />
          <Text style = {{ fontSize: 30, color:  colorScheme ? White : Black, fontFamily: 'Nexa-ExtraLight', justifyContent: 'center', alignItems: 'center', textAlign: 'left', marginBottom: 10}}>{fullNameWithApostrophe}</Text>
          <Text style={{fontSize: 20, color:  colorScheme ? White : Black, textAlign: 'center', alignSelf: 'center', fontFamily: 'Nexa-ExtraLight'}}>Overall review in <Text style = {{color: LightYellow, fontFamily: 'Nexa-Heavy'}}> {userview.CommentID}</Text></Text>
          <View style = {{alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 100, color: LightYellow, textAlign: 'center', alignSelf: 'center', fontFamily: 'Nexa-Heavy'}}>{Number(userview.Rating.toFixed(2))}</Text>
          <Text style = {{color: LightYellow, textAlign: 'center', fontFamily: 'Nexa-Heavy', fontSize: 60,}}>★</Text>
          </View>
          <View  style = {{ fontSize: 20, color: colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'center', marginBottom: 20, width: '95%', borderWidth: 1, borderColor: LightBlue, padding: 10, borderRadius: 20}}>
          <Text style = {{ fontSize: 16, color: LightBlue, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 10}}>Comment</Text>
          <Text style = {{ fontSize: 20, color:  colorScheme ? White : Black, fontFamily: 'Nexa-Heavy', textAlign: 'center', width: '100%', padding: 10}}>{userview.Text}</Text>
          </View>
            <Ratings
            startingValue = {userview.EstablishmentRating}
            title = 'Establishment'
            readonly
            result = {Number(userview.EstablishmentRating?.toFixed(2))}
            imageSize = {25}
            tintColor = {colorScheme ? Black: White}
            />
            <Ratings
            startingValue = {userview.ParkingRating}
            title = 'Parking'
            readonly
            result = {Number(userview.ParkingRating?.toFixed(2))}
            imageSize = {25}
            tintColor = {colorScheme ? Black: White}
            />
            <Ratings
            startingValue = {userview.RampRating}
            title = 'Ramp'
            readonly
            result = {Number(userview.RampRating?.toFixed(2))}
            imageSize = {25}
            tintColor = {colorScheme ? Black: White}
            />
            <Ratings
            startingValue = {userview.TactilesRating}
            title = 'Tactiles'
            readonly
            result = {Number(userview.TactilesRating?.toFixed(2))}
            imageSize = {25}
            tintColor = {colorScheme ? Black: White}
            />
             <View style ={{width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 20}}>
            {userview.ImageAttachment?.map((imageLink, index) => (
              <TouchableOpacity 
              onPress={() => handleImagePress(index)}
              style = {{justifyContent: 'center', alignSelf: 'center', margin: 10, width: 100, height: 100, borderWidth: 2, alignItems: 'center', borderRadius: 20, borderColor: LightYellow}}>
              <Image key={index} source={{ uri: imageLink }} style={{  borderRadius: 20, width: 96, height: 96 }} />
            </TouchableOpacity>
            ))}
            </View>
          </View>    
        </ScrollView>
        <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 40, right: 20 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
          <ImageBackground source={{ uri: userview.ImageAttachment[selectedImageIndex] }} style={{ width: '100%', height: '80%', resizeMode: 'contain' }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, position: 'absolute', bottom: 40, left: 0, right: 0 }}>
            <Pressable  onPress={handlePrevPress}>
              <Icon name  = 'arrow-left' color={White} size={50}/>
            </Pressable>
            <Pressable onPress={handleNextPress}>
            <Icon name  = 'arrow-right' color={White} size={50}/>
            </Pressable>
          </View>
          </ImageBackground>
        </View>
      </Modal>
      <Pressable style = {{position: 'absolute', top: 15, left: 15}}
        onPress={() => navigation.goBack('CommentTab')}
      >
        <Icon
          name='keyboard-arrow-left'
          size={50}
          color={ colorScheme ? White : Black}
        />
      </Pressable>
    </View>
  )
}