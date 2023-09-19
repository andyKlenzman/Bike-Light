// This file is the Text shown in the app status bar. It works by reading the app state, and displaying the appropritate app value.

import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useAnimatedStyle,
} from 'react-native-reanimated';

import theme from '../styles/theme';
import {useSelector} from 'react-redux';
import readSensors from '../utils/Sensors';

export const BannerText = () => {
  const appStatus = useSelector(state => state.appStatus.status); // text displayed on banner
  const {RotationSensor} = readSensors();
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);

  // These styles create the responsive border when the signal is sending.
  const feedbackStyles = useAnimatedStyle(() => {
    if (isSendingSignal) {
      const color = Math.abs(RotationSensor.sensor.value.yaw * 100);
      return {
        borderTopColor: `hsl(${color}, 50%,50%)`,
      };
    } else {
      return {
        borderTopColor: theme.colors.primaryBorder,
      };
    }
  });

  //if the bannerText icon is set to spin, animated styles will rotate the icon.

  // runs the spinning icon on repeat

  return (
    <Animated.View style={[styles.container, feedbackStyles]}>
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>{appStatus.text}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    width: '100%',
    // paddingHorizontal: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    textAlign: 'center',
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.primaryFont,
    marginHorizontal: 10,
    width: 'auto',
  },
  container: {
    // margin: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: theme.componentRatios.appStatus,
    borderTopWidth: 2,
    borderTopColor: theme.colors.primaryBorder,

    width: 'auto',
  },
});
