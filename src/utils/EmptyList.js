import {View, Text, StyleSheet} from 'react-native';
const EmptyList = () => {
  return (
    <View>
      <Text style={styles.item}>No devices found</Text>
    </View>
  );
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
