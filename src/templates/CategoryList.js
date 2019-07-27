import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostPage from '../components/PostPage'
import PostHeader from "../components/PostHeader"
import PostList from "../components/PostList"
import { mapEdgesToNode } from "../utility/data"

const CategoryList = ({ pageContext: { allMarkdownRemark, tech } }) => {
  const title = `${tech.substring(0, 1).toUpperCase() +
    tech.substring(1)} Posts`

  return (
    <Layout center>
      <SEO title={title} />
      <PostPage>
        <PostHeader title={title} />
        <PostList posts={mapEdgesToNode(allMarkdownRemark)} />
      </PostPage>
    </Layout>
  )
}

export default CategoryList
