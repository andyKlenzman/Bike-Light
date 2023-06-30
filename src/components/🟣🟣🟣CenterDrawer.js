import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {DrawerStyles} from '../styles/DrawerStyles';
import theme from '../styles/theme';
import {ListItem} from './🟡ListItem';
import {RenderMainControlsItem} from './🟢🟢RenderMainControlsListItem';
import {ItemSelector} from './🟢🟢ItemSelector';
const CenterDrawer = () => {
  return (
    <View style={DrawerStyles.drawerContainer}>
      <View style={styles.container}>
        <ListItem type="mode" title="Rainbow" subtitle="light pattern" center />
        {/* appears on replay mode */}
        <ListItem
          type="mode"
          title="July 18th, 2022"
          subtitle="saved lightshows"
          center
        />
        <ItemSelector />
      </View>
    </View>
  );
};

export default CenterDrawer;

const styles = StyleSheet.create({
  buttonText: {
    color: theme.colors.primaryFont,
    alignSelf: 'center',
  },
  button: {},
  container: {
    height: '100%',
    margin: 20, // should be global
    flex: 1,
    justifyContent: 'flex-end',
  },
});
