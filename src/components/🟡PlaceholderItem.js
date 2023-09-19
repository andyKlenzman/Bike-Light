import React from 'react';
import {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useSelector} from 'react-redux';
import theme from '../styles/theme';
// //Loading component for
const PlaceholderItem = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;
  const openDrawer = useSelector(state => state.drawer.openDrawer);

  useEffect(() => {
    startShimmerAnimation();
  }, []);

  const startShimmerAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const shimmerOpacity = shimmerAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.16, 0.5, 0.16],
  });

  return (
    <View style={styles.item}>
      <Animated.View
        style={[styles.placeholderItem, {opacity: shimmerOpacity}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    minWidth: '100%',
    height: 100,
  },
  placeholderItem: { 
    flex: 1,
    backgroundColor: 'grey',
    opacity: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default PlaceholderItem;
