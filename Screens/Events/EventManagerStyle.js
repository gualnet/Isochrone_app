import { StyleSheet } from 'react-native';
import { theme } from '../../libs';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.mainBackground,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  middleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F2F2F2',
  },
});

export default styles;