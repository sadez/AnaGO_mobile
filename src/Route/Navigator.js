// Author : Salim Aboubakri
// Date : 06/10/2018
// Desc : Managing navigation between screens

import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import MainMap from '../components/mainPage/MainMap';
import MainResult from '../components/resultPage/MainResult';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

// eslint-disable-next-line no-unused-vars
const fade = (props) => {
  const { position, scene } = props;
  // eslint-disable-next-line prefer-destructuring
  const index = scene.index;
  const translateX = 0;
  const translateY = 0;
  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.3, 1, 0.3],
  });

  return {
    opacity,
    transform: [{ translateX }, { translateY }],
  };
};

const RootNavigator = createStackNavigator({
  MainMap: { screen: MainMap },
  MainResult: { screen: MainResult },
},
{
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'MainResult',
});

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };
