import React, { Component } from 'react';
import {
  StyleSheet, View, TextInput, Dimensions, Platform, Text, TouchableOpacity,
} from 'react-native';
import Header from './Header';
import MapContainer from './MapContainer';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812);

class MainMAp extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header></Header>
        <View style={styles.containerTextDepart}>
          <TextInput
            style={styles.inputStyle}
             onChangeText={text => this.setState({ text })}
             value={this.state.text}
             placeholder={'Départ ...'}
           />
        </View>
        <View style={styles.containerTextDestination}>
          <TextInput
            style={styles.inputStyle}
             onChangeText={text => this.setState({ text })}
             value={this.state.text}
             placeholder={'Déstination ...'}
           />
        </View>
        <View style={styles.containerButtonAnago}>
          <TouchableOpacity style={styles.buttonAnago} >
            <Text style = {{ color: 'white', fontSize: 18, fontWeight: 'bold' }}> AnaGO </Text>
          </TouchableOpacity>
        </View>

        <MapContainer></MapContainer>

     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerTextDepart: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  containerTextDestination: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
    backgroundColor: '#388e3c',
    padding: 10,
    width: SCREEN_WIDTH * 2 / 3,
    borderRadius: 5,
    color: 'white',
    elevation: 2,
  },
  inputStyle: {
    height: 40,
    width: SCREEN_WIDTH * 2 / 3,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default MainMAp;
