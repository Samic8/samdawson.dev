import React from "react"
import TechList from "./TechList"

export default function CategoryList() {
  return (
    <section className="max-w-lg mx-auto sm:mt-10 mt-6 rounded border-gray-200 border-2 border-dashed p-4">
      <h2 className="font-header uppercase font-bold text-gray-700 text-xsm mb-2">
        Categories
      </h2>
      <TechList />
    </section>
  )
}
