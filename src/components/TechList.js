import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { dedupeTechs } from "../utility/data"
import TechTag from "./TechTag"
import { getActiveClasses } from "get-active-classes"

export default function TechList({ className }) {
  const { allArticles } = useStaticQuery(
    graphql`
      query {
        allArticles: allMarkdownRemark {
          edges {
            node {
              frontmatter {
                techs
              }
            }
          }
        }
      }
    `
  )

  const dedupedTechs = dedupeTechs(allArticles)

  return (
    <ul className={getActiveClasses(className)}>
      {dedupedTechs.map(techName => (
        <li key={techName} className={`inline-block font-header mr-2 mb-2`}>
          <TechTag size="medium" key={techName} techName={techName} />
        </li>
      ))}
    </ul>
  )
}
