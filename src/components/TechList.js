import React from "react"
import TechTag from "./TechTag"

export default function TechList({ techs }) {
  return (
    <ul>
      {techs.map(techName => (
        <li key={techName} className={`inline-block font-header mr-2 mb-2`}>
          <TechTag key={techName} techName={techName} />
        </li>
      ))}
    </ul>
  )
}
