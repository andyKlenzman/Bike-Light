//This file is displayed for the user when they first enter the app, showing them the basic functionality of the app.

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../styles/theme';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  useSharedValue,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import ExitButton from './🟡ExitButton';

const Tutorial = () => {
  const rotation = useSharedValue(0);

  const rotatingPhoneIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  // runs the rotating phone icon on repeat
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(60, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);


  
  return (
    <View style={styles.container}>
      <ExitButton />
      <View style={styles.visualContainer}>
        <Animated.View style={rotatingPhoneIconStyle}>
          <Icon name="check" size={45} color="#cccccc" />
        </Animated.View>
        <Icon name="check" size={45} color="#cccccc" />
        <View style={styles.lightContainer}>
          <Text>🟢</Text>
          <Text>🟡</Text>
          <Text>🔴</Text>
        </View>
      </View>
      <Text style={styles.title}>
        Connect to bluetooth lights and move your phone to create lightshows
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSize.large,
    color: theme.colors.primaryFont,
    fontWeight: 'bold',
    marginTop: 30,
  },
  visualContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  lightContainer: {
    flex: 0,
  },
});

export default Tutorial;
