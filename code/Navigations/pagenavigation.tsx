import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../screens/welcome'
import Login from '../screens/loginPage'
import Signup from '../screens/signup'
import BottomTabs from '../screens/bottomtabs'
import { Provider } from 'react-redux'
import store from '../config/store'

export type AppStackParamList = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
  BottomTabs: {
    name: string,
  }
};

const Home = () => <View />;
const Notifications = () => <View />;
const Profile = () => <View />;
const Settings = () => <View />;


const Page = createStackNavigator<AppStackParamList>();

const PageNavigation = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Page.Navigator>
          <Page.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Page.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Page.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Page.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
        </Page.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default PageNavigation;