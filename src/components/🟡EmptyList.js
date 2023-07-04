import {View, Text, StyleSheet} from 'react-native';
import {ListItem} from './🟡ListItem';
const EmptyList = () => {
  return <View></View>;
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});
