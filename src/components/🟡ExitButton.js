import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import theme from '../styles/theme';
import {changeCurtainState} from '../state/slices/curtainSlice';
import {curtainVals} from '../state/config/curtainState';
import {Text} from 'react-native-svg';

const ExitButton = () => {
  const dispatch = useDispatch();

  //hide button if the curtain is over i
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          dispatch(changeCurtainState(curtainVals.state.closed));
        }}>
        <Text style={styles.icon}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExitButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,

    width: '100%',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
  },
  text: {
    color: theme.colors.primaryBorder,
    color: 'grey',
    fontWeight: 400,
    fontSize: theme.fontSize.small,
  },
  icon: {
    color: theme.colors.primaryBorder,
    color: 'grey',
    fontWeight: 100,
    marginRight: 20,
    marginLeft: 10,
  },
});
