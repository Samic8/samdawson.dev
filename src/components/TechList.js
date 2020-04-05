import React from "react"
import TechTag from "./TechTag"

export default function TechList({ techs }) {
  return (
    <section className="font-header max-w-lg mx-auto sm:mt-10 mt-6 rounded border-gray-200 border-2 border-dashed p-4">
      <h2 className="uppercase font-bold text-gray-700 text-xsm mb-2">
        Categories
      </h2>
      <ul className="">
        {techs.map(techName => (
          <li key={techName} className={`inline-block font-header mr-2 mb-2`}>
            <TechTag key={techName} techName={techName} />
          </li>
        ))}
      </ul>
    </section>
  )
}
