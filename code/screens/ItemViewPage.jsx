import { View, Text } from 'react-native'
import React from 'react'
import Map from '../../maps/FullViewMap'
import MapboxGL from '@rnmapbox/maps'
import ItemViewMap from '../../maps/ItemViewMap'
import { Black } from '../../Assets/Colors/Colors'
import { Rating } from 'react-native-ratings'

const ItemView = () => {
  return (
    
    <View style = {{}}>
      <ItemViewMap/>
      <ItemView/>
    </View>
   
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1, 
    backgroundColor: '#f2f2f2'
  }


})

export default ItemView