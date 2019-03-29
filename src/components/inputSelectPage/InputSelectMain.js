import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, TouchableOpacity, Keyboard,
} from 'react-native';
import { Text, Icon } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const homePlace = { description: 'Casa Voyageurs', geometry: { location: { lat: 33.590597, lng: -7.592048 } } };
const workPlace = { description: 'Casa Port', geometry: { location: { lat: 33.599588, lng: -7.612833 } } };

class InputSelectMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    const {
      positionMarker1, position1, navigation, positionMarker2, position2,
    } = this.props;
    const isDepart = navigation.getParam('isDepart', true);
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <View style={styles.containerBlocDepart}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                <Icon style={{
                  fontSize: 20, color: 'white', paddingRight: 5,
                }} name="ios-arrow-back" />
              <Text style={{ color: 'white', fontSize: 12 }}>Retour</Text>
            </TouchableOpacity>
          </View>
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
                  if (isDepart) {
                    position1(location);
                  } else {
                    position2(location);
                  }
                }
                Keyboard.dismiss();
                this.props.navigation.navigate('MainMap');
              }}
              getDefaultValue={() => (isDepart ? positionMarker1.address : positionMarker2.address)}
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
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  containerBlocDepart: {
    borderColor: '#1a7746',
    borderWidth: 0.5,
    backgroundColor: '#2bc875',
    elevation: -1,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
    zIndex: 1,
    marginHorizontal: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(InputSelectMain);
