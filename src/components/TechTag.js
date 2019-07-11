import React from 'react'
import styles from './TechTag.module.css'
import Tag from './Tag'

export default ({techName, className}) => (
    <Tag className={`${styles[techName]} ${className}`}>{techName}</Tag>
)
