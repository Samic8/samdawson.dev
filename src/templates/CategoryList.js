import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Content from '../components/Content'
import CategoryListHeader from "../components/CategoryListHeader"
import ArticleList from "../components/ArticleList"
import { mapEdgesToNode } from "../utility/data"

const CategoryList = ({ pageContext: { allMarkdownRemark, tech } }) => {
  const title = `${tech.substring(0, 1).toUpperCase() +
    tech.substring(1)}`

  return (
    <Layout center>
      <SEO title={title} />
      <Content>
        <CategoryListHeader title={title} tech={tech} />
        <ArticleList posts={mapEdgesToNode(allMarkdownRemark)} />
      </Content>
    </Layout>
  )
}

export default CategoryList
