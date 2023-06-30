import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../styles/theme';
const BluetoothDisabledScreen = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Icon name="bluetooth" size={75} color="#cccccc" />
      <Text style={styles.title}>Turn on Bluetooth to connect</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSize.large,
    color: theme.colors.primaryFont,
    fontWeight: 'bold',
    marginTop: 30,
  }
});

export default BluetoothDisabledScreen;
