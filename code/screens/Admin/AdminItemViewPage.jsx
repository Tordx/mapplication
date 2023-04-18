import { View, Text } from 'react-native'
import React from 'react'
import AdminItemView from '../../components/AdminItemView'

export default function AdminItemViewPage() {
  return (
    <View style = {{flex: 1, justifyContent: 'center', alignContent: 'center',}}>
    <AdminItemView/>
  </View>
  )
}