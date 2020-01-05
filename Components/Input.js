import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import Block from './Block';
import Button from './Button';
import { theme } from '../libs';

export default class Input extends Component {
  state = {
    toggleSecure: false,
  }

  renderLabel() {
    const { label, error } = this.props;

    return (
      <Block flex={false}>
        {label ? <Text gray2={!error} accent={error}>{label}</Text> : null}
      </Block>
    )
  }

  renderToggle() {
    const { secure, rightLabel } = this.props;
    const { toggleSecure } = this.state;

    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({ toggleSecure: !toggleSecure })}
      >
        {
          rightLabel ? rightLabel :
            <Ionicons
              color={theme.colors.black}
              size={theme.sizes.font * 1.35}
              name={!toggleSecure ? "md-eye" : "md-eye-off"}
          />
        }
      </Button>
    );
  }

  renderRight() {
    const { rightLabel, rightStyle, onRightPress } = this.props;

    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  }

  render() {
    const {
      email,
      phone,
      number,
      secure,
      error,
      style,
      ...props
    } = this.props;

    const { toggleSecure } = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      error && { borderColor: theme.colors.accent },
      style,
    ];

    const inputType = email
      ? 'email-address' : number
      ? 'numeric' : phone
      ? 'phone-pad' : 'default';

    return (
      <Block flex={false} margin={[theme.sizes.base, 0]}>
        {this.renderLabel()}
        <View style={styles.viewShadow}>
          <TextInput
            style={[inputStyles, styles.inputStyles]}
            secureTextEntry={isSecure}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={inputType}
            {...props}
          />
        </View>
        {this.renderToggle()}
        {this.renderRight()}
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    fontWeight: '500',
    color: theme.colors.black,
    height: theme.sizes.base * 3,

    backgroundColor: theme.colors.mainBackground,
    borderRadius: theme.sizes.inputBorderRadius,
    borderWidth: theme.sizes.inputBorderWidth,
    shadowColor: theme.colors.shadowColorTop,
    shadowOffset: { width: 8, height: 8 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  viewShadow: {
    borderRadius: theme.sizes.inputBorderRadius,
    shadowColor: theme.colors.shadowColorDown,
    shadowOffset: { width: -8, height: -8 },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    backgroundColor: '#ffffff00',
    top: 0,
    right: 10,
  },
  inputStyles: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});