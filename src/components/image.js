import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from './Image.module.css'


const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "grey-headshot.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 130) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img className={styles.image} fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default Image
