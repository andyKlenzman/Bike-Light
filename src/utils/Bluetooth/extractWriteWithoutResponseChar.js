import React from 'react';

/*
 Inputs devuce device data and returns the writeWithoutResponse characteristic
*/

export const extractWriteWithoutResponseChar = async deviceData => {
  const services = await deviceData.services();
  const service = services[0];
  const charData = await deviceData.characteristicsForService(
    service.uuid.toString(),
  );
  const writeWithoutResponseChar = charData[1];
  console.log("CHARACTERISTIC DATA: " , writeWithoutResponseChar)
  return writeWithoutResponseChar;
};

