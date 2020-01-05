import { StyleSheet } from 'react-native';
import { theme } from '../../libs';
const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.mainBackground,
  },
  input: {},
  hasErrors: {
    borderBottomColor: theme.colors.red,
    color: theme.colors.red,
  }
});

export default styles;