export const selectActiveLightModeKey = state => {
  const selectLightMode = state.lightMode;
  const activeLightMode = Object.keys(selectLightMode).find(
    key => selectLightMode[key].isActive,
  );
  const activeLightModeKey = state.lightMode[activeLightMode].key;
  return activeLightModeKey;
};
