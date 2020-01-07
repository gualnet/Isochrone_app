import { StyleSheet } from 'react-native';
import { theme } from '../../libs';

const padding = {
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5,
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.mainBackground,
  },
  mapView: {
    flex: 5,
  },
  detailsView: {
    flex: 3,
    borderColor: theme.colors.gray2,
    borderTopWidth: 1,
    ...padding,
  },
  bottomView: {
    flex: 1,
    maxHeight: theme.sizes.uikit.buttonHeight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
});

export default styles;