import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  middleView: {
    height: '80%',
  },
  bottomView: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  bottomBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  btnContainer: {
    width: '40%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F2F2F2',
  },
  mapView: {
    width: '100%',
    height: '50%',
  },
  detailsView: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  recoBtnView: {
    height: '10%',
    width: '100%',
  },
});

export default styles;