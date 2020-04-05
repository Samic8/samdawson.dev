import React from "react"
import Button from "./Button"
import { techToBgColor } from "../utility/techColors"

export default ({ techName, className, ...props }) => (
  <Button
    to={`category/${techName}`}
    className={`${techToBgColor[techName]} ${className} hover:underline`}
    size="small"
    {...props}
  >
    {techName}
  </Button>
)
