import React from 'react'
import TechTag from './TechTag'

export default function TechList({techs, size = 'small'}) {
    const sizes = {
        small: 'mr-1',
        medium: 'mr-2'
    }
    return (
        <ul>
            {techs.map(techName => (
                <li key={techName} className={`inline-block ${sizes[size]}`}>
                    <TechTag key={techName} techName={techName} size={size} />
                </li>
            ))}
        </ul>
    )
}
