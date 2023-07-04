import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {DrawerStyles} from '../styles/DrawerStyles';
import theme from '../styles/theme';
import {ListItem} from './🟡ListItem';
import {ItemSelector} from './🟢🟢ItemSelector';
import {
  incrementInteractionMode,
  decrementInteractionMode,
} from '../state/slices/interactionModeSlice';
import ItemSeperator from './🟡ItemSeperator';
import {
  incrementLightMode,
  decrementLightMode,
} from '../state/slices/lightModeSlice';
import {useSelector} from 'react-redux';
import {selectActiveInteractionMode} from '../state/selectors/interactionMode/selectActiveInteractionMode';
import {selectActiveLightMode} from '../state/selectors/lightMode/selectActiveLightMode';
import {useDispatch} from 'react-redux';
const LeftDrawer = () => {
  const dispatch = useDispatch();
  const activeInteractionMode = useSelector(selectActiveInteractionMode);
  const activeLightMode = useSelector(selectActiveLightMode);

  return (
    <View style={DrawerStyles.drawerContainer}>
      <View style={styles.container}>
        {/* appears on replay mode */}

        {activeInteractionMode === 'replay' ? (
          <ItemSelector
            title={'RECORDING TITLE'}
            // onRightArrowPress={() => dispatch(incrementInteractionMode())}
            // onLeftArrowPress={() => dispatch(decrementInteractionMode())}
          />
        ) : (
          <ItemSelector
            title={activeLightMode}
            subtitle={'Light mode'}
            onRightArrowPress={() => dispatch(incrementLightMode())}
            onLeftArrowPress={() => dispatch(decrementLightMode())}
            feedback
            status='neutral' 
          />
        )}
        <ItemSeperator />
        <ItemSelector
          title={activeInteractionMode}
          subtitle={'Interaction mode'}
          disableArrows
          onRightArrowPress={() => dispatch(incrementInteractionMode())}
          onLeftArrowPress={() => dispatch(decrementInteractionMode())}
          feedback //tells ITEM to initiate rainbow borders when signal is sending
          status='selected' //not very good term, should be highlighted. 
        />
      </View>
    </View>
  );
};

export default LeftDrawer;

const styles = StyleSheet.create({
  buttonText: {
    color: theme.colors.primaryFont,
    alignSelf: 'center',
  },
  button: {},
  container: {
    height: '100%',
    margin: 20, // should be global
    flex: 1,
    justifyContent: 'flex-end',
  },
});
