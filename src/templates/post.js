import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import PostHeader from "../components/PostHeader"
import "prism-themes/themes/prism-atom-dark.css"
import "./post.css"
import SEO from "../components/SEO"

export default function post({ data }) {
  return (
    <Layout>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.excerpt}
      />
      <PostHeader
        title={data.markdownRemark.frontmatter.title}
      ></PostHeader>
      <article
        className={"post text-sm sm:text-md text-gray-800"}
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
      excerpt
    }
  }
`
