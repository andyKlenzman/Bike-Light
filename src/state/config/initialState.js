// This file is the inital config for the redux state.

import {curtainVals} from './curtainState';

export const initalState = {
  appStatus: {
    status: '',
    highlightedButton: '',
  },
  interactionMode: {
    // if I pull the complexity of this data structure into an interactionModeState file--similar to curtainState--I could share it with my microcontroller, creating one source of truth for mode names to key mappings.
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
    position: curtainVals.coordinates.closed,
    contentType: curtainVals.content.screenLock,
  },
  bluetooth: {
    isBluetoothOn: 'PoweredOff', //correct wording
    connectedDevices: [],
    isLoading: '',
    scannedDevices: [],
    isSendingSignal: false,
  },
};
