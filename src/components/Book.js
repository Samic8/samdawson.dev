import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import GridSvg from "../svgs/grid.svg"
import { getActiveClasses } from "get-active-classes"

export default function Book({ className }) {
  const { hexImage } = useStaticQuery(graphql`
    query {
      hexImage: file(relativePath: { eq: "hex.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div
      aria-hidden
      className={getActiveClasses(
        "hover:scale-105 transform transition-transform ease-in duration-150 relative overflow-hidden text-white flex flex-shrink-0 font-bold p-2 w-48 h-64 border-gray-700 border-4 border-solid rounded-sm",
        className
      )}
    >
      <div className="z-10 relative flex-1 flex flex-col mb-4">
        <GridSvg className="w-20 h-20 m-auto" />
        <div className="mt-auto text-md">React Component Testing</div>
      </div>
      <div className="top-0 bottom-0 left-0 right-0 z-0 absolute">
        <Img fluid={hexImage.childImageSharp.fluid} />
      </div>
    </div>
  )
}
