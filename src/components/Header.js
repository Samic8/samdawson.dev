import React, { useState } from "react"
import HeadshotImage from "./Image"
import { Link, useStaticQuery, graphql } from "gatsby"
import { dedupeTechs } from "../utility/data"
import TechList from "./TechList"
import DownArrow from "../svgs/down-arrow.svg"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              techs
            }
          }
        }
      }
    }
  `)
  const dedupedTechs = dedupeTechs(data.allMarkdownRemark)

  const [isCategoriesOpen, setCategoriesOpen] = useState(false)

  return (
    <div className={"z-10"}>
      <div
        className={
          "block flex px-5 border-b h-16 border-gray-100 justify-between relative font-header"
        }
      >
        <Link to={"/"} className={"flex items-center self-center"}>
          <HeadshotImage />
          <span
            className={
              "tracking-wide text-gray-700 pl-2 font-bold text-xsm hover:text-gray-500"
            }
          >
            SAMDAWSON.DEV
          </span>
        </Link>
        <div
          className={
            "border-l border-gray-100 my-3 flex items-center tracking-wide text-gray-700 pl-6 font-bold text-xsm"
          }
        >
          <Link to={"/articles"} className="mr-2 hover:text-gray-500">
            ARTICLES
          </Link>
          <button
            className={"appearance-none"}
            onClick={() => setCategoriesOpen(!isCategoriesOpen)}
          >
            <DownArrow></DownArrow>
          </button>
          {/* TODO: Add notes, like tweets, short form articles */}
          {/* <Link to={'/'}>NOTES</Link> */}
        </div>
      </div>
      {isCategoriesOpen && (
        <div className={"flex justify-end pt-6 px-5 font-header"}>
          <TechList techs={dedupedTechs} />
        </div>
      )}
    </div>
  )
}

export default Header
