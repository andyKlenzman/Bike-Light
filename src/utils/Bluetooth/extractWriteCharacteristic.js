/*
 Inputs device data and returns the writeWithoutResponse characteristic
*/

export const extractWriteCharacteristic = async deviceData => {
  try {
    const services = await deviceData.services();
    //microcontroller only returns one service. Do other types of bluetooth return more? 
    const service = services[0];

    const charArray = await deviceData.characteristicsForService(
      service.uuid.toString(),
    );

    //find the array with a propery with the key that says isWritableWithResponse: true
    const writeWithResponseChar =
      charArray.find(obj => obj.isWritableWithResponse === true) || null;
    if (!writeWithResponseChar) throw new Error('Service not found');
    return writeWithResponseChar;
  } catch (error) {
    console.error('Error extracting write characteristic:', error);
    //throws the error to the caller
    return null;
  }
};
