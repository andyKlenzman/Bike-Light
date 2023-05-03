/*
 Higher order function that sorts the connected devices first in the list of scannedDevices
*/

export const sortConnectedDevicesFirst = updatedConnectedDevices => {
  return (a, b) => {
    const isAConnected = updatedConnectedDevices.some(_device => {
      return _device.deviceID === a.id;
    });
    const isBConnected = updatedConnectedDevices.some(_device => {
      return _device.deviceID === b.id;
    });

    if ((isBConnected && isAConnected) || (!isBConnected && !isAConnected)) {
      return 0;
    }
    if (isAConnected && !isBConnected) {
      return -1;
    }

    if (!isAConnected && isBConnected) {
      return 1;
    }
  };
};
