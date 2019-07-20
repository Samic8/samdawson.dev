import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PostHeader from '../components/PostHeader'
import 'prism-themes/themes/prism-atom-dark.css'
import './post.css'
import SEO from '../components/seo';

export default function post({data}) {
    return (
        <Layout>
          <SEO title={data.markdownRemark.frontmatter.title} />
          <PostHeader title={data.markdownRemark.frontmatter.title} shouldShowBackButton={true}></PostHeader>
          <article className={'post'} dangerouslySetInnerHTML={{__html: data.markdownRemark.html }} />
        </Layout>
    )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark( id: { eq: $id } ) {
      html
      frontmatter {
        title
      }
    }
  }
`
