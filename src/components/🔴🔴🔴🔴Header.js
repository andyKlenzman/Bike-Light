import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Header = () => {
  return (
    <View style={[styles.textContainer]}>
      <LinearGradient
        colors={['blue', 'rgba(0, 0, 0, 0.7)']}
        style={styles.textContainer}>
        {/* <Icon
          name="ceiling-light"
          size={theme.iconSize.extraLarge}
          style={styles.text}
          color={isSendingSignal ? 'white' : '#cccccc'}
        /> */}
      </LinearGradient>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: -50,
    minWidth: '100%',
    height: 350,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'green',
    zIndex: 0,
    opacity: 1,
  },

  text: {
    marginTop: 70,
    // color: 'white',
  },
});
