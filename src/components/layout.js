
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header"

const Layout = ({ children }) => {
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
    <div className={'flex flex-col items-stretch sm:flex-row mx-auto max-w-6xl pt-4 sm:pt-12 font-sans'}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={`flex flex-shrink flex-grow min-w-0 px-5 sm:px-10`}>
        <div className={`ml-auto w-full max-w-3xl`}>
          <main>{children}</main>
          <footer>
          </footer>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
