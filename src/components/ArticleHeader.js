import React from "react"
import Time from "./Time"
import { getActiveClasses } from "get-active-classes"

export default function ArticleHeader({
  title,
  date,
  dateTime,
  updated,
  updatedDateTime,
}) {
  return (
    <div
      className={"flex flex-col items-center max-w-xl mx-auto my-10 sm:my-16"}
    >
      <h1 className="font-bold text-gray-900 text-lg leading-tight max-w-xl mx-auto relative font-extrabold">
        {title}
        <div className="flex items-center mt-2">
          {updated && (
            <>
              <Time date={updated} dateTime={updatedDateTime} />
              <span className="text-xsm text-gray-700 mr-auto">
                &nbsp;(Updated)
              </span>
            </>
          )}
          <Time date={date} dateTime={dateTime} />
          <span
            className={getActiveClasses("text-xsm text-gray-700", {
              "sr-only": !updated,
            })}
          >
            &nbsp;(Originally Posted)
          </span>
        </div>
      </h1>
    </div>
  )
}
