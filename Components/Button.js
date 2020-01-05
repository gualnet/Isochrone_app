import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import { LinearGradient } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../libs';

class Button extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      // shadow && styles.shadow,
      // color && styles[color], // predefined styles colors for backgroundColor
      // color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style,
    ];

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}
        >
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor, startColor]}
          >
            {children}
          </LinearGradient>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.viewShadow}>
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity || 0.8}
          {...props}
        >
          {children}
        </TouchableOpacity>
      </View>
      
    )
  }
}

Button.defaultProps = {
  startColor: theme.colors.blue2,
  endColor: theme.colors.blue,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0, 0.5, 1],
  opacity: 0.8,
  color: theme.colors.white,
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.mainBackground,
    borderRadius: theme.sizes.buttonBorderRadius,
    height: theme.sizes.base * 2,

    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,

    borderRadius: theme.sizes.inputBorderRadius,
    borderWidth: theme.sizes.inputBorderWidth,
    shadowColor: theme.colors.shadowColorTop,
    shadowOffset: { width: 8, height: 8 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  viewShadow: {
    // special shadow effect for ios
    borderRadius: theme.sizes.inputBorderRadius,
    borderWidth: theme.sizes.inputBorderWidth,
    shadowColor: theme.colors.shadowColorDown,
    shadowOffset: { width: -8, height: -8 },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  accent: { backgroundColor: theme.colors.accent, },
  primary: { backgroundColor: theme.colors.primary, },
  secondary: { backgroundColor: theme.colors.secondary, },
  tertiary: { backgroundColor: theme.colors.tertiary, },
  black: { backgroundColor: theme.colors.black, },
  white: { backgroundColor: theme.colors.white, },
  gray: { backgroundColor: theme.colors.gray, },
  gray2: { backgroundColor: theme.colors.gray2, },
  gray3: { backgroundColor: theme.colors.gray3, },
  gray4: { backgroundColor: theme.colors.gray4, },
});