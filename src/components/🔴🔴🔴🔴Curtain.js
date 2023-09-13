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
import {
  changeCurtainState,
  changeCurtainStateAndContent,
  changeCurtainContent,
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
  const start = useSharedValue(curtainVals.coordinates.closed);
  const offset = useSharedValue(curtainVals.coordinates.closed);
  const isPressed = useSharedValue(false);

  // constants that read application state, and will later be used to  conditionally render the curtain state and style.
  const isCurtainOpen = curtainState === curtainVals.state.open;
  const isCurtainPeeking = curtainState === curtainVals.state.peeking;

  //constatns to conditionally render curtain contnent
  const isTutorial = curtainContent === curtainVals.content.tutorial;
  const isFAQ = curtainContent === curtainVals.content.faq;
  const isLocked = curtainContent === curtainVals.content.screenLock;

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
    console.log('Is sending signal useEffect fires');

    switch (curtainState) {
      case curtainVals.state.open:
        newCoordinates = curtainVals.coordinates.open;
        // newState = curtainVals.state.open;
        break;
      case curtainVals.state.peeking:
        newCoordinates = curtainVals.coordinates.peeking;
        // newState = curtainVals.state.peeking;
        break;
      default:
      // newState = curtainVals.state.closed;
    }
    if (newCoordinates) {
      dispatch(changeCurtainContent(curtainVals.content.screenLock));
      start.value = offset.value = newCoordinates;
    }
  }, [isSendingSignal]);

  useEffect(() => {
    let newCoordinates;
    console.log('FIRE ');

    switch (curtainState) {
      case curtainVals.state.closed:
        console.log('CASE closed');
        newCoordinates = curtainVals.coordinates.closed;
        break;
      case curtainVals.state.open:
        console.log('CASE OPEN');
        newCoordinates = curtainVals.coordinates.open;
        break;
      default:
        console.log('CASE DEFAULT');

      // newCoordinates = curtainVals.coordinates.closed;
    }

    console.log('New curtain state', newCoordinates, curtainState);
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
    console.log('Running state wrapper');
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
      //i need to
      if (isCurtainOpen) {
        //if the content is LockedScreen, then transition between peeking and open states, or else if it FAW or tutorial, just close the screen.
        if (isLocked) {
          if (offset.value > curtainVals.transitions.whenOpen) {
            newCoordinates = curtainVals.coordinates.open;
            newState = curtainVals.state.open;
          } else {
            newCoordinates = curtainVals.coordinates.peeking;
            newState = curtainVals.state.peeking;
          }
        } else if (isFAQ || isTutorial) {
          console.log(
            'In the onUpdate Offset',
            offset.value,
            curtainVals.transitions.whenOpen,
            offset.value < curtainVals.transitions.whenOpen,
          );
          if (offset.value < curtainVals.transitions.whenOpen) {
            newCoordinates = curtainVals.coordinates.open;
            newState = curtainVals.state.open;
          } else {
            newCoordinates = curtainVals.coordinates.closed;
            newState = curtainVals.state.closed;
          }
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
  },
});

// useEffect(() => {
//   let newCoordinates;
//   let newState;

//   if (isSendingSignal) {
//     console.log('Is sending signal');
//     switch (curtainState) {
//       case curtainVals.state.open:
//         newCoordinates = curtainVals.coordinates.open;
//         newState = curtainVals.state.open;
//         break;
//       default:
//         newCoordinates = curtainVals.coordinates.peeking;
//         newState = curtainVals.state.peeking;
//     }
//   } else {
//     switch (curtainState) {
//       case curtainVals.state.open:
//         console.log('CASE OPEN');
//         newCoordinates = curtainVals.coordinates.open;
//         newState = curtainVals.state.open;
//         break;
//       case curtainVals.state.closed:
//         console.log('CASE CLOSED');
//         newCoordinates = curtainVals.coordinates.closed;
//         newState = curtainVals.state.closed;
//         break;
//       default:
//         console.log('CASE DEFAULT');
//         newCoordinates = curtainVals.coordinates.closed;
//         newState = curtainVals.state.closed;
//     }
//   }

//   console.log('New curtain state', newState, newCoordinates);
//   dispatch(changeCurtainState(newState));
//   start.value = offset.value = newCoordinates;
// }, [curtainState, isSendingSignal]);
