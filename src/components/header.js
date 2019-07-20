import React from "react"
import HeadshotImage from './Image'
import SocialButton from './SocialButton'
import TechList from './TechList'
import Github from '../svgs/github.svg'
import Codepen from '../svgs/Codepen.svg'
import Twitter from '../svgs/Twitter.svg'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { dedupeTechs } from "../utility/data";

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
  `);
  const dedupedTechs = dedupeTechs(data.allMarkdownRemark)

  return (
    <div className={'block mb-4 flex-shrink-0 sm:w-40 md:w-56 sm:mb-0 lg:pl-8 px-5 flex sm:block'}>
      <Row className={'flex sm:block items-start flex-grow'}>
        <Link to={'/'}>
          <HeadshotImage />
        </Link>
        <div className={'ml-5 text-sm w-48 sm:w-auto sm:ml-0 md:text-base text-gray-800 sm:mt-3 leading-tight antialiased'}>
          <p>
            Hi, I'm Sam.
            I build pretty good
            websites and apps.
          </p>
          <div className={'sm:hidden mt-3'}>
            <SocialButtons />
          </div>
        </div>
      </Row>
      <Row className={'hidden sm:block'}>
        <SocialButtons />
      </Row>
      <Row className={'rtl sm:ltr'}>
        <TechList techs={dedupedTechs} size={'medium'} />
      </Row>
    </div>
  )
}

const Row = ({children, className}) => <div className={`mb-5 md:mb-8 ${className}`}>{children}</div>

const SocialButtons = () => (
  <>
    <SocialButton className={'mr-3 md:mr-5'} href="https://codepen.io/Samic8/"><Codepen /></SocialButton>
    <SocialButton className={'mr-3 md:mr-5'} href="https://github.com/samic8"><Github /></SocialButton>
    <SocialButton className={'mr-3 md:mr-5'} href="https://twitter.com/sam__dawson"><Twitter /></SocialButton>
  </>
)

export default Header
