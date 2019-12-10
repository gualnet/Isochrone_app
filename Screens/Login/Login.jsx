import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'

import { Button, Block, Input, Text } from '../../Components';
import { theme } from '../../libs';
import styles from './style';
import SignUp from '../SignUp/SignUp';

const VALID_EMAIL = "signin@isochrone.fr";
const VALID_PASSWORD = "signin";

export default class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
    page: 'Login',
  }

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      errors.push('email');
    }
    if (password !== VALID_PASSWORD) {
      errors.push('password');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      navigation.navigate("Events");
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
            <Block middle>
              <Input
                label="Email"
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                secure={true}
                label="Password"
                error={hasErrors('password')}
                style={[styles.input, hasErrors('password')]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
              <Button gradient onPress={() => this.handleLogin()}>
                {loading ?
                  <ActivityIndicator size="small" color="white" /> : 
                  <Text bold white center>Login</Text>
                }
              </Button>
                {/* // ! ajout d'une view pour aligner les 2 boutons */}
              <Button onPress={() => navigation.navigate('Forgot')}>
                <Text gray caption center style={{ textDecorationLine: 'underline' }}>
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