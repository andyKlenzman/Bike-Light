// renders the FAQList for the user to peruse when they hit the questionButton

import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import theme from '../styles/theme';
import {FAQList} from '../content/FAQList';
import PlaceholderItem from './PlaceholderItem';
import ItemSeperator from './🟡ItemSeperator';
import ExitButton from './🟡ExitButton';

const FAQs = () => {
  return (
    <View style={styles.listContainer}>
   
      <FlatList
        data={FAQList}
        keyExtractor={item => item.question}
        style={styles.list}
        renderItem={({item}) => <FAQItem item={item} />}
        ListEmptyComponent={PlaceholderItem}
        // scrollEnabled={false}
        ItemSeparatorComponent={ItemSeperator}
      />
      <ExitButton />
    </View>
  );
};

const FAQItem = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      <Text style={styles.answerText}>{item.answer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    minHeight: '100%',
    minWidth: '100%',
    padding: '8%',
  },
  itemContainer: {},
  list: {
    flexGrow: 0,
  },

  questionText: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.primaryFont,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.primaryFont,
    fontWeight: 'bold',
  },
});

export default FAQs;
