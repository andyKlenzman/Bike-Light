import React from 'react';

/*
 Inputs devuce device data and returns the writeWithoutResponse characteristic
*/

const parseCharacteristics = async deviceData => {
  const services = await deviceData.services();
  const service = services[0];
  const characteristicData = await deviceData.characteristicsForService(
    service.uuid.toString(),
  );
  const writeWithoutResponseCharacterisitc = characteristicData[1];
  return writeWithoutResponseCharacterisitc;
};

export default parseCharacteristics;
