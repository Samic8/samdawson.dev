import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostPage from '../components/PostPage'
import PostHeader from "../components/PostHeader"
import PostList from "../components/PostList"
import { mapEdgesToNode } from "../utility/data"
import Wave from '../svgs/wave.svg'

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
            date(formatString: "MMM D, YYYY")
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout center>
    <SEO title="Home" />
    <div className={'absolute top-0 left-0 right-0 overflow-hidden z-0'}>
      <Wave className={'relative'} style={{left: '50%', marginLeft: '-110rem', marginTop: '-33rem'}} />
    </div>
    <div className={'mt-16 mb-32 sm:mb-48 z-10 relative'}>
      <div className="max-w-3xl mx-auto">
        <p className={'text-lg sm:text-xl font-bold text-gray-800 leading-tight'}>
          Hi, I'm a web designer and builder from Wollongong, Australia. I work for <a href="https://www.accelo.com" class={'text-purple-500 hover:text-purple-700'}>accelo</a>.
        </p>
        <div className={'text-xsm mt-2 font-bold tracking-wide'}>
          <a className={"pr-2 border-r border-gray-200 text-gray-500 hover:text-gray-700"} href="https://codepen.io/Samic8/">
            CODEPEN
          </a>
          <a className={"px-2 border-r border-gray-200 text-gray-500 hover:text-gray-700"} href="https://github.com/samic8">
            GITHUB
          </a>
          <a
            className={"px-2 text-gray-500 hover:text-gray-700"}
            href="https://twitter.com/sam__dawson"
          >
            TWITTER
          </a>
      </div>
      </div>
    </div>
    <PostPage>
      <PostList posts={mapEdgesToNode(data.allMarkdownRemark)} />
    </PostPage>
  </Layout>
)

export default IndexPage
