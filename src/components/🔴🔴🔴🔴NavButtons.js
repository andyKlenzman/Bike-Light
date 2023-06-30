import {StyleSheet, View} from 'react-native';
import NavButton from './🟡NavButton';
import MainButton from './🟡MainButton';

const NavButtons = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <NavButton icon="sliders" drawer="left" />
        <MainButton />
        <NavButton icon="bluetooth" drawer="right" />
      </View>
    </View>
  );
};

export default NavButtons;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '15%',
    width: '100%',
    justifyContent: 'center',

    alignItems: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});
