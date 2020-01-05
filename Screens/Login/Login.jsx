import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../../Components';
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
        <KeyboardAvoidingView style={styles.login} behavior="padding">
          <Block padding={[0, theme.sizes.base * 2]}>
            <Text h1 bold>Login</Text>
            {
              this.state.errors[0] === 'rejected' && 
              <Text 
                error={hasErrors('rejected')}
                style={[styles.input, hasErrors('rejected')]}
              >LOGIN REJECTED</Text>}
            <Block middle>
              <Input
                placeholder="Email"
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                secure={true}
                placeholder="Password"
                error={hasErrors('password')}
                style={[styles.input, hasErrors('password')]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
              <Button 
                style={styles.btnLogin}
                // gradient
                onPress={() => this.handleLogin()}>
                {loading ?
                  <ActivityIndicator size="small" color="white" /> : 
                  <Text
                    bold
                    // white
                    center>
                      Login
                  </Text>
                }
              </Button>
                {/* // ! ajout d'une view pour aligner les 2 boutons */}
              <Button onPress={() => navigation.navigate('Forgot')}>
                <Text 
                  // gray
                  caption center style={{ textDecorationLine: 'underline' }}>
                  Forgot your password?
                </Text>
              </Button>
              {/* <Button onPress={() => navigation.navigate('Signup')}> */}
              <Button onPress={() => this.setPage('Signup')}>
                <Text secondary center >
                  Sign Up
                </Text>
              </Button>
            </Block>
          </Block>
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
  login: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.mainBackground,
  },
  hasErrors: {
    borderBottomColor: theme.colors.red,
    color: theme.colors.red,
  },
  btnLogin: {
    width: '50%'
  },
  btnPassForgot: {

  },
  btnSignUp: {

  },
});
