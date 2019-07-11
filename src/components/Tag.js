import React from 'react'
import styles from './Tag.module.css'
import Link from 'gatsby-link'

export default function Tag({children, className = ''}) {
    return (
        <Link to='/' className={`${styles.tag} ${className}`}>{children}</Link>
    )
}
