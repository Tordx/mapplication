import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Black } from '../Assets/Colors/Colors';

export default function ItemView() {

    const [rating, setRating] = useState(3.5)

  return (
    <View style = {{width: '100%', height: '60%', backgroundColor: Black, borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0}}>
        <Rating
        
        startingValue={rating}
        readonly
        tintColor = {Black}
        jumpValue = {0.5}
        />

      </View>

  )
}