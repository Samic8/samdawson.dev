import React from "react"
import { techToBgColor } from "../utility/techColors";

export default function PostHeader({ title, tech }) {
  return (
    <div className={"flex justify-between"}>
      <h1 className="font-bold text-gray-500 text-lg leading-tight my-10 sm:my-20 text-center max-w-3xl mx-auto relative">
        {title}
        <div className={`w-1/3 h-2 absolute left-0 mt-2 rounded-sm ${techToBgColor[tech] || 'bg-gray-500'}`} />
      </h1>
    </div>
  )
}
