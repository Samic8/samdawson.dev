const systemFontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`

module.exports = {
  theme: {
    fontSize: {
      xsm: ".85rem",
      sm: "1.1rem",
      base: "1.25rem",
      md: "1.30rem",
      mdlg: "1.45rem",
      lg: "1.75rem",
      xl: "2.5rem",
    },
    fontFamily: {
      header: `"Montserrat", ${systemFontStack}`,
      sans: `"Montserrat", ${systemFontStack}`,
      systemFont: systemFontStack,
    },
    extend: {
      margin: {
        "-1xl": "-28rem",
        "-2xl": "-33rem",
      },
      colors: {
        white: "#fff",
        black: "#100",
        gray: {
          100: "#EEECF3",
          200: "#e2e0e5",
          300: "#acabb0",
          500: "#96939F",
          700: "#686473",
          800: "#494554",
          900: "#2C2839",
        },
        brown: {
          200: "#e29365",
          500: "#D86D31",
          600: "#c56026",
          900: "#5c280a",
        },
        teal: {
          200: "#78c4d9",
          300: "#61DAFB",
          400: "#28ADD2",
          500: "#218EAB",
          900: "#104351",
        },
        purple: {
          100: "#CECAD3",
          300: "#cfbae9",
          400: "#ad8fd1",
          500: "#9875c3",
          700: "#7042a9",
          900: "#503d67",
        },
        yellow: {
          100: "#fcfaf8",
          200: "#f6f2ec",
        },
      },
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "group-hover"],
    borderColor: ["responsive", "hover", "focus", "focus-within"],
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        ".translate-y-0": {
          transform: "translateY(0)",
        },
        ".-translate-y-1": {
          transform: "translateY(-8px)",
        },
      }

      addUtilities(newUtilities, {
        variants: ["group-hover"],
      })
    },
  ],
}
