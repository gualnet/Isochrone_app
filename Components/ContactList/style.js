import { StyleSheet } from 'react-native';
import { theme } from '../../libs';

const styles = StyleSheet.create({
  contactItem: {
    flex: 1,
    backgroundColor: theme.colors.card,
    paddingBottom: 4,
    paddingTop: 4,
    marginBottom: 2,
    borderRadius: 10,
  },
  touchableStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  contactInfoView: {
    flex: 0.8,
    marginLeft: 10,
  },
  contactSwitchView: {
    flex: 0.2,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default styles;