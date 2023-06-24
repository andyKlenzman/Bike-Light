import {StyleSheet} from 'react-native';

export const DrawerStyles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '70%',
    maxHeight: '70%',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#00c3ff',
    backgroundColor: 'red'
  },
  drawerContainer: {
    height: '100%',
    backgroundColor: 'black',
    minWidth: '100%',
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'green',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },

  centerDrawer: {
    // position: 'absolute',
    height: '100%',
    width: '100%',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#00c3ff',
  },
  leftDrawer: {
    position: 'absolute',
    width: '75%',
    height: '100%',
    // backgroundColor: 'rgba(0,0,0,0.8)',
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

    borderWidth: 2,
    borderColor: 'orange',
  },
  rightDrawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '75%',
    height: '100%',

    // backgroundColor: 'rgba(0,0,0,0.8)',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

    borderWidth: 2,
    borderColor: 'green',
  },
});

import {useSharedValue} from 'react-native-reanimated';

export const drawerAnimationValue = useSharedValue({x: 0});
