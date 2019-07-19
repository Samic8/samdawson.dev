import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PostHeader from '../components/PostHeader';

export default function post({data}) {
    return (
        <Layout>
          <PostHeader title={data.markdownRemark.frontmatter.title}></PostHeader>
          <div className={'text-base'} dangerouslySetInnerHTML={{__html: data.markdownRemark.html }}>
              
          </div>
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
