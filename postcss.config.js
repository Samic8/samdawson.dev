const tailwind = require("tailwindcss")

module.exports = () => ({
  plugins: [
    tailwind("./tailwind.config.js"),
    require("postcss-nested"),
    require("postcss-extend-rule")(),
    require("autoprefixer"),
  ],
})
