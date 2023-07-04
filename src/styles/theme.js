//could put inside a component in a component and make some conditional based on state.

// could make these ratios if problems occur accross platforms
const theme = {
  colors: {
    primaryBackground: 'black',
    secondaryBackground: '#1C1C1E',
    highlightedBackground: '#3B3B3D',
    primary: '#00c3ff',
    secondary: 'white',
    success: 'green',
    failure: 'red',
    primaryFont: 'white',
    secondaryFont: '#8E8E93',
    primaryBorder: '#00c3ff',
    secondaryBorder: 'grey',
    primaryIcon: 'white',
    disabledIcon: 'grey',
    disabledMainButton: '#3A3B3C',
  },
  fontSize: {
    small: 18,
    medium: 24,
    large: 32,
  },
  iconSize: {
    small: 18,
    medium: 40,
    large: 75,
    extraLarge: 100,
  },
  componentRatios: {
    drawers: '75%',
    appStatus: '10%',
    navButtons: '15%',
    navButton: 80,
  },

  // ...
};

export default theme;
