import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useContext} from 'react';
import Context from '../state/Context';
import EmptyList from '../utils/EmptyList';
import {RenderScannedItem} from './🟡 BluetoothListItem';
import {startDeviceScan} from '../utils/Bluetooth/startDeviceScan';

export const BluetoothEnabledScreen = () => {
  const {btState, setBtState} = useContext(Context);
  const Buffer = require('buffer').Buffer;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => startDeviceScan(btState, setBtState)}>
        <Text style={styles.buttonText}>Scan</Text>
      </TouchableOpacity>
      <FlatList
        data={Object.values(btState.scannedDevices)}
        extraData={[btState]}
        keyExtractor={item => item.id}
        style={{marginBottom: 70}}
        renderItem={({item}) => (
          <RenderScannedItem
            item={item}
            btState={btState}
            setBtState={setBtState}
          />
        )}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // styles for a button to enable scanning that fit with our navButtons
  button: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    shadowColor: '#00c3ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    left: '30%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
});
