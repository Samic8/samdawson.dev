import React from "react"
import Calendar from "../svgs/calendar.svg"
import { getActiveClasses } from "get-active-classes"

export default function Time({ date, dateTime, className }) {
  return (
    <div className={getActiveClasses("inline-flex items-center", className)}>
      <Calendar className="mr-1 stroke-current text-gray-500 w-4 h-4" />
      <time dateTime={dateTime} className="font-bold text-xsm text-gray-700 dark:text-slate-400">
        {date}
      </time>
    </div>
  )
}
