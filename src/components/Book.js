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
      style={{
        boxShadow:
          "5px 10px 15px -3px rgba(0, 0, 0, 0.1), 5px 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      className={getActiveClasses(
        "hover:scale-105 transform transition-transform ease-in duration-150 relative text-white flex flex-shrink-0 font-bold p-2 w-48 h-64 rounded-t-md overflow-hidden rounded-bl-md rounded-br-sm",
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
      <div className="border-gray-700 border-2 border-solid h-3 absolute bottom-0 left-0 right-0 flex flex-col justify-evenly overflow-hidden bg-white rounded-t-sm rounded-bl-md">
        <div className="border-gray-200 border-t border-solid w-full"></div>
        <div className="border-gray-200 border-t border-solid w-full"></div>
        <div className="border-gray-200 border-t border-dotted w-full"></div>
        <div className="border-gray-200 border-t border-solid w-full"></div>
        <div className="border-gray-200 border-t border-dotted w-full"></div>
        <div className="border-gray-200 border-t border-solid w-full"></div>
      </div>
    </div>
  )
}
