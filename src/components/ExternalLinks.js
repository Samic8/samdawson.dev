import React from "react"
import { getActiveClasses } from "get-active-classes"
import RssSvg from "../svgs/rss.svg"

export default function ExternalLinks({ className }) {
  return (
    <div
      className={getActiveClasses(
        "text-xsm mt-2 font-bold tracking-wide flex items-center font-header",
        className
      )}
    >
      <a
        className={
          "pr-2 text-gray-700 border-r-2 border-gray-200 hover:text-gray-700 hover:underline dark:text-slate-400"
        }
        href="https://x.com/sam__dawson"
      >
        X
      </a>
      <a
        className={
          "px-2 border-r-2 border-gray-200 text-gray-700 hover:text-gray-700 hover:underline dark:text-slate-400"
        }
        href="https://github.com/samic8"
      >
        GITHUB
      </a>
      <a
        className={
          "text-gray-700 border-r-2 border-gray-200 hover:text-gray-700 px-2 hover:underline dark:text-slate-400"
        }
        href="https://codepen.io/Samic8/"
      >
        CODEPEN
      </a>
      <a
        className={
          "flex items-center ml-2 p-1 border-gray-200 text-orange-900 bg-orange-400 hover:bg-orange-300 rounded hover:underline"
        }
        href="/rss.xml"
      >
        <RssSvg className="mr-1 w-4 h-4" />
        RSS FEED
      </a>
    </div>
  )
}
