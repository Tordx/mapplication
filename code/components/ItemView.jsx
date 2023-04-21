import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Black, LightYellow, White } from '../Assets/Colors/Colors';
import { useSelector } from 'react-redux';
import Comments, { Ratings } from './Comments';
import { Modal } from 'react-native';

export default function ItemView() {

    const { ItemList } = useSelector((action) => action.items)
    const [modal, setModal] = useState(false)
    
    const dividedRating = ItemList.RatingCount === 0 ?  0 : Math.min(ItemList.Rating / ItemList.RatingCount, 5) 
    const dividedParking = ItemList.RatingCount === 0 ?   0 : Math.min(ItemList.ParkingRating / ItemList.RatingCount, 5)
    const divideRampRating = ItemList.RatingCount === 0 ?  0 : Math.min(ItemList.RampRating / ItemList.RatingCount, 5)
    const dividedTactilesRating = ItemList.RatingCount === 0 ?  0 :Math.min(ItemList.TactilesRating / ItemList.RatingCount, 5)
    const divideEstablishmentRating = ItemList.RatingCount === 0 ?  0 :Math.min(ItemList.EstablishmentRating / ItemList.RatingCount, 5) 
    
    const [rating] = useState(dividedRating)
    const [parking] = useState(dividedParking)
    const [ramp] = useState(divideRampRating)
    const [tactiles] = useState(dividedTactilesRating)
    const [establishment] = useState(divideEstablishmentRating)

  

  return (
    <View style = {{width: '100%', height: '65%', backgroundColor: Black, borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0}}>
      <View style = {{position: 'absolute', top: 10, left: 10, margin: 10, justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', flexDirection: 'column'}}>
      <Text style={{ fontSize: 30, color: White, fontFamily: 'Nexa-Heavy', width: '100%', marginBottom: 10,}}>{ItemList.Establishment}</Text>
      
      <Pressable onPress = {() => {setModal(true); console.log('pressed')}}
      >
        <Rating
        startingValue={rating}
        readonly
        tintColor = {Black}
        jumpValue = {0.5}
        ratingColor= '#ffdd85'
        />
      
      <Text  style={{ fontSize: 15, color: White, fontFamily: 'Nexa-ExtraLight', width: '100%', marginVertical: 10}}>Overall Rating: {ItemList.RatingCount === 0 ? 0 : Number(rating.toFixed(2))}</Text></Pressable>
      </View>
      <View style = {{width: '100%', marginTop: '40%'}}>
      <Comments/>
      </View>
        <Modal 
          animationType='slide'
          transparent
          visible = {modal}
          onRequestClose={() => setModal(false)}
        
        >
          <View style = {{width: '100%', height: '100%', justifyContent: 'center', backgroundColor: Black}}>
          <Text style={{fontSize: 20, color: White, textAlign: 'center', alignSelf: 'center', fontFamily: 'Nexa-ExtraLight'}}><Text style = {{color: LightYellow, fontFamily: 'Nexa-Heavy'}}>{ItemList.Establishment}</Text> earns a total of </Text>
          <View style = {{alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 100, color: LightYellow, textAlign: 'center', alignSelf: 'center', fontFamily: 'Nexa-Heavy'}}>{ItemList.RatingCount === 0 ? 0 : Number(rating.toFixed(2))}</Text>
          <Text style = {{color: LightYellow, textAlign: 'center', fontFamily: 'Nexa-Heavy', fontSize: 60,}}>★</Text>
          </View>
          <Text style={{fontSize: 20, color: White, textAlign: 'center', alignSelf: 'center', fontFamily: 'Nexa-ExtraLight'}}>in <Text style = {{color: LightYellow, fontFamily: 'Nexa-Heavy'}}>{ItemList.RatingCount}</Text> reviews</Text>
              <Ratings
            startingValue = {establishment}
            title = 'establishment'
            readonly
            result = {ItemList.establishmentRating  === 0 ? 0: Number(establishment.toFixed(2))}
            />
            <Ratings
            startingValue = {parking}
            title = 'Parking'
            readonly
            result = {ItemList.ParkingRating === 0 ? 0: Number(parking.toFixed(2))}
            />
            <Ratings
            startingValue = {ramp}
            title = 'Ramp'
            readonly
            result = {ItemList.RampRating  === 0 ? 0:  Number(ramp.toFixed(2))}
            />
            <Ratings
            startingValue = {tactiles}
            title = 'Tactiles'
            readonly
            result = {ItemList.TactilesRating  === 0 ? 0: Number(tactiles.toFixed(2))}
            />
          </View>
        </Modal>
      </View>

  )
}