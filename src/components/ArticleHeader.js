import React from "react"

export default function ArticleHeader({ title }) {
  return (
    <div className={"flex justify-between max-w-xl mx-auto"}>
      <h1 className="font-bold text-gray-900 left text-lg leading-tight my-10 sm:my-20 max-w-xl mx-auto relative font-extrabold">
        {title}
      </h1>
    </div>
  )
}
