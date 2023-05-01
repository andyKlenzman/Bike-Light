import {useContext, useEffect} from 'react';
import Context from '../../state/Context';
import {bleManager} from './bluetoothManager';

/*
Purpose: Listens for and Updates the device's bluetooth state in the context
*/
const bluetoothListener = () => {
  //import bt state from context
  const {btState, setBtState} = useContext(Context);

  useEffect(() => {
    const getBleState = async () => {
      const state = await bleManager.state();
      setBtState({...btState, isBluetoothOn: state});
    };
    getBleState().catch(err => {
      console.error('Error catching bluetooth state: ', err);
    });
  }, []);
  bleManager.onStateChange(state => {
    setBtState({...btState, isBluetoothOn: state});
  });
};

export default bluetoothListener;
