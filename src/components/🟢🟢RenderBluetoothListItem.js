import {connectToDevice} from '../utils/Bluetooth/connectToDevice';
import {disconnectFromDevice} from '../utils/Bluetooth/disconnectFromDevice';
import {useSelector, useDispatch} from 'react-redux';
import theme from '../styles/theme';
import {ListItem} from './🟡ListItem';

export const RenderScannedBluetoothItem = ({item}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.bluetooth.isLoading);
  const connectedDevices = useSelector(
    state => state.bluetooth.connectedDevices,
  );

  const scannedDevices = useSelector(state => state.bluetooth.scannedDevices);

  let isConnected = connectedDevices.some(device => {
    return device.id === item.id;
  });

  let itemStatus;

  if (item.id === isLoading) {
    itemStatus = {
      status: 'pending',
      connection: 'Connecting...',
    };
  } else if (isConnected) {
    itemStatus = {
      status: 'selected',
      connection: 'Connected',
    };
  } else {
    itemStatus = {
      status: 'neutral',
      connection: 'Tap to connect',
    };
  }

  return (
    <ListItem
      item={item}
      subtitle={itemStatus.connection}
      type="bluetooth"
      onPress={() => {
        if (itemStatus.connection === 'Connected') {
          disconnectFromDevice(item, dispatch);
        } else if (itemStatus.connection === 'Tap to connect') {
          connectToDevice(item, dispatch, connectedDevices, scannedDevices);
        } else if (itemStatus.connection === 'Connecting...') {
          console.log('be patient');
        }
      }}
      status={itemStatus.status}
    />
  );
};
