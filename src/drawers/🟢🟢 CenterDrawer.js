import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { DrawerStyles } from './DrawerStyles';

const CenterDrawer = () => {

  
  return (
    <View style={DrawerStyles.centerDrawer}>
        <Text style={styles.text}>CENTER DRAWER</Text>
        <View style={[styles.ball]} />
      </View>
  );
};

export default CenterDrawer;

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});
