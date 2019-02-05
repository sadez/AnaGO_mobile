import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

// Author : Khalid Aoussar
// Date : 05/10/2018
// Desc : here we import the components that we are navigating to !

import Login from '../components/Auth/Login/Login';
import mailResetPassword from '../components/Auth/ResetPassword/mailResetPassword';
import CustomizeFeed from '../components/Auth/Categories/CustomizeFeed';

export const SignedOut = createStackNavigator({
  Login,
  ResetPassword: mailResetPassword,
});

export const SignedIn = createStackNavigator({
  Categories: CustomizeFeed,
});

export const createRootNavigation = (isConnected = false) => createSwitchNavigator({
  SignedIn: {
    screen: SignedIn,
  },
  SignedOut: {
    screen: SignedOut,
  },
},
{
  initialRouteName: isConnected ? 'SignedIn' : 'SignedOut',
});
