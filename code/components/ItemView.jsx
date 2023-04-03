import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Black, White } from '../Assets/Colors/Colors';
import { useSelector } from 'react-redux';
import Comments from './Comments';

export default function ItemView() {

    const {ItemList} = useSelector((action) => action.items)
    const divdedRating = Math.min(ItemList.Rating / ItemList.RatingCount, 5)
    const [rating] = useState(divdedRating)

  

  return (
    <View style = {{width: '100%', height: '65%', backgroundColor: Black, borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0}}>
      <View style = {{position: 'absolute', top: 10, left: 10, margin: 10, justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', flexDirection: 'column'}}>
      <Text style={{ fontSize: 30, color: White, fontFamily: 'Nexa-Heavy', width: '100%', marginBottom: 10}}>{ItemList.Establishment}</Text>
        <Rating
        startingValue={rating}
        readonly
        tintColor = {Black}
        jumpValue = {0.5}
        />
      <Text  style={{ fontSize: 15, color: White, fontFamily: 'Nexa-ExtraLight', width: '100%', marginVertical: 10}}>Current Rating: {Number(rating.toFixed(2))}</Text>
      </View>
      <Comments/>
      </View>

  )
}