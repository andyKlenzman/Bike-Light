// This file handles the behavior of the drawers (left and right), including the ability to swipe between them and to change which drawer is showing based on the appStatus set by the navButtons

import RightDrawer from './🟣🟣🟣RightDrawer';
import LeftDrawer from './🟣🟣🟣LeftDrawer';
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
import {DrawerStyles} from '../styles/DrawerStyles';
import {changeDrawer} from '../state/slices/drawerSlice'; // handles the gestures and toggling of three main drawers
import {Text, View} from 'react-native';
const Drawers = () => {
  const screenWidth = -Dimensions.get('window').width; // made window negative to avoid putting - in every function
  const dispatch = useDispatch();

  const screenPosition = {
    left: 0,
    right: screenWidth,
  };

  // transition point is positioned at 25% of the screen width
  const screenTransition = {
    whenRightDrawerOpen: screenWidth / 2 - -screenWidth * 0.25,
    whenLeftDrawerOpen: screenWidth / 2 + -screenWidth * 0.25,
  };

  const start = useSharedValue(screenPosition.right);
  const offset = useSharedValue(screenPosition.right);
  const isPressed = useSharedValue(false);
  const openDrawer = useSelector(state => state.drawer.openDrawer);

  //updates openDrawer when user swipes to new drawer
  //Functions needs to be put in wrapper to execute in runOnJS
  const changeDrawerWrapper = arg => {
    dispatch(changeDrawer(arg));
  };

  // changes drawer based on NavButton clicks
  useEffect(() => {
    let newOpenDrawer;
    if (openDrawer === 'right') {
      newOpenDrawer = screenPosition.right;
    } else if (openDrawer === 'left') {
      newOpenDrawer = screenPosition.left; //changed it as patcjh
    }
    offset.value = newOpenDrawer;
    start.value = newOpenDrawer;
  }, [openDrawer]);

  // controls animation effects
  const animatedStyles = useAnimatedStyle(() => {
    if (isPressed.value) {
      return {
        transform: [{translateX: offset.value}],
      };
    } else {
      return {
        transform: [{translateX: withTiming(offset.value, {duration: 100})}],
      };
    }
  });

  // handles how the touch functionality behaves for the drawers.
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      const translation = start.value + e.translationX;

      // blocks far left swipe
      if (translation > screenPosition.left) {
        offset.value = 0;
      }
      // acceptable range of motion
      if (
        translation < screenPosition.left &&
        translation > screenPosition.right
      ) {
        offset.value = e.translationX + start.value;
      }
      //blocks far right swipe
      if (translation < screenPosition.right) {
        offset.value = screenPosition.right;
      }
    })
    .onEnd(() => {
      start.value = offset.value;
    })
    .onFinalize(() => {
      // Determine which drawer is open and perform necessary actions based on offset value
      if (openDrawer === 'right') {
        if (offset.value >= screenTransition.whenRightDrawerOpen) {
          // lock to left drawer
          offset.value = screenPosition.left;
          start.value = screenPosition.left;
          runOnJS(changeDrawerWrapper)('left');
        } else if (offset.value < screenTransition.whenRightDrawerOpen) {
          // lock to right drawer
          offset.value = screenPosition.right;
          start.value = screenPosition.right;
          runOnJS(changeDrawerWrapper)('right');
        }
      }
      if (openDrawer === 'left') {
        if (offset.value >= screenTransition.whenLeftDrawerOpen) {
          // lock to left drawer
          offset.value = screenPosition.left;
          start.value = screenPosition.left;
          runOnJS(changeDrawerWrapper)('left');
        } else if (offset.value < screenTransition.whenLeftDrawerOpen) {
          // lock to right drawer
          offset.value = screenPosition.right;
          start.value = screenPosition.right;
          runOnJS(changeDrawerWrapper)('right');
        }
      }

      isPressed.value = false;
    });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[DrawerStyles.sectionContainer, animatedStyles]}>
        <LeftDrawer />
        <RightDrawer />
      </Animated.View>
    </GestureDetector>
  );
};

export default Drawers;
