const tailwind = require('tailwindcss')

// TODO: Add purgeCSS
module.exports = () => ({
    plugins: [tailwind('./tailwind.config.js'), require('postcss-nested'), require('autoprefixer')],
})