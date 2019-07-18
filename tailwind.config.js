const systemFontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

module.exports = {
  theme: {
    colors: {
      white: '#fff',
      gray: {
        500: '#96939F',
        700: '#686473',
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
      }
    },
    fontSize: {
      base: '1.25rem',
    },
    fontFamily: {
      header: `Muli ${systemFontStack}`,
      content: systemFontStack,
    },
    extend: {}
  },
  variants: {},
  plugins: []
}
