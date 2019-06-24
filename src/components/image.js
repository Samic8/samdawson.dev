import React from "react"
import styled from 'styled-components'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const imageSize = 130;

const ImageStyled = styled(Img)`
  max-width: ${imageSize}px;
  border-radius: 6px;
`

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

  return <ImageStyled fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default Image
