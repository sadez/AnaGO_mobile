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
  positionMarker1: { lat: 0, lon: 0, address: '' },
  positionMarker2: { lat: 0, lon: 0, address: '' },
  dataEndpoint: {},
  selectedRoute: {
    duration: 2039,
    startTime: 1553707137000,
    endTime: 1553709176000,
    walkTime: 721,
    transitTime: 316,
    waitingTime: 1002,
    walkDistance: 890.2373007431578,
    walkLimitExceeded: false,
    elevationLost: 0,
    elevationGained: 0,
    transfers: 1,
    fare: {
      fare: {
        regular: {
          currency: {
            currency: 'MAD',
            defaultFractionDigits: 2,
            currencyCode: 'MAD',
            symbol: 'MAD',
          },
          cents: 1000,
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
              '1:R88',
            ],
          },
          {
            fareId: '1:GTAXI1',
            price: {
              currency: {
                currency: 'MAD',
                defaultFractionDigits: 2,
                currencyCode: 'MAD',
                symbol: 'MAD',
              },
              cents: 600,
            },
            routes: [
              '1:R4',
            ],
          },
        ],
      },
    },
    legs: [
      {
        startTime: 1553707137000,
        endTime: 1553707498000,
        departureDelay: 0,
        arrivalDelay: 0,
        realTime: false,
        distance: 434.256,
        pathway: false,
        mode: 'WALK',
        route: '',
        agencyTimeZoneOffset: 0,
        interlineWithPreviousLeg: false,
        from: {
          name: 'Origin',
          lon: -7.637300491333009,
          lat: 33.58821963230516,
          departure: 1553707137000,
          orig: '',
          vertexType: 'NORMAL',
        },
        to: {
          name: 'Angle Anfa/Zerktouni',
          stopId: '1:S198',
          lon: -7.636147500000001,
          lat: 33.5912539,
          arrival: 1553707498000,
          departure: 1553708399000,
          stopIndex: 6,
          stopSequence: 7,
          vertexType: 'TRANSIT',
        },
        legGeometry: {
          points: 'qe_lEjtrm@MSyApAc@}@s@yAs@{A[PqCq@EAoA_@GAAB?BABABCBCBCBC@E@C?E?CACACACACCCEACAEAESL',
          length: 32,
        },
        rentedBike: false,
        transitLeg: false,
        duration: 361,
        intermediateStops: [],
        steps: [
          {
            distance: 12.256,
            relativeDirection: 'DEPART',
            streetName: 'Rue el Mansour Saâdi',
            absoluteDirection: 'NORTHEAST',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.637332472334378,
            lat: 33.58825216612041,
            elevation: [],
          },
          {
            distance: 63.317,
            relativeDirection: 'LEFT',
            streetName: "Place du Nid d'Iris",
            absoluteDirection: 'NORTHWEST',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.637230100000001,
            lat: 33.588322000000005,
            elevation: [],
          },
          {
            distance: 137.184,
            relativeDirection: 'RIGHT',
            streetName: 'Rue Assilm',
            absoluteDirection: 'NORTHEAST',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.6376403,
            lat: 33.5887775,
            elevation: [],
          },
          {
            distance: 156.789,
            relativeDirection: 'LEFT',
            streetName: 'road',
            absoluteDirection: 'NORTHWEST',
            stayOn: false,
            area: false,
            bogusName: true,
            lon: -7.6364220000000005,
            lat: 33.589479000000004,
            elevation: [],
          },
          {
            distance: 51.916,
            relativeDirection: 'CIRCLE_CLOCKWISE',
            streetName: "Boulevard d'Anfa",
            absoluteDirection: 'NORTHWEST',
            exit: '4',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.6360859,
            lat: 33.5908141,
            elevation: [],
          },
          {
            distance: 12.794,
            relativeDirection: 'LEFT',
            streetName: 'Boulevard Mohamed Zerktouni',
            absoluteDirection: 'NORTHWEST',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.6360796,
            lat: 33.5911537,
            elevation: [],
          },
        ],
      },
      {
        startTime: 1553708399000,
        endTime: 1553708623000,
        departureDelay: 0,
        arrivalDelay: 0,
        realTime: false,
        distance: 1544.028902422607,
        pathway: false,
        mode: 'BUS',
        route: '38',
        agencyName: "M'dina Bus",
        agencyUrl: 'http://mdinabus.ma/',
        agencyTimeZoneOffset: 0,
        routeColor: 'FA00FF',
        routeType: 3,
        routeId: '1:R88',
        routeTextColor: 'FF0000',
        interlineWithPreviousLeg: false,
        tripShortName: '38 05:30 to Hay El Falah',
        headsign: 'Hay El Falah',
        agencyId: 'A2',
        tripId: '1:R88001',
        serviceDate: '20190327',
        from: {
          name: 'Angle Anfa/Zerktouni',
          stopId: '1:S198',
          lon: -7.636147500000001,
          lat: 33.5912539,
          arrival: 1553707498000,
          departure: 1553708399000,
          stopIndex: 6,
          stopSequence: 7,
          vertexType: 'TRANSIT',
        },
        to: {
          name: 'CIMR',
          stopId: '1:S586',
          lon: -7.624336099999999,
          lat: 33.5815475,
          arrival: 1553708623000,
          departure: 1553708623000,
          stopIndex: 8,
          stopSequence: 9,
          vertexType: 'TRANSIT',
        },
        legGeometry: {
          points: 'gx_lE`mrm@tAgAlS}R`@_@nAoBxLeV~CgHlBsSzJbD',
          length: 9,
        },
        routeShortName: '38',
        routeLongName: 'Ligne 38: El Hank - Hay El Falah',
        rentedBike: false,
        transitLeg: true,
        duration: 224,
        intermediateStops: [
          {
            name: 'Twin',
            stopId: '1:S195',
            lon: -7.632671,
            lat: 33.5875084,
            arrival: 1553708511000,
            departure: 1553708511000,
            stopIndex: 7,
            stopSequence: 8,
            vertexType: 'TRANSIT',
          },
        ],
        steps: [],
      },
      {
        startTime: 1553708623000,
        endTime: 1553708711000,
        departureDelay: 0,
        arrivalDelay: 0,
        realTime: false,
        distance: 113.20400000000001,
        pathway: false,
        mode: 'WALK',
        route: '',
        agencyTimeZoneOffset: 0,
        interlineWithPreviousLeg: false,
        from: {
          name: 'CIMR',
          stopId: '1:S586',
          lon: -7.624336099999999,
          lat: 33.5815475,
          arrival: 1553708623000,
          departure: 1553708623000,
          stopIndex: 8,
          stopSequence: 9,
          vertexType: 'TRANSIT',
        },
        to: {
          name: 'Hassan II',
          stopId: '1:S24',
          lon: -7.6239054,
          lat: 33.5824994,
          arrival: 1553708711000,
          departure: 1553708811000,
          stopIndex: 16,
          stopSequence: 17,
          vertexType: 'TRANSIT',
        },
        legGeometry: {
          points: 's{}kEbcpm@eCu@WMa@O',
          length: 4,
        },
        rentedBike: false,
        transitLeg: false,
        duration: 88,
        intermediateStops: [],
        steps: [
          {
            distance: 113.20400000000001,
            relativeDirection: 'DEPART',
            streetName: 'Boulevard Abdelmoumen',
            absoluteDirection: 'NORTH',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.624336100000001,
            lat: 33.5815475,
            elevation: [],
          },
        ],
      },
      {
        startTime: 1553708811000,
        endTime: 1553708903000,
        departureDelay: 0,
        arrivalDelay: 0,
        realTime: false,
        distance: 872.499095145715,
        pathway: false,
        mode: 'TRAM',
        route: 'T1',
        agencyName: 'Casa Tramway',
        agencyUrl: 'http://www.casatramway.ma',
        agencyTimeZoneOffset: 0,
        routeColor: '00FFFF',
        routeType: 0,
        routeId: '1:R4',
        routeTextColor: 'FFD700',
        interlineWithPreviousLeg: false,
        tripShortName: 'T1 05:45 to Sidi Moumen Terminus',
        headsign: 'Sidi Moumen Terminus',
        agencyId: 'A1',
        tripId: '1:R4001',
        serviceDate: '20190327',
        from: {
          name: 'Hassan II',
          stopId: '1:S24',
          lon: -7.6239054,
          lat: 33.5824994,
          arrival: 1553708711000,
          departure: 1553708811000,
          stopIndex: 16,
          stopSequence: 17,
          vertexType: 'TRANSIT',
        },
        to: {
          name: 'Place Mohammed V',
          stopId: '1:S23',
          lon: -7.6200110999999975,
          lat: 33.5896439,
          arrival: 1553708903000,
          departure: 1553708904000,
          stopIndex: 17,
          stopSequence: 18,
          vertexType: 'TRANSIT',
        },
        legGeometry: {
          points: 'qa~kEl`pm@yGkC{b@}R',
          length: 3,
        },
        routeShortName: 'T1',
        routeLongName: 'T1 : Ain Diab - Sidi Moumen',
        rentedBike: false,
        transitLeg: true,
        duration: 92,
        intermediateStops: [],
        steps: [],
      },
      {
        startTime: 1553708904000,
        endTime: 1553709176000,
        departureDelay: 0,
        arrivalDelay: 0,
        realTime: false,
        distance: 342.507,
        pathway: false,
        mode: 'WALK',
        route: '',
        agencyTimeZoneOffset: 0,
        interlineWithPreviousLeg: false,
        from: {
          name: 'Place Mohammed V',
          stopId: '1:S23',
          lon: -7.6200110999999975,
          lat: 33.5896439,
          arrival: 1553708903000,
          departure: 1553708904000,
          stopIndex: 17,
          stopSequence: 18,
          vertexType: 'TRANSIT',
        },
        to: {
          name: 'Destination',
          lon: -7.621104241989088,
          lat: 33.59162397875197,
          arrival: 1553709176000,
          orig: '',
          vertexType: 'NORMAL',
        },
        legGeometry: {
          points: 'in_lEhhom@i@W_@QKGQIOIICSKiA_@OGQEKEKl@I`@SHe@tBm@jC',
          length: 17,
        },
        rentedBike: false,
        transitLeg: false,
        duration: 272,
        intermediateStops: [],
        steps: [
          {
            distance: 162.578,
            relativeDirection: 'DEPART',
            streetName: 'Avenue Hassan II',
            absoluteDirection: 'NORTHEAST',
            stayOn: false,
            area: false,
            bogusName: false,
            lon: -7.620049093808682,
            lat: 33.58965982622759,
            elevation: [],
          },
          {
            distance: 179.929,
            relativeDirection: 'LEFT',
            streetName: 'road',
            absoluteDirection: 'WEST',
            stayOn: false,
            area: false,
            bogusName: true,
            lon: -7.6193568,
            lat: 33.591001,
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
