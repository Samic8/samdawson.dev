import React from "react"
import { getActiveClasses } from "get-active-classes"

export default function ExternalLinks({ className }) {
  return (
    <div
      className={getActiveClasses(
        "text-xsm mt-2 font-bold tracking-wide",
        className
      )}
    >
      <a
        className={
          "pr-2 border-r-2 border-gray-200 text-gray-700 hover:text-gray-700"
        }
        href="/rss.xml"
      >
        RSS FEED
      </a>
      <a
        className={
          "px-2 text-gray-700 border-r-2 border-gray-200 hover:text-gray-700"
        }
        href="https://twitter.com/sam__dawson"
      >
        TWITTER
      </a>
      <a
        className={
          "px-2 border-r-2 border-gray-200 text-gray-700 hover:text-gray-700"
        }
        href="https://github.com/samic8"
      >
        GITHUB
      </a>
      <a
        className={"text-gray-700 hover:text-gray-700 px-2"}
        href="https://codepen.io/Samic8/"
      >
        CODEPEN
      </a>
    </div>
  )
}
