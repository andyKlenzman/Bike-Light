//how to store and keep track of these types of variables, I guess centralized objects.

export const initalState = {
  appStatus: {
    status: '',
    highlightedButton: ''
  },
  interactionMode: {
    freeplay: {isActive: true , key: 0},
    replay:  {isActive: false , key: 1},
    record:  {isActive: false , key: 2},
  },
  lightMode: {
    rainbow: {isActive: true , key: 0},
    wave:  {isActive: false , key: 1}
  },
  drawer: {
    openDrawer: 'right',
  },
  bluetooth: {
    isBluetoothOn: 'PoweredOff', //correct wording
    connectedDevices: [],
    isLoading: '',
    scannedDevices: [],
    isSendingSignal: false,
  },
};
