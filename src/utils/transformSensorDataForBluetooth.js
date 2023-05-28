import {mapAndRoundNumber} from './mapAndRoundNumber';

export const transformSensorDataForBluetooth = (
  RotationSensor,
  AccelerometerSensor,
  GyroscopeSensor,
  GravitySensor,
  MagneticSensor,
) => {
  const rotX = mapAndRoundNumber(
    RotationSensor.sensor.value.roll,
    -1,
    1,
    0,
    255,
  );
  const rotY = mapAndRoundNumber(
    RotationSensor.sensor.value.yaw,
    -1,
    1,
    0,
    255,
  );
  const rotZ = mapAndRoundNumber(
    RotationSensor.sensor.value.pitch,
    -1,
    1,
    0,
    255,
  );

  return {rotX, rotY, rotZ};
};
