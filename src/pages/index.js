import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostHeader from "../components/PostHeader"
import PostList from "../components/PostList"

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            techs
            slug
          }
          excerpt
        }
      }
    }
  }
`

const mapEdgesToNode = (data) => data.edges.map((edge) => edge.node);

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <PostHeader title="All Posts" />
    <PostList posts={mapEdgesToNode(data.allMarkdownRemark)} />
  </Layout>
)

export default IndexPage
