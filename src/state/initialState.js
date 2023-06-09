// keep all inital state in one place, wonder how this will work with loading persistant state

export const initalState = {
  drawer: {
    isSettingsDrawerOpen: false,
    isDeviceDrawerOpen: false,
  },
  bluetooth: {
    isBluetoothOn: 'PoweredOn',
    connectedDevices: [],
    isLoading: '',
    scannedDevices: [],
    isSendingSignal: false,
  },
};
