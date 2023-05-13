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


// export const extractWriteCharacteristic = async deviceData => {
//   try {
//     const services = await deviceData.services();
//     const service = services.find(s => s.uuid.toString() === 'YOUR_SERVICE_UUID');
//     if (!service) throw new Error('Service not found');

//     const charData = await deviceData.characteristicsForService(service.uuid.toString());
//     const writeWithResponseChar = charData.find(c => c.uuid.toString() === 'YOUR_WRITE_CHAR_UUID');
//     if (!writeWithResponseChar) throw new Error('Write characteristic not found');

//     console.log('CHARACTERISTIC DATA: ', writeWithResponseChar);
//     return writeWithResponseChar;
//   } catch (error) {
//     console.error('Error extracting write characteristic:', error);
//     throw error;
//   }
// };