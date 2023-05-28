export const mapAndRoundNumber = (
  value,
  originalMin,
  originalMax,
  newMin,
  newMax,
) => {
  // Map the value from the original range to the new range
  const mappedValue =
    ((value - originalMin) * (newMax - newMin)) / (originalMax - originalMin) +
    newMin;

  // Round the mapped value to a whole number
  const roundedValue = Math.round(mappedValue);
  const positiveValue = Math.abs(roundedValue);
  return positiveValue;
};
