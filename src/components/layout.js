
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header"

const Layout = ({ children, center }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const extraClasses = center ? 'mr-auto' : '';
  return (
    <div className={'flex mx-auto max-w-6xl py-12 font-sans'}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={`px-10 ml-auto ${extraClasses}`}>
        <div className={'flex-grow max-w-3xl'}>
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
