import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomView: {
    flexDirection: 'row',
  },
  middleView: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    // width: '40%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F2F2F2',
  },
});

export default styles;