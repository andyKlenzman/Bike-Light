import MainScreen from './src/screens/MainScreen';
import {Provider} from 'react-redux';
import {store} from './src/state/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <MainScreen />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
