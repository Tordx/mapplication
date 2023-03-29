import { View, StatusBar } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Map from '../maps/maps'
import AccountTab from './Tabs/AccountTab'
import CommentTab from './Tabs/CommentTab'
import MyLocation from './Tabs/MyLocation'
import DirectionsTab from './Tabs/DirectionsTab'


const BottomTabs = () => {

    const Tab = createBottomTabNavigator();

  return (
    <>
    <StatusBar
        hidden = {false}
    />
    <Tab.Navigator
    initialRouteName='Map'
    screenOptions={({route}) => ({

        tabBarShowLabel: false,
        tabBarLabelStyle: {

            justifyContent: 'center',
            alignItems: 'center',
        
        },
        tabBarStyle: { 
            
            borderRadius: 15,
            position: 'absolute',
            bottom: 30,
            height: 70,
            marginHorizontal: 15,
            backgroundColor: '#9ad9fd',

        },
    })}>
        <Tab.Screen 
        name = 'Comment' 
        component={CommentTab}  
        options =  {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <Icon
                name = 'star'
                size = {focused? 45: 40}
                color = {focused? '#fff7ab' : 'grey'}

            />
        )
        }} />
        <Tab.Screen 
        
        name = 'Map' 
        component={Map} 
        options = {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <Icon
                name = 'language'
                size = {focused? 45: 40}
                color = {focused? '#fff7ab' : 'grey'}

            />
        )
        }} />
        <Tab.Screen 

        name = 'DirectionTab' 
        component= {DirectionsTab}
        options =  {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <View style = {{top: -20}}>
            <Icon
                name = 'near-me'
                size = {focused? 70: 65}
                color = {focused? '#9b282b' : 'grey'}

            />
            </View>
        ),
        }} />
        <Tab.Screen 

        name = 'MyLocation' 
        component={MyLocation}  
        
        
        options =  {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <Icon
                name = 'location-on'
                size = {focused? 45: 40}
                color = {focused? '#fff7ab' : 'grey'}

            />
        )
        }} />
        <Tab.Screen 

        name = 'Account' 
        component={AccountTab}
        options =  {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <Icon
                name = 'person'
                size = {focused? 45: 40}
                color = {focused? '#fff7ab' : 'grey'}

            />
        )
         }} />
    </Tab.Navigator>
    </>
  )
}

export default BottomTabs