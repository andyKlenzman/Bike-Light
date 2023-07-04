import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {changeDrawer} from '../state/slices/drawerSlice';
import theme from '../styles/theme';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  Easing,
  cancelAnimation,
  createAnimatedComponent,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import readSensors from '../utils/Sensors';

const NavButton = ({drawer, icon}) => {
  const dispatch = useDispatch();
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  // creates glowing border if feedback and isSendingSignal is TRUE
  const {RotationSensor} = readSensors();
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);

  const feedbackStyles = useAnimatedStyle(() => {
    if (isSendingSignal) {
      const color = Math.abs(RotationSensor.sensor.value.yaw * 100);
      
      return {
        borderColor: `hsl(${color}, 50%,50%)`,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5,
        shadowColor: `hsl(${color}, 50%,50%)`,
      };
    } else {
      return {};
    }
  });

  // creates pulsing effect to guide users to next action
  const opacity = useSharedValue(0);
  const highlightedButton = useSelector(
    state => state.appStatus.highlightedButton,
  );
  const highlightedButtonStyle = useAnimatedStyle(() => {
    return {
      borderWidth: 2,
      borderColor: `hsla(100, 50%,50%,${opacity.value} )`, // need to find the HSL for '#00c3ff'
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.ease,
      }),
      -1,
    );
    // return () => cancelAnimation(opacity);
  }, []);

  const openDrawer = useSelector(state => state.drawer.openDrawer);

  return (
    <AnimatedTouchable
      style={[
        styles.button,
        openDrawer === drawer ? styles.selectedButton : null,
        //button blinks if app status directs user to that drawer
        highlightedButton === drawer && openDrawer !== drawer
          ? highlightedButtonStyle
          : null,
        feedbackStyles,
      ]}
      onPress={() => dispatch(changeDrawer(drawer))}>
      <Icon name={`${icon}`} size={theme.iconSize.medium} color="white" />
    </AnimatedTouchable>
  );
};

export default NavButton;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '15%',
    width: '100%',
    justifyContent: 'center',

    alignItems: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    // maxWidth: '%80',
    // height: '%80',
    // backgroundColor: 'red',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: theme.componentRatios.navButton,
    height: theme.componentRatios.navButton,
    borderRadius: 40,
    marginHorizontal: 20,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
    shadowColor: '#00c3ff',
  },
  selectedButton: {
    backgroundColor: '#3B3B3D',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    borderWidth: 2,
    borderColor: '#00c3ff',
  },
  disabledButton: {
    backgroundColor: 'yellow',
  },
});
