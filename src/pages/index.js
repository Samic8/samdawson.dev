import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Content from "../components/Content"
import ArticleList from "../components/ArticleList"
import { mapEdgesToNode } from "../utility/data"
import Wave from "../svgs/wave.svg"
import ExternalLinks from "../components/ExternalLinks"

export const pageQuery = graphql`
  fragment ArticleList on MarkdownRemarkConnection {
    edges {
      node {
        id
        frontmatter {
          slug
          techs
          title
          date(formatString: "MMM D, YYYY")
          dateTime: date(formatString: "YYYY-MM-DD")
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 240) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        excerpt(pruneLength: 130)
      }
    }
  }

  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      ...ArticleList
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout center>
    <SEO description="Sam Dawson's blog on everything frontend web design and development" />
    <div className={"absolute top-0 left-0 right-0 overflow-hidden z-0"}>
      <Wave
        className={"relative -mt-1xl sm:-mt-xl md:-mt-1xl"}
        style={{ left: "50%", marginLeft: "-110rem" }}
      />
    </div>
    <div className={"mt-10 sm:mt-16 mb-32 sm:mb-48 z-10 relative font-header"}>
      <div className="max-w-3xl mx-auto">
        <p className={"text-lg sm:text-xl font-bold text-gray-800 leading-tight"}>
          Hi, I'm Sam. A frontend engineer from Wollongong Australia. I work at{" "}
          <a
            href="https://www.easyagile.com/careers/?ref=samdawson.dev"
            className={"text-purple-500 hover:text-purple-700"}
          >
            Easy Agile
          </a>
          .
        </p>
        <ExternalLinks />
      </div>
    </div>
    <Content>
      <ArticleList posts={mapEdgesToNode(data.allMarkdownRemark)} />
    </Content>
  </Layout>
)

export default IndexPage
