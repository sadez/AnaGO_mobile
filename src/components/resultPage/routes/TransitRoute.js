import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'native-base';

class BusRoute extends Component {
  renderSwitch(param) {
    switch (param) {
      case 'BUS':
        return (<React.Fragment>
            <View style={[this.props.style, { alignItems: 'center' }]}>
              <Icon style={[styles.iconTransit, { color: 'white', backgroundColor: '#000FA3' }]} name="md-bus" />
              <Text style={[styles.directionText2, { color: '#000FA3' }]}>{'Bus '}{ this.props.routeName}</Text>
            </View>
            {!this.props.isLast ? <Text style={styles.directionText}>{'>'}</Text> : null }
          </React.Fragment>);
      case 'TRAM':
        return (<React.Fragment >
          <View style={[this.props.style, { alignItems: 'center' }]}>
            <Icon style={[styles.iconTransit, { color: 'white', backgroundColor: '#FDAE10' }]} name="md-subway" />
            <Text style={[styles.directionText2, { color: '#FDAE10' }]}>{'Tram '}{ this.props.routeName}</Text>
          </View>
          {!this.props.isLast ? <Text style={styles.directionText}>{'>'}</Text> : null }
        </React.Fragment>);
      case ('RAIL'):
        return (<React.Fragment>
            <View style={[this.props.style, { alignItems: 'center' }]}>
              <Icon style={[styles.iconTransit, { color: 'white', backgroundColor: '#6D6049' }]} name="md-train" />
              <Text style={[styles.directionText2, { color: '#6D6049' }]}>{'Train '}{ this.props.routeName}</Text>
            </View>
          {!this.props.isLast ? <Text style={styles.directionText}>{'>'}</Text> : null }
          </React.Fragment>);
      case 'GTAXI':
        return (<React.Fragment>
          <View style={[this.props.style, { alignItems: 'center' }]}>
            <Icon style={styles.iconGtaxi} name="md-car" />
            <Text style={[styles.directionText2, { color: 'grey' }]}>{'Grand Taxi '}</Text>
          </View>
            {!this.props.isLast ? <Text style={styles.directionText}>{'>'}</Text> : null }
        </React.Fragment>);
      case 'TAXI':
        return (<React.Fragment>
          <View style={[this.props.style, { alignItems: 'center' }]}>
            <Icon style={{
              fontSize: 30, paddingHorizontal: 8, paddingVertical: 3, color: 'white', backgroundColor: '#8B0000', borderRadius: 18,
            }} name="md-car" />
          <Text style={[styles.directionText2, { color: '#8B0000' }]}> {'Petit Taxi'} </Text>
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
    fontSize: 13,
    fontFamily: 'PTSans-Bold',
    color: '#B8C1C3',
  },
  iconTransit: {
    fontSize: 25,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 16,
  },
  iconGtaxi: {
    fontSize: 25,
    paddingHorizontal: 7,
    paddingVertical: 3,
    color: 'grey',
    backgroundColor: '#FEFEE2',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  iconPtaxi: {
    fontSize: 25,
    paddingHorizontal: 7,
    paddingVertical: 3,
    color: 'red',
    backgroundColor: '#FEFEE2',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'red',
  },
});

export default BusRoute;
