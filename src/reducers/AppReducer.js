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

// Reducer of user and token
const initialMapState = {
  positionMarker1: { lat: 84, lon: 84, address: 'Time Square - 42nd Street' },
  positionMarker2: { lat: 84, lon: 84, address: 'Time Square - 55th Street' },
  dataEndpoint: {},
  selectedRoute: {
    duration: 1455,
    startTime: 1533806911000,
    endTime: 1533808366000,
    walkTime: 349,
    transitTime: 204,
    waitingTime: 902,
    walkDistance: 437.08041353011043,
    walkLimitExceeded: false,
    elevationLost: 0,
    elevationGained: 0,
    transfers: 0,
    fare: {
      fare: {
        regular: {
          currency: {
            currency: 'MAD',
            defaultFractionDigits: 2,
            currencyCode: 'MAD',
            symbol: 'MAD',
          },
          cents: 400,
        },
      },
      details: {
        regular: [
          {
            fareId: '1:BUS1',
            price: {
              currency: {
                currency: 'MAD',
                defaultFractionDigits: 2,
                currencyCode: 'MAD',
                symbol: 'MAD',
              },
              cents: 400,
            },
            routes: [
              '1:R24',
            ],
          },
        ],
      },
    },
    legs: [
      {
        startTime: 1533806911000,
        endTime: 1533807008000,
        departureDelay: 0,
        arrivalDelay: 0,
        realTime: false,
        distance: 124.623,
        pathway: false,
        mode: 'WALK',
        route: '',
        agencyTimeZoneOffset: 3600000,
        interlineWithPreviousLeg: false,
        from: {
          name: 'Origin',
          lon: -7.59333,
          lat: 33.58981,
          departure: 1533806911000,
          orig: '',
          vertexType: 'NORMAL',
        },
        to: {
          name: 'Casa Voyageurs',
          stopId: '1:S268',
          lon: -7.5925414,
          lat: 33.5889711,
          arrival: 1533807008000,
          departure: 1533807909000,
          stopIndex: 23,
          stopSequence: 24,
          vertexType: 'TRANSIT',
        },
        legGeometry: {
          points: 'mo_lElajm@CGnDwC',
          length: 3,
        },
        rentedBike: false,
        transitLeg: false,
        duration: 97,
        intermediateStops: [],
        steps: [
          {
            distance: 3.623,
            relativeDirection: 'DEPART',
            streetName: "Boulevard d'Oujda",
            absoluteDirection: 'NORTHEAST',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.593344896578051,
            lat: 33.58983864697046,
            elevation: [],
          },
          {
            distance: 121,
            relativeDirection: 'RIGHT',
            streetName: 'Rue Chatillon',
            absoluteDirection: 'SOUTHEAST',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.5933090000000005,
            lat: 33.5898516,
            elevation: [],
          },
        ],
      },
      {
        startTime: 1533807909000,
        endTime: 1533808113000,
        departureDelay: 0,
        arrivalDelay: 0,
        realTime: false,
        distance: 1097.008960539376,
        pathway: false,
        mode: 'BUS',
        route: '90',
        agencyName: "M'dina Bus",
        agencyUrl: 'http://mdinabus.ma/',
        agencyTimeZoneOffset: 3600000,
        routeColor: 'FA00FF',
        routeType: 3,
        routeId: '1:R24',
        routeTextColor: 'FF0000',
        interlineWithPreviousLeg: false,
        tripShortName: "90 05:30 to Station M'dina Bus 2",
        headsign: "Station M'dina Bus 2",
        agencyId: 'A2',
        tripId: '1:R24001',
        serviceDate: '20180809',
        from: {
          name: 'Casa Voyageurs',
          stopId: '1:S268',
          lon: -7.5925414,
          lat: 33.5889711,
          arrival: 1533807008000,
          departure: 1533807909000,
          stopIndex: 23,
          stopSequence: 24,
          vertexType: 'TRANSIT',
        },
        to: {
          name: 'CHIMICOLOR',
          stopId: '1:S1242',
          lon: -7.603979,
          lat: 33.589146,
          arrival: 1533808113000,
          departure: 1533808114000,
          stopIndex: 25,
          stopSequence: 26,
          vertexType: 'TRANSIT',
        },
        legGeometry: {
          points: 'cj_lEn|im@ACkEhDWvRAX{@|h@h@lAzEP',
          length: 8,
        },
        routeShortName: '90',
        routeLongName: "Ligne 90: Bernoussi - Station M'dina Bus 2",
        rentedBike: false,
        transitLeg: true,
        duration: 204,
        intermediateStops: [
          {
            name: 'Marché de Gros',
            stopId: '1:S999',
            lon: -7.596539999999999,
            lat: 33.590256,
            arrival: 1533808011000,
            departure: 1533808011000,
            stopIndex: 24,
            stopSequence: 25,
            vertexType: 'TRANSIT',
          },
        ],
        steps: [],
      },
      {
        startTime: 1533808114000,
        endTime: 1533808366000,
        departureDelay: 0,
        arrivalDelay: 0,
        realTime: false,
        distance: 312.342,
        pathway: false,
        mode: 'WALK',
        route: '',
        agencyTimeZoneOffset: 3600000,
        interlineWithPreviousLeg: false,
        from: {
          name: 'CHIMICOLOR',
          stopId: '1:S1242',
          lon: -7.603979,
          lat: 33.589146,
          arrival: 1533808113000,
          departure: 1533808114000,
          stopIndex: 25,
          stopSequence: 26,
          vertexType: 'TRANSIT',
        },
        to: {
          name: 'Destination',
          lon: -7.6057,
          lat: 33.59072,
          arrival: 1533808366000,
          orig: '',
          vertexType: 'NORMAL',
        },
        legGeometry: {
          points: 'ck_lE|clm@WCwAGk@CABADCBCBCBC@C@C@C@E@C?C?EAC?CAMPAH_AhC}@lAb@zA',
          length: 24,
        },
        rentedBike: false,
        transitLeg: false,
        duration: 252,
        intermediateStops: [],
        steps: [
          {
            distance: 86.64,
            relativeDirection: 'DEPART',
            streetName: 'Boulevard de la Résistance',
            absoluteDirection: 'NORTH',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.60398458898674,
            lat: 33.58914649760335,
            elevation: [],
          },
          {
            distance: 40.051,
            relativeDirection: 'CIRCLE_CLOCKWISE',
            streetName: 'road',
            absoluteDirection: 'NORTHWEST',
            exit: '2',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.6039019,
            lat: 33.5899226,
            elevation: [],
          },
          {
            distance: 139.139,
            relativeDirection: 'LEFT',
            streetName: 'Rue Magellan',
            absoluteDirection: 'NORTHWEST',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.6040428,
            lat: 33.5902283,
            elevation: [],
          },
          {
            distance: 46.512,
            relativeDirection: 'LEFT',
            streetName: 'Rue Aarroussi Mohammed',
            absoluteDirection: 'SOUTHWEST',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.6052675,
            lat: 33.590936500000005,
            elevation: [],
          },
        ],
      },
    ],
    tooSloped: false,
  },
  isRoutes: false,
};

function map(state = initialMapState, action) {
  switch (action.type) {
    case 'ADD_POSITION1':
      return { ...state, positionMarker1: action.payload };
    case 'ADD_POSITION2':
      return { ...state, positionMarker2: action.payload };
    case 'ADD_DATA':
      return { ...state, dataEndpoint: action.payload };
    case 'SELECT_ROUTE':
      return { ...state, selectedRoute: action.payload };
    case 'SWITCH_ROUTES':
      return { ...state, isRoutes: !state.isRoutes };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
  user,
  map,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default rootReducer;
