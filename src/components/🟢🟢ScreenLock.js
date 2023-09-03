//This file is displayed for the user when they first enter the app, showing them the basic functionality of the app.

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../styles/theme';

import {useSelector} from 'react-redux';
import {curtainVals} from '../state/config/curtainState';

const ScreenLock = () => {
  const curtainState = useSelector(state => state.curtain.state);

  const isCurtainOpen = curtainState === curtainVals.state.open;

  return (
    <View style={styles.container}>
      <View>
        {isCurtainOpen ? null : (
          <Text style={[styles.text]}>SLIDE TO LOCK SCREEN</Text>
        )}

        <Icon
          size={theme.iconSize.medium}
          style={
            isCurtainOpen ? styles.fullyOpenIcon : styles.partiallyOpenIcon
          }
          name={isCurtainOpen ? 'lock' : 'arrow-down'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.primaryFont,
    marginTop: '100%',
    alignSelf: 'center',
  },
  partiallyOpenIcon: {
    color: theme.colors.primaryIcon,
    marginTop: 20,
    alignSelf: 'center',
  },
  fullyOpenIcon: {
    color: theme.colors.primaryIcon,
    marginTop: 0,
  },
});

export default ScreenLock;
