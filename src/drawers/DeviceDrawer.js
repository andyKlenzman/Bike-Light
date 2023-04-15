import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Context from '../state/Context';

const DeviceDrawer = () => {
  const {globalState, setGlobalState} = useContext(Context);

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={() =>
          setGlobalState({...globalState, isDeviceDrawerOpen: false})
        }
      />
      <View style={styles.rightDrawer}></View>
    </View>
  );
};

export default DeviceDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightDrawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '80%',
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 2,
  },
});
