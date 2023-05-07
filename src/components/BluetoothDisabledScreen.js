import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BluetoothDisabledScreen = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Icon name="bluetooth-b" size={100} color="#cccccc" />
      <Text style={styles.title}>Bluetooth is disabled</Text>
      <Text style={styles.subtitle}>
        Turn on Bluetooth to connect to your lamp
      </Text>
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
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#00c3ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default BluetoothDisabledScreen;
