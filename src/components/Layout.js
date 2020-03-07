import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import addToMailchimp from "gatsby-plugin-mailchimp"
import ReactGA from "react-ga"

import Header from "./Header"

const Layout = ({
  children,
  useColoredBackground,
  isCategoriesOpenInitialState,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [email, setEmail] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) return
    const result = await addToMailchimp(email, {
      PATHNAME: window.location.href.replace("https://www.samdawson.dev", ""),
    })
    setSuccess(result.result === "success")
    ReactGA.event({
      category: "Subscription",
      action: "User clicked subscribe button",
    })
  }

  return (
    <div className={useColoredBackground ? "bg-yellow-100" : ""}>
      <div
        className={
          "flex flex-col items-stretch mx-auto max-w-5xl sm:overflow-hidden"
        }
      >
        <Header
          siteTitle={data.site.siteMetadata.title}
          isCategoriesOpenInitialState={isCategoriesOpenInitialState}
        />
        <div
          className={`font-sans flex flex-shrink flex-grow min-w-0 px-5 sm:px-10 pb-10`}
        >
          <div className={`w-full`}>
            <main>{children}</main>
          </div>
        </div>
      </div>
      <footer className="pt-12 pb-20 mt-10 bg-yellow-100" id="footer">
        <h2 className="text-gray-800 text-md sm:text-lg max-w-xs leading-tight mx-auto text-center">
          Keep up to date on all things{" "}
          <strong className="font-bold">frontend</strong> dev.
        </h2>
        <div className="px-6">
          {success === null && (
            <>
              <form
                onSubmit={handleSubmit}
                className="h-16 max-w-sm flex mx-auto mt-8 border border-gray-100 rounded focus-within:border-gray-500 bg-white"
              >
                <input
                  className="flex-grow flex-shrink min-w-0 pl-4 text-gray-800 outline-none rounded"
                  placeholder="frontend@person.com"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-400 text-white font-bold text-md m-1 rounded px-4"
                >
                  Subscribe
                </button>
              </form>
              {/* Turning off past newsletters for now to if it influences subscribers */}
              {/* <div className="max-w-sm mx-auto text-xsm mt-8 text-center underline hover:text-purple-700">
                <a
                  href="https://us3.campaign-archive.com/home/?u=3fde574ccfe379668e02db78b&id=9b6d8a39fc"
                  target="_blank"
                >
                  read past newsletters
                </a>
              </div> */}
            </>
          )}
          {/* TODO: Style this up better */}
          <div className={"mx-auto max-w-xs"}>
            {success &&
              "Thanks! I will style this success message soon with a tick or something. I promise."}
            {success === false && "Subscription failed. Reload and try again."}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
