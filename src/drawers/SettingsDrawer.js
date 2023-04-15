import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, SafeAreaView} from 'react-native';
import Context from '../state/Context';

const SettingsDrawer = () => {
  const {globalState, setGlobalState} = useContext(Context);

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={() =>
          setGlobalState({...globalState, isSettingsDrawerOpen: false})
        }
      />
      <View style={styles.leftDrawer}></View>
    </View>
  );
};

export default SettingsDrawer;

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

  leftDrawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '80%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
