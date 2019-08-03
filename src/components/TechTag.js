import React from "react"
import Button from "./Button"

const backgroundColor = {
  CSS: "bg-brown-600 hover:bg-brown-500",
  React: "bg-teal-500 hover:bg-teal-400",
  GatsbyJS: "bg-purple-500 hover:bg-purple-400",
}

export default ({ techName, className, ...props }) => (
  <Button
    to={`category/${techName}`}
    className={`${backgroundColor[techName]} ${className}`}
    {...props}
  >
    {techName}
  </Button>
)
