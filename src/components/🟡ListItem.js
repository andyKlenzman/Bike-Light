import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../styles/theme';
import {listItemStyles} from '../styles/listItemStyles';
export const ListItem = ({
  item,
  type,
  subtitle,
  onPress,
  title,
  status,
  center,
}) => {
  const [conditionalStyles, setConditionalStyles] = useState({});

  useEffect(() => {
    let newStyles = {};

    if (center) {
      newStyles = {alignItems: 'center'};
    }
    if (status === 'pending') {
      newStyles = {...newStyles, ...listItemStyles.pendingStyle}
   
    } else if (status === 'selected') {
      newStyles = {...newStyles, ...listItemStyles.selectedStyle}
   
    } else {
      newStyles = {...newStyles, ...listItemStyles.neutralStyle}
  
    }
    setConditionalStyles(newStyles);
  }, [status]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.item, conditionalStyles]}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {type === 'bluetooth'
          ? item.name
            ? item.name
            : item.id
          : type === 'mode'
          ? title
          : null}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 50,
    flex: 1,
    backgroundColor: '#1B1B1B',
  },
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
});
