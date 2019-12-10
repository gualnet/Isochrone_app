import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';

import { Button, Block, Input, Text } from '../../Components';
import { theme } from '../../libs';
import { PopIn } from '../../Animations/';

const VALID_EMAIL = "SIGNIN@isochrone.fr";
const VALID_PASSWORD = "signin";

class SignUp extends React.Component {

  render() {
    state = {
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
      errors: [],
      loading: false,
      page: 'Login',
    };
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <PopIn>
        <KeyboardAvoidingView style={styles.Signup}>
        <Block padding={[0, theme.sizes.base * 2]}>
            <Text h1 bold>Sign Up</Text>
            <Block middle>
              <Input
                label="Login"
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
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
              <Button onPress={() => this.setState({ page: 'Signup'})}>
                <Text secondary center >
                  Sign Up
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </PopIn>
    );
  };
};

export default SignUp;

const styles = StyleSheet.create({
  Signup: {
    width: '100%',
    // height: ((Dimensions.get('window').height * 10 / 100) * 9),
    height: '96%',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: theme.colors.lightblue,
    backgroundColor: theme.colors.gray2,
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.lightblue,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.red,
  }
});
