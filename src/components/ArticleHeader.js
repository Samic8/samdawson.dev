import React from "react"

export default function ArticleHeader({ title }) {
  return (
    <div className={"flex justify-between max-w-xl mx-auto"}>
      <h1 className="font-bold text-gray-900 left text-lg leading-tight my-10 sm:my-20 text-center max-w-3xl mx-auto relative font-header">
        {title}
      </h1>
    </div>
  )
}
