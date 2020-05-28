import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import Layout from "../components/Layout"
import TechList from "../components/TechList"
import WiggleDownLine from "../svgs/wiggle-down-line.svg"

export default function Subscribe() {
  const [email, setEmail] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) return
    const result = await addToMailchimp(email, {
      PATHNAME: window.location.href.replace("https://www.samdawson.dev", ""),
    })
    setSuccess(result.result === "success")
  }

  return (
    <Layout>
      <article className="pt-12 pb-20 mt-10" id="footer">
        <h2 className="text-gray-800 text-md sm:text-lg max-w-lg leading-tight mx-auto text-center">
          Get chapters from{" "}
          <div>
            <b>React Component Testing</b>
          </div>{" "}
          as it's being written
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
          <div className="max-w-lg mx-auto mt-16">
            <h2 className="text-md text-center mb-6">
              A go to <b>reference</b> book
            </h2>
            <ul className="list-disc mx-auto text-sm">
              <li>Component Integration Tests</li>
              <li>Component Unit Tests</li>
              <li>When to use mocks and spies</li>
              <li>Behaviour testing</li>
              <li>Implementation testing</li>
              <li>Testing Graph's made with SVG</li>
              <li>Testing with Redux connected components</li>
              <li>Testing with Apollo connected components</li>
              <li>
                Testing components that use common third party libraries without
                reinventing the wheel
              </li>
              <li>Visually testing component styles</li>
            </ul>
          </div>
          <div className={"mx-auto max-w-xs"}>
            {success &&
              "Thanks! I will style this success message soon with a tick or something. I promise."}
            {success === false && "Subscription failed. Reload and try again."}
          </div>
        </div>
        <WiggleDownLine
          className="mx-auto h-24 sm:h-auto mt-6 mb-6"
          aria-hidden
        />
        <div className="max-w-lg mx-auto mt-10">
          <TechList className="flex justify-center flex-wrap" />
        </div>
      </article>
    </Layout>
  )
}
