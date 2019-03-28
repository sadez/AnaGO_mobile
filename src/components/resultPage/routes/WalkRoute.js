import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'native-base';

class WalkRoute extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={[this.props.style, { alignItems: 'center' }]}>
            <Icon style={{ fontSize: 35, paddingHorizontal: 8, color: 'grey' }} name="ios-walk" />
            <Text style={styles.directionText2}>{ this.props.distance }{' m'}</Text>
        </View>
        {!this.props.isLast ? <Text style={styles.directionText}>{'>'}</Text> : null }
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  containerTextDepart: {
    flexDirection: 'row',
    borderColor: '#efefef',
    borderWidth: 1,
    backgroundColor: '#fbfbfb',
    elevation: 1,
    borderRadius: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
    marginHorizontal: 0,
    marginVertical: 5,
    minHeight: 80,
  },
  timeText: {
    fontSize: 32,
    fontFamily: 'PTSans-Bold',
    color: 'black',
  },
  minuteText: {
    fontSize: 14,
    fontFamily: 'PTSans-Regular',
    color: 'grey',
  },
  directionText: {
    fontSize: 20,
    fontFamily: 'PTSans-Bold',
    color: '#B8C1C3',
  },
  directionText2: {
    fontSize: 13,
    fontFamily: 'PTSans-Bold',
    color: '#B8C1C3',
  },
});

export default WalkRoute;
