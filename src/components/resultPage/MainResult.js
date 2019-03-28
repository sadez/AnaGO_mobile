import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, Platform, Text,
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../Header';
import ListRoutes from './ListRoutes';

// import resultApi from '../../assets/api.json';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812);

class MainResult extends Component {
  render() {
    return (
      <View style={styles.container}>
      {/* <Header navigation={this.props.navigation}></Header> */}
      {
        this.props.dataEndpoint ? <ListRoutes data={this.props.dataEndpoint} navigation={this.props.navigation}></ListRoutes> : null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#efefef',
  },
});

const mapStateToProps = state => ({
  dataEndpoint: state.map.dataEndpoint,
});

export default connect(mapStateToProps, null)(MainResult);
