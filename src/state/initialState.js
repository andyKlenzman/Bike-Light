// keep all inital state in one place, wonder how this will work with loading persistant state

export const appStatusCodes = {
  //100
  // could read the data type, and if an array, go through timed sequences of written word
  greeting: {text: 'Welcome', icon: 'face-smile-beam'}, //could do a nice flat icon here. smiley face like sell drugs fast
  connectionPrompt: {text: 'Connect to lights', icon: null},
  scanForDevice: {text: 'Scanning for devices', icon: 'spinner', spin: true},
  connectionSuccess: {text: 'Device connected', icon: 'bluetooth'},
  disconnectedNotification: {text: 'Lost connection', icon: 'bluetooth'}, //broken chain
};

export const initalState = {
  appStatus: {
    status: '',
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
