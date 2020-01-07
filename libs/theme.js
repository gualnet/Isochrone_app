
const colors = {
  blue: '#1144FF',
  blue2: '#5C7FFE',
  lightblue: 'rgba(46,92,255,0.2)',
  green: '#33AC2E',
  red: '#FC352A',
  yellow: '#F7C137',
  teal: '#00C1D4',
  purple: '#8C54FF',
  black: '#2E384D',
  black2: '#69707F',
  black3: '#8798AD',
  white: '#FFFFFF',
  gray: '#F0F0F0',
  gray2: '#C8C8C8',
  gray3: '#A0A0A0',
  caption: '#B0BAC9',
  input: 'rgba(224, 231, 255, 0.20)', // '#E0E7FF' 20%
  border: '#D6DDF6',
  card: 'rgb(246, 247, 248)',
  shadow: 'rgba(240, 243, 254, 0.85)',
  
  // Base new style
  mainBackground: '#F9F9F9',
  shadowColorTop: '#000000',
  shadowColorDown: '#FFFFFF',
};

const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,

  // Input sizes
  inputBorderRadius: 20,
  inputBorderWidth: 0,
  // Button sizes
  buttonBorderRadius: 20,
  buttonBorderWidth: 0,

  uikit: {
    buttonHeight: 50,
  },

};

const fonts = {
  h1: {
    fontSize: sizes.h1
  },
  h2: {
    fontSize: sizes.h2
  },
  h3: {
    fontSize: sizes.h3
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  },
};

export { colors, sizes, fonts };