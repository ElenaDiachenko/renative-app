import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { shallow } from 'zustand/shallow';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useStore } from '../stores/store';
import * as Screens from '../screens';

import {
  AuthStackParamList,
  DrawerParamList,
  HomeStackNavigatorParamList,
} from './types';
import { DrawerMenu } from '../components';

const Drawer = createDrawerNavigator<DrawerParamList>();
const MainStack = createStackNavigator<HomeStackNavigatorParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNav = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Screens.LoginScreen} />
      <AuthStack.Screen name="Register" component={Screens.RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        overlayColor: 'transparent',
      }}
    >
      <Drawer.Screen name="Home" component={Screens.HomeScreen} />
      <Drawer.Screen name="Library" component={Screens.LibraryScreen} />
      <Drawer.Screen name="Filters" component={Screens.FiltersScreen} />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  const user = true;

  // const { user } = useStore(
  //   (state) => ({
  //     user: state.authUser,
  //   }),
  //   shallow,
  // );

  return (
    <NavigationContainer>
      {user ? (
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <MainStack.Screen name="Main" component={DrawerNav} />
          <MainStack.Screen name="Details" component={Screens.DetailsScreen} />
          <MainStack.Screen name="Video" component={Screens.VideoScreen} />
        </MainStack.Navigator>
      ) : (
        <AuthNav />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
