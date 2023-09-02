// listens for changes in app state and updates BannerText above the buttons along with other user  feedback systems

import {useSelector, useDispatch} from 'react-redux';
import {
  setAppStatus,
  setAppStatusWithButton,
  setAppStatusAndClearButton,
} from '../state/slices/appStatusSlice';
import {appStatusCodes} from '../content/appStatusCodes';
import {useEffect} from 'react';
import {BannerText} from './🟡BannerText';

const AppStatus = () => {
  const dispatch = useDispatch();

  const connectedDevices = useSelector(
    state => state.bluetooth.connectedDevices,
  );
  const openDrawer = useSelector(state => state.drawer.openDrawer);
  const isBluetoothOn = useSelector(state => state.bluetooth.isBluetoothOn);
  const status = useSelector(state => state.appStatus.status);
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);
  useEffect(() => {
    //if the app is not connected to a device and the user is not scanning for device, prompt user to connect to device
    if (
      connectedDevices.length === 0 &&
      status !== appStatusCodes.connectionPrompt &&
      openDrawer !== 'right'
    ) {
      dispatch(
        setAppStatusWithButton({
          status: appStatusCodes.connectionPrompt,
          button: 'right',
        }),
      );
    }

    //if the app is on the device drawer, BT is enabled, and the current status is not scanForDevice, let the user know that it is scanning for devices.
    // order matters.
    if (openDrawer === 'right' && isBluetoothOn === 'PoweredOn') {
      dispatch(setAppStatus(appStatusCodes.scanForDevice));
    }
    // if device is connected, say ready!

    if (connectedDevices.length > 0) {
      dispatch(setAppStatusAndClearButton(appStatusCodes.connectionSuccess));
    }
    if (isSendingSignal) {
      dispatch(setAppStatusAndClearButton(appStatusCodes.isSendingSignal));
    }
  }, [connectedDevices, openDrawer, isSendingSignal, isBluetoothOn]);

  return <BannerText />;
};

export default AppStatus;
