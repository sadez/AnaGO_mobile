import React, { Component } from 'react';
import {
  StyleSheet, View, TextInput, Dimensions, Text, TouchableOpacity,
} from 'react-native';

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
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
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
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
  },
});

export default FormSearch;
