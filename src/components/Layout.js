import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import ArrowRightSvg from "../svgs/arrow-right.svg"
import Header from "./Header"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

const Layout = ({ children, showBanner = true }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const onBannerClick = () => {
    trackCustomEvent({
      category: "Robust UI",
      action: "Clicked",
      label: "Banner e-book",
    })
  }

  return (
    <div>
      {showBanner && (
        <Link
          to="/react-component-testing-book"
          onClick={onBannerClick}
          className="banner font-header bg-indigo-600 relative hover:underline z-40 text-white font-bold h-10 text-xsm sm:text-sm left-0 right-0 flex items-center justify-center"
        >
          <span>I'm writing an e-book! Check it out</span>
          <ArrowRightSvg className="h-6 ml-2" />
        </Link>
      )}
      <div
        className={
          "flex flex-col items-stretch mx-auto max-w-5xl sm:overflow-hidden pb-32"
        }
      >
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          className={`font-sans flex flex-shrink flex-grow min-w-0 px-5 pb-10`}
        >
          <div className={`w-full`}>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
