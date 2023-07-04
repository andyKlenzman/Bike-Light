export const selectActiveLightMode = state => {
  const selectLightMode = state.lightMode;
  const activeLightMode = Object.keys(selectLightMode).find(
    key => selectLightMode[key].isActive,
  );
  return activeLightMode;
};
