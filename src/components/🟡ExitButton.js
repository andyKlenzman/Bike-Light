import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import theme from '../styles/theme';

import {controlIsOpen} from '../state/slices/faqContainerSlice';
import {useSelector} from 'react-redux';

const ExitButton = () => {
  const dispatch = useDispatch();
  const faqState = useSelector(state => state.faqContainer.isOpen);
  //hide button if the curtain is over i
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(controlIsOpen(!faqState));
      }}>
      <Text style={styles.icon}>X</Text>
    </TouchableOpacity>
  );
};

export default ExitButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },

  icon: {
    color: 'white',
    fontWeight: 300,
    fontSize: theme.iconSize.medium,
  },

});
