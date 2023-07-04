export const decrementThroughObject = state => {
  const modeKeys = Object.keys(state);
  const currentModeIndex = modeKeys.findIndex(key => state[key]);
  const nextModeIndex =
    (currentModeIndex - 1 + modeKeys.length) % modeKeys.length;
  state[modeKeys[currentModeIndex]] = false;
  state[modeKeys[nextModeIndex]] = true;
};
