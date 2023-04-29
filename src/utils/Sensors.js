import Animated, {useAnimatedSensor, SensorType} from 'react-native-reanimated';

const readSensors = () => {
  const RotationSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 1,
  });

  const AccelerometerSensor = useAnimatedSensor(SensorType.ACCELEROMETER, {
    interval: 1,
  });

  const GyroscopeSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 1,
  });

  const GravitySensor = useAnimatedSensor(SensorType.GRAVITY, {
    interval: 1,
  });

  const MagneticSensor = useAnimatedSensor(SensorType.MAGNETIC_FIELD, {
    interval: 1,
  });

  return {
    RotationSensor,
    AccelerometerSensor,
    GyroscopeSensor,
    GravitySensor,
    MagneticSensor,
  };
};

export default readSensors;
