import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadData = async key => {
  try {
    let storedData = await AsyncStorage.getItem(key);

    console.log('In load data. StoredData : ', storedData);
    if (storedData !== null) {
      storedData = JSON.parse(storedData);
      return storedData;
    } else {
      return [];
    }
  } catch (error) {
    console.log('Error loading data:', error);
  }
};
