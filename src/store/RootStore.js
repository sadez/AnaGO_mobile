// Author : Khalid Aoussar
// Date : 05/10/2018
// Desc : Store declaration

import { createStore, combineReducers } from 'redux';
import AuthReducer from '../reducers/Auth';

export default () => {
  const store = createStore(
    combineReducers({
      AuthReducer,
    }),
  );
  return store;
};
