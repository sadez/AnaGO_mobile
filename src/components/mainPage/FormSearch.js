import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, Text, TouchableOpacity, Keyboard,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const homePlace = { description: 'Casa Voyageurs', geometry: { location: { lat: 33.590597, lng: -7.592048 } } };
const workPlace = { description: 'Casa Port', geometry: { location: { lat: 33.599588, lng: -7.612833 } } };

// uses of decoding polylines
const deco_polyline = require('@mapbox/polyline');

// function returning array of polyline and mode from OSM data list of itineraries
function polylineFromData(data) {
  const arrayOfPolylines = [];
  if (data.plan.itineraries) {
    for (let i = 0; i < data.plan.itineraries.length; i += 1) {
      arrayOfPolylines.push([]);
    }
    for (let i = 0; i < data.plan.itineraries.length; i += 1) {
      for (let j = 0; j < data.plan.itineraries[i].legs.length; j += 1) {
        arrayOfPolylines[i].push(
          {
            polyline: deco_polyline.decode(data.plan.itineraries[i].legs[j].legGeometry.points),
            mode: data.plan.itineraries[i].legs[j].mode,
          },
        );
      }
    }
  }
  return arrayOfPolylines;
}

class FormSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isSearching: false,
    };
  }

  // Fetch data from OTP and calculate
  fetchData = () => {
    const {
      positionMarker1, positionMarker2, addData,
    } = this.props;
    this.setState({
      isSearching: true,
    });
    if (positionMarker1.lat > 30 && positionMarker1.lon < 0 && positionMarker2.lat > 30 && positionMarker2.lon < 0) {
      fetch(`https://api.anago.ma/otp/routers/default/plan?fromPlace=${positionMarker1.lat},%20${positionMarker1.lon}&toPlace=${positionMarker2.lat},%20${positionMarker2.lon}&mode=WALK,TRANSIT&maxWalkDistance=700&arriveBy=false&showIntermediateStops=true&maxTransfers=3&preferredAgencies=A1`, { method: 'GET', dataType: 'JSON', headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        .then(resp => resp.json())
        .then((data) => {
          // call for taxi route
          fetch(`https://api.anago.ma/otp/routers/default/plan?fromPlace=${positionMarker1.lat},%20${positionMarker1.lon}&toPlace=${positionMarker2.lat},%20${positionMarker2.lon}&mode=CAR&maxWalkDistance=700&arriveBy=false&showIntermediateStops=true`, { method: 'GET', dataType: 'JSON', headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(resp => resp.json())
            .then((data2) => {
            // ADD petit taxi fares and route
              if (data2.plan) {
                const fare = {
                  fare: {
                    regular: {
                      currency: {
                        symbol: 'MAD',
                        currency: 'MAD',
                        defaultFractionDigits: 2,
                        currencyCode: 'MAD',
                      },
                      cents: 750,
                    },
                  },
                  details: {
                    regular: [
                      {
                        fareId: '1:BUS1',
                        price: {
                          currency: {
                            symbol: 'MAD',
                            currency: 'MAD',
                            defaultFractionDigits: 2,
                            currencyCode: 'MAD',
                          },
                          cents: 750,
                        },
                        routes: [
                          '1:R66',
                        ],
                      },
                    ],
                  },
                };

                fare.fare.regular.cents = Math.round(2 + 0.2 * (Math.round(data2.plan.itineraries[0].legs[0].distance) / 80) * 100 + 50);
                if (fare.fare.regular.cents < 750) {
                  fare.fare.regular.cents = 750;
                }
                // night fare
                const d = new Date();
                const n = d.getHours();
                if (n >= 20 || n < 7) {
                  fare.fare.regular.cents = fare.fare.regular.cents * 1.5;
                }
                data2.plan.itineraries[0].fare = fare;
                data2.plan.itineraries[0].legs[0].mode = 'TAXI';

                if (!data.plan) {
                  addData(data2);
                  this.props.navigation.navigate('MainResult');
                } else {
                  const finalitineries = data.plan.itineraries.concat(data2.plan.itineraries);
                  data.plan.itineraries = finalitineries;
                  addData(data);
                  this.props.navigation.navigate('MainResult');
                }

                // let polylies2fromdata = polylineFromData(data);
                this.setState({
                  isSearching: false,
                });
              }
            })
            .catch((error) => {
              console.log(error, 'catch the second hoop');
              this.setState({
                isSearching: false,
              });
            });

          this.setState({
            isSearching: false,
          });
        })
        .catch((error) => {
          this.setState({
            isSearching: false,
          });
        });
    } else {
      this.setState({
        isSearching: false,
      });
    }
  }

  render() {
    const {
      positionMarker1, positionMarker2, position1, position2,
    } = this.props;
    return (
      <React.Fragment>
          <View style={styles.containerTextDepart}>
            <GooglePlacesAutocomplete
              placeholder='Départ...'
              minLength={3}
              onSubmitEditing={Keyboard.dismiss}
              autoFocus={false}
              returnKeyType={'search'}
              keyboardAppearance={'light'}
              listViewDisplayed={false}
              fetchDetails={true}
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                if (details.geometry) {
                  const location = {
                    lat: details.geometry.location.lat,
                    lon: details.geometry.location.lng,
                    address: data.description,
                  };
                  position1(location);
                }
                Keyboard.dismiss();
              }}
              getDefaultValue={() => positionMarker1.address}
              query={{
                key: 'AIzaSyCT4AX93nAF79Wty50QfCZnj8BGHcomMN4 ',
                language: 'fr', // language of the results
                types: 'geocode', // default: 'geocode'
                location: '33.571283, -7.597639',
                radius: '35000',
                strictbounds: true,
              }}
              styles={{
                textInputContainer: {
                  zIndex: 2,
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                },
                textInput: {
                  zIndex: 2,
                  marginLeft: 0,
                  marginRight: 0,
                  height: 35,
                  fontSize: 16,
                  fontFamily: 'PTSans-Bold',
                },
                predefinedPlacesDescription: {
                  zIndex: 2,
                  fontSize: 16,
                  fontFamily: 'PTSans-Bold',
                },
              }}
              nearbyPlacesAPI='GooglePlacesSearch'
              GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
              }}
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
              predefinedPlaces={[homePlace, workPlace]}
              debounce={200}
            />

          </View>

        <View style={styles.containerTextDestination}>

          <GooglePlacesAutocomplete
            placeholder='Destination...'
            minLength={3}
            autoFocus={false}
            returnKeyType={'search'}
            keyboardAppearance={'light'}
            listViewDisplayed={false}
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
              if (details.geometry) {
                const location = {
                  lat: details.geometry.location.lat,
                  lon: details.geometry.location.lng,
                  address: data.description,
                };
                position2(location);
              }
              Keyboard.dismiss();
            }}
            getDefaultValue={() => positionMarker2.address}
            query={{
              key: 'AIzaSyCT4AX93nAF79Wty50QfCZnj8BGHcomMN4 ',
              language: 'fr', // language of the results
              types: 'geocode', // default: 'geocode'
              location: '33.571283, -7.597639',
              radius: '35000',
              strictbounds: true,
            }}
            styles={{
              textInputContainer: {
                zIndex: 2,
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput: {
                zIndex: 2,
                marginLeft: 0,
                marginRight: 0,
                height: 35,
                fontSize: 16,
                fontFamily: 'PTSans-Bold',
              },
              predefinedPlacesDescription: {
                zIndex: 2,

                fontSize: 16,
                fontFamily: 'PTSans-Bold',
              },
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            GooglePlacesDetailsQuery={{
              // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
              fields: 'formatted_address',
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            predefinedPlaces={[homePlace, workPlace]}
            debounce={200}
          />

        </View>
        <View style={styles.containerButtonAnago}>
          <TouchableOpacity onPress={() => { this.fetchData(); }} style={styles.buttonAnago} disabled={!(positionMarker1.address && positionMarker2.address)}>
            <Text style = {{ color: 'white', fontSize: 18, fontWeight: 'bold' }}> AnaGO </Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  containerTextDepart: {
    flexDirection: 'row',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 5,
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 1,
    marginHorizontal: '10%',
  },
  containerTextDestination: {
    flexDirection: 'row',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 5,
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 0,
    marginHorizontal: '10%',
  },
  containerButtonAnago: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: '100%',
  },
  buttonAnago: {
    alignItems: 'center',
    backgroundColor: '#1a7746',
    padding: 10,
    width: SCREEN_WIDTH * 2 / 3,
    borderRadius: 5,
    color: 'white',
    elevation: 2,
  },
  inputStyle: {
  //  height: 60,
    width: '80%',
    fontSize: 16,
    fontFamily: 'PTSans-Bold',
  },
});

const mapStateToProps = state => ({
  selectedRoute: state.map.selectedRoute,
  positionMarker1: state.map.positionMarker1,
  positionMarker2: state.map.positionMarker2,
});

const mapDispatchToProps = dispatch => ({
  position1: payload => dispatch({ type: 'ADD_POSITION1', payload }),
  position2: payload => dispatch({ type: 'ADD_POSITION2', payload }),
  addData: payload => dispatch({ type: 'ADD_DATA', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);
