import React from "react"
import GatsbyLink from "gatsby-link"
import { getActiveClasses } from "get-active-classes"

export default function Button({ children, className, size, ...props }) {
  const sizes = {
    small: "p-1 text-xsm",
    medium: "py-1 p-2 text-sm",
  }
  return (
    <GatsbyLink
      className={getActiveClasses(
        `inline-block text-white rounded-sm font-bold capitalize cursor-pointer`,
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </GatsbyLink>
  )
}
