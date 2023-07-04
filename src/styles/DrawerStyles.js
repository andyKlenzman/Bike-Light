import {StyleSheet} from 'react-native';
import theme from './theme';
export const DrawerStyles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: theme.componentRatios.drawers,
  },
  drawerContainer: {
    height: '100%',
    backgroundColor: 'transparent',
    minWidth: '100%',
    zIndex: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
