import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {changeDrawer} from '../state/slices/drawerSlice';
import readSensors from '../utils/Sensors';
import {
  startBluetoothCommunication,
  stopBluetoothCommunication,
} from '../utils/Bluetooth/startBluetoothCommunication';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useEffect} from 'react';
import NavButton from './🟡NavButton';
import theme from '../styles/theme';

const MainButton = () => {
  // following are used to pass to send data to bluetooth
  const dispatch = useDispatch();
  const {
    RotationSensor,
    AccelerometerSensor,
    GyroscopeSensor,
    GravitySensor,
    MagneticSensor,
  } = readSensors();
  const connectedDevices = useSelector(
    state => state.bluetooth.connectedDevices,
  );
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);

  //creates multicolored effect for play button
  const startButtonStyle = useAnimatedStyle(() => {
    const color = Math.abs(RotationSensor.sensor.value.yaw * 100);
    if (connectedDevices.length === 0) {
      return {
        backgroundColor: '#545454',
      };
    } else {
      return {
        backgroundColor: `hsl(${color}, 50%,50%)`,
      };
    }
  });

  //creates disabled play button styles
  const stylesIfButtonDisabled = () => {
    if (connectedDevices.length === 0) {
      return {
        backgroundColor: '#545454',
      };
    }
  };
  const openDrawer = useSelector(state => state.drawer.openDrawer);

  if (isSendingSignal) {
    return (
      <TouchableOpacity onPress={() => stopBluetoothCommunication(dispatch)}>
        <Animated.View style={[startButtonStyle, styles.button]}>
          <Icon name="pause" size={theme.iconSize.medium} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          startBluetoothCommunication(
            dispatch,
            connectedDevices,
            RotationSensor,
            AccelerometerSensor,
            GyroscopeSensor,
            GravitySensor,
            MagneticSensor,
          );
        }}>
        <Animated.View
          style={[startButtonStyle, styles.button, stylesIfButtonDisabled()]}>
          <Icon
            name="play"
            size={theme.iconSize.medium}
            color={theme.colors.primaryIcon}
          />
        </Animated.View>
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
