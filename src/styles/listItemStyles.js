import theme from './theme';

export const listItemStyles = {
  neutralStyle: {
    backgroundColor: theme.colors.primaryBackground,
    borderColor: theme.colors.secondaryBorder,
  },
  pendingStyle: {
    backgroundColor: theme.colors.highlightedBackground,
    borderColor: theme.colors.secondaryBorder,
  },
  selectedStyle: {
    backgroundColor: theme.colors.primaryBackground,
    borderColor: theme.colors.primaryBorder,
  },
  emptyStyle: {
    backgroundColor: theme.colors.primaryBackground,
    borderColor: theme.colors.secondaryBorder,
    borderStyle: 'dashed',
  },
};
