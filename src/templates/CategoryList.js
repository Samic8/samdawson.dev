import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Content from '../components/Content'
import ArticleHeader from "../components/ArticleHeader"
import ArticleList from "../components/ArticleList"
import { mapEdgesToNode } from "../utility/data"

const CategoryList = ({ pageContext: { allMarkdownRemark, tech } }) => {
  const title = `${tech.substring(0, 1).toUpperCase() +
    tech.substring(1)} Articles`

  return (
    <Layout center>
      <SEO title={title} />
      <Content>
        <ArticleHeader title={title} tech={tech} />
        <ArticleList posts={mapEdgesToNode(allMarkdownRemark)} />
      </Content>
    </Layout>
  )
}

export default CategoryList
