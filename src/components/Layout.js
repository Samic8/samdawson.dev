import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import addToMailchimp from "gatsby-plugin-mailchimp"

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

  const [email, setEmail] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) return
    const result = await addToMailchimp(email)
    setSuccess(result.result === "success")
  }

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
        {success === null && (
          <form
            onSubmit={handleSubmit}
            className="h-16 max-w-sm flex mx-auto mt-8 border border-gray-100 rounded focus-within:border-gray-500"
          >
            <input
              className="flex-grow pl-4 text-gray-800 outline-none rounded"
              placeholder="email@email.com"
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
        )}
        {/* TODO: Style this up better */}
        <div className={"mx-auto max-w-xs"}>
          {success &&
            "Thanks! I will style this success message soon with a tick or something. I promise."}
          {success === false && "Subscription failed. Reload and try again."}
        </div>
      </footer>
    </div>
  )
}

export default Layout
