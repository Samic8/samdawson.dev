import React from "react"
import { techToBgColor } from "../utility/techColors";

export default function ArticleHeader({ title, tech }) {
  return (
    <div className={"flex justify-between"}>
      <h1 className="font-bold text-gray-500 left text-lg leading-tight my-10 sm:my-20 text-center max-w-3xl mx-auto relative">
        {title}
        <div className={`w-24 h-1 absolute mt-2 ${techToBgColor[tech] || 'bg-gray-200'}`} style={{ left: '0' }} />
      </h1>
    </div>
  )
}
