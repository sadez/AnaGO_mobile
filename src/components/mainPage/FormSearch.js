import React, { Component } from 'react';
import {
  StyleSheet, View, TextInput, Dimensions, Text, TouchableOpacity,
} from 'react-native';
import { Icon } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class FormSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.containerTextDepart}>
          <TextInput
            style={styles.inputStyle}
             onChangeText={text => this.setState({ text })}
             value={this.state.text}
             placeholder={'Départ ...'}
           />
         <View style={{ height: '60%', borderLeftWidth: 1, borderLeftColor: '#d2d2d2' }} />
         <Icon style={{ fontSize: 25, paddingHorizontal: 8, color: '#d2d2d2' }} name="md-locate" />

        </View>
        <View style={styles.containerTextDestination}>

          <TextInput
            style={styles.inputStyle}
             onChangeText={text => this.setState({ text })}
             value={this.state.text}
             placeholder={'Déstination ...'}
           />
         <View style={{ height: '60%', borderLeftWidth: 1, borderLeftColor: '#d2d2d2' }} />
         <Icon style={{ fontSize: 25, paddingHorizontal: 8, color: '#d2d2d2' }} name="md-locate" />

        </View>
        <View style={styles.containerButtonAnago}>
          <TouchableOpacity style={styles.buttonAnago} >
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
    zIndex: 1,
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

export default FormSearch;
