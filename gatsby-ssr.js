const React = require("react")

exports.onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    <script
      key="gatsby-plugin-gumroad-widget"
      src="https://gumroad.com/js/gumroad.js"
    />,
  ])
}
