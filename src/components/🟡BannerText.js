import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import {useSharedValue} from 'react-native-reanimated';
import {useEffect} from 'react';
import theme from '../styles/theme';
import {useSelector} from 'react-redux';
import readSensors from '../utils/Sensors';
import {appStatusCodes} from '../content/appStatusCodes';

export const BannerText = () => {
  const {RotationSensor} = readSensors();
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);

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

  const rotation = useSharedValue(0);
  const appStatus = useSelector(state => state.appStatus.status);
  const animatedStyle = useAnimatedStyle(() => {
    if (appStatus.spin) {
      //if set to spin, animated styles activates.
      return {
        transform: [
          {
            rotateZ: `${rotation.value}deg`,
          },
        ],
      };
    } else {
      return {};
    }
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
    );
    // return () => cancelAnimation(rotation);
  }, []);

  return (
    <Animated.View style={[styles.container, feedbackStyles]}>
      <View style={styles.bannerContainer}>
        {appStatus.icon ? ( //adds icon if specified in props
          <Animated.View style={[animatedStyle, styles.iconContainer]}>
            <Icon
              name={`${appStatus.icon}`}
              size={theme.iconSize.small}
              color="#cccccc"
            />
          </Animated.View>
        ) : null}
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
    // borderBottomWidth: 2,
    // borderBottomColor: theme.colors.primaryBorder,
    width: 'auto',
  },
});
