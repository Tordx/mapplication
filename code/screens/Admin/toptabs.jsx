import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AdminCommentList from './Tabs/AdminCommentList';
import AdminLanding from './Tabs/AdminLanding';
import { Black, LightYellow, White } from '../../Assets/Colors/Colors';
import ActiveUsers from './Tabs/ActiveUsers';
import AdminAccount from './Tabs/AdminAccount';
import { View,Text } from 'react-native';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { exitApp } from '../bottomtabs';



function Toptabs() {

    const Tab = createMaterialTopTabNavigator();

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
        <View style = {{backgroundColor: Black, width: '100%', height: 35}}>
        <Text style = {{paddingLeft: 20, color: White, fontSize: 20, fontFamily: 'Nexa-Heavy', top: 10, alignSelf: 'flex-start'}}>ADMIN DASH</Text>
        </View>
        <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: { backgroundColor: Black },
          tabStyle: { height: 50 },
          labelStyle: { fontSize: 22 },
          activeTintColor: LightYellow,
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="AdminLanding"
          component={AdminLanding}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name={focused ? "pencil-square-o": 'pencil-square'} size={21} color={color} />
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
              <FontAwesome name={focused ? "star-o": 'star'} size={21} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AdminAccount"
          component={AdminAccount}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name={focused ? "user-circle-o": 'user-circle'} size={21} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      </>
      );
}

export default Toptabs;