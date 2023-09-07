import {AsyncStorage} from 'react-native';

export const saveDataToStorage = data => async dispatch => {
  try {
    await AsyncStorage.setItem('isIntroViewed', JSON.stringify(data));
  } catch (error) {
    throw error;
  }
};
