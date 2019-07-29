const systemFontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

module.exports = {
  theme: {
    colors: {
      white: '#fff',
      gray: {
        100: '#EEECF3',
        200: '#e2e0e5',
        300: '#acabb0',
        500: '#96939F',
        700: '#686473',
        800: '#494554',
        900: '#2C2839'
      },
      brown: {
        500: '#D86D31',
        600: '#c56026'
      },
      teal: {
        300: '#61DAFB',
        400: '#28ADD2',
        500: '#218EAB'
      },
      purple: {
        100: '#CECAD3',
        500: '#9875c3',
        700: '#7042a9'
      }
    },
    fontSize: {
      xsm: '.85rem',
      sm: '1rem',
      base: '1.25rem',
      md: '1.5rem',
      lg: '1.75rem',
      xl: '2.5rem',
    },
    fontFamily: {
      sans: `${systemFontStack}`,
    }
  },
  variants: {},
  plugins: []
}
