import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostHeader from "../components/PostHeader"
import PostList from "../components/PostList"
import { mapEdgesToNode } from "../utility/data"

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            techs
            slug
            date
          }
          excerpt
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout center>
    <SEO title="All Posts" />
    <div className={"max-w-xl"}>
      <PostHeader title="All Posts" />
      <PostList posts={mapEdgesToNode(data.allMarkdownRemark)} />
    </div>
  </Layout>
)

export default IndexPage
