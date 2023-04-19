import { View, StatusBar } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
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
            
            height: 60,
            backgroundColor: Black,
            elevation: 10,
            borderRadius: 20,
            position: 'absolute',
            bottom: 20,
            marginHorizontal: 10,
            shadowColor: '#101010'

        },
    })}>
        <Tab.Screen 
        name = 'Comment' 
        component={CommentTab}  
        options =  {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <FontAwesome
                name = {focused? 'star-o': 'star'}
                size = {30}
                color = {focused? LightYellow : '#9999'}

            />
        )
        }} />
        <Tab.Screen 
        
        name = 'MyLocation' 
        component={MyLocation} 
        options = {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <FontAwesome5
                name = {focused? 'globe-asia':'globe-americas'}
                size = {30}
                color = {focused? LightYellow : '#9999'}

            />
        )
        }} />
        <Tab.Screen 

        name = 'HistoryTab' 
        component={HistoryTab}  
        
        
        options =  {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <FontAwesome
            name = {focused? 'folder-open-o':'folder-open'}
                size = {30}
                color = {focused? LightYellow : '#9999'}

            />
        )
        }} />
        <Tab.Screen 

        name = 'Account' 
        component={AccountTab}
        options =  {{headerShown: false,
        tabBarIcon: ({focused}) => (
            <FontAwesome
                name =  {focused ? 'user-circle-o' : 'user-circle'}
                size = {30  }
                color = {focused? LightYellow :  '#9999'}

            />
        )
         }} />
    </Tab.Navigator>
    </>
  )
}

export default BottomTabs