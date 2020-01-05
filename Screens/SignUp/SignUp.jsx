import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';

import { Button, Block, Input, Text } from '../../Components';
import { theme } from '../../libs';
import { PopIn } from '../../Animations/';
import API from '../../API';

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

  handleSignup = async () => {
    console.log('SEND: ', this.state);

    Keyboard.dismiss();
    this.setState({ loading: true });

    try {
      const response = await API.Users.register(this.state);
      console.log('>>STATUS', response.status);
      console.log('>>DATA', response.data);
    } catch (error) {
      console.error(error);
    }

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
                placeholder="Login"
                error={hasErrors('login')}
                style={[styles.input, hasErrors('login')]}
                defaultValue={this.state.login}
                onChangeText={text => this.setState({ login: text })}
              />
              <Input
                placeholder="Email"
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                placeholder="Phone Number"
                error={hasErrors('Phone Number')}
                style={[styles.input, hasErrors('Phone Number')]}
                defaultValue={this.state.phoneNumber}
                onChangeText={text => this.setState({ phoneNumber: text })}
              />
              <Input
                secure={true}
                placeholder="Password"
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
    backgroundColor: theme.colors.mainBackground,
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: theme.colors.gray2,
  },
  input: {},
  hasErrors: {
    borderBottomColor: theme.colors.red,
  }
});
