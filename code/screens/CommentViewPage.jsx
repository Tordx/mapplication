import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Black, LightBlue, LightYellow, White } from '../Assets/Colors/Colors';
import { Ratings } from '../components/Comments';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

export default function CommentViewPage() {

    const {userview} = useSelector((action) => action.user)



  return (
    <View style ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Black}}>
        <ScrollView style = {{width: '100%', height: '100%', backgroundColor: Black}}>
            <View style ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Image style = {{width: 150, height: 150, borderRadius: 50, marginVertical: 20}} resizeMode='contain' source={require('../Assets/images/welcome-logo.png')} />
          <Text style = {{ fontSize: 30, color: White, fontFamily: 'Nexa-ExtraLight', justifyContent: 'center', alignItems: 'center', textAlign: 'left', marginBottom: 10}}>{userview.FullName}</Text>
          <View  style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'center', marginBottom: 20, width: '95%', borderWidth: 1, borderColor: LightBlue, padding: 10, borderRadius: 20}}>
          <Text style = {{ fontSize: 16, color: LightBlue, fontFamily: 'Nexa-ExtraLight', textAlign: 'center', marginBottom: 10}}>comment</Text>
          <Text style = {{ fontSize: 20, color: White, fontFamily: 'Nexa-Heavy', textAlign: 'center', width: '100%', padding: 10}}>{userview.Text}</Text>
          </View>
          <Text style={{fontSize: 25, color: White, textAlign: 'left', alignSelf: 'flex-start', paddingLeft: 20, fontFamily: 'Nexa-Heavy'}}>Overall Rating</Text>
          <Text style={{fontSize: 50, color: LightYellow, textAlign: 'left', alignSelf: 'flex-start', paddingLeft: 20, fontFamily: 'Nexa-Heavy'}}>{userview.Rating} ★</Text>
         
              <Ratings
            startingValue = {userview.EstablishmentRating}
            title = 'Establishment'
            readonly
            result = {Number(userview.EstablishmentRating?.toFixed(2))}
            />
            <Ratings
            startingValue = {userview.ParkingRating}
            title = 'Parking'
            readonly
            result = {Number(userview.ParkingRating?.toFixed(2))}
            />
            <Ratings
            startingValue = {userview.RampRating}
            title = 'Ramp'
            readonly
            result = {Number(userview.RampRating?.toFixed(2))}
            />
            <Ratings
            startingValue = {userview.TactilesRating}
            title = 'Tactiles'
            readonly
            result = {Number(userview.TactilesRating?.toFixed(2))}
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
          </View>    
        </ScrollView>
    </View>
  )
}