import {useSelector, useDispatch} from 'react-redux';
import {setAppStatus} from '../state/slices/appStatusSlice';
import {appStatusCodes} from '../state/initialState';
import {useEffect} from 'react';
import {setAppStatusWithDelay} from '../state/asyncThunks/appStatus/setAppStatusWithDelay';
import {BannerText} from './🟡BannerText';

// listens for changes in app state and updates BannerText above the buttons along with other user  feedback systems


const AppStatus = () => {
  const dispatch = useDispatch();

  const connectedDevices = useSelector(
    state => state.bluetooth.connectedDevices,
  );
  const openDrawer = useSelector(state => state.drawer.openDrawer);
  const isBluetoothOn = useSelector(state => state.bluetooth.isBluetoothOn);
  const status = useSelector(state => state.appStatus.status);

  //if the app is not connected to a device and the user is not scanning for device, prompt user to connect to device
  useEffect(() => {
    if (
      connectedDevices.length === 0 &&
      status !== appStatusCodes.connectionPrompt
    ) {
      dispatch(setAppStatus(appStatusCodes.connectionPrompt));
    }
  }, [connectedDevices, openDrawer]);

  //if the app is on the device drawer, BT is enabled, and the current status is not scanForDevice, let the user know that it is scanning for devices.
  useEffect(() => {
    if (
      openDrawer === 'right' &&
      isBluetoothOn === 'PoweredOn' &&
      status !== appStatusCodes.scanForDevice
    ) {
      dispatch(setAppStatus(appStatusCodes.scanForDevice));
    }
  }, [openDrawer]);

  return <BannerText />;
};

export default AppStatus;