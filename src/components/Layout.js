import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header"

const Layout = ({ children, useColoredBackground }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={useColoredBackground ? "bg-yellow-100" : ""}>
      <div
        className={
          "flex flex-col items-stretch mx-auto max-w-5xl sm:overflow-hidden"
        }
      >
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          className={`font-sans flex flex-shrink flex-grow min-w-0 px-5 sm:px-10 pb-10`}
        >
          <div className={`w-full`}>
            <main>{children}</main>
          </div>
        </div>
      </div>
      <footer
        className="pt-12 pb-20 mt-10"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <h2 className="text-gray-800 text-lg font-bold max-w-xs leading-tight mx-auto text-center">
          Get a summary of my articles every month
        </h2>
        <form className="h-16 max-w-sm flex mx-auto mt-8 border border-gray-100 rounded focus-within:border-gray-500">
          <input
            className="flex-grow pl-4 text-gray-800 outline-none rounded"
            placeholder="email@emailthing.com"
            type="email"
          />
          <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold text-md m-1 rounded px-4">
            Subscribe
          </button>
        </form>
      </footer>
    </div>
  )
}

export default Layout
