import React from 'react'
import styles from './SocialButton.module.css'

export default function SocialButton({href, children, className}) {
    return (
        <a target={'_blank'} href={href} className={`${styles.socialButton} ${className}`}>
            {children}
        </a>
    )
}
