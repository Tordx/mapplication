import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AdminCommentList from './Tabs/AdminCommentList';
import AdminLanding from './Tabs/AdminLanding';
import { Black, DarkYellow, LightYellow, White } from '../../Assets/Colors/Colors';
import ActiveUsers from './Tabs/ActiveUsers';
import AdminAccount from './Tabs/AdminAccount';
import { View,Text } from 'react-native';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { exitApp } from '../bottomtabs';
import { useColorScheme } from 'react-native';



function Toptabs() {

    const Tab = createMaterialTopTabNavigator();
    const colorScheme = useColorScheme() === 'dark';
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
        <View style = {{backgroundColor:  colorScheme ? Black : White, width: '100%', height: 40}}>
        <Text style = {{paddingLeft: 20, color:  colorScheme ? White : Black, fontSize: 20, fontFamily: 'Nexa-Heavy', top: 10, alignSelf: 'flex-start'}}>ADMIN DASHBOARD</Text>
        </View>
        <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: { backgroundColor:  colorScheme ? Black : White, bottomBorderWidth: 0 },
          tabStyle: { height: 50,},
          labelStyle: { fontSize: 22 },
          activeTintColor:  colorScheme ? LightYellow : DarkYellow,
          
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="AdminLanding"
          component={AdminLanding}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name={focused ? "pencil-square-o": 'pencil-square'} size={22} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ActiveUsers"
          component={ActiveUsers}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name={focused ? "vcard-o": 'vcard'} size={21} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AdminCommentList"
          component={AdminCommentList}
          options={{
            tabBarIcon: ({ color,focused }) => (
              <FontAwesome name={focused ? "star-o": 'star'} size={22} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AdminAccount"
          component={AdminAccount}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name={focused ? "user-circle-o": 'user-circle'} size={22} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      </>
      );
}

export default Toptabs;