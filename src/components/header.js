import PropTypes from "prop-types"
import React from "react"
import HeadshotImage from './Image'
import SocialButton from './SocialButton'
import TechTag from './TechTag'
import Github from '../svgs/github.svg'
import Codepen from '../svgs/Codepen.svg'
import Twitter from '../svgs/Twitter.svg'

const Header = ({ siteTitle }) => (
  <div className={'block w-64 py-12 px-10'}>
    <Row>
      <HeadshotImage />
      <p className={'text-base font-header text-gray-900 mt-3'}>
        Hi, I'm Sam.
        I build pretty good
        websites and apps.
      </p>
    </Row>
    <Row>
      <SocialButton className={'mr-5'} href="https://codepen.io/Samic8/"><Codepen /></SocialButton>
      <SocialButton className={'mr-5'} href="https://github.com/samic8"><Github /></SocialButton>
      <SocialButton className={'mr-5'} href="https://twitter.com/sam__dawson"><Twitter /></SocialButton>
    </Row>
    <Row>
      {['react', 'CSS'].map(techName => (
        <TechTag key={techName} techName={techName} className={'mr-2'} />
      ))}
    </Row>
  </div>
)

const Row = ({children}) => <div className={'mb-8'}>{children}</div>

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
