import React from 'react'
import styled from 'styled-components'

const TagAnchor = styled.a`
    display: inline-block;
    padding: 7px 12px;
    color: ${({ theme }) => theme.colorWhite};
    border-radius: 5px;
    font-family: ${({ theme }) => theme.fonts.content};
    font-size: ${({ theme }) => theme.fonts.size.tag};;
    font-weight: bold;
    line-height: 1em;
    text-transform: capitalize;
    cursor: pointer;
`

export default function Tag({children, className}) {
    return (
        <TagAnchor className={className}>{children}</TagAnchor>
    )
}
