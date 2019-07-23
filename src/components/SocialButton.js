import React from "react"

export default function SocialButton({ href, children, className }) {
  return (
    <a
      target={"_blank"}
      href={href}
      className={`${"fill-current text-gray-700 hover:text-gray-900 inline-block"} ${className}`}
    >
      {children}
    </a>
  )
}
