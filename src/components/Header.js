import React from "react"
import HeadshotImage from "./Image"
import { Link, useStaticQuery, graphql } from "gatsby"
import { dedupeTechs } from "../utility/data"

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

  return (
    <div
      className={
        "block flex px-5 border-b h-16 border-gray-100 justify-between relative z-10"
      }
    >
      <Link to={"/"} className={'flex items-center self-center'}>
        <HeadshotImage />
        <span className={'tracking-wide text-gray-700 pl-2 font-bold text-xsm hover:text-gray-500'}>SAMDAWSON.DEV</span>
      </Link>
      <div className={'border-l border-gray-100 my-3 flex items-center tracking-wide text-gray-700 pl-6 font-bold text-xsm'}>
        {/* TODO: Add dropdown with TechList component to jump to categories */}
        <Link to={'/'} className='mr-4 hover:text-gray-500'>ARTICLES</Link>
        {/* TODO: Add notes, like tweets, short form articles */}
        {/* <Link to={'/'}>NOTES</Link> */}
      </div>
    </div>
  )
}

export default Header
