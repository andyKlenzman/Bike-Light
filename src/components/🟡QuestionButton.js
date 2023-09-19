import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../styles/theme';
import {controlIsOpen} from '../state/slices/faqContainerSlice';
const QuestionButton = () => {
  const dispatch = useDispatch();
  const faqState = useSelector(state => state.faqContainer.isOpen);

  //hide button if the curtain is over it
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          dispatch(controlIsOpen(!faqState));
          console.log(faqState);
        }}>
        <Icon
          name="question-circle-o"
          size={theme.iconSize.medium}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default QuestionButton;

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
    color: 'grey',
    fontWeight: 100,
    marginRight: 20,
    marginLeft: 10,
  },
});
