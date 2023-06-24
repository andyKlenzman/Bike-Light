import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {connectToDevice} from '../utils/Bluetooth/connectToDevice';
import {disconnectFromDevice} from '../utils/Bluetooth/disconnectFromDevice';
import {useSelector, useDispatch} from 'react-redux';

const Instructions = () => {
  const bannerText = useSelector(state => state.bannerText.text);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bannerText}</Text>
    </View>
  );
};

export default Instructions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 80,
    // position: 'absolute',
    borderBottomWidth: 2,
    borderBottomColor: '#00c3ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 30,
  },
});
