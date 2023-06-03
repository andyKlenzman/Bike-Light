import {mapAndRoundNumber} from './mapAndRoundNumber';

// can possibly use to build out new features
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDecay,
} from 'react-native-reanimated';

export const transformSensorDataForBluetooth = (
  RotationSensor,
  AccelerometerSensor,
  GyroscopeSensor,
  GravitySensor,
  MagneticSensor,
) => {
  console.log(
    'accel: ',
    AccelerometerSensor.sensor.value.x,
    AccelerometerSensor.sensor.value.y,
    AccelerometerSensor.sensor.value.z,
  );
  console.log('gyro: ', GyroscopeSensor.sensor.value);
  console.log('gravity: ', GravitySensor.sensor.value);
  console.log('magnet: ', MagneticSensor.sensor.value);
  console.log('rot: ', RotationSensor.sensor.value);
  const rotX = mapAndRoundNumber(
    RotationSensor.sensor.value.roll,
    -1,
    1,
    0,
    255,
  );
  const rotY = mapAndRoundNumber(
    RotationSensor.sensor.value.yaw,
    -1,
    1,
    0,
    255,
  );
  const rotZ = mapAndRoundNumber(
    RotationSensor.sensor.value.pitch,
    -1,
    1,
    0,
    255,
  );

  return [rotX, rotY, rotZ];
};
