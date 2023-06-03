import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, newData) => {
  try {
    console.log('Data save in process')
    await AsyncStorage.setItem(key, JSON.stringify(newData));
    console.log('Data added successfully.');

    //   setData(newData);
  } catch (error) {
    throw new Error('Error in saveData.js');
  }
};
