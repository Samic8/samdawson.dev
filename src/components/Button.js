import React from "react"
import GatsbyLink from "gatsby-link"

export default function Button({ children, className, size, ...props }) {
  const sizes = {
    small: "py-1 p-2 text-sm",
    medium: "py-1 p-2 text-sm md:py-2 md:p-3 md:text-base",
  }
  return (
    <GatsbyLink
      className={`inline-block text-white rounded-sm font-bold capitalize cursor-pointer ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </GatsbyLink>
  )
}
