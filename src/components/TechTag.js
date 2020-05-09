import React from "react"
import Button from "./Button"
import { techToBgColor } from "../utility/techColors"

export default ({ techName, className, size, ...props }) => (
  <Button
    to={`/category/${techName}`}
    className={`${techToBgColor[techName]} ${className} hover:underline`}
    size={size}
    {...props}
  >
    {techName}
  </Button>
)
