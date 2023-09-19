import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
//serves as foundation for devices lists, purchase boxes, and item selectors
import {Linking} from 'react-native';

//may be adding too much functionality, can this fuck with perforamnce?
export const PurchaseTile = ({}) => {
  const [isActive, setIsActive] = useState(false);
  const [textStyles, setTextStyles] = useState({});
  const [itemStyles, setItemStyles] = useState({});
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const feedbackStyles = useAnimatedStyle(() => {
    if (isActive) {
      return {
        justifyContent: 'center',
        color: 'white',
        backgrounColor: 'orange',
      };
    } else {
      return {};
    }
  });

  useEffect(() => {
    if (isActive) {
      setTextStyles({
        color: 'white',
      });
      setItemStyles({
        justifyContent: 'center',
      });
    }
  }, [isActive]);
  if (isActive) {
    return (
      <AnimatedTouchable activeOpacity={1} style={[styles.item, itemStyles]}>
        <TouchableOpacity
          style={[styles.icons, styles.iconLeft]}
          onPress={() => {
            Linking.openURL('https://linktr.ee/LightbenderLights');
          }}>
          <Icon name="check" size={theme.iconSize.medium} color="green" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.icons, styles.iconRight]}
          onPress={() => setIsActive(false)}>
          <Text style={styles.iconRight}>X</Text>
        </TouchableOpacity>
        <Text style={[styles.title, textStyles]}>Open browser</Text>
      </AnimatedTouchable>
    );
  } else {
    return (
      <AnimatedTouchable
        onPress={() => {
          setIsActive(true);
        }}
        activeOpacity={0.3}
        style={[styles.item]}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.title]}>
          + get lights
        </Text>
      </AnimatedTouchable>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 10,
  },
  item: {
    minWidth: '100%',
    height: 100,
    padding: 10,
    fontSize: 15,
    borderWidth: 2,
    borderStyle: 'dashed',

    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',

    borderRadius: 10,
  },

  icons: {
    position: 'absolute',
    zIndex: 2,

    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  iconLeft: {
    left: '0%',
    top: '5%',
  },
  iconRight: {
    left: '70%',
    top: '0%',

    color: 'red',
    fontSize: theme.iconSize.medium,
    fontWeight: 900,
  },
});
