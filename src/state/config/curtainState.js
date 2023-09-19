// This file is the source of truth for the various states / names that the curtain component can be configured in.
import {Dimensions} from 'react-native';
const screenHeight = -Dimensions.get('window').height;

export const curtainVals = {
  state: {
    closed: 'closed',
    peeking: 'peeking',
    open: 'open',
  },
  // size of the curtain depending on the state of the curtain
  coordinates: {
    closed: screenHeight,
    peeking: screenHeight * 0.62,
    open: 0,
  },
  // points on the screen where a user swipe will trigger a change in the curtain's state.
  transitions: screenHeight * 0.5,
};
