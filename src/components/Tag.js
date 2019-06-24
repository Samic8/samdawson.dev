import React from 'react'
import styled from 'styled-components'

const TagAnchor = styled.a`
    padding: 7px 7px;
    color: ${({ theme }) => theme.colorWhite};
`

export default function Tag({children}) {
    return (
        <TagAnchor>
            {children}
        </TagAnchor>
    )
}
