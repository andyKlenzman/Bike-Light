// keep all inital state in one place, wonder how this will work with loading persistant state

export const initalState = {
  bannerText: {
    text: 'Hello', // will put this in its own slice
  },
  drawer: {
    openDrawer: 'center',
  },
  bluetooth: {
    isBluetoothOn: 'PoweredOn',
    connectedDevices: [],
    isLoading: '',
    scannedDevices: [],
    isSendingSignal: false,
  },
};
