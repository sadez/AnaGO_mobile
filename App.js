import React, { Component } from 'react';
import { Root } from 'native-base';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import AppReducer from './src/reducers/AppReducer';
import { AppNavigator, middleware } from './src/Route/Navigator';

type Props = {};

const store = createStore(AppReducer, applyMiddleware(middleware));

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
          <Root>
              <AppNavigator />
          </Root>
      </Provider>
    );
  }
}
