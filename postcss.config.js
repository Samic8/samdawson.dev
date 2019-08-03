const tailwind = require('tailwindcss')

const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
      './src/**/*.js',
      './node_modules/prismjs/prism.js'
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    whitelistPatternsChildren: [/post.*/, 'body', 'html']
  })
  
module.exports = () => ({
    plugins: [
        tailwind('./tailwind.config.js'),
        require('postcss-nested'),
        require('postcss-extend-rule')(),
        require('autoprefixer'),
        ...process.env.NODE_ENV === 'production' ? [purgecss] : []
    ],
})