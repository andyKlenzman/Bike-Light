import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Context from '../state/Context';

const NavButtons = () => {
  const {globalState, setGlobalState} = useContext(Context);
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.gearButton}
          onPress={() =>
            setGlobalState({...globalState, isSettingsDrawerOpen: true})
          }>
          <Icon name="cog" size={30} color="#00c3ff" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bluetoothButton}
          onPress={() =>
            setGlobalState({...globalState, isDeviceDrawerOpen: true})
          }>
          <Icon
            name="bluetooth"
            size={30}
            color="#00c3ff"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavButtons;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gearButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'black',
    left: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#00c3ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  bluetoothButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'black',
    right: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#00c3ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
