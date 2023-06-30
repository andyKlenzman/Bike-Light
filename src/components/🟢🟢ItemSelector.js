import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../styles/theme';
import {listItemStyles} from '../styles/listItemStyles';
import {ListItem} from './🟡ListItem';
import {useDispatch, useSelector} from 'react-redux';
export const ItemSelector = ({}) => {


  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.icons, styles.iconRight]}>
        <Icon name="arrow-left" size={theme.iconSize.small} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.icons, styles.iconLeft]}>
        <Icon name="arrow-right" size={theme.iconSize.small} color="white" />
      </TouchableOpacity>
      <ListItem type="mode" title="Freestyle" subtitle="select mode" center />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    marginBottom: 10,
    borderRadius: 10,
  },
  icons: {
    position: 'absolute',
    zIndex: 2,
    top: '37%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRight: {
    left: '10%',
  },
  iconLeft: {
    left: '85%',
  },
});
