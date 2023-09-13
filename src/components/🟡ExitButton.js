import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import theme from '../styles/theme';
import {changeCurtainState} from '../state/slices/curtainSlice';
import {curtainVals} from '../state/config/curtainState';

const ExitButton = () => {
  const dispatch = useDispatch();

  //hide button if the curtain is over i
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(changeCurtainState(curtainVals.state.closed))
        console.log("button pressed");
      }}>
      <Text style={styles.icon}>Close</Text>
    </TouchableOpacity>
  );
};

export default ExitButton;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'flex-end',
    minWidth: 40,
    minHeight: 40,
  },

  icon: {
    color: 'grey',
    fontWeight: 700,
    fontSize: theme.iconSize.medium,
  },
  circleBorder: {
    borderWidth: 2, // Adjust border width as needed
    borderColor: 'grey',
    borderRadius: 400, // Set to half the width/height to create a circle
    padding: 5, // Adjust padding as needed to control the size of the circle
  },
});
