import {View} from 'react-native';
import {DrawerStyles} from '../styles/DrawerStyles';
import BluetoothPairing from './🟢🟢RenderBluetoothScreen';
import {useDispatch, useSelector} from 'react-redux';
import {ListItem} from './🟡ListItem';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

export const Curtain = () => {
  const screenHeight = Dimensions.get('window').height; // made window negative to avoid putting - in every function
  const screenPosition = {
    hidden: 0,
    isAvailable: 20,
    lockScreen: screenHeight,
    coverDrawerScreen: theme.componentRatios.drawers,
  };

  const start = useSharedValue(screenPosition.right);
  const offset = useSharedValue(screenPosition.right);
  const isPressed = useSharedValue(false);
  const openCurtain = useSelector(state => state.drawer.openDrawer);

  const changeDrawerWrapper = arg => {
    dispatch(changeDrawer(arg));
  };

  // changes drawer based on NavButton clicks
  //   useEffect(() => {
  //     let newOpenDrawer;
  //     if (openDrawer === 'right') {
  //       newOpenDrawer = screenPosition.right;
  //     } else if (openDrawer === 'left') {
  //       newOpenDrawer = screenPosition.left; //changed it as patcjh
  //     }
  //     offset.value = newOpenDrawer;
  //     start.value = newOpenDrawer;
  //   }, [openDrawer]);

  // controls animation effects
  const animatedStyles = useAnimatedStyle(() => {
    if (isPressed.value) {
      return {
        transform: [{translateY: offset.value}],
      };
    } else {
      return {
        transform: [{translateY: withTiming(offset.value, {duration: 100})}],
      };
    }
  });

  //   const gesture = Gesture.Pan()
  //     .onBegin(() => {
  //       isPressed.value = true;
  //     })
  //     .onUpdate(e => {
  //       const translation = start.value + e.translationX;

  //       // blocks far left swipe
  //       if (translation > screenPosition.left) {
  //         offset.value = 0;
  //       }
  //       // acceptable range of motion
  //       if (
  //         translation < screenPosition.left &&
  //         translation > screenPosition.right
  //       ) {
  //         offset.value = e.translationX + start.value;
  //       }
  //       //blocks far right swipe
  //       if (translation < screenPosition.right) {
  //         offset.value = screenPosition.right;
  //       }
  //     })
  //     .onEnd(() => {
  //       start.value = offset.value;
  //     })
  //     .onFinalize(() => {
  //       // Determine which drawer is open and perform necessary actions based on offset value
  //       if (openDrawer === 'right') {
  //         if (offset.value >= screenTransition.whenRightDrawerOpen) {
  //           // lock to left drawer
  //           offset.value = screenPosition.left;
  //           start.value = screenPosition.left;
  //           runOnJS(changeDrawerWrapper)('left');
  //         } else if (offset.value < screenTransition.whenRightDrawerOpen) {
  //           // lock to right drawer
  //           offset.value = screenPosition.right;
  //           start.value = screenPosition.right;
  //           runOnJS(changeDrawerWrapper)('right');
  //         }
  //       }
  //       if (openDrawer === 'left') {
  //         if (offset.value >= screenTransition.whenLeftDrawerOpen) {
  //           // lock to left drawer
  //           offset.value = screenPosition.left;
  //           start.value = screenPosition.left;
  //           runOnJS(changeDrawerWrapper)('left');
  //         } else if (offset.value < screenTransition.whenLeftDrawerOpen) {
  //           // lock to right drawer
  //           offset.value = screenPosition.right;
  //           start.value = screenPosition.right;
  //           runOnJS(changeDrawerWrapper)('right');
  //         }
  //       }

  //       isPressed.value = false;
  //     });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]}>
        {/* <Icon
        style={styles.icon}
        name={icon}
        size={theme.iconSize.medium}
        color="white" */}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  //
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'hsla(100, 50%,50%, .7)', // can you create a blur like in tshare
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
});
