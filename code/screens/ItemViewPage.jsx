import { View, StyleSheet } from 'react-native'
import React from 'react'
import MapboxGL from '@rnmapbox/maps'
import ItemViewMap from '../maps/ItemViewMap'
import ItemView from '../components/ItemView'

const ItemViewPage = () => {
  return (
    
    <View style = {{flex: 1, justifyContent: 'center', alignContent: 'center',}}>
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

export default ItemViewPage