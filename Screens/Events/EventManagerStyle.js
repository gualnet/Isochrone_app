import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  middleView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F2F2F2',
  },
});

export default styles;