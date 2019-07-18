import React from 'react'
import GatsbyLink from 'gatsby-link'

export default function Button({children, className, size, ...props}) {
    const sizes = {
        small: 'py-1 p-2 text-sm',
        medium: 'py-2 p-3 text-base',
    }
    return (
        <GatsbyLink
            className={`inline-block text-white rounded-sm font-bold capitalize cursor-pointer ${sizes[size]} ${className}`}
            {...props}>
            {children}
        </GatsbyLink>
    )
}
