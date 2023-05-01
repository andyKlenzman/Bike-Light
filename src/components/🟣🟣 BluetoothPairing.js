import {Text, View, Button, StyleSheet, FlatList} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import Context from '../state/Context';
import EmptyList from '../utils/EmptyList';
import {bleManager} from '../utils/Bluetooth/bluetoothManager';
import {renderScannedItem} from './🟣 BluetoothListItem';
import parseCharacteristics from '../utils/Bluetooth/parseCharacteristics';
/*
  Purpose: User flow and mechanics for BT device connection. Can handle multiple devices. 


Check: 
  - Does characteristic parsing work?
  - does renderScannedItem work?
  - Check if connectedDevices is working in the context.
Doing:
  - Use Context to handle conntected devices

To-do:
  - Style bluetooth paring process
  - Plan BT structure, (how to abstract pairing, writing data functions, context, etc.)
  - load BT data into context
  - Test BT Functionality (with set interval) (will performance lag if readSensors is called twice in app, better to try to load it into context again now that I know it needs the whole obj)

ST NOTES:
  - So ill need connected devices in context regardless, so mise well put isLoading in their as well so I can abstract out rendered items. Am I violating having two different sources of truth? 
LT Notes:
  - Could try to abstract all of this, to keep the UI nice and clean. 
  - 
  */

// useEffect(() => {
//   const intervalId = setInterval(() => {
//     console.log('setInterval running',);
//   }, 1000);

//   return () => {
//     clearInterval(intervalId);
//   };
// }, []);

const BluetoothPairing = () => {
  const {btState, setBtState} = useContext(Context);
  const [scannedDevices, setScannedDevices] = useState([]);
  const Buffer = require('buffer').Buffer;

  /*
   * Scans for connectable and unique bluetooth devices and stores them in an array of objects
   */

  const startDeviceScan = async () => {
    // clear the updatedScannedDevice array to prevent items listed that are no longer scannable
    let updatedScannedDevices = [];
    bleManager.startDeviceScan(null, null, (error, discoveredDevice) => {
      if (error) {
        console.log('Scan error', error);
        return;
      }
      if (discoveredDevice.isConnectable) {
        let isDuplicate = false;
        if (scannedDevices) {
          isDuplicate = updatedScannedDevices.some(item => {
            return item.id === discoveredDevice.id;
          });
        }
        if (!isDuplicate) {
          updatedScannedDevices = [...updatedScannedDevices, discoveredDevice];
          setScannedDevices(updatedScannedDevices);
        }
      }
    });
    setTimeout(() => {
      bleManager.stopDeviceScan();
    }, 3000);
  };

  /*
   * Connects to a device and retrieves the writable characteristic
   */
  const connectToDevice = async device => {
    console.log(`Connecting to ${device.name ? device.name : device.id}`);
    try {
      // Step 1 - Set loading state and request device data
      setBtState({...btState, isLoading: device.id});
      const deviceData = await bleManager.connectToDevice(device.id);

      // Step 2 - Connect to device and retrieve writable characteristic, parse writeWithoutResponseCharacterisitc
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(
        deviceData.id,
      );
      const writeWithoutResponseCharacterisitc =
        parseCharacteristics(deviceData);

      // Step 3 - Check if the device is already connected.
      let updatedConnectedDevices = btState.connectedDevices;
      let isDuplicate = updatedConnectedDevices.some(connectedDevice => {
        return connectedDevice.deviceID === device.id;
      });

      // Step 4 - If the device is unique, add it's characteristics to the array of connected devices.
      if (!isDuplicate) {
        updatedConnectedDevices = [
          ...updatedConnectedDevices,
          writeWithoutResponseCharacterisitc,
        ];

        //Step 5 - Set up a listener, so if the device disconnects, remove it from connectedDevices and sort connected to top of array of devices.
        bleManager.onDeviceDisconnected(device.id, () => {
          updatedConnectedDevices = btState.connectedDevices;
          updatedConnectedDevices.filter((connectedDevice, index, arr) => {
            if (connectedDevice.deviceID === device.id) {
              arr.splice(index, 1);
              return true;
            }
          });
          setBtState({...btState, connectedDevices: updatedConnectedDevices});
          sortedScannedDevices.sort(sortingFunction);
        });

        //Step 6 - Sort array of device so connected devices appear at the top of the array of devices
        // Declare a copy to ensure that new reference will rerender state
        let sortedScannedDevices = scannedDevices;

        //  sorting function to place connected devices to the top of the array of devices
        const sortingFunction = (a, b) => {
          const isAConnected = updatedConnectedDevices.some(_device => {
            return _device.deviceID === a.id;
          });
          const isBConnected = updatedConnectedDevices.some(_device => {
            return _device.deviceID === b.id;
          });

          if (
            (isBConnected && isAConnected) ||
            (!isBConnected && !isAConnected)
          ) {
            return 0;
          }
          if (isAConnected && !isBConnected) {
            return -1;
          }

          if (!isAConnected && isBConnected) {
            return 1;
          }
        };
        //uhhh I never set the state....why is a different reference changing the state val
        sortedScannedDevices.sort(sortingFunction);

        setBtState({...btState, connectedDevices: updatedConnectedDevices});
        console.log('connectedDevices', updatedConnectedDevices);
      }
      setBtState({...btState, isLoading: ''});

      //Ste0 5 - update Loading state
    } catch (e) {
      setBtState({...btState, isLoading: ''});
      console.log('Connection error: ', e);
    }
  };

  const writeToDevice = async (characteristic, data) => {
    let encodedData = new Buffer(data).toString('base64');
    const promise = await characteristic.writeWithResponse(encodedData);
    console.log('writeToDevice', encodedData, promise);
  };

  return (
    <View>
      {btState.isBluetoothOn !== 'PoweredOn' && (
        <View>
          <Text>Turn on Bluetooth</Text>
        </View>
      )}

      {btState.isBluetoothOn === 'PoweredOn' && (
        <View>
          <Button title="Scan for Lights" onPress={() => startDeviceScan()} />
          <Button
            title="Send Data"
            style={styles.button}
            onPress={() =>
              writeToDevice(btState.connectedDevices[0], 'somefuckingData  432')
            }
          />

          <FlatList
            data={Object.values(scannedDevices)}
            extraData={[scannedDevices, btState]}
            keyExtractor={item => item.id}
            renderItem={renderScannedItem}
            ListEmptyComponent={EmptyList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#1E6738',
  },
});

export default BluetoothPairing;

// const renderScannedItem = ({item}) => {
//   let isConnected = connectedDevices.some(device => {
//     return device.deviceID === item.id;
//   });

//   const backgroundColor = item.id === isLoading ? 'transparent' : 'grey';
//   const color = 'white';
//   const connectionStatus =
//     item.id === btState.isLoading
//       ? 'Loading'
//       : isConnected
//       ? 'Connected'
//       : 'Not Connected';

//   return (
//     <BluetoothListItem
//       item={item}
//       connectionStatus={connectionStatus}
//       onPress={() => connectToDevice(item)}
//       backgroundColor={backgroundColor}
//       textColor={color}
//     />
//   );
// };
