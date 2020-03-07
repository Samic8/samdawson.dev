import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import ArticleHeader from "../components/ArticleHeader"
import "prism-themes/themes/prism-atom-dark.css"
import "./Article.css"
import SEO from "../components/SEO"
import Content from "../components/Content"
import WiggleDownLine from "../svgs/wiggle-down-line.svg"

export default function post({ data }) {
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
        <h2 className="mb-3 text-md sm:text-lg leading-tight text-gray-800 text-center">
          Was this article helpful?
        </h2>
        <div className="max-w-md flex flex-col mx-auto mx-auto border border-gray-100 rounded focus-within:border-gray-500 bg-white">
          <input type="hidden" name="form-name" value="feedback" />
          <textarea
            className="flex-grow flex-shrink min-w-0 p-4 text-gray-800 outline-none rounded"
            name={`${data.markdownRemark.frontmatter.title}-Feedback`}
            id={`${data.markdownRemark.frontmatter.title}-Feedback`}
            placeholder="Make it better by having your say!"
          />
          <button
            type="submit"
            className="bg-gray-500 hover:bg-gray-400 text-white font-bold text-md m-1 rounded px-4"
          >
            Submit
          </button>
        </div>
      </form>
      <WiggleDownLine className="mx-auto h-24 sm:h-auto" aria-hidden />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredImage {
          publicURL
        }
        date(formatString: "MMM D, YYYY")
        dateTime: date(formatString: "YYYY-MM-DD")
      }
      excerpt
    }
  }
`
