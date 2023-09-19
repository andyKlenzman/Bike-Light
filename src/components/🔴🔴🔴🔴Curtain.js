// This file handles the conditional rendering, gesture control, positioning, and content of the curtain feature.

import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {curtainVals} from '../state/config/curtainState';
import {changeCurtainState} from '../state/slices/curtainSlice';
import readSensors from '../utils/Sensors';
import ScreenLock from './🟢🟢ScreenLock';

export const Curtain = () => {
  const dispatch = useDispatch();
  const screenHeight = -Dimensions.get('window').height;
  const {RotationSensor} = readSensors();

  // Selectors from redux state
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);
  const curtainState = useSelector(state => state.curtain.state);

  // Constants for the content of the Curtain
  const start = useSharedValue(curtainVals.coordinates.closed);
  const offset = useSharedValue(curtainVals.coordinates.closed);
  const isPressed = useSharedValue(false);

  // constants that read application state, and will later be used to  conditionally render the curtain state and style.
  const isCurtainOpen = curtainState === curtainVals.state.open;
  const isCurtainPeeking = curtainState === curtainVals.state.peeking;

  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  //SET COORDINATES FOR CURTAIN
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////

  // Sets the coordinates to 'peeking' and changes content to locked screen when bluetooth starts sending signal
  useEffect(() => {
    if (isSendingSignal) {
      start.value = offset.value = curtainVals.coordinates.peeking;
    } else {
      start.value = offset.value = curtainVals.coordinates.closed;
      dispatch(changeCurtainState(curtainVals.state.closed));
    }
  }, [isSendingSignal]);

  useEffect(() => {
    let newCoordinates;
    switch (curtainState) {
      case curtainVals.state.closed:
        newCoordinates = curtainVals.coordinates.closed;
        break;
      case curtainVals.state.open:
        newCoordinates = curtainVals.coordinates.open;
        break;
      default:
    }

    if (newCoordinates !== undefined) {
      start.value = offset.value = newCoordinates;
    }
  }, [curtainState]);

  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  //GESTURE HANDLER
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////

  const changeCurtainStateWrapper = arg => {
    dispatch(changeCurtainState(arg));
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      const translation = start.value + e.translationY;
      // Ensure the value stays within the height of the screen
      const newOffsetValue = Math.max(
        Math.max(translation, screenHeight),
        curtainVals.coordinates.closed,
      );
      // prevents curtain from moving past the bottom of the screen
      if (newOffsetValue > 0) {
        offset.value = 0;
      } else {
        offset.value = newOffsetValue;
      }
    })
    .onEnd(() => {
      start.value = offset.value;
    })
    .onFinalize(() => {
      // faciliates the curtains positions to locked positions based on the user's gestures commands
      let newCoordinates;
      let newState;

      //Constants to determine state and coordinate change
      const triggerTransition = offset.value <= curtainVals.transitions;

      if (isCurtainOpen) {
        if (triggerTransition) {
          newCoordinates = curtainVals.coordinates.peeking;
          newState = curtainVals.state.peeking;
        } else {
          newCoordinates = curtainVals.coordinates.open;
          newState = curtainVals.state.open;
        }
      }
      if (isCurtainPeeking) {
        if (!triggerTransition) {
          newCoordinates = curtainVals.coordinates.open;
          newState = curtainVals.state.open;
        } else {
          newCoordinates = curtainVals.coordinates.peeking;
          newState = curtainVals.state.peeking;
        }
      }

      offset.value = start.value = newCoordinates;
      runOnJS(changeCurtainStateWrapper)(newState);

      isPressed.value = false;
    });

  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  //ANIMATION STYLES
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////

  // controls touch gesture animation effects
  const animatedContainerStyles = useAnimatedStyle(() => {
    let color = Math.abs(RotationSensor.sensor.value.pitch * 100);

    //when the curtain is being touched, movement is instantly reponsive, otherwise it has a smooth effect
    if (isPressed.value) {
      return {
        transform: [{translateY: offset.value}],
        backgroundColor: `hsla(${color}, 50%,50%, .3)`,
        borderBottomWidth: 2,
        borderBottomColor: `hsl(${color}, 100%,50%)`,
      };
    } else {
      return {
        transform: [{translateY: withTiming(offset.value, {duration: 100})}],
        backgroundColor: `hsla(${color}, 50%,50%, .3)`,
        borderBottomWidth: 2,
        borderBottomColor: `hsl(${color}, 100%,50%)`,
      };
    }
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedContainerStyles]}>
        <ScreenLock />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  //
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'hsla(200, 90%,90%, .9)', // can you create a blur like in tshare
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
