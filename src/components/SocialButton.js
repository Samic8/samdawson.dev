import React from 'react'
import styled from 'styled-components'

const HoverButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`

export default function SocialButton({href, children}) {
    return (
        <HoverButton target={'_blank'} href={href}>
            {children}
        </HoverButton>
    )
}
