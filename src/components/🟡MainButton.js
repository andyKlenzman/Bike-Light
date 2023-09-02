// this file is the central button in the navbar. It shows active styles when the buetooth device is connected, and is the parent file for facilitating essentual functions like sending datat to the bluetooth device


import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import readSensors from '../utils/Sensors';
import {
  startBluetoothCommunication,
  stopBluetoothCommunication,
} from '../utils/Bluetooth/startBluetoothCommunication';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {selectActiveLightModeKey} from '../state/selectors/lightMode/selectActiveLightModeKey';
import theme from '../styles/theme';

const MainButton = () => {
  const dispatch = useDispatch();

  // state selections to determine the conditional rendering of the button
  const connectedDevices = useSelector(
    state => state.bluetooth.connectedDevices,
  );
  const isButtonActive = connectedDevices.length > 0;
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);

  // light mode to be passed as prop to startBluetoothCommunication
  const lightModeKey = useSelector(selectActiveLightModeKey);

  // Data used to send information to bluetooth are used to pass to send data to bluetooth
  const {
    RotationSensor,
    AccelerometerSensor,
    GyroscopeSensor,
    GravitySensor,
    MagneticSensor,
  } = readSensors();

  // creates multicolored effect for play button
  const activeButtonStyle = useAnimatedStyle(() => {
    const color = Math.abs(RotationSensor.sensor.value.yaw * 100);

    return {
      backgroundColor: `hsl(${color}, 50%,50%)`,
      // backgroundColor: theme.colors.primaryBorder,
    };
  });

  const disabledButtonStyle = {
    backgroundColor: theme.colors.disabledMainButton,
  };

  if (isSendingSignal && isButtonActive) {
    //renders active stop button

    return (
      <TouchableOpacity onPress={() => stopBluetoothCommunication(dispatch)}>
        <Animated.View style={[activeButtonStyle, styles.button]}>
          <Icon name="pause" size={theme.iconSize.medium} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  } else if (isButtonActive && !isSendingSignal) {
    //active start button
    return (
      <TouchableOpacity
        onPress={() => {
          startBluetoothCommunication(
            dispatch,
            lightModeKey,
            connectedDevices,
            RotationSensor,
            AccelerometerSensor,
            GyroscopeSensor,
            GravitySensor,
            MagneticSensor,
          );
        }}>
        <Animated.View style={[activeButtonStyle, styles.button]}>
          <Icon
            name="play"
            size={theme.iconSize.medium}
            color={theme.colors.primaryIcon}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  } else if (!isButtonActive && !isSendingSignal) {
    //inactive button
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={[styles.button, disabledButtonStyle]}>
          <Icon
            name="play"
            size={theme.iconSize.medium}
            color={theme.colors.disabledIcon}
          />
        </View>
      </TouchableOpacity>
    );
  }
};

export default MainButton;
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
    maxWidth: 75,
    height: 70,
    backgroundColor: 'red',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 40,
    marginHorizontal: 20,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 20,
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
