import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../styles/theme';
import {listItemStyles} from '../styles/listItemStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import readSensors from '../utils/Sensors';
import {useSelector} from 'react-redux';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
//serves as foundation for devices lists, purchase boxes, and item selectors

//may be adding too much functionality, can this fuck with perforamnce?
export const ListItem = ({
  item,
  type,
  subtitle,
  onPress,
  title,
  status,
  center,
  activeOpacity,
  icon,
  fontColor,
  feedback,
}) => {
  const [conditionalContainerStyles, setConditionalContainerStyles] = useState(
    {},
  );
  const [conditionalTextStyle, setConditionalTextStyles] = useState({});

  // creates glowing border if feedback and isSendingSignal is TRUE
  const {RotationSensor} = readSensors();
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const feedbackStyles = useAnimatedStyle(() => {
    if (feedback) {
      if (isSendingSignal) {
        const color = Math.abs(RotationSensor.sensor.value.yaw * 100);
        return {
          borderColor: `hsl(${color}, 50%,50%)`,
        };
      } else {
        if (status === 'selected') {
          return {
            borderColor: theme.colors.primaryBorder,
          };
        }
        if (status === 'neutral') {
          return {
            borderColor: theme.colors.secondaryBorder,
          };
        } else {
          return {};
        }
      }
    } else {
      return {};
    }
  });

  //sets the styles based on props
  useEffect(() => {
    let newContainerStyles = {};
    let newTextStyles = {};
    if (type === 'purchase') {
      newContainerStyles = {
        ...newContainerStyles,
        borderStyle: 'dashed',
        flexDirection: 'row',
        alignItems: 'center',

        // marginBottom: 100,
      };
      newTextStyles = {
        color: 'grey',
      };
    }
    if (center) {
      newContainerStyles = {
        ...newContainerStyles,
        alignItems: 'center',
        justifyContent: 'center',
      };
    }
    if (status === 'pending') {
      newContainerStyles = {
        ...newContainerStyles,
        ...listItemStyles.pendingStyle,
      };
    } else if (status === 'selected') {
      newContainerStyles = {
        ...newContainerStyles,
        ...listItemStyles.selectedStyle,
      };
    } else {
      newContainerStyles = {
        ...newContainerStyles,
        ...listItemStyles.neutralStyle,
      };
    }
    setConditionalContainerStyles(newContainerStyles);
    setConditionalTextStyles(newTextStyles);
  }, [status]);

  // if
  return (
    <AnimatedTouchable
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[styles.item, conditionalContainerStyles, feedbackStyles]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.title, conditionalTextStyle]}>
        {type === 'bluetooth'
          ? item.name
            ? item.name
            : item.id
          : type === 'mode' || type === 'purchase'
          ? title
          : null}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {/* {icon ? (
        <Icon
          style={styles.icon}
          name={icon}
          size={theme.iconSize.medium}
          color="white"
        />
      ) : null} */}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  icon: {margin: 20},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
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

    borderRadius: 10,
  },
});
