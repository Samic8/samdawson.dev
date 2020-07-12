import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import ArticleHeader from "../components/ArticleHeader"
import "prism-themes/themes/prism-atom-dark.css"
import "./Article.css"
import SEO from "../components/SEO"
import Content from "../components/Content"
import ExternalLinks from "../components/ExternalLinks"
import WiggleDownLine from "../svgs/wiggle-down-line.svg"
import ThumbsUpSvg from "../svgs/thumbs-up.svg"
import ThumbsDownSvg from "../svgs/thumbs-down.svg"
import { getActiveClasses } from "get-active-classes"
import axios from "axios"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import EmailSubscription from "../components/EmailSubscription"

export default function Post({ data }) {
  const [feedbackClickedFor, setFeedbackClickedFor] = useState(null)

  function submitFeedback(type) {
    const params = {
      type,
      page: data.markdownRemark.frontmatter.title,
    }

    axios.get("/.netlify/functions/quick-feedback/quick-feedback", { params })

    setFeedbackClickedFor(type)
  }

  const onEbookClick = () => {
    trackCustomEvent({
      category: "Robust UI",
      action: "Clicked",
      label: "Article large e-book",
    })
  }

  return (
    <Layout useColoredBackground>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        imageUrl={
          data.markdownRemark.frontmatter.featuredImage &&
          data.markdownRemark.frontmatter.featuredImage.publicURL
        }
        description={data.markdownRemark.excerpt}
      />
      <ArticleHeader
        title={data.markdownRemark.frontmatter.title}
        date={data.markdownRemark.frontmatter.date}
        dateTime={data.markdownRemark.frontmatter.dateTime}
        updated={data.markdownRemark.frontmatter.updated}
        updatedDateTime={data.markdownRemark.frontmatter.updatedDateTime}
        timeToRead={data.markdownRemark.timeToRead}
      ></ArticleHeader>
      <Content>
        <article
          className={"article text-sm sm:text-base text-black"}
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </Content>
      <WiggleDownLine className="mx-auto sm:mt-10 h-24 sm:h-auto" aria-hidden />
      <form
        name="feedback"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        className="my-4 sm:my-10 font-systemFont"
      >
        <input type="hidden" name="form-name" value="feedback" />
        <input
          type="hidden"
          name="article"
          value={data.markdownRemark.frontmatter.title}
        />
        <div className="flex justify-center items-center mb-3 text-gray-800">
          <h2
            id="helpful-question"
            className="text-md sm:text-lg leading-tight text-center mr-2"
          >
            Was this article helpful?
          </h2>
          <FeedbackButton
            type="up"
            activeFor={feedbackClickedFor}
            onClick={submitFeedback}
          />
          <FeedbackButton
            type="down"
            activeFor={feedbackClickedFor}
            onClick={submitFeedback}
          />
        </div>
      </form>
      <section className="flex items-center flex-col mt-6 mx-auto max-w-lg">
        <EmailSubscription
          title={
            <>
              I'm writing an ebook called{" "}
              <Link className="link" to="/robust-ui">
                <b>Robust UI.</b>
              </Link>
              &nbsp;Subscribe to get chapters from it via email
            </>
          }
        ></EmailSubscription>
      </section>
      <ExternalLinks className="flex justify-center mt-12" />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      timeToRead
      frontmatter {
        title
        slug
        featuredImage {
          publicURL
        }
        date(formatString: "MMM D, YYYY")
        updated(formatString: "MMM D, YYYY")
        updatedDateTime: updated(formatString: "YYYY-MM-DD")
        dateTime: date(formatString: "YYYY-MM-DD")
      }
      excerpt
    }
  }
`

function FeedbackButton({ type, activeFor, className, onClick }) {
  const typeColors = {
    up: "hover:text-green-900 hover:bg-green-200",
    down: "hover:text-red-900 hover:bg-red-200",
  }

  const activeForClasses = {
    up: "text-green-900 bg-green-200",
    down: "text-red-900 bg-red-200",
  }

  const typeTexts = {
    up: "I found this article helpful",
    down: "I didn't find this article helpful",
  }

  const typeSvgs = {
    up: ThumbsUpSvg,
    down: ThumbsDownSvg,
  }

  const TypeSvg = typeSvgs[type]

  return (
    <button
      disabled={!!activeFor}
      onClick={e => {
        e.preventDefault()
        onClick(type)
      }}
      className={getActiveClasses(
        "rounded-full",
        !activeFor ? typeColors[type] : "",
        type === activeFor ? activeForClasses[activeFor] : "",
        className
      )}
      aria-label={typeTexts[type]}
    >
      <TypeSvg className="fill-currentColor m-3" />
    </button>
  )
}
