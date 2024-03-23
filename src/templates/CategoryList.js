import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Content from "../components/Content"
import CategoryListHeader from "../components/CategoryListHeader"
import ArticleList from "../components/ArticleList"
import CategoryList from "../components/CategoryList"
import { dedupeTechs } from "../utility/data"
import { mapEdgesToNode } from "../utility/data"
import { graphql } from "gatsby"

const CategoryListTemplate = ({
  pageContext: { tech },
  data: { allMarkdownRemark, allArticles },
}) => {
  const title = `${tech.substring(0, 1).toUpperCase() + tech.substring(1)}`
  const dedupedTechs = dedupeTechs(allArticles)

  return (
    <Layout center>
      <SEO title={title} />
      <CategoryList techs={dedupedTechs} />
      <Content>
        <CategoryListHeader title={title} tech={tech} />
        <ArticleList posts={mapEdgesToNode(allMarkdownRemark)} />
      </Content>
    </Layout>
  )
}

export const query = graphql`
  query CategoryListQuery($ids: [String]!) {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, filter: { id: { in: $ids } }) {
      ...ArticleList
    }
    allArticles: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            techs
          }
        }
      }
    }
  }
`

export default CategoryListTemplate
