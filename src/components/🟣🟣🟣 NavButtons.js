import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import {changeDrawer} from '../state/slices/drawerSlice';

import readSensors from '../utils/Sensors';
const NavButtons = () => {
  const dispatch = useDispatch();
  const {RotationSensor, MagneticSensor} = readSensors();

  // Query UI state for
  const openDrawer = useSelector(state => state.drawer.openDrawer);

  const buttonStyle = useAnimatedStyle(() => {
    const diameter = Math.abs(MagneticSensor.sensor.value.x / 20 + 8);
    const color = Math.abs(RotationSensor.sensor.value.yaw * 100);

    return {
      height: withTiming(diameter * 10 + 10, {duration: 100}), 
      width: withTiming(diameter * 10 + 10, {duration: 100}), 
      backgroundColor: `hsl(${color}, 50%,50%)`, 
      borderRadius: withTiming((diameter * 10) / 2 +10 , {duration: 100}), // Ensures the button stays circular
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => dispatch(changeDrawer('left'))}>
            <Icon name="sliders" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => dispatch(changeDrawer('center'))}>
          <Animated.View style={[buttonStyle, styles.button]}>
            <Icon name="play" size={30} color="white" />
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => dispatch(changeDrawer('right'))}>
            <Icon name="bluetooth" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NavButtons;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '10%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 60,
    height: 60,
    borderRadius: 30,

    shadowColor: '#00c3ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
