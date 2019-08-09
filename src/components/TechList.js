import React from "react"
import TechTag from "./TechTag"

export default function TechList({ techs, size = "small" }) {
  const sizes = {
    small: "mr-1 mb-1",
    medium: "mr-1 mb-1 md:mr-2 md:mb-2",
  }
  return (
    <ul>
      {techs.map(techName => (
        <li
          key={techName}
          className={`inline-block font-header ${sizes[size]}`}
        >
          <TechTag key={techName} techName={techName} size={size} />
        </li>
      ))}
    </ul>
  )
}
