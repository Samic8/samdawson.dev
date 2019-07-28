import React from "react"

export default function PostHeader({ title }) {
  return (
    <div className={"flex justify-between"}>
      <h1 className="font-bold text-gray-800 text-lg leading-none my-10 sm:my-20  max-w-3xl mx-auto">
        {title}
      </h1>
    </div>
  )
}
