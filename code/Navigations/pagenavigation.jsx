import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../screens/welcome'
import Login from '../screens/loginPage'
import Signup from '../screens/signup'
import BottomTabs from '../screens/bottomtabs'
import ItemViewPage from '../screens/ItemViewPage'
import EditAccount from '../screens/EditAccount'
import { Provider } from 'react-redux'
import store from '../config/store'
import UserViewPage from '../screens/UserViewPage'
import CommentViewPage from '../screens/CommentViewPage'
import { CardStyleInterpolators } from '@react-navigation/stack';
import AdminApprovingForm from '../screens/Admin/AdminApprovingForm'
import toptabs from '../screens/Admin/toptabs'
import Toptabs from '../screens/Admin/toptabs'
import AdminItemViewPage from '../screens/Admin/AdminItemViewPage'
import AddLocation from '../screens/Admin/Addlocation'
import EditLocation from '../screens/Admin/Tabs/EditLocation'

const Page = createStackNavigator();

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
          <Page.Screen
            name="ItemViewPage"
            component={ItemViewPage}
            options={{ headerShown: false }}
          />
          <Page.Screen
            name="CommentViewPage"
            component={CommentViewPage}
            options={{ headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            
          />
          <Page.Screen
            name="UserViewPage"
            component={UserViewPage}
            options={{ headerShown: false }}
          />
          <Page.Screen
            name="EditAccount"
            component={EditAccount}
            options={{ headerShown: false }}
          />
          <Page.Screen
          name="Toptabs"
          component={Toptabs}
          options={{ headerShown: false }}
          />
          <Page.Screen
            name="AdminApprovingForm"
            component={AdminApprovingForm}
            options={{ headerShown: false }}
          />
          <Page.Screen 
            name = 'AdminItemViewPage'
            component = {AdminItemViewPage}
            options={{ headerShown: false }}
          />
          <Page.Screen 
            name = 'Addlocation'
            component = {AddLocation}
            options={{ headerShown: false }}
          />
          <Page.Screen 
            name = 'EditLocation'
            component = {EditLocation}
            options={{ headerShown: false }}
          />
        </Page.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default PageNavigation;