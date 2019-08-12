import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import ArticleHeader from "../components/ArticleHeader"
import "prism-themes/themes/prism-atom-dark.css"
import "./Article.css"
import SEO from "../components/SEO"
import Content from "../components/Content"

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
      ></ArticleHeader>
      <Content>
        <article
          className={"article text-sm sm:text-base text-black"}
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </Content>
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
      }
      excerpt
    }
  }
`
