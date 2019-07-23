import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "grey-headshot.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 180) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Img
      className={" flex-shrink-0 w-16 sm:w-full rounded-lg"}
      fluid={data.placeholderImage.childImageSharp.fluid}
    />
  )
}

export default Image
