import React from 'react'
import GatsbyLink from 'gatsby-link'

export default function Button({children, className, ...props}) {
    return (
        <GatsbyLink
            className={`inline-block py-2 p-3 text-white rounded-sm text-base font-content font-bold capitalize cursor-pointer ${className}`}
            {...props}>
            {children}
        </GatsbyLink>
    )
}
