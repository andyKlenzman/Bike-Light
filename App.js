import MainScreen from './src/screens/MainScreen';
import {Provider} from 'react-redux';
import {store} from './src/state/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import {FAQContainer} from './src/components/🔴🔴🔴🔴FAQContainer';
const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <SafeAreaView style={{backgroundColor: 'black'}}>
          <MainScreen />
        </SafeAreaView>
        <FAQContainer />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
