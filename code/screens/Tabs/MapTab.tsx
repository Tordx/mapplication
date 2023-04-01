import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Map from '../../maps/FullViewMap'
import { dbremoteAccounts } from '../../../database/database';

type Props = {

    
}


const MapTab = (props: Props) => {



  return (
    <View>
    <Map/>
    </View>
  )
}

export default MapTab