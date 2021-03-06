import React from 'react';
import { Animated, Dimensions, BackHandler } from 'react-native';

class popIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionBottom: new Animated.Value(Dimensions.get('window').height),
    };
  };

  componentDidMount() {
    console.log('HEIGHT', Dimensions.get('window').height, typeof(Dimensions.get('window').height))
    let height = Dimensions.get('window').height;
    let parcentage = (height * 10) / 100;
    console.log('parcentage', parcentage);
    Animated.spring(
      this.state.positionBottom,
      { toValue:  0},
    ).start();
  };

  render() {
    return (
      <Animated.View
        style={{ 
          flex: 1,
          top: this.state.positionBottom,
          backgroundColor: 'grey',
        }} >
        { this.props.children }
      </Animated.View>
    );
    
  };

};

export default popIn;