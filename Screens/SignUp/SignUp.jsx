import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';

import { Button, Block, Input, Text } from '../../Components';
import { theme } from '../../libs';
import { PopIn } from '../../Animations/';

const VALID_LOGIN = "login";
const VALID_EMAIL = "signup@isochrone.fr";
const VALID_PHONE_NUMBER = "+33610203040";
const VALID_PASSWORD = "signup";

class SignUp extends React.Component {
  state = {
    login: VALID_LOGIN,
    email: VALID_EMAIL,
    phoneNumber: VALID_PHONE_NUMBER,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
  };

  handleSignup = () => {
    console.log('SEND: ', this.state);
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <PopIn>
        <KeyboardAvoidingView style={styles.Signup} behavior="padding">
          <Block padding={[0, theme.sizes.base * 2]}>
            <Text h2 bold>Sign Up</Text>
            <Block middle>
              <Input
                label="Login"
                error={hasErrors('login')}
                style={[styles.input, hasErrors('login')]}
                defaultValue={this.state.login}
                onChangeText={text => this.setState({ login: text })}
              />
              <Input
                label="Email"
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                label="Number"
                error={hasErrors('Phone Number')}
                style={[styles.input, hasErrors('Phone Number')]}
                defaultValue={this.state.phoneNumber}
                onChangeText={text => this.setState({ phoneNumber: text })}
              />
              <Input
                secure={true}
                label="Password"
                error={hasErrors('password')}
                style={[styles.input, hasErrors('password')]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
              <Button gradient onPress={() => this.handleSignup()}>
                {loading ?
                  <ActivityIndicator size="small" color="white" /> : 
                  <Text bold white center>Next Step</Text>
                }
              </Button>
                {/* // ! ajout d'une view pour aligner les 2 boutons */}
              {/* <Button onPress={() => navigation.navigate('Forgot')}>
                <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                  Forgot your password?
                </Text>
              </Button> */}
              <Button onPress={() => this.props.setPage('Login')}>
                <Text secondary center >
                  {"<< Login"}
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
    flex: 1,
    // width: '100%',
    // height: '96%',
    borderWidth: 1,
    // borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: theme.colors.gray2,
    // alignItems: 'center',
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
