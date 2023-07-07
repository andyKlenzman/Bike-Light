//used to move through item selecltors, can be used across all data structures containing the current mode the app is in.
export const changeMode = (state, direction) => {
  const modeKeys = Object.keys(state);
  const currentModeIndex = modeKeys.findIndex(key => state[key].isActive);
  let nextModeIndex;
  if (direction === 'increment') {
    nextModeIndex = (currentModeIndex + 1) % modeKeys.length;
  }
  if (direction === 'decrement') {
    stepper = -1;
    nextModeIndex = (currentModeIndex - 1 + modeKeys.length) % modeKeys.length;
  }

  state[modeKeys[currentModeIndex]].isActive = false;
  state[modeKeys[nextModeIndex]].isActive = true;
};
