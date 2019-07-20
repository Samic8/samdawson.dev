import React from 'react'
import Button from './Button'

const backgroundColor = {
    CSS: 'bg-brown-600 hover:bg-brown-500',
    react: 'bg-teal-500 hover:bg-teal-400'
}

export default ({techName, className, ...props}) => (
    <Button to={`category/${techName}`} className={`${backgroundColor[techName]} ${className}`} {...props}>{techName}</Button>
)
