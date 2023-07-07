import {curtainState} from './curtainState';

export const initalState = {
  appStatus: {
    status: '',
    highlightedButton: '',
  },
  interactionMode: {
    // if I pull the complexity of this data structure into a interactionModeState file, I could possibly share it directly with my microcontroller and have one source of truth for both codebases, and also eliminate the possibility of two modes being selected active at once.
    freeplay: {isActive: true, key: 0},
    replay: {isActive: false, key: 1},
    record: {isActive: false, key: 2},
  },
  lightMode: {
    rainbow: {isActive: true, key: 0},
    wave: {isActive: false, key: 1},
  },
  drawer: {
    openDrawer: 'right',
  },
  curtain: {
    isOpen: curtainState.isOpen.hidden,
    contentType: curtainState.contentType.tutorial,
  },
  bluetooth: {
    isBluetoothOn: 'PoweredOff', //correct wording
    connectedDevices: [],
    isLoading: '',
    scannedDevices: [],
    isSendingSignal: false,
  },
};
