import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import Context from '../state/Context';
// import {bleManager} from '../utils/bluetooth/bluetoothManger';
import EmptyList from '../utils/EmptyList';
import {bleManager} from '../utils/Bluetooth/bluetoothManager';
import {BluetoothListItem, renderScannedItem} from './🟣 BluetoothListItem';
/*
  Purpose: User flow and mechanics for BT device connection. Can handle multiple devices. 

Doing:

To-do:
  - Style bluetooth paring process
  - Plan BT structure, (how to abstract pairing, writing data functions, context, etc.)
  - load BT data into context
  - Test BT Functionality (with set interval) (will performance lag if readSensors is called twice in app, better to try to load it into context again now that I know it needs the whole obj)

ST NOTES:
  - How am I going to strcuture this? I am going to be using the BT state, etc, for a lot of things besides pairing. I'm going to use it to hit the user on the head with shit. Maybe the BT state for example, could be called at the beginning of the app, then use that to show a message, or read the length of connected devices to make the bluetooth button flashing to get someone started. 
LT Notes:
  - I can abstract renderSCannwedItems when I've got the connected items into the context
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
  //load in the context here
  const {globalState, setGlobalState} = useContext(Context);


  const [btState, setBtState] = useState();
  const [scannedDevices, setScannedDevices] = useState([]);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [isLoading, setIsLoading] = useState('');
  const Buffer = require('buffer').Buffer;

  // Checks if the device's Bluetooth is enabled
  useEffect(() => {
    const getBleState = async () => {
      const state = await bleManager.state();
      setBtState(state);
    };
    getBleState().catch(err => {
      console.error('Error catching bluetooth state: ', err);
    });
  }, []);

  // Subscribes to updates in the device's Bluetooth state
  bleManager.onStateChange(state => {
    console.log('State change local : ', state);
    setBtState(state);
  });

  // Scans for connectable and unique bluetooth devices and collects them in an array of objects
  const startDeviceScan = async () => {
    //clearing device array to prevent items listed that are not longer scannable
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
          // create a new array with the updated data
          updatedScannedDevices = [...updatedScannedDevices, discoveredDevice];
          setScannedDevices(updatedScannedDevices);
        }
      }
    });
    setTimeout(() => {
      bleManager.stopDeviceScan();
    }, 3000);
  };

  // Connects to device, manages UI's load state, sets the Bluetooth's characterisitcs, and sets up a listener for disconnect.
  const connectToDevice = async device => {
    console.log(`Connecting to ${device.name ? device.name : device.id}`);
    try {
      // Step 1 - Set loading state
      setIsLoading(device.id);
      const deviceData = await bleManager.connectToDevice(device.id);

      // Step 2 - Connect to device and retrieve writable characteristic
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(
        deviceData.id,
      );
      const services = await deviceData.services();
      const service = services[0];
      const characteristicData = await deviceData.characteristicsForService(
        service.uuid.toString(),
      );
      const writeWithoutResponseCharacterisitc = characteristicData[1];

      // Step 3 - Check if the device is already connected.
      let updatedConnectedDevices = connectedDevices;
      let isDuplicate = updatedConnectedDevices.some(connectedDevice => {
        return connectedDevice.deviceID === device.id;
      });

      // Step 4 - If the device is unique, add it to the array of connected devices.
      if (!isDuplicate) {
        updatedConnectedDevices = [
          ...updatedConnectedDevices,
          writeWithoutResponseCharacterisitc,
        ];

        //Step 5 - If the device disconnects, remove them from the list and sort connected to top of array of devices.
        bleManager.onDeviceDisconnected(device.id, () => {
          updatedConnectedDevices = connectedDevices;
          updatedConnectedDevices.filter((connectedDevice, index, arr) => {
            if (connectedDevice.deviceID === device.id) {
              arr.splice(index, 1);
              return true;
            }
          });
          setConnectedDevices(updatedConnectedDevices);
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

        setConnectedDevices(updatedConnectedDevices);
        console.log('connectedDevices', updatedConnectedDevices);
      }
      setIsLoading('');

      //Ste0 5 - update Loading state
    } catch (e) {
      setIsLoading('');
      console.log('Connection error: ', e);
    }
  };

  const renderScannedItem = ({item}) => {
    let isConnected = connectedDevices.some(device => {
      return device.deviceID === item.id;
    });

    const backgroundColor = item.id === isLoading ? 'grey' : 'orange';
    const color = 'white';
    const connectionStatus =
      item.id === isLoading
        ? 'Loading'
        : isConnected
        ? 'Connected'
        : 'Not Connected';

    return (
      <BluetoothListItem
        item={item}
        connectionStatus={connectionStatus}
        onPress={() => connectToDevice(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const writeToDevice = async (characteristic, data) => {
    let encodedData = new Buffer(data).toString('base64');
    const promise = await characteristic.writeWithResponse(encodedData);
    console.log('writeToDevice', encodedData, promise);
  };

  return (
    <View>
      {btState !== 'PoweredOn' && (
        <View>
          <Text>Turn on Bluetooth</Text>
        </View>
      )}

      {btState === 'PoweredOn' && (
        <View>
          <Button title="Scan for Lights" onPress={() => startDeviceScan()} />
          <Button
            title="Send Data"
            style={styles.button}
            onPress={() =>
              writeToDevice(connectedDevices[0], 'somefuckingData  432')
            }
          />

          <FlatList
            data={Object.values(scannedDevices)}
            extraData={[scannedDevices, isLoading]}
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
