import React from "react"
import GatsbyLink from "gatsby-link"
import { getActiveClasses } from "get-active-classes"

export default function Button({ children, className, size, ...props }) {
  const sizes = {
    small: "py-1 p-2 text-sm",
    medium: "py-1 p-2 text-sm md:py-2 md:p-3 md:text-base",
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
