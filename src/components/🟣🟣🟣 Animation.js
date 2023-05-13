import {StyleSheet, View, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDecay,
} from 'react-native-reanimated';
import readSensors from '../utils/Sensors';

/* 
  Presents sensor Animation
*/

const Animation = () => {
  const {
    RotationSensor,
    AccelerometerSensor,
    GyroscopeSensor,
    GravitySensor,
    MagneticSensor,
  } = readSensors();
  

  const style = useAnimatedStyle(() => {
    const yaw = Math.abs(RotationSensor.sensor.value.yaw);
    const pitch = Math.abs(RotationSensor.sensor.value.pitch);
    const roll = Math.abs(RotationSensor.sensor.value.roll);
    return {
      height: withTiming(yaw * 20 + 20, {duration: 100}), // <- usage
      width: withTiming(pitch * 20 + 20, {duration: 100}), // <- usage
      backgroundColor: `hsl(${pitch * 100}, 50%,50%)`, // <- usage
    };
  });

  const accelerometerStyle = useAnimatedStyle(() => {
    const x = Math.abs(AccelerometerSensor.sensor.value.x);
    const y = Math.abs(AccelerometerSensor.sensor.value.y);
    const z = Math.abs(Math.round(AccelerometerSensor.sensor.value.z) * 10);
    return {
      height: withTiming(x * 2 + 20, {duration: 100}), // <- usage
      width: withTiming(y * 2 + 20, {duration: 100}), // <- usage
      backgroundColor: `hsl(${z}, 50%,50%)`, // <- usage
    };
  });

  const gyroscopeStyle = useAnimatedStyle(() => {
    const x = Math.abs(GyroscopeSensor.sensor.value.x);
    const y = Math.abs(GyroscopeSensor.sensor.value.y);
    const z = Math.abs(Math.round(GyroscopeSensor.sensor.value.z) * 10);
    return {
      height: withTiming(x * 2 + 20, {duration: 100}), // <- usage
      width: withTiming(y * 2 + 20, {duration: 100}), // <- usage
      backgroundColor: `hsl(${z}, 50%,50%)`, // <- usage
    };
  });

  const gravityStyle = useAnimatedStyle(() => {
    const x = Math.abs(GravitySensor.sensor.value.x);
    const y = Math.abs(GravitySensor.sensor.value.y);
    const z = Math.abs(Math.round(GravitySensor.sensor.value.z) * 10);
    return {
      height: withTiming(x * 2 + 20, {duration: 100}), // <- usage
      width: withTiming(y * 2 + 20, {duration: 100}), // <- usage
      backgroundColor: `hsl(${z}, 50%,50%)`, // <- usage
    };
  });

  const magneticStyle = useAnimatedStyle(() => {
    const x = Math.abs(MagneticSensor.sensor.value.x);
    const y = Math.abs(MagneticSensor.sensor.value.y);
    const z = Math.abs(Math.round(MagneticSensor.sensor.value.z) * 10);
    return {
      height: withTiming(x, {duration: 100}), // <- usage
      width: withTiming(y, {duration: 100}), // <- usage
      backgroundColor: `hsl(${z}, 50%,50%)`, // <- usage
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.animatedContainer}>
        <Text style={styles.text}>Rotation</Text>
        <Animated.View
          style={[{backgroundColor: 'green'}, style, styles.animation]}
        />
      </View>
      <View style={styles.animatedContainer}>
        <Text style={styles.text}>Accelerometer</Text>
        <Animated.View style={accelerometerStyle} />
      </View>
      <View style={styles.animatedContainer}>
        <Text style={styles.text}>Gyroscope</Text>
        <Animated.View style={gyroscopeStyle} />
      </View>
      <View style={styles.animatedContainer}>
        <Text style={styles.text}>Gravity</Text>
        <Animated.View style={gravityStyle} />
      </View>
      <View style={styles.animatedContainer}>
        <Text style={styles.text}>Magnetic</Text>
        <Animated.View style={magneticStyle} />
      </View>
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    zIndex: 1,
  },
  box: {
    height: 100,
    backgroundColor: 'blue',
  },
  animation: {
    position: 'absolute',
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
