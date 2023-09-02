// renders the FAQList for the user to peruse when they hit the questionButton

import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../styles/theme';
import {FAQList} from '../content/FAQList';
import PlaceholderItem from './PlaceholderItem';

const FAQs = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={FAQList}
        keyExtractor={item => item.question}
        style={styles.list}
        renderItem={({item}) => <FAQItem item={item} />}
        ListEmptyComponent={PlaceholderItem}
        inverted
        scrollEnabled={false}
        ItemSeparatorComponent={ItemSeperator}
      />
    </View>
  );
};

const FAQItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{item.question}</Text>
      <Text style={styles.answerText}>{item.answer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: 'red',
    flexGrow: 0,
  },

  questionText: {
    fontSize: theme.fontSize.large,
    color: theme.colors.primaryFont,
    fontWeight: 'bold',
    marginTop: 30,
  },
  answerText: {
    fontSize: theme.fontSize.large,
    color: theme.colors.primaryFont,
    fontWeight: 'bold',
    marginTop: 30,
  },
});

export default FAQs;
