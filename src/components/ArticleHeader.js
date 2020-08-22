import React from "react"
import Time from "./Time"

export default function ArticleHeader({
  title,
  date,
  dateTime,
  updated,
  updatedDateTime,
  timeToRead,
}) {
  return (
    <div className={"flex flex-col items-center max-w-xl mx-auto my-10 sm:my-16 font-header"}>
      <div className="font-bold text-gray-900 text-lg leading-tight max-w-xl mx-auto relative font-extrabold">
        <h1>{title}</h1>
        <div className="flex items-center mt-2">
          {updated && (
            <>
              <Time date={updated} dateTime={updatedDateTime} />
              <span className="text-xsm text-gray-700 mr-auto">&nbsp;(Updated)</span>
            </>
          )}
          {!updated && <Time date={date} dateTime={dateTime} />}
          <span className="text-xsm text-gray-700 ml-auto">{timeToRead} min read</span>
        </div>
      </div>
    </div>
  )
}
