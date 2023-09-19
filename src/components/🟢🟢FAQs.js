// renders the FAQList for the user to peruse when they hit the questionButton

import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import theme from '../styles/theme';
import {FAQList} from '../content/FAQList';
import ExitButton from './🟡ExitButton';
import {ScrollView} from 'react-native';
const FAQs = () => {
  return (
    <View style={styles.listContainer}>
      <ExitButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {FAQList.map((item, index) => {
          return (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const FAQItem = ({question, answer}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.questionText}>{question}</Text>
      {answer.map((answer, index) => {
        return (
          <Text key={index} style={styles.answerText}>
            {answer}
          </Text>
        );
      })}
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
    padding: '4%',
  },
  itemContainer: {
    marginTop: 25,
  },
  list: {
    flexGrow: 0,
  },

  questionText: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.secondaryFont,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: theme.fontSize.small,
    lineHeight: 24,
    color: theme.colors.primaryFont,
    marginVertical: 10,

    // fontWeight: 'bold',
  },
});

export default FAQs;
