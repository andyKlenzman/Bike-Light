import {StyleSheet,  View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../styles/theme';
import {changeCurtainStateAndContent} from '../state/slices/curtainSlice';
import {curtainVals} from '../state/config/curtainState';

const QuestionButton = () => {
  const dispatch = useDispatch();
  const curtainState = useSelector(state => state.curtain.state);
  const showButton = curtainState === curtainVals.state.closed ? true : false;

  //hide button if the curtain is over it
  if (showButton) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            dispatch(
              changeCurtainStateAndContent({
                state: curtainVals.state.open,
                content: curtainVals.content.tutorial,
              }),
            );
          }}>
          {/* <Text style={styles.text}>FAQs</Text> */}
          <Icon
            name="question-circle-o"
            size={theme.iconSize.medium}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    null;
  }
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
    color: theme.colors.primaryBorder,
    color: 'grey',
    fontWeight: 100,
    marginRight: 20,
    marginLeft: 10,
  },
});
