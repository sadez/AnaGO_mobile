import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'native-base';

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
       <View style={styles.logo}>
         <Image
             source={require('../assets/pointer_vert.png')} style={{ width: 40, height: '100%', resizeMode: 'contain' }}
           />
       </View>
       <View style={styles.title}>
        <Text style={{ fontSize: 20 }}>AnaGo - Casablanca</Text>
       </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },
  logo: {
    flex: 1,
    width: 50,
    height: 50,
    padding: 5,
  },
  title: {
    flex: 3,
  },
});

export default Header;
