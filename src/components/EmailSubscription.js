import React, { useState } from "react"
import ThumbsUpSvg from "../svgs/thumbs-up.svg"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import addToMailchimp from "gatsby-plugin-mailchimp"
import "./EmailSubscription.css"

export default function EmailSubscription({ title, children }) {
  const [email, setEmail] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    const result = await addToMailchimp(email, {
      PATHNAME: window.location.href.replace("https://www.samdawson.dev", ""),
    })
    setLoading(false)
    setSuccess(result.result === "success")
    trackCustomEvent({
      category: "Robust UI",
      action: "Clicked",
      label: "Subscription",
    })
  }

  return (
    <section
      className="inline-block p-4 sm:p-8 rounded-md w-full"
      style={{ backgroundColor: "#f7f7f8" }}
    >
      <h2 className="font-header text-gray-900 text-md sm:text-mdlg leading-tight mx-auto">
        {title}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="h-16 flex mx-auto mt-4 border border-gray-200 rounded focus-within:border-gray-500 bg-white"
      >
        <input
          className="flex-grow flex-shrink min-w-0 pl-4 text-gray-800 outline-none rounded placeholder-gray-700"
          placeholder="me@gmail.com"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        {!success && !loading && (
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-400 text-white uppercase text-xsm tracking-wide m-1 rounded px-4"
          >
            Get Chapters
          </button>
        )}
        {loading && (
          <span className="bg-purple-500 text-white uppercase text-xsm tracking-wide m-1 rounded px-12 flex items-center justify-center">
            <div class="w-10 h-10 border-8 border-yellow-800 rounded-full loader"></div>
          </span>
        )}
        {success && (
          <span className="bg-green-500 text-white uppercase text-xsm tracking-wide m-1 rounded px-5 flex items-center justify-center">
            Success <ThumbsUpSvg className="flex-shrink-0 ml-2 mb-1" />
          </span>
        )}
      </form>
      {children}
    </section>
  )
}
