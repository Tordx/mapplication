import { View, Text, Modal } from 'react-native'
import React from 'react'


const SetAccount = () => {
  return (
    <Modal
        visible = {props.visible}
    >
        <View style = {{flex: 1}}>
            <Text>HELLO</Text>
        </View>
    </Modal>
  )
}

export default SetAccount