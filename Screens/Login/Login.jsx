import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Text, Input, Form, Item, View, Icon} from 'native-base';

import { theme } from '../../libs';
import SignUp from '../SignUp/SignUp';
import { isValidEmail, isValidPassword } from '../../libs/helpers';
import API from '../../API';

// const VALID_EMAIL = "lea.sophie@isochrone.fr";
const VALID_EMAIL = "test@isochrone.fr";
const VALID_PASSWORD = "1234";

class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
    page: 'Login',
  }

  handleLogin = async () => {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check localy before sending any request
    if (!isValidEmail(this.state.email)) {
      errors.push('email');
    }
    if (!isValidPassword(this.state.password)) {
      errors.push('password');
    }
    if (errors.length) {
      this.setState({ errors, loading: false });
    }
    // Send login data to the server
    const response = await API.Users.login({
      email: this.state.email,
      password: this.state.password,
    });
    // handle api response
    if (response.status === 200 && response.data) {
      // console.log('\nLOGIN RESPONSE', response.data);

      this.props.dispatch({
        type: 'SET_LOGIN_DATA',
        payload: response.data,
      });
      this.setState({ errors, loading: false });
      navigation.navigate("Home");
    } else if (response.status === 200 && response.data) {
      console.log('mauvais email ou mot de passe');
      errors.push('email');
      errors.push('password');
    } else {
      console.log('Status', response.status);
      console.log('Data', response.data);
      this.setState({ 
        errors: ['rejected'],
        loading: false,
        email: '',
        password: '',
      });
    }
  }

  setPage = (page) => {
    this.setState({
      ...this.state,
      page,
    });
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    if (this.state.page === 'Login') {
      return (
        <KeyboardAvoidingView style={styles.mainView} behavior="padding">
          <View style={styles.topView}>
            <Text style={styles.title}>ISOCHRONE</Text>
            {
              this.state.errors[0] === 'rejected' && 
              <Text 
                error={hasErrors('rejected')}
                style={[styles.input, hasErrors('rejected')]}
              >LOGIN REJECTED</Text>
            }
            <View style={styles.middleView}>
              <Form style={styles.formContainer}>
                {/* {!hasErrors('email') && <Item>}
                {hasErrors('email') && <Item error>} */}
                <Item>
                  <Input
                    placeholder="Email"
                    error='red'
                    success='green'
                    error={hasErrors('email')}
                    style={[styles.input, hasErrors('email')]}
                    defaultValue={this.state.email}
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                  />
                </Item>
                <Item>
                  <Input
                    placeholder="Password"
                    error='red'
                    success='green'
                    error={hasErrors('email')}
                    style={[styles.input, hasErrors('email')]}
                    defaultValue={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                  />
                  <Icon active name='eye' />
                </Item>
                <Text style={styles.forgotText} onPress={() => console.log('FORGOT CLICK 1')}>Forgot your password ?</Text>
              </Form>
              <View style={styles.buttonsContainer}>
                <Button 
                  bordered
                  style={styles.buttons}
                  onPress={() => this.handleLogin()}>
                  {loading ?
                    <ActivityIndicator size="small" color="white" /> : 
                    <Text bold center>Login</Text>
                  }
                </Button>
                <Button style={styles.buttons} bordered onPress={() => this.setPage('Signup')}>
                  <Text>Sign Up</Text>
                </Button>

              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      )
    } else if (this.state.page === 'Signup') {
      return (
        <SignUp
          navigation={navigation}
          setPage={this.setPage}/>
      );
    }
    
  }
};


const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.mainBackground,
  },
  topView: {
    flex: 1,
  },
  middleView: {
    flex: 1,
    flexDirection: 'column',
  },
  formContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  // -----------
  title: {
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 2,
    marginBottom: 2,
  },
  forgotText: {
    marginTop: 10,
    marginRight: 10,
    textAlign: 'right',
    fontSize: 12,
    color: theme.colors.gray3,
  },
});
