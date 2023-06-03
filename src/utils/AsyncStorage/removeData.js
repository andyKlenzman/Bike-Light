import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully.');
    if (key === 'connectedDevices') {
      await AsyncStorage.setItem(key, JSON.stringify([]));
    }
  } catch (error) {
    console.log('Error removing data', error)
    throw new Error('Error in removeData.js');
  }
};
