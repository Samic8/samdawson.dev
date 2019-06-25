import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import HeadshotImage from './image'
import SocialButton from './SocialButton'
import TechTag from './TechTag'
import Github from '../svgs/github.svg'
import Codepen from '../svgs/Codepen.svg'
import Twitter from '../svgs/Twitter.svg'

const HeaderElement = styled.header`
  display: block;
  width: 230px;
  padding: 40px 20px;
  /* TODO figure out font organisation */
  font-family: 'Muli';
`

const Paragraph = styled.p`
  margin: 0;
`

const Row = styled.div`
  margin-bottom: ${props => props.theme.gap};
`

const SocialButtons = styled(Row)`
  > * {
    margin-right: ${props => props.theme.halfGap};
  }
`

const TechTagHeader = styled.div`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.quaterGap};
  &:not(:first-child) {
    margin-left: ${({ theme }) => theme.quaterGap};
  }
`

const Header = ({ siteTitle }) => (
  <HeaderElement>
    <Row>
      <HeadshotImage />
    </Row>
    <Row>
      <Paragraph>
        Hi, I'm Sam.
        I build pretty good
        websites and apps.
      </Paragraph>
    </Row>
    <SocialButtons>
      <SocialButton href="https://codepen.io/Samic8/"><Codepen /></SocialButton>
      <SocialButton href="https://github.com/samic8"><Github /></SocialButton>
      <SocialButton><Twitter /></SocialButton>
    </SocialButtons>
    <Row>
      {['react', 'CSS'].map(techName => (
        <TechTagHeader><TechTag key={techName} techName={techName} /></TechTagHeader>
      ))}
    </Row>
  </HeaderElement>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
