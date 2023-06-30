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
export const BannerText = () => {
  const rotation = useSharedValue(0);
  const {text, icon, spin} = useSelector(state => state.appStatus.status);
  const animatedStyle = useAnimatedStyle(() => {
    if (spin) {
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
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        {icon ? ( //adds icon if specified in props
          <Animated.View style={[animatedStyle, styles.iconContainer]}>
            <Icon
              name={`${icon}`}
              size={theme.iconSize.small}
              color="#cccccc"
            />
          </Animated.View>
        ) : null}
        <Text style={styles.bannerText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '10%',
    borderTopWidth: 2,
    borderTopColor: theme.colors.primaryBorder,
    borderTopStyle:'dotted',
    // borderBottomWidth: 2,
    // borderBottomColor: theme.colors.primaryBorder,

    width: 'auto',
  },
});
