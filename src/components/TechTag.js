import React from "react"
import Button from "./Button"
import { techToBgColor } from "../utility/techColors"

export default ({ techName, className, ...props }) => (
  <Button
    to={`category/${techName}`}
    className={`${techToBgColor[techName]} ${className}`}
    {...props}
  >
    {techName}
  </Button>
)
