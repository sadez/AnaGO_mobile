import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../Route/Navigator';

// Author : Salim Aboubakri
// Date : 02/10/2018
// Desc : Redux reducer

// Reducer of navigation
function nav(state, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.back(),
        state,
      );
      break;
    case 'Logout':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state,
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

// Reducer of auth
const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

// Reducer of user and token
const initialUserState = {
  user: {},
  token: {},
  first: '',
};

function user(state = initialUserState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, user: action.payload };
    case 'USER_TOKEN':
      return { ...state, token: action.payload };
    case 'USER_FIRST':
      return { ...state, first: action.payload };
    case 'USER_LOGOUT':
      return initialUserState;
    default:
      return state;
  }
}


const AppReducer = combineReducers({
  nav,
  auth,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default rootReducer;
