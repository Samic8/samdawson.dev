import React from "react"

export default function PostHeader({ title }) {
  return (
    <div className={"flex justify-between"}>
      <h1 className="font-bold text-gray-800 text-lg sm:text-xl leading-tight my-10 sm:my-20 text-center max-w-3xl mx-auto">
        {title}
      </h1>
    </div>
  )
}
