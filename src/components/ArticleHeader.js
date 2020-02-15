import React from "react"
import Time from "./Time"

export default function ArticleHeader({ title, date, dateTime }) {
  return (
    <div
      className={"flex flex-col items-center max-w-xl mx-auto my-10 sm:my-16"}
    >
      <h1 className="font-bold text-gray-900 text-lg leading-tight max-w-xl mx-auto relative font-extrabold">
        {title}
        <Time className="mt-2 self-start" date={date} dateTime={dateTime} />
      </h1>
    </div>
  )
}
