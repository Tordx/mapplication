import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Black, White } from '../Assets/Colors/Colors';
import { useSelector } from 'react-redux';
import Comments, { Ratings } from './Comments';
import { Modal } from 'react-native';

export default function ItemView() {

    const {ItemList} = useSelector((action) => action.items)
    const [modal, setModal] = useState(false)
    const dividedRating = Math.min(ItemList.Rating / ItemList.RatingCount, 5)
    const dividedParking = Math.min(ItemList.ParkingRating / ItemList.RatingCount, 5)
    const divideRampRating = Math.min(ItemList.RampRating / ItemList.RatingCount, 5)
    const dividedTactilesRating =  Math.min(ItemList.TactilesRating / ItemList.RatingCount, 5)
    const [rating] = useState(dividedRating)
    const [parking] = useState(dividedParking)
    const [ramp] = useState(divideRampRating)
    const [tactiles] = useState(dividedTactilesRating)
    console.log(ItemList)
    

  

  return (
    <View style = {{width: '100%', height: '65%', backgroundColor: Black, borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0}}>
      <View style = {{position: 'absolute', top: 10, left: 10, margin: 10, justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', flexDirection: 'column'}}>
      <Text style={{ fontSize: 30, color: White, fontFamily: 'Nexa-Heavy', width: '100%', marginBottom: 10}}>{ItemList.Establishment}</Text>
      <Pressable onPress = {() => setModal(true)}
      >
        <Rating
        startingValue={rating}
        readonly
        tintColor = {Black}
        jumpValue = {0.5}
        />
      </Pressable>
      <Text  style={{ fontSize: 15, color: White, fontFamily: 'Nexa-ExtraLight', width: '100%', marginVertical: 10}}>Current Rating: {Number(rating.toFixed(2))}</Text>
      </View>
      <Comments/>
        <Modal 
          animationType='slide'
          transparent
          visible = {modal}
          onRequestClose={() => setModal(false)}
        
        >
          <View style = {{width: '100%', height: '100%', backgroundColor: Black}}>
          <Ratings
            startingValue = {rating}
            title = 'Overall Rating'
            readonly
            result = {Number(rating.toFixed(2))}
            />
            <Ratings
            startingValue = {parking}
            title = 'Parking'
            readonly
            result = {Number(parking.toFixed(2))}
            />
            <Ratings
            startingValue = {ramp}
            title = 'Ramp'
            readonly
            result = {Number(ramp.toFixed(2))}
            />
            <Ratings
            startingValue = {tactiles}
            title = 'Tactiles'
            readonly
            result = {Number(tactiles.toFixed(2))}
            />
          </View>
        </Modal>
      </View>

  )
}