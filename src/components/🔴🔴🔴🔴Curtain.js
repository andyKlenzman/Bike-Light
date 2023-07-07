import {View, StyleSheet, Text} from 'react-native';
import {DrawerStyles} from '../styles/DrawerStyles';
import BluetoothPairing from './🟢🟢RenderBluetoothScreen';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {ListItem} from './🟡ListItem';
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
import {curtainState} from '../state/config/curtainState';
import {changeCurtainState} from '../state/slices/curtainSlice';

export const Curtain = () => {
  const dispatch = useDispatch();
  const screenHeight = -Dimensions.get('window').height;

  const screenPosition = {
    hidden: screenHeight,
    peeking: screenHeight * 0.7,
    partiallyOpen: theme.componentRatios.drawers,
    fullyOpen: 0,
  };
  const screenTransition = {
    whenHidden: screenHeight * 0.6,
    whenOpen: screenHeight * 0.5,
  };

  //in retrospect, these value should be paired since they are so frequently updated in tendem
  const start = useSharedValue(screenPosition.hidden);
  const offset = useSharedValue(screenPosition.hidden);
  const isPressed = useSharedValue(false);

  const curtainPosition = useSelector(state => state.curtain.isOpen);
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);

  // wrapper required for runOnJS function
  const changeCurtainWrapper = arg => {
    console.log(arg);
    dispatch(changeCurtainState(arg));
  };

  // cha
  useEffect(() => {
    let newCurtainLocation;
    // if sending lights, show the pull down menu for locking the screen, and return to peeking if the person stops playing.
    if (isSendingSignal && curtainPosition !== curtainState.isOpen.fullyOpen) {
      newCurtainLocation = screenPosition.peeking;
      dispatch(changeCurtainState(curtainState.isOpen.peeking));
    } else if (!isSendingSignal) {
      newCurtainLocation = screenPosition.hidden;
    } else if (curtainPosition === curtainState.isOpen.closed) {
      // newOpenDrawer = screenPosition.right;
    } else if (curtainPosition === curtainState.isOpen.peeking) {
      newCurtainLocation = screenPosition.peeking;
    } else if (curtainPosition === curtainState.isOpen.partiallyOpen) {
    } else if (curtainPosition === curtainState.isOpen.fullyOpen) {
      newCurtainLocation = screenPosition.fullyOpen;
    }
    offset.value = newCurtainLocation;
    start.value = newCurtainLocation;
  }, [curtainPosition, isSendingSignal]);

  // controls animation effects
  const animatedStyles = useAnimatedStyle(() => {
    if (isPressed.value) {
      return {
        transform: [{translateY: offset.value}],
      };
    } else {
      return {
        transform: [{translateY: withTiming(offset.value, {duration: 100})}],
      };
    }
  });

  // this code is very long and hard to read. A lot of this could be abstracted.
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      const translation = start.value + e.translationY;
      offset.value = e.translationY + start.value;
      console.log(translation, offset.value, start.value, screenHeight);
      // blocks swiping too far down
      if (translation > screenPosition.hidden) {
        offset.value = screenPosition.fullyOpen;
      }
      // acceptable range of motion
      if (translation < 0 && translation > screenHeight) {
        offset.value = e.translationY + start.value;
      }
      //blocks swiping too far up
      if (translation < screenHeight) {
        offset.value = screenPosition.hidden;
      }
    })
    .onEnd(() => {
      start.value = offset.value;
    })
    .onFinalize(() => {
      // if the curtain is fully open
      console.log(
        'ONE FINALIZE',
        curtainPosition,
        curtainState.isOpen.fullyOpen,
      );
      if (curtainPosition === curtainState.isOpen.fullyOpen) {
        if (offset.value >= screenTransition.whenOpen) {
          // lock to bottom
          offset.value = screenPosition.fullyOpen;
          start.value = screenPosition.fullyOpen;
          runOnJS(changeCurtainWrapper)(curtainState.isOpen.fullyOpen);
        } else if (offset.value < screenTransition.whenOpen) {
          // or lock it to the peeking state
          offset.value = screenPosition.peeking;
          start.value = screenPosition.peeking;
          runOnJS(changeCurtainWrapper)(curtainState.isOpen.peeking);
        }
      }

      // if the curtain is in the 'peeking' position
      else if (curtainPosition === curtainState.isOpen.peeking) {
        if (offset.value >= screenTransition.whenHidden) {
          console.log('RUNNNG TO FULLYOPEN');

          // lock to the fully open position
          offset.value = screenPosition.fullyOpen;
          start.value = screenPosition.fullyOpen;
          runOnJS(changeCurtainWrapper)(curtainState.isOpen.fullyOpen);
        } else if (offset.value < screenTransition.whenHidden) {
          // or lock it to the peeking state
          console.log('RUNNNG TO PEERKING');
          offset.value = screenPosition.peeking;
          start.value = screenPosition.peeking;
          runOnJS(changeCurtainWrapper)(curtainState.isOpen.peeking);
        }
      }

      isPressed.value = false;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]}>
        {curtainPosition === curtainState.isOpen.fullyOpen ? (
          <Text style={[styles.text]}>SCREEN LOCKED</Text>
        ) : (
          <Text style={[styles.text]}>SWIPE TO LOCK SCREEN</Text>
        )}
        <Icon
          size={theme.iconSize.medium}
          style={styles.icon}
          name={
            curtainPosition === curtainState.isOpen.fullyOpen
              ? 'lock'
              : 'arrow-down'
          }
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  //
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'hsla(200, 50%,30%, .9)', // can you create a blur like in tshare
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center horizontally
  },

  text: {
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.primaryFont,
    marginTop: '100%',
  },
  icon: {
    color: theme.colors.primaryIcon,
    marginTop: 20,
  },
});
