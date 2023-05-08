/*
 Inputs device data and returns the writeWithoutResponse characteristic
*/

export const extractWriteCharacteristic = async deviceData => {
  const services = await deviceData.services();
  const service = services[0];
  const charData = await deviceData.characteristicsForService(
    service.uuid.toString(),
  );
  const writeWithResponseChar = charData[1];
  console.log('CHARACTERISTIC DATA: ', writeWithResponseChar);
  return writeWithResponseChar;
};
