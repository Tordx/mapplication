import { View, StatusBar } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Map from '../maps/FullViewMap'
import AccountTab from './Tabs/AccountTab'
import CommentTab from './Tabs/CommentTab'
import MyLocation from './Tabs/MyLocation'
import DirectionsTab from './Tabs/DirectionsTab'
import { Black, LightYellow, White } from '../Assets/Colors/Colors'
import HistoryTab from './Tabs/HistoryTab'
import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { useFocusEffect, useNavigationContainerRef } from '@react-navigation/native'

export const exitApp = () => {
    BackHandler.exitApp();
  };

const BottomTabs = () => {

    const Tab = createBottomTabNavigator();

    useFocusEffect(
        React.useCallback(() => {
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            exitApp
          );
    
          return () => backHandler.remove();
        }, [])
      );

  return (
    <>
    <Tab.Navigator
    initialRouteName='Comment'
    screenOptions={() => ({

        tabBarShowLabel: false,
        tabBarLabelStyle: {

            justifyContent: 'center',
            alignItems: 'center',
        
        },
        tabBarStyle: { 
            
            borderRadius: 20,
            position: 'absolute',
            bottom: 30,
            height: 70,
            marginHorizontal: 15,
            backgroundColor: Black,

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
                color = {focused? LightYellow : '#9999'}

            />
        )
        }} />
        <Tab.Screen 
        
        name = 'MyLocation' 
        component={MyLocation} 
        options = {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <Icon
                name = 'language'
                size = {focused? 45: 40}
                color = {focused? LightYellow : '#9999'}

            />
        )
        }} />
        <Tab.Screen 

        name = 'HistoryTab' 
        component={HistoryTab}  
        
        
        options =  {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <Icon
                name = 'history'
                size = {focused? 45: 40}
                color = {focused? LightYellow : '#9999'}

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
                color = {focused? LightYellow :  '#9999'}

            />
        )
         }} />
    </Tab.Navigator>
    </>
  )
}

export default BottomTabs