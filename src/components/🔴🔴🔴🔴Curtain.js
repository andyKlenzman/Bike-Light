// This file handles the conditional rendering, gesture control, positioning, and content of the curtain feature.

import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import theme from '../styles/theme';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {curtainVals} from '../state/config/curtainState';
import {
  changeCurtainState,
  changeCurtainStateAndContent,
} from '../state/slices/curtainSlice';
import readSensors from '../utils/Sensors';
import Tutorial from './🟢🟢Tutorial';
import FAQs from './🟢🟢FAQs';
import ScreenLock from './🟢🟢ScreenLock';
export const Curtain = () => {
  const dispatch = useDispatch();
  const screenHeight = -Dimensions.get('window').height;
  const {RotationSensor} = readSensors();

  // Selectors from redux state
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);
  const curtainContent = useSelector(state => state.curtain.content);
  const curtainState = useSelector(state => state.curtain.state);

  // Constants for the content of the Curtain
  //change this to one value and use a switch case
  const isTutorial = curtainContent === curtainVals.content.tutorial;
  const isFAQ = curtainContent === curtainVals.content.faq;
  const isLocked = curtainContent === curtainVals.content.screenLock;
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
  //STATE HANDLER
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////

  // Sets the coordinates and the position of the curtain based on the app state.
  useEffect(() => {
    let newCoordinates;
    let newState;

    if (isSendingSignal) {
      switch (curtainState) {
        case curtainVals.state.open:
          newCoordinates = curtainVals.coordinates.open;
          newState = curtainVals.state.open;
          break;
        default:
          newCoordinates = curtainVals.coordinates.peeking;
          newState = curtainVals.state.peeking;
      }
    } else {
      newCoordinates = curtainVals.coordinates.closed;
      newState = curtainVals.state.closed;
    }

    dispatch(
      changeCurtainStateAndContent({
        state: newState,
        content: curtainVals.content.screenLock,
      }),
    );
    start.value = offset.value = newCoordinates;
  }, [curtainState, isSendingSignal]);

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
      // faciliates the curtains positions to new locations based on the user's gestures commands
      let newCoordinates;
      let newState;

      if (isCurtainOpen) {
        if (offset.value > curtainVals.transitions.whenOpen) {
          newCoordinates = curtainVals.coordinates.open;
          newState = curtainVals.state.open;
        } else {
          newCoordinates = curtainVals.coordinates.peeking;
          newState = curtainVals.state.peeking;
        }
      } else if (isCurtainPeeking) {
        if (offset.value <= curtainVals.transitions.whenClosed) {
          newCoordinates = curtainVals.coordinates.peeking;
          newState = curtainVals.state.peeking;
        } else {
          newCoordinates = curtainVals.coordinates.open;
          newState = curtainVals.state.open;
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
        {isLocked ? <ScreenLock /> : null}

        {isFAQ ? <FAQs /> : null}
        {isTutorial ? <Tutorial /> : null}
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
    paddingTop: 80,
  },
  
});
