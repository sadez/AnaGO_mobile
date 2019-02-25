import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'native-base';

class BusRoute extends Component {
  renderSwitch(param) {
    switch (param) {
      case 'BUS':
        return (<React.Fragment>
            <View style={{ top: 10, alignItems: 'center' }}>
              <Icon style={[styles.iconTransit, { color: 'white', backgroundColor: '#000FA3' }]} name="md-bus" />
              <Text style={styles.directionText2}>{'Bus '}{ this.props.routeName}</Text>
            </View>
            {!this.props.isLast ? <Text style={styles.directionText}>{'>'}</Text> : null }
          </React.Fragment>);
      case 'TRAM':
        return (<React.Fragment >
          <View style={{ top: 10, alignItems: 'center' }}>
            <Icon style={[styles.iconTransit, { color: 'white', backgroundColor: '#FDAE10' }]} name="md-subway" />
            <Text style={styles.directionText2}>{'Tram '}{ this.props.routeName}</Text>
          </View>
          {!this.props.isLast ? <Text style={styles.directionText}>{'>'}</Text> : null }
        </React.Fragment>);
      case 'TRAIN':
        return (<React.Fragment>
            <View style={{ top: 10, alignItems: 'center' }}>
              <Icon style={[styles.iconTransit, { color: 'white', backgroundColor: '#6D6049' }]} name="md-train" />
              <Text style={styles.directionText2}>{'Train '}{ this.props.routeName}</Text>
            </View>
          {!this.props.isLast ? <Text style={styles.directionText}>{'>'}</Text> : null }
          </React.Fragment>);
      case 'GTAXI':
        return (<React.Fragment>
          <View style={{ top: 10, alignItems: 'center' }}>
            <Icon style={styles.iconGtaxi} name="md-car" />
            <Text style={styles.directionText2}>{'Grand Taxi '}</Text>
          </View>
            {!this.props.isLast ? <Text style={styles.directionText}>{'>'}</Text> : null }
        </React.Fragment>);
      default:
        return null;
    }
  }

  render() {
    return (
      this.renderSwitch(this.props.type)
    );
  }
}

const styles = StyleSheet.create({
  directionText: {
    fontSize: 20,
    fontFamily: 'PTSans-Bold',
    color: '#B8C1C3',
  },
  directionText2: {
    fontSize: 14,
    fontFamily: 'PTSans-Bold',
    color: '#B8C1C3',
  },
  iconTransit: {
    fontSize: 30,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 18,
  },
  iconGtaxi: {
    fontSize: 30,
    paddingHorizontal: 7,
    paddingVertical: 3,
    color: 'grey',
    backgroundColor: '#FEFEE2',
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: 'grey',
  }
});

export default BusRoute;
