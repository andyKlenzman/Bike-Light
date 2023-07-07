export const selectActiveInteractionMode = state => {
  const selectInteractionMode = state.interactionMode;
  const activeInteractionMode = Object.keys(selectInteractionMode).find(
    key => selectInteractionMode[key].isActive,
  );
  return activeInteractionMode;
};
