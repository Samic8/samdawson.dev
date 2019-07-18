import PropTypes from "prop-types"
import React from "react"
import HeadshotImage from './Image'
import SocialButton from './SocialButton'
import TechList from './TechList'
import Github from '../svgs/github.svg'
import Codepen from '../svgs/Codepen.svg'
import Twitter from '../svgs/Twitter.svg'


const Header = ({ siteTitle }) => (
  <div className={'block w-64 px-10'}>
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
      <TechList techs={['react', 'CSS']} size={'medium'} />
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
