// This file handles the conditional rendering, gesture control, positioning, and content of the curtain feature.

import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import FAQs from './🟢🟢FAQs';

export const FAQContainer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.faqContainer.isOpen);

  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  //SET COORDINATES FOR CURTAIN
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////

  // Sets the coordinates to 'peeking' and changes content to locked screen when bluetooth starts sending signal
  if (isOpen) {
    return (
      <View style={[styles.container]}>
        <FAQs />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  //
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'hsla(200, 90%,90%, .9)', // can you create a blur like in tshare
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
