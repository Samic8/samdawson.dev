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
    <div className={useColoredBackground ? 'bg-yellow-100' : ''}>
      <div
        className={
          "flex flex-col items-stretch mx-auto max-w-5xl sm:overflow-hidden"
        }
      >
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className={`font-sans flex flex-shrink flex-grow min-w-0 px-5 sm:px-10 pb-10`}>
          <div className={`w-full`}>
            <main>{children}</main>
            <footer></footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
