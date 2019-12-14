import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  topView: {
    backgroundColor: 'green',
  },
  middleView: {
    height: '90%',
    // backgroundColor: 'blue',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: "space-around",
    // position: 'absolute',
    // bottom: 150,
    width: '100%',
    backgroundColor: 'yellow',
  },
  bottomBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    // position: 'absolute',
    // bottom: 100,
  },
  btnContainer: {
    width: '40%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F2F2F2',
  },
  mapView: {
    width: '100%',
    height: '30%',
  },
  detailsView: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  }
});

export default styles;