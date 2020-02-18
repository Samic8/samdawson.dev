import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Content from "../components/Content"
import ArticleList from "../components/ArticleList"
import { mapEdgesToNode } from "../utility/data"
import Wave from "../svgs/wave.svg"

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
    <SEO title="Home" />
    <div className={"absolute top-0 left-0 right-0 overflow-hidden z-0"}>
      <Wave
        className={"relative -mt-2xl sm:-mt-1xl md:-mt-2xl"}
        style={{ left: "50%", marginLeft: "-110rem" }}
      />
    </div>
    <div className={"mt-10 sm:mt-16 mb-32 sm:mb-48 z-10 relative font-header"}>
      <div className="max-w-3xl mx-auto">
        <p
          className={"text-lg sm:text-xl font-bold text-gray-800 leading-tight"}
        >
          Hi, I'm a web designer and builder from Wollongong, Australia. I work
          for{" "}
          <a
            href="https://www.accelo.com"
            className={"text-purple-500 hover:text-purple-700"}
          >
            accelo
          </a>
          .
        </p>
        <div className={"text-xsm mt-2 font-bold tracking-wide"}>
          <a
            className={
              "pr-2 border-r border-gray-200 text-gray-500 hover:text-gray-700"
            }
            href="https://codepen.io/Samic8/"
          >
            CODEPEN
          </a>
          <a
            className={
              "px-2 border-r border-gray-200 text-gray-500 hover:text-gray-700"
            }
            href="https://github.com/samic8"
          >
            GITHUB
          </a>
          <a
            className={
              "px-2 text-gray-500 border-r border-gray-200 hover:text-gray-700"
            }
            href="https://twitter.com/sam__dawson"
          >
            TWITTER
          </a>
          <a
            className={"px-2 text-gray-500 hover:text-gray-700"}
            href="/rss.xml"
          >
            RSS FEED
          </a>
        </div>
      </div>
    </div>
    <Content>
      <ArticleList posts={mapEdgesToNode(data.allMarkdownRemark)} />
    </Content>
  </Layout>
)

export default IndexPage
