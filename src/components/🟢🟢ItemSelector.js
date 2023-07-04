import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../styles/theme';
import {ListItem} from './🟡ListItem';
import {useDispatch, useSelector} from 'react-redux';
export const ItemSelector = ({
  title,
  subtitle,
  onLeftArrowPress,
  onRightArrowPress,
  disableArrows,
  feedback,
  status,
}) => {
  return (
    <View>
      {disableArrows ? null : (
        <>
          <TouchableOpacity
            style={[styles.icons, styles.iconRight]}
            onPress={() => onLeftArrowPress()}>
            <Icon name="arrow-left" size={theme.iconSize.small} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icons, styles.iconLeft]}
            onPress={() => onRightArrowPress()}>
            <Icon
              name="arrow-right"
              size={theme.iconSize.small}
              color="white"
            />
          </TouchableOpacity>
        </>
      )}

      {/* DISPLAY */}
      <ListItem
        type="mode"
        feedback={feedback} //tells ITEM to initiate rainbow borders when signal is sending
        title={title.charAt(0).toUpperCase() + title.slice(1)} //capitalizes first letter of first word
        subtitle={subtitle}
        center
        activeOpacity={1}
        status={status}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 10,
  },
  item: {
    minWidth: '100%',
    padding: 10,
    fontSize: 15,
    borderWidth: 2,
    // alignItems: 'center',
    // backgroundColor: '#1C1C1E',
    // marginBottom: 10,
    // borderRadius: 10,
  },
  icons: {
    position: 'absolute',
    zIndex: 2,
    top: '10%',

    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRight: {
    left: '0%',
  },
  iconLeft: {
    left: '80%',
  },
});
