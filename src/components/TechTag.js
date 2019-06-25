import React from 'react'
import styled from 'styled-components'
import Tag from './tag'

const TechTagAnchor = styled(Tag)`
    background-color: ${props => props.theme.colorAlias.tech[props.techName]};
`

export default ({techName}) => (
    <TechTagAnchor techName={techName}>{techName}</TechTagAnchor>
)
