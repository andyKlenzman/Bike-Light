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
} from 'react-native-reanimated';
import {useEffect} from 'react';

const NavButton = ({drawer, icon}) => {
  const dispatch = useDispatch();

  // creates pulsing effect to guide users to next action
  const opacity = useSharedValue(0);
  const highlightedButtonStyle = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
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
    return () => cancelAnimation(opacity);
  }, []);

  const openDrawer = useSelector(state => state.drawer.openDrawer);

  return (
    <Animated.View style={[styles.buttonContainer, highlightedButtonStyle]}>
      <TouchableOpacity
        style={[
          styles.button,
          openDrawer === drawer ? styles.selectedButton : null,
        ]}
        onPress={() => dispatch(changeDrawer(drawer))}>
        <Icon name={`${icon}`} size={theme.iconSize.medium} color="white" />
      </TouchableOpacity>
    </Animated.View>
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
    maxWidth: 70,
    height: 70,
    // backgroundColor: 'red',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 70,
    height: 70,
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
    shadowOpacity: 0.7,
    shadowRadius: 15,
    borderWidth: 2,
    borderColor: '#00c3ff',
  },
  disabledButton: {
    backgroundColor: 'yellow',
  },
});
