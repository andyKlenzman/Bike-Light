import SettingsDrawer from '../drawers/🟢🟢SettingsDrawer';
import DeviceDrawer from '../drawers/🟢🟢DeviceDrawer';
import CenterDrawer from '../drawers/🟢🟢 CenterDrawer';
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
import {DrawerStyles} from './DrawerStyles';
import {changeDrawer} from '../state/slices/drawerSlice';
// handles the gestures and toggling of three main drawers

const Drawers = () => {
  const dispatch = useDispatch();
  const screenWidth = -Dimensions.get('window').width; // negative saves having to put a negative sign in front of every function. View object moves into negative X direction

  const screenPosition = {
    left: 0,
    center: screenWidth,
    right: screenWidth * 2,
  };

  const screenTransitions = {
    leftCenter: screenWidth / 2,
    centerRight: screenPosition.right - screenWidth / 2,
    // it could even be a function.
  };
  const start = useSharedValue(screenPosition.center);
  const offset = useSharedValue(screenPosition.center);
  const isPressed = useSharedValue(false);

  const openDrawer = useSelector(
    state => state.drawer.openDrawer,
  );

  // sets the position based on nav button click
  useEffect(() => {
    let newValue;
    if (openDrawer === 'center') {
      newValue = screenPosition.center;
    } else if (openDrawer === 'right') {
      newValue = screenPosition.right;
    } else if (openDrawer === 'left') {
      newValue = screenPosition.left;
    }
    offset.value = newValue;
    start.value = newValue;
  }, [openDrawer]);

  // updates isDrawerOpen based on sliding gesture
  useEffect(() => {
    if (start.value === screenPosition.right) {
      dispatch(changeDrawer('right'));
    }
  }, [isPressed.value]);

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
      // acceptable range
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
      // lock to left range
      if (offset.value > screenTransitions.leftCenter) {
        offset.value = screenPosition.left;
        start.value = screenPosition.left;
      }
      // lock to center range
      if (
        offset.value < screenTransitions.leftCenter &&
        offset.value > screenTransitions.centerRight
      ) {
        offset.value = screenPosition.center;
        start.value = screenPosition.center;
      }
      // lock to right range
      if (offset.value < screenTransitions.centerRight) {
        offset.value = screenPosition.right;
        start.value = screenPosition.right;
      }
      isPressed.value = false;
    });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[DrawerStyles.sectionContainer, animatedStyles]}>
        <SettingsDrawer />
        <CenterDrawer />
        <DeviceDrawer />
      </Animated.View>
    </GestureDetector>
  );
};

export default Drawers;
