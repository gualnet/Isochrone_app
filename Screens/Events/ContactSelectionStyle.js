import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  middleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnContainer: {
    width: '60%',
  },
  listContainer: {
    width: '90%',
  },
});

export default styles;